import { useState } from "react";
import { repartirTexto, leerArchivoComoTexto } from "@/lib/acopio";
import { catalogoEfectivo, especiePorId } from "@/lib/catalogo-especies";
import { comprimirFoto } from "@/lib/foto";
import { SALA_VIVERO } from "@/lib/marca";
import { useJardin } from "@/lib/almacen";
import { publicarOferta } from "@/lib/servidor/comunidad";
import { uid } from "@/lib/utils";
import { CLAVE_AUTOR_DEFECTO } from "@/lib/marca";

export function BaseAutor() {
  const archivos = useJardin((s) => s.archivosAutor);
  const guardarArchivo = useJardin((s) => s.guardarArchivoAutor);
  const borrarArchivo = useJardin((s) => s.borrarArchivoAutor);
  const guardarFicha = useJardin((s) => s.guardarFichaAutor);
  const ventas = useJardin((s) => s.ventasEspecie);
  const guardarVenta = useJardin((s) => s.guardarVentaEspecie);
  const guardarOferta = useJardin((s) => s.guardarOfertaVitrina);
  const enlace = useJardin((s) => s.ajustes.enlacePago);
  const [enlacePagina, setEnlacePagina] = useState("");
  const [q, setQ] = useState("");
  const [precio, setPrecio] = useState("");
  const [nota, setNota] = useState("");
  const [msg, setMsg] = useState("");
  const [especieId, setEspecieId] = useState<string>();

  async function acopiar(texto: string, fuente: string) {
    const hits = repartirTexto(texto);
    const estado = useJardin.getState();
    for (const h of hits) {
      const ya = estado.fichasAutor.find((f) => f.especieId === h.especieId);
      guardarFicha({
        especieId: h.especieId,
        cuerpo: [ya?.cuerpo, h.extracto].filter(Boolean).join("\n\n"),
        fuentes: [ya?.fuentes, fuente].filter(Boolean).join(" · "),
        actualizadoEn: new Date().toISOString(),
      });
    }
    return hits.length;
  }

  async function subir(lista: FileList | null) {
    if (!lista?.length) return;
    let repartidos = 0;
    for (const archivo of [...lista]) {
      setMsg(`Analizando ${archivo.name}…`);
      const texto = await leerArchivoComoTexto(archivo, (aviso) => setMsg(aviso));
      let url: string | undefined;
      if (archivo.type.startsWith("image/")) {
        url = await comprimirFoto(archivo);
      }
      const ids = texto ? repartirTexto(texto).map((h) => h.especieId) : especieId ? [especieId] : [];
      if (texto) repartidos += await acopiar(texto, archivo.name);
      guardarArchivo({
        id: uid("ar"),
        nombre: archivo.name,
        tipo: archivo.type || archivo.name.split(".").pop() || "archivo",
        texto: texto.slice(0, 8000) || undefined,
        url,
        especieIds: ids,
        creadoEn: new Date().toISOString(),
      });
      if (url && especieId) {
        const venta = ventas.find((v) => v.especieId === especieId);
        guardarVenta({
          especieId,
          precio: venta?.precio || precio || "Consultar",
          nota: venta?.nota || nota,
          foto: url,
        });
      }
    }
    setMsg(
      repartidos
        ? `PDF/archivo leído. Se acopló texto a ${repartidos} especie(s) del catálogo.`
        : "Se guardó el archivo. El OCR no encontró nombres del catálogo; revisa el texto o elige una especie.",
    );
  }

  const especies = catalogoEfectivo()
    .filter((e) => {
      const n = q.trim().toLowerCase();
      if (!n) return true;
      return `${e.nombreComun} ${e.nombreCientifico}`.toLowerCase().includes(n);
    })
    .slice(0, 16);

  return (
    <section className="mt-5 space-y-3 rounded-xl bg-superficie p-4">
      <h2 className="text-base font-semibold">Base de archivos</h2>
      <p className="text-xs text-silenciado">
        Excel, PDF, Word, PowerPoint, texto, foto, audio, video o enlace. Lo que se pueda leer se reparte a
        las especies del catálogo. Lo demás queda de respaldo.
      </p>
      <input
        type="file"
        multiple
        accept=".xlsx,.xls,.csv,.pdf,.doc,.docx,.ppt,.pptx,.txt,.md,.json,.html,image/*,audio/*,video/*"
        className="block w-full text-xs"
        onChange={(e) => void subir(e.target.files)}
      />
      <input
        value={enlacePagina}
        onChange={(e) => setEnlacePagina(e.target.value)}
        placeholder="Pegar enlace de una página"
        className="h-11 w-full rounded-lg bg-superficie-2 px-3 text-sm outline-none"
      />
      <button
        type="button"
        className="h-11 w-full rounded-lg bg-superficie-2 text-sm"
        onClick={async () => {
          const url = enlacePagina.trim();
          if (!url) return;
          guardarArchivo({
            id: uid("ar"),
            nombre: url,
            tipo: "enlace",
            url,
            especieIds: especieId ? [especieId] : [],
            creadoEn: new Date().toISOString(),
          });
          setEnlacePagina("");
          setMsg("Enlace guardado en la base.");
        }}
      >
        Guardar enlace
      </button>

      <p className="pt-2 text-sm font-medium">Del catálogo a la oferta</p>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Buscar especie para foto, precio y venta"
        className="h-11 w-full rounded-lg bg-superficie-2 px-3 text-sm outline-none"
      />
      <div className="grid grid-cols-2 gap-2">
        {especies.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => setEspecieId(e.id)}
            className={`rounded-lg px-2 py-2 text-left text-xs ${
              especieId === e.id ? "bg-luna text-fondo" : "bg-superficie-2"
            }`}
          >
            {e.nombreComun}
          </button>
        ))}
      </div>
      {especieId && (
        <>
          <p className="text-xs italic">{especiePorId(especieId)?.nombreCientifico}</p>
          <input
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Precio de venta"
            className="h-11 w-full rounded-lg bg-superficie-2 px-3 text-sm outline-none"
          />
          <input
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Nota de compra-venta"
            className="h-11 w-full rounded-lg bg-superficie-2 px-3 text-sm outline-none"
          />
          <button
            type="button"
            className="h-12 w-full rounded-lg bg-luna text-sm font-semibold text-fondo"
            onClick={async () => {
              const esp = especiePorId(especieId);
              if (!esp) return;
              const venta = {
                especieId,
                precio: precio.trim() || "Consultar",
                nota: nota.trim(),
                foto: ventas.find((v) => v.especieId === especieId)?.foto,
              };
              guardarVenta(venta);
              if (!enlace) {
                setMsg("Pon el PayPal en este taller antes de ofrecerla.");
                return;
              }
              const r = await publicarOferta({
                data: {
                  sala: SALA_VIVERO,
                  titulo: esp.nombreComun,
                  detalle: [esp.nombreCientifico, venta.nota].filter(Boolean).join(" · "),
                  precio: venta.precio,
                  pagoUrl: enlace,
                  foto: venta.foto,
                  claveAutor: CLAVE_AUTOR_DEFECTO,
                },
              });
              if (r.ok) {
                guardarOferta({
                  id: r.id ?? uid("of"),
                  plantaId: especieId,
                  titulo: esp.nombreComun,
                  detalle: venta.nota,
                  precio: venta.precio,
                  pagoUrl: enlace,
                  foto: venta.foto,
                  actualizadoEn: new Date().toISOString(),
                });
              }
              setMsg(r.ok ? `${esp.nombreComun} ya está en el mosaico.` : r.error ?? "No se publicó.");
            }}
          >
            Poner esta especie en oferta
          </button>
        </>
      )}

      {archivos.length > 0 && (
        <ul className="max-h-40 space-y-1 overflow-auto text-xs">
          {archivos.slice(0, 20).map((a) => (
            <li key={a.id} className="flex justify-between gap-2">
              <span className="truncate">{a.nombre}</span>
              <button type="button" className="text-alerta" onClick={() => borrarArchivo(a.id)}>
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}
      {msg && <p className="text-sm text-luna">{msg}</p>}
    </section>
  );
}
