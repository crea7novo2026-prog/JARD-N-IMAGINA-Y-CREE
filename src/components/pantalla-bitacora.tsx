import { useMemo, useState } from "react";
import { useJardin } from "@/lib/almacen";
import { formatearFecha } from "@/lib/utils";

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

export function PantallaBitacora() {
  const bitacora = useJardin((s) => s.bitacora);
  const plantas = useJardin((s) => s.plantas);
  const conocimiento = useJardin((s) => s.conocimiento);
  const registrar = useJardin((s) => s.registrar);
  const codigo = useJardin((s) => s.ajustes.codigoJardin);
  const [filtro, setFiltro] = useState<(typeof TIPOS)[number]>("todos");
  const [titulo, setTitulo] = useState("");
  const [nota, setNota] = useState("");
  const [plantaId, setPlantaId] = useState("");
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>("observacion");

  const lista = useMemo(
    () => bitacora.filter((b) => filtro === "todos" || b.tipo === filtro),
    [bitacora, filtro],
  );

  return (
    <main className="px-5 pb-8 pt-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-silenciado">Comunidad</p>
      <h1 className="mt-1 text-2xl font-semibold">Diario del jardín</h1>
      <p className="mt-1 text-sm text-silenciado">
        Lo que anotas aquí lo ve la comunidad unida a este jardín
        {codigo ? ` (${codigo})` : ", cuando publiques un código en Ajustes"}.
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
          <ul className="mt-2 space-y-2">
            {conocimiento.slice(0, 20).map((c) => (
              <li key={c.id} className="rounded-xl bg-superficie p-4">
                <p className="text-xs text-luna">Nota compartida</p>
                <p className="mt-1 text-sm font-medium">{c.titulo}</p>
                <p className="mt-1 text-sm text-silenciado">{c.cuerpo}</p>
              </li>
            ))}
          </ul>
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
              {b.nota && <p className="mt-1 text-sm text-silenciado">{b.nota}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
