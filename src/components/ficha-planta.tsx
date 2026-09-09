import { Link, useNavigate } from "@tanstack/react-router";
import { Droplets, FlaskConical, Scissors, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { especiePorId } from "@/lib/catalogo-especies";
import { plagaPorId } from "@/lib/catalogo-plagas";
import { useJardin } from "@/lib/almacen";
import {
  consejoLunarPara,
  diasHasta,
  etiquetaMaceta,
  etiquetaTipo,
  etiquetaToxicidad,
  etiquetaUbicacion,
  intervaloRiego,
  proximoFertilizante,
  proximoPoda,
  proximoRiego,
} from "@/lib/cuidados";
import { pedirAvisos } from "@/lib/avisos";
import { comprimirFoto } from "@/lib/foto";
import { infoLunar } from "@/lib/luna";
import { fuentesOficiales } from "@/lib/fuentes";
import { formatearFecha } from "@/lib/utils";
import { RecolectorFicha } from "./recolector-ficha";
import { MarcadorFoto } from "./marcador-foto";

export function FichaPlanta({ id }: { id: string }) {
  const navigate = useNavigate();
  const planta = useJardin((s) => s.plantas.find((p) => p.id === id));
  const bitacoraCompleta = useJardin((s) => s.bitacora);
  const bitacora = bitacoraCompleta.filter((b) => b.plantaId === id);
  const conocimiento = useJardin((s) => s.conocimiento);
  const registrar = useJardin((s) => s.registrar);
  const actualizar = useJardin((s) => s.actualizarPlanta);
  const borrar = useJardin((s) => s.borrarPlanta);
  const guardarConocimiento = useJardin((s) => s.guardarConocimiento);
  const borrarConocimiento = useJardin((s) => s.borrarConocimiento);
  const guardarFichaAutor = useJardin((s) => s.guardarFichaAutor);
  const fichasAutor = useJardin((s) => s.fichasAutor);
  const modoAutor = useJardin((s) => s.ajustes.modoAutor);
  const [nota, setNota] = useState("");
  const [cuadernoTitulo, setCuadernoTitulo] = useState("");
  const [cuadernoCuerpo, setCuadernoCuerpo] = useState("");
  const [notasPlanta, setNotasPlanta] = useState("");
  const [autorCuerpo, setAutorCuerpo] = useState("");
  const [autorFuentes, setAutorFuentes] = useState("");
  const [recien, setRecien] = useState(false);
  const [eco, setEco] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const luna = useMemo(() => infoLunar(new Date()), []);

  useEffect(() => {
    const st = useJardin.getState();
    const p = st.plantas.find((x) => x.id === id);
    setNotasPlanta(p?.notasPersonales ?? "");
    const fa = st.fichasAutor.find((x) => x.especieId === p?.especieId);
    setAutorCuerpo(fa?.cuerpo ?? "");
    setAutorFuentes(fa?.fuentes ?? "");
    setRecien(typeof window !== "undefined" && window.location.hash === "#documentar");
  }, [id]);

  if (!planta) {
    return (
      <main className="px-5 pt-10">
        <p>No encontramos esa ficha.</p>
        <Link to="/jardin" className="mt-3 inline-block text-luna">
          Volver al jardín
        </Link>
      </main>
    );
  }
  const ficha = planta;
  const especie = especiePorId(ficha.especieId);
  if (!especie) return <main className="p-5">Especie ausente del catálogo.</main>;
  const esp = especie;
  const notasVivas = conocimiento.filter(
    (c) => c.plantaId === ficha.id || c.especieId === especie.id,
  );
  const fichaAutor = fichasAutor.find((x) => x.especieId === especie.id);
  const oficiales = fuentesOficiales(especie.nombreCientifico, especie.nombreComun);

  const dRiego = diasHasta(proximoRiego(ficha, especie));
  const dFert = diasHasta(proximoFertilizante(ficha, especie));
  const dPoda = diasHasta(proximoPoda(ficha));

  function acto(tipo: "riego" | "fertilizante" | "poda" | "observacion", titulo: string) {
    const iso = new Date().toISOString();
    if (tipo === "riego") actualizar(ficha.id, { ultimoRiego: iso });
    if (tipo === "fertilizante") actualizar(ficha.id, { ultimoFertilizante: iso });
    if (tipo === "poda") actualizar(ficha.id, { ultimaPoda: iso });
    registrar({
      plantaId: ficha.id,
      fechaIso: iso,
      tipo,
      titulo,
      nota: nota.trim() || "Registro rápido desde la ficha.",
    });
    setNota("");
    const next =
      tipo === "riego"
        ? `Próximo riego en ${intervaloRiego(ficha, esp)} días.`
        : tipo === "fertilizante"
          ? `Próximo abono en ${esp.diasFrecuenciaFertilizante} días.`
          : tipo === "poda"
            ? "Próxima poda de mantenimiento en unos 45 días, o en menguante."
            : "Observación guardada.";
    setEco(next);
    void pedirAvisos();
  }

  return (
    <main className="px-5 pb-10 pt-6">
      <RecolectorFicha plantaId={ficha.id} />
      <button type="button" onClick={() => void navigate({ to: "/jardin" })} className="text-sm text-silenciado">
        ← Jardín
      </button>
      <div className="mt-3 overflow-hidden rounded-xl">
        <MarcadorFoto src={ficha.fotoDataUrl} alt={ficha.apodo} />
      </div>
      <button
        type="button"
        className="mt-2 text-xs font-medium text-luna"
        onClick={() => fileRef.current?.click()}
      >
        Cambiar foto
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          actualizar(ficha.id, { fotoDataUrl: await comprimirFoto(f) });
        }}
      />

      <h1 className="mt-4 text-2xl font-semibold">{ficha.nombrePropio || ficha.apodo}</h1>
      {ficha.nombrePropio ? (
        <p className="text-sm text-silenciado">{ficha.apodo}</p>
      ) : null}
      <p className="text-sm italic text-silenciado">{especie.nombreCientifico}</p>
      <label className="mt-3 block text-sm">
        Segundo nombre
        <input
          defaultValue={ficha.nombrePropio ?? ""}
          onBlur={(e) => actualizar(ficha.id, { nombrePropio: e.target.value.trim() || undefined })}
          placeholder="El nombre que le pones tú"
          className="mt-1 h-11 w-full rounded-lg bg-superficie px-3 text-sm outline-none"
        />
      </label>
      <div className="mt-3">
        <p className="text-sm">Lugar en tu jardín</p>
        <div className="mt-2 grid grid-cols-4 gap-1">
          {(["interior", "patio", "huerto", "balcon"] as const).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => actualizar(ficha.id, { ubicacion: u })}
              className={`h-10 rounded-lg text-xs ${ficha.ubicacion === u ? "bg-luna text-fondo" : "bg-superficie"}`}
            >
              {etiquetaUbicacion(u)}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-1 text-xs text-silenciado">
        {etiquetaTipo(especie.tipo)} · {etiquetaUbicacion(ficha.ubicacion)} · maceta{" "}
        {etiquetaMaceta(ficha.tamanoMaceta).toLowerCase()} · llegó {formatearFecha(ficha.fechaAdquisicion)}
      </p>

      {recien && (
        <p className="mt-4 rounded-xl bg-luna/15 p-3 text-sm text-luna">
          Planta agregada. Esta es la ficha para leer el cuidado y documentar lo que ves.
        </p>
      )}

      {fichaAutor?.cuerpo && (
        <section className="mt-5 rounded-xl bg-superficie p-4 text-sm">
          <p className="text-xs uppercase tracking-[0.14em] text-luna">Nota del autor</p>
          <p className="mt-2 whitespace-pre-wrap">{fichaAutor.cuerpo}</p>
          {fichaAutor.fuentes && (
            <p className="mt-2 text-xs text-silenciado">Fuentes del autor: {fichaAutor.fuentes}</p>
          )}
        </section>
      )}

      <section id="documentar" className="mt-6 space-y-2 rounded-xl bg-superficie p-4">
        <h2 className="text-base font-semibold">Verificar (Google primero)</h2>
        <p className="text-xs text-silenciado">
          Abre Google y compara. Luego jardines botánicos. Si no hay red, usa la ficha guardada en este aparato.
        </p>
        <ul className="space-y-2">
          {oficiales.map((f) => (
            <li key={f.url}>
              <a
                href={f.url}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg bg-superficie-2 px-3 py-2 text-sm"
              >
                <span className="font-medium text-luna">{f.nombre}</span>
                <span className="mt-0.5 block text-xs text-silenciado">{f.nota}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {modoAutor && (
        <section className="mt-4 space-y-2 rounded-xl border border-luna/30 bg-superficie p-4">
          <h2 className="text-base font-semibold">Investigación del autor</h2>
          <p className="text-xs text-silenciado">
            Esto se publica en la ficha de la especie y viaja con el código de la comunidad.
          </p>
          <textarea
            value={autorCuerpo}
            onChange={(e) => setAutorCuerpo(e.target.value)}
            placeholder="Lo que investigaste: riego real, suelo local, luna, plaga vista…"
            className="min-h-28 w-full rounded-lg bg-superficie-2 p-3 text-sm outline-none"
          />
          <input
            value={autorFuentes}
            onChange={(e) => setAutorFuentes(e.target.value)}
            placeholder="Tus fuentes (libro, vivero, página)"
            className="h-11 w-full rounded-lg bg-superficie-2 px-3 text-sm outline-none"
          />
          <button
            type="button"
            className="h-11 w-full rounded-lg bg-luna text-sm font-semibold text-fondo"
            onClick={() =>
              guardarFichaAutor({
                especieId: especie.id,
                cuerpo: autorCuerpo.trim(),
                fuentes: autorFuentes.trim(),
                actualizadoEn: new Date().toISOString(),
              })
            }
          >
            Publicar investigación
          </button>
        </section>
      )}

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-superficie p-4">
          <p className="text-[11px] uppercase tracking-wide text-silenciado">Próximo riego</p>
          <p className="mt-1 text-lg font-semibold text-luna">
            {dRiego <= 0 ? "Hoy" : `En ${dRiego} d`}
          </p>
          <p className="text-xs text-silenciado">
            Cada {intervaloRiego(ficha, especie)} días
            {ficha.intervaloRiegoAprendido ? " (aprendido)" : ""}
          </p>
        </div>
        <div className="rounded-xl bg-superficie p-4">
          <p className="text-[11px] uppercase tracking-wide text-silenciado">Abono</p>
          <p className="mt-1 text-lg font-semibold">{dFert <= 0 ? "Hoy" : `En ${dFert} d`}</p>
          <p className="line-clamp-2 text-xs text-silenciado">{especie.tipoFertilizante}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-silenciado">{consejoLunarPara(especie, luna)}</p>

      <textarea
        value={nota}
        onChange={(e) => setNota(e.target.value)}
        placeholder="Qué ves hoy: turgencia, mancha, brote…"
        className="mt-4 min-h-20 w-full rounded-xl bg-superficie p-3 text-sm outline-none"
      />
      <div className="mt-3 grid grid-cols-3 gap-2">
        <button
          type="button"
          className="flex min-h-16 flex-col items-center justify-center rounded-lg bg-superficie-2 px-1 text-xs font-medium active:bg-luna active:text-fondo"
          onClick={() => acto("riego", `Riego · ${ficha.apodo}`)}
        >
          <span className="flex items-center gap-1">
            <Droplets className="size-4 text-ok" /> Regué
          </span>
          <span className="mt-1 text-[10px] text-silenciado">
            {dRiego <= 0 ? "Toca hoy" : `próx. ${dRiego} d`}
          </span>
        </button>
        <button
          type="button"
          className="flex min-h-16 flex-col items-center justify-center rounded-lg bg-superficie-2 px-1 text-xs font-medium active:bg-luna active:text-fondo"
          onClick={() => acto("fertilizante", `Abono · ${ficha.apodo}`)}
        >
          <span className="flex items-center gap-1">
            <FlaskConical className="size-4 text-luna" /> Nutrí
          </span>
          <span className="mt-1 text-[10px] text-silenciado">
            {dFert <= 0 ? "Toca hoy" : `próx. ${dFert} d`}
          </span>
        </button>
        <button
          type="button"
          className="flex min-h-16 flex-col items-center justify-center rounded-lg bg-superficie-2 px-1 text-xs font-medium active:bg-luna active:text-fondo"
          onClick={() => acto("poda", `Poda · ${ficha.apodo}`)}
        >
          <span className="flex items-center gap-1">
            <Scissors className="size-4" /> Podé
          </span>
          <span className="mt-1 text-[10px] text-silenciado">
            {dPoda <= 0 ? "Toca hoy" : `próx. ${dPoda} d`}
          </span>
        </button>
      </div>
      {eco && <p className="mt-2 text-center text-sm text-luna">{eco}</p>}
      <button
        type="button"
        className="mt-2 h-11 w-full rounded-lg bg-superficie text-xs font-medium"
        onClick={() => acto("observacion", `Nota · ${ficha.apodo}`)}
      >
        Guardar observación
      </button>

      <section className="mt-8 space-y-3 text-sm">
        <h2 className="text-base font-semibold">Cuidado de esta especie</h2>
        <p>{especie.waterNotes}</p>
        <p className="text-silenciado">
          Luz: {especie.luz}. Humedad: {especie.humedad}. {especie.tempMinC}–{especie.tempMaxC} °C.
        </p>
        <p className="text-silenciado">Suelo: {especie.suelo}</p>
        <p className="text-silenciado">Poda: {especie.podarCuando}</p>
        <p className="text-silenciado">Trasplante: {especie.trasplantarCuando}</p>
        <p className="text-alerta">{etiquetaToxicidad(especie.toxicidad)}</p>
        <ul className="list-disc space-y-1 pl-4 text-silenciado">
          {especie.consejosCuidado.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <h3 className="pt-2 font-medium">Si algo se ve mal</h3>
        {especie.problemas.map((pr) => (
          <div key={pr.sintoma} className="rounded-lg bg-superficie p-3">
            <p className="font-medium">{pr.sintoma}</p>
            <p className="text-xs text-silenciado">Causa probable: {pr.causa}</p>
            <p className="text-xs">{pr.solucion}</p>
          </div>
        ))}
        <h3 className="pt-2 font-medium">Plagas habituales</h3>
        <div className="flex flex-wrap gap-2">
          {especie.plagasComunes.map((pid) => {
            const pl = plagaPorId(pid);
            if (!pl) return null;
            return (
              <Link
                key={pid}
                to="/plagas"
                className="rounded-full bg-superficie-2 px-3 py-1 text-xs"
              >
                {pl.nombre}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-8 space-y-3">
        <h2 className="text-base font-semibold">Tu cuaderno de esta planta</h2>
        <p className="text-sm text-silenciado">
          Lo que anotas aquí viaja con el código de jardín a los otros aparatos sincronizados.
        </p>
        <textarea
          value={notasPlanta}
          onChange={(e) => setNotasPlanta(e.target.value)}
          onBlur={() => actualizar(ficha.id, { notasPersonales: notasPlanta })}
          placeholder="Suelo que usas, sombra de la tarde, lo que funciona en tu patio…"
          className="min-h-24 w-full rounded-xl bg-superficie p-3 text-sm outline-none"
        />
        {notasVivas.map((c) => (
          <div key={c.id} className="rounded-lg bg-superficie p-3 text-sm">
            <p className="font-medium">{c.titulo}</p>
            <p className="text-silenciado">{c.cuerpo}</p>
            <button
              type="button"
              className="mt-2 text-xs text-peligro"
              onClick={() => borrarConocimiento(c.id)}
            >
              Quitar nota
            </button>
          </div>
        ))}
        <input
          value={cuadernoTitulo}
          onChange={(e) => setCuadernoTitulo(e.target.value)}
          placeholder="Título (riego de marzo, receta de sustrato…)"
          className="h-11 w-full rounded-lg bg-superficie px-3 text-sm outline-none"
        />
        <textarea
          value={cuadernoCuerpo}
          onChange={(e) => setCuadernoCuerpo(e.target.value)}
          placeholder="Detalle que quieres recordar y compartir en tus otras apps"
          className="min-h-20 w-full rounded-xl bg-superficie p-3 text-sm outline-none"
        />
        <button
          type="button"
          className="h-11 w-full rounded-lg bg-superficie-2 text-sm font-medium"
          onClick={() => {
            if (!cuadernoCuerpo.trim()) return;
            guardarConocimiento({
              especieId: especie.id,
              plantaId: ficha.id,
              titulo: cuadernoTitulo.trim() || "Nota de patio",
              cuerpo: cuadernoCuerpo.trim(),
            });
            setCuadernoTitulo("");
            setCuadernoCuerpo("");
          }}
        >
          Guardar en el cuaderno vivo
        </button>
      </section>

      <section className="mt-8">
        <h2 className="text-base font-semibold">Bitácora de esta planta</h2>
        {!bitacora.length ? (
          <p className="mt-2 text-sm text-silenciado">Aún no hay notas. El riego de hoy ya cuenta.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {bitacora.slice(0, 12).map((b) => (
              <li key={b.id} className="rounded-lg bg-superficie p-3 text-sm">
                <p className="text-xs text-silenciado">{formatearFecha(b.fechaIso)} · {b.tipo}</p>
                <p className="font-medium">{b.titulo}</p>
                <p className="text-silenciado">{b.nota}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <button
        type="button"
        className="mt-8 inline-flex h-11 items-center gap-2 text-sm text-peligro"
        onClick={() => {
          if (confirm("¿Quitar esta planta del inventario?")) {
            borrar(ficha.id);
            void navigate({ to: "/jardin" });
          }
        }}
      >
        <Trash2 className="size-4" /> Quitar del jardín
      </button>
    </main>
  );
}
