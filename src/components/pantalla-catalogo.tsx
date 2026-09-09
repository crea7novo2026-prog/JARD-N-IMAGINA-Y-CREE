import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { catalogoEfectivo } from "@/lib/catalogo-especies";
import { etiquetaTipo, etiquetaToxicidad } from "@/lib/cuidados";
import type { TipoEspecie } from "@/lib/tipos";

const FILTROS: (TipoEspecie | "todas")[] = [
  "todas",
  "interior",
  "huerto",
  "flor",
  "suculenta",
  "arbol",
  "exterior",
];

export function PantallaCatalogo() {
  const [q, setQ] = useState("");
  const [tipo, setTipo] = useState<(typeof FILTROS)[number]>("todas");
  const [abierta, setAbierta] = useState<string | null>(null);

  const lista = useMemo(() => {
    const n = q.trim().toLowerCase();
    return catalogoEfectivo().filter((e) => {
      if (tipo !== "todas" && e.tipo !== tipo) return false;
      if (!n) return true;
      return `${e.nombreComun} ${e.nombreCientifico} ${e.familia}`.toLowerCase().includes(n);
    });
  }, [q, tipo]);

  return (
    <main className="px-5 pb-8 pt-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-silenciado">Referencia</p>
      <h1 className="mt-1 text-2xl font-semibold">Catálogo</h1>
      <p className="mt-1 text-sm text-silenciado">
        {catalogoEfectivo().length} especies vivas. El autor suma o quita referencia; tu inventario es otra cosa.
      </p>

      <label className="mt-5 flex h-12 items-center gap-2 rounded-lg bg-superficie px-3">
        <Search className="size-4 text-silenciado" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Nombre común o científico"
          className="h-full w-full bg-transparent text-sm outline-none placeholder:text-silenciado"
        />
      </label>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {FILTROS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTipo(t)}
            className={`h-9 shrink-0 rounded-full px-3 text-xs font-medium ${
              tipo === t ? "bg-luna text-fondo" : "bg-superficie text-silenciado"
            }`}
          >
            {t === "todas" ? "Todas" : etiquetaTipo(t)}
          </button>
        ))}
      </div>

      <ul className="mt-4 space-y-2">
        {lista.map((e) => {
          const open = abierta === e.id;
          return (
            <li key={e.id} className="rounded-xl bg-superficie">
              <button
                type="button"
                className="flex min-h-14 w-full flex-col items-start px-4 py-3 text-left"
                onClick={() => setAbierta(open ? null : e.id)}
              >
                <span className="text-sm font-medium">{e.nombreComun}</span>
                <span className="text-xs italic text-silenciado">{e.nombreCientifico}</span>
              </button>
              {open && (
                <div className="space-y-2 px-4 pb-4 text-sm text-silenciado">
                  <p>
                    {etiquetaTipo(e.tipo)} · {e.familia} · riego cada {e.waterFreqDays} días
                  </p>
                  <p>{e.luz}</p>
                  <p>{e.waterNotes}</p>
                  <p>{etiquetaToxicidad(e.toxicidad)}</p>
                  <ul className="list-disc pl-4">
                    {e.consejosCuidado.slice(0, 3).map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </main>
  );
}
