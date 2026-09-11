import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { especieEnBlanco, especiePorId } from "@/lib/catalogo-especies";
import { useJardin } from "@/lib/almacen";
import { formatearFecha } from "@/lib/utils";
import type { Conocimiento } from "@/lib/tipos";

const TIPOS = [
  "todos",
  "riego",
  "fertilizante",
  "poda",
  "trasplante",
  "plaga",
  "observacion",
  "cosecha",
  "otro",
] as const;

function CuerpoOrdenado({ texto }: { texto: string }) {
  const partes = texto
    .split(/\n(?=\d+\.\s)/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (partes.length < 2) {
    return <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-silenciado">{texto}</p>;
  }
  return (
    <div className="mt-2 space-y-3">
      {partes.map((p) => (
        <p key={p.slice(0, 40)} className="whitespace-pre-wrap text-sm leading-relaxed text-silenciado">
          {p}
        </p>
      ))}
    </div>
  );
}

export function PantallaBitacora() {
  const bitacora = useJardin((s) => s.bitacora);
  const plantas = useJardin((s) => s.plantas);
  const conocimiento = useJardin((s) => s.conocimiento);
  const registrar = useJardin((s) => s.registrar);
  const codigo = useJardin((s) => s.ajustes.codigoJardin);
  const autor = useJardin((s) => s.ajustes.modoAutor);
  const guardarEsp = useJardin((s) => s.guardarEspecieCatalogo);
  const guardarFicha = useJardin((s) => s.guardarFichaAutor);
  const [filtro, setFiltro] = useState<(typeof TIPOS)[number]>("todos");
  const [titulo, setTitulo] = useState("");
  const [nota, setNota] = useState("");
  const [plantaId, setPlantaId] = useState("");
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>("observacion");
  const [aviso, setAviso] = useState("");

  const lista = useMemo(
    () => bitacora.filter((b) => filtro === "todos" || b.tipo === filtro),
    [bitacora, filtro],
  );

  function llevarAlTaller(c: Conocimiento) {
    const planta = c.plantaId ? plantas.find((p) => p.id === c.plantaId) : undefined;
    let esp = (planta?.especieId && especiePorId(planta.especieId)) || (c.especieId ? especiePorId(c.especieId) : undefined);
    const nombre = c.titulo.replace(/^Ficha \s*[·.]\s*/i, "").trim() || planta?.apodo || "Planta de comunidad";
    if (!esp) {
      esp = especieEnBlanco({ nombreComun: nombre });
    }
    guardarEsp(esp);
    guardarFicha({
      especieId: esp.id,
      cuerpo: c.cuerpo,
      fuentes: "Cuaderno vivo de la comunidad",
      actualizadoEn: new Date().toISOString(),
    });
    setAviso(`Lista para editar en el taller: ${esp.nombreComun}. Ábrelo, corrige y luego Publica.`);
  }

  return (
    <main className="px-5 pb-8 pt-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-silenciado">Comunidad</p>
      <h1 className="mt-1 text-2xl font-semibold">Diario del jardín</h1>
      <p className="mt-1 text-sm text-silenciado">
        Lo que anotas aquí lo ve la comunidad unida a este jardín
        {codigo ? ` (${codigo})` : ""}.
      </p>

      <form
        className="mt-5 space-y-3 rounded-xl bg-superficie p-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!titulo.trim() && !nota.trim()) return;
          registrar({
            plantaId: plantaId || undefined,
            fechaIso: new Date().toISOString(),
            tipo: tipo === "todos" ? "observacion" : tipo,
            titulo: titulo.trim() || "Nota del día",
            nota: nota.trim(),
          });
          setTitulo("");
          setNota("");
        }}
      >
        <select
          value={plantaId}
          onChange={(e) => setPlantaId(e.target.value)}
          className="h-11 w-full rounded-md bg-superficie-2 px-3 text-sm"
        >
          <option value="">Sin planta concreta</option>
          {plantas.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombrePropio ? `${p.nombrePropio} · ${p.apodo}` : p.apodo}
            </option>
          ))}
        </select>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as typeof tipo)}
          className="h-11 w-full rounded-md bg-superficie-2 px-3 text-sm"
        >
          {TIPOS.filter((t) => t !== "todos").map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Título corto"
          className="h-11 w-full rounded-md bg-superficie-2 px-3 text-sm outline-none"
        />
        <textarea
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          placeholder="Observación: hoja, bicho, olor a tierra, flor…"
          className="min-h-24 w-full rounded-md bg-superficie-2 p-3 text-sm outline-none"
        />
        <button type="submit" className="h-12 w-full rounded-lg bg-luna text-sm font-semibold text-fondo">
          Publicar en el diario
        </button>
      </form>

      {conocimiento.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold">Cuaderno vivo de la comunidad</h2>
          <p className="mt-1 text-xs text-silenciado">
            Fichas que salen al identificar una planta. El autor puede llevarlas al taller, corregirlas y luego publicarlas.
          </p>
          <ul className="mt-2 space-y-3">
            {conocimiento.slice(0, 20).map((c) => (
              <li key={c.id} className="rounded-xl bg-superficie p-4">
                <p className="text-xs text-luna">Nota compartida</p>
                <p className="mt-1 text-sm font-medium">{c.titulo}</p>
                <CuerpoOrdenado texto={c.cuerpo} />
                {autor && (
                  <div className="mt-3 grid gap-2">
                    <button
                      type="button"
                      onClick={() => llevarAlTaller(c)}
                      className="h-11 rounded-lg bg-luna text-xs font-semibold text-fondo"
                    >
                      Llevar al taller y catálogo
                    </button>
                    <Link
                      to="/autor"
                      className="flex h-10 items-center justify-center rounded-lg bg-superficie-2 text-xs font-medium"
                    >
                      Abrir taller para editar
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {aviso && <p className="mt-3 text-sm text-ok">{aviso}</p>}
        </section>
      )}

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
        {TIPOS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setFiltro(t)}
            className={`h-9 shrink-0 rounded-full px-3 text-xs font-medium ${
              filtro === t ? "bg-luna text-fondo" : "bg-superficie text-silenciado"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {!lista.length ? (
        <p className="mt-8 text-sm text-silenciado">
          La bitácora está en blanco. Un riego o una frase ya la enciende.
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {lista.map((b) => (
            <li key={b.id} className="rounded-xl bg-superficie p-4">
              <p className="text-xs text-silenciado">
                {formatearFecha(b.fechaIso)} · {b.tipo}
                {b.plantaId ? ` · ${plantas.find((p) => p.id === b.plantaId)?.apodo ?? ""}` : ""}
              </p>
              <p className="mt-1 text-sm font-medium">{b.titulo}</p>
              {b.nota && <p className="mt-1 whitespace-pre-wrap text-sm text-silenciado">{b.nota}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
