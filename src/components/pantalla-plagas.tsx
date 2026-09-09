import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { CATALOGO_PLAGAS } from "@/lib/catalogo-plagas";
import { useJardin } from "@/lib/almacen";
import { especiePorId } from "@/lib/catalogo-especies";
import { etiquetaTipo } from "@/lib/cuidados";

export function PantallaPlagas({ inicial = "" }: { inicial?: string }) {
  const [q, setQ] = useState(inicial);
  const [abierta, setAbierta] = useState<string | null>(CATALOGO_PLAGAS[0]?.id ?? null);
  const plantas = useJardin((s) => s.plantas);

  const idsRelevantes = useMemo(() => {
    const s = new Set<string>();
    for (const p of plantas) {
      const e = especiePorId(p.especieId);
      e?.plagasComunes.forEach((id) => s.add(id));
    }
    return s;
  }, [plantas]);

  const lista = useMemo(() => {
    const n = q.trim().toLowerCase();
    return CATALOGO_PLAGAS.filter((p) => {
      if (!n) return true;
      return `${p.nombre} ${p.signos.join(" ")} ${p.temporada}`.toLowerCase().includes(n);
    });
  }, [q]);

  return (
    <main className="px-5 pb-8 pt-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-silenciado">Diagnóstico</p>
      <h1 className="mt-1 text-2xl font-semibold">Plagas</h1>
      <p className="mt-1 text-sm text-silenciado">
        {idsRelevantes.size
          ? "Primero las que suelen tocar las especies de tu jardín."
          : "Guía breve. Cuando agregues plantas, priorizamos las suyas."}
      </p>

      <label className="mt-5 flex h-12 items-center gap-2 rounded-lg bg-superficie px-3">
        <Search className="size-4 text-silenciado" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Pulgón, mancha, telaraña…"
          className="h-full w-full bg-transparent text-sm outline-none placeholder:text-silenciado"
        />
      </label>

      <ul className="mt-4 space-y-2">
        {lista
          .slice()
          .sort((a, b) => Number(idsRelevantes.has(b.id)) - Number(idsRelevantes.has(a.id)))
          .map((p) => {
            const open = abierta === p.id;
            return (
              <li key={p.id} className="overflow-hidden rounded-xl bg-superficie">
                <button
                  type="button"
                  className="flex min-h-12 w-full items-center justify-between px-4 py-3 text-left"
                  onClick={() => setAbierta(open ? null : p.id)}
                >
                  <span className="text-sm font-medium">{p.nombre}</span>
                  {idsRelevantes.has(p.id) && (
                    <span className="text-[10px] uppercase tracking-wide text-luna">En tu jardín</span>
                  )}
                </button>
                {open && (
                  <div className="space-y-3 px-4 pb-4 text-sm text-silenciado">
                    <p className="text-xs">Temporada: {p.temporada}</p>
                    <div>
                      <p className="text-xs font-medium text-texto">Signos</p>
                      <ul className="mt-1 list-disc pl-4">
                        {p.signos.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-texto">Orgánico</p>
                      <ul className="mt-1 list-disc pl-4">
                        {p.tratamientosOrganicos.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-alerta">Químico · uso responsable</p>
                      <ul className="mt-1 list-disc pl-4">
                        {p.tratamientosQuimicos.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                    <p>
                      <span className="text-texto">Prevención. </span>
                      {p.prevencion}
                    </p>
                    <p className="text-xs">
                      Suele verse en {p.tiposRelacionados.map(etiquetaTipo).join(", ").toLowerCase()}.
                    </p>
                  </div>
                )}
              </li>
            );
          })}
      </ul>
    </main>
  );
}
