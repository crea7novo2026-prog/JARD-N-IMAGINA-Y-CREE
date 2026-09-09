import { useNavigate } from "@tanstack/react-router";
import { Camera, Check, Images, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { buscarEspecies, especieEnBlanco, especiePorId, pistaPorNombreArchivo } from "@/lib/catalogo-especies";
import { useJardin } from "@/lib/almacen";
import { comprimirFoto } from "@/lib/foto";
import { busquedaGooglePorNombre, enlacesLens } from "@/lib/fuentes";
import { sugerirEspeciePorFoto } from "@/lib/servidor/identificar";
import type { UbicacionPlanta } from "@/lib/tipos";
import { aIsoDia } from "@/lib/utils";
import { HojaPro } from "./hoja-pro";
import { BarraDemo } from "./barra-demo";
import { MarcadorFoto } from "./marcador-foto";
import { ResumenCuidado } from "./resumen-cuidado";

export function FlujoAgregar() {
  const navigate = useNavigate();
  const puede = useJardin((s) => s.puedeAgregar());
  const agregar = useJardin((s) => s.agregarPlanta);
  const guardarEsp = useJardin((s) => s.guardarEspecieCatalogo);
  const [pro, setPro] = useState(!puede);
  const [foto, setFoto] = useState<string>();
  const [q, setQ] = useState("");
  const [especieId, setEspecieId] = useState<string>();
  const [sugeridas, setSugeridas] = useState<string[]>([]);
  const [leyendo, setLeyendo] = useState(false);
  const [apodo, setApodo] = useState("");
  const [nombrePropio, setNombrePropio] = useState("");
  const [ubicacion, setUbicacion] = useState<UbicacionPlanta>("patio");
  const [error, setError] = useState("");
  const [urlFoto, setUrlFoto] = useState("");
  const camaraRef = useRef<HTMLInputElement>(null);
  const archivoRef = useRef<HTMLInputElement>(null);

  const coincidencias = useMemo(() => {
    if (!q.trim() && !sugeridas.length) return [];
    const base = buscarEspecies(q);
    if (!sugeridas.length || q.trim()) return base.slice(0, 8);
    const prior = sugeridas
      .map((id) => especiePorId(id))
      .filter((x): x is NonNullable<typeof x> => Boolean(x));
    return [...prior, ...base.filter((e) => !sugeridas.includes(e.id))].slice(0, 8);
  }, [q, sugeridas]);
  const especie = especieId ? especiePorId(especieId) : undefined;

  function elegir(id: string) {
    setEspecieId(id);
    const esp = especiePorId(id);
    if (esp) setApodo(esp.nombreComun);
    setError("");
  }

  useEffect(() => {
    const n = q.trim();
    if (n.length < 4 || especieId) return;
    const hit = buscarEspecies(n)[0];
    if (hit) elegir(hit.id);
    // una sola autoelección por búsqueda
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  async function onFoto(f?: File) {
    if (!f) return;
    try {
      setError("");
      setLeyendo(true);
      const pistas = pistaPorNombreArchivo(f.name);
      const data = await comprimirFoto(f);
      setFoto(data);
      const r = await sugerirEspeciePorFoto({ data: { dataUrl: data } });
      const ids = (r.ids?.length ? r.ids : pistas).filter(Boolean);
      if (ids[0]) {
        setSugeridas(ids);
        elegir(ids[0]);
      } else {
        setLeyendo(false);
        setError("No salió el nombre. Escríbelo abajo.");
      }
    } catch {
      setLeyendo(false);
      setError("No se pudo leer la foto. Prueba otra.");
    }
  }

  async function fotoDesdeEnlace() {
    const raw = urlFoto.trim();
    if (!raw) return;
    try {
      const r = await fetch(raw);
      const blob = await r.blob();
      await onFoto(new File([blob], "google.jpg", { type: blob.type || "image/jpeg" }));
    } catch {
      setError("Ese enlace no se pudo abrir. Descarga la foto y usa Foto guardada.");
    }
  }

  function guardar() {
    if (!puede) {
      setPro(true);
      return;
    }
    const nombre = apodo.trim() || q.trim();
    let idElegido = especieId || sugeridas[0] || buscarEspecies(nombre)[0]?.id;
    if (!idElegido && (nombre || foto)) {
      const nueva = especieEnBlanco({ nombreComun: nombre || "Planta nueva" });
      guardarEsp(nueva);
      idElegido = nueva.id;
    }
    const especieLista = idElegido ? especiePorId(idElegido) : undefined;
    if (!idElegido || !especieLista) {
      setError("Pon un nombre o una foto.");
      return;
    }
    const planta = agregar({
      especieId: idElegido,
      apodo: nombre || especieLista.nombreComun,
      nombrePropio: nombrePropio.trim() || undefined,
      ubicacion,
      tamanoMaceta: "mediana",
      fechaAdquisicion: new Date(aIsoDia(new Date()) + "T12:00:00").toISOString(),
      fotoDataUrl: foto,
    });
    if (!planta) {
      setPro(true);
      return;
    }
    void navigate({ to: "/planta/$id", params: { id: planta.id } });
  }

  return (
    <main className="px-5 pb-10 pt-8">
      <h1 className="text-2xl font-semibold">Nueva planta</h1>
      <p className="mt-2 text-base leading-relaxed text-silenciado">
        Nombre o foto. Se guarda ya. La app busca el cuidado sola. Luego lo puedes cambiar.
      </p>
      <div className="mt-4">
        <BarraDemo />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          className="flex h-16 items-center justify-center gap-2 rounded-xl bg-luna text-base font-semibold text-fondo"
          onClick={() => camaraRef.current?.click()}
        >
          <Camera className="size-5" /> Tomar foto
        </button>
        <button
          type="button"
          className="flex h-16 items-center justify-center gap-2 rounded-xl bg-superficie text-base font-semibold"
          onClick={() => archivoRef.current?.click()}
        >
          <Images className="size-5 text-luna" /> Foto guardada
        </button>
      </div>
      <input ref={camaraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => void onFoto(e.target.files?.[0])} />
      <input ref={archivoRef} type="file" accept="image/*" className="hidden" onChange={(e) => void onFoto(e.target.files?.[0])} />

      {foto && <MarcadorFoto src={foto} alt="" className="mt-4 max-h-64 w-full rounded-xl" />}
      {especie && <ResumenCuidado especie={especie} />}
      {leyendo && <p className="mt-3 text-sm text-luna">Reconociendo la foto…</p>}

      <label className="mt-5 flex h-14 items-center gap-2 rounded-xl bg-superficie px-3">
        <Search className="size-5 text-silenciado" />
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setEspecieId(undefined);
            setError("");
          }}
          placeholder="Nombre: aloe, tomate, rosa…"
          className="h-full w-full bg-transparent text-base outline-none"
        />
      </label>

      {coincidencias.length > 0 && (
        <div className="mt-3 grid grid-cols-2 gap-2">
          {coincidencias.map((esp) => {
            const on = especieId === esp.id;
            return (
              <button
                key={esp.id}
                type="button"
                onClick={() => elegir(esp.id)}
                className={`min-h-16 rounded-xl border px-3 py-2 text-left ${on ? "border-luna bg-superficie-2" : "border-borde bg-superficie"}`}
              >
                <p className="text-sm font-medium">{esp.nombreComun}</p>
                {on && <Check className="mt-1 size-4 text-luna" />}
              </button>
            );
          })}
        </div>
      )}

      <input
        value={urlFoto}
        onChange={(e) => setUrlFoto(e.target.value)}
        placeholder="Enlace de foto de Google (opcional)"
        className="mt-3 h-12 w-full rounded-xl bg-superficie px-3 text-sm outline-none"
      />
      {urlFoto.trim() && (
        <button type="button" className="mt-2 text-sm text-luna" onClick={() => void fotoDesdeEnlace()}>
          Usar esa foto
        </button>
      )}

      {(q.trim().length >= 2 || especie) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {enlacesLens(especie?.nombreComun || q).slice(0, 2).map((f) => (
            <a key={f.url} href={f.url} target="_blank" rel="noreferrer" className="rounded-lg bg-superficie px-3 py-2 text-xs text-luna">
              {f.nombre}
            </a>
          ))}
          {busquedaGooglePorNombre(especie?.nombreComun || q)
            .filter((f) => f.nombre === "Google")
            .map((f) => (
              <a key={f.url} href={f.url} target="_blank" rel="noreferrer" className="rounded-lg bg-superficie px-3 py-2 text-xs text-luna">
                Google
              </a>
            ))}
        </div>
      )}

      <label className="mt-4 block text-sm">
        Segundo nombre
        <input
          value={nombrePropio}
          onChange={(e) => setNombrePropio(e.target.value)}
          placeholder="Cómo la llamas tú"
          className="mt-1 h-12 w-full rounded-xl bg-superficie px-3 text-sm outline-none"
        />
      </label>
      <p className="mt-3 text-sm">Lugar en tu jardín</p>
      <div className="mt-2 grid grid-cols-4 gap-1">
        {(["interior", "patio", "huerto", "balcon"] as const).map((u) => (
          <button
            key={u}
            type="button"
            onClick={() => setUbicacion(u)}
            className={`h-10 rounded-lg text-xs ${ubicacion === u ? "bg-luna text-fondo" : "bg-superficie"}`}
          >
            {u === "interior" ? "Interior" : u === "patio" ? "Patio" : u === "huerto" ? "Huerto" : "Balcón"}
          </button>
        ))}
      </div>
      {error && <p className="mt-3 text-sm text-alerta">{error}</p>}

      <button
        type="button"
        onClick={guardar}
        className="mt-6 flex h-16 w-full items-center justify-center rounded-xl bg-luna text-lg font-semibold text-fondo"
      >
        Agregar al jardín
      </button>
      <p className="mt-2 text-center text-xs text-silenciado">Después puedes cambiar foto, nombre y notas.</p>
      <HojaPro abierta={pro} onCerrar={() => setPro(false)} />
    </main>
  );
}
