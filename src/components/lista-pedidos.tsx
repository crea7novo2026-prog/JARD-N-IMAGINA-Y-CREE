import { useEffect, useMemo, useState } from "react";
import { CLAVE_AUTOR_DEFECTO, SALA_VIVERO } from "@/lib/marca";
import { limpiarCopiasPedido, listarPedidos, marcarPedido } from "@/lib/servidor/vivero";

type Pedido = {
  id: string;
  titulo: string;
  cliente: string;
  contacto: string;
  cantidad: number;
  nota: string;
  cuando: string;
  estado: string;
};

function claveGrupo(p: Pedido) {
  return `${p.titulo}|${p.cliente}|${p.contacto}|${p.cuando}`;
}

function fechaLinda(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso || "Sin fecha";
  return d.toLocaleDateString("es-NI", { weekday: "long", day: "numeric", month: "long" });
}

export function ListaPedidos() {
  const [items, setItems] = useState<Pedido[]>([]);
  const [aviso, setAviso] = useState("");
  const [verCerrados, setVerCerrados] = useState(false);

  async function cargar() {
    const r = await listarPedidos({ data: { sala: SALA_VIVERO, claveAutor: CLAVE_AUTOR_DEFECTO } });
    if (!r.ok) {
      setAviso(r.error ?? "No se pudieron leer los pedidos.");
      return;
    }
    setItems(r.items);
  }

  useEffect(() => {
    void cargar();
    const id = window.setInterval(() => void cargar(), 8000);
    return () => window.clearInterval(id);
  }, []);

  const visibles = useMemo(() => {
    const base = items.filter((p) =>
      verCerrados ? p.estado === "entregado" || p.estado === "cancelado" : p.estado !== "entregado" && p.estado !== "cancelado",
    );
    const visto = new Set<string>();
    const unicos: (Pedido & { copias: number })[] = [];
    for (const p of base) {
      const k = claveGrupo(p);
      if (visto.has(k)) {
        const ya = unicos.find((x) => claveGrupo(x) === k);
        if (ya) ya.copias += 1;
        continue;
      }
      visto.add(k);
      unicos.push({ ...p, copias: 1 });
    }
    return unicos;
  }, [items, verCerrados]);

  const porFecha = useMemo(() => {
    const m = new Map<string, typeof visibles>();
    for (const p of visibles) {
      const k = p.cuando || "sin-fecha";
      const arr = m.get(k) ?? [];
      arr.push(p);
      m.set(k, arr);
    }
    return [...m.entries()];
  }, [visibles]);

  const pendientes = items.filter((p) => p.estado !== "entregado" && p.estado !== "cancelado").length;

  return (
    <section className="mt-5 rounded-xl bg-superficie p-4">
      <p className="text-sm font-medium">Pedidos por WhatsApp</p>
      <p className="mt-1 text-xs text-silenciado">
        Ordenados por fecha de entrega y nombre del cliente. Las pulsaciones repetidas se juntan en una sola ficha.
      </p>
      <p className="mt-2 text-xs text-luna">{pendientes} pendiente(s)</p>
      <div className="mt-2 grid grid-cols-2 gap-1">
        <button type="button" className="h-9 rounded-md bg-superficie-2 text-[11px]" onClick={() => setVerCerrados(false)}>
          Pendientes
        </button>
        <button type="button" className="h-9 rounded-md bg-superficie-2 text-[11px]" onClick={() => setVerCerrados(true)}>
          Entregados y cancelados
        </button>
      </div>
      <button
        type="button"
        className="mt-2 h-9 w-full rounded-md bg-superficie-2 text-[11px]"
        onClick={() =>
          void limpiarCopiasPedido({ data: { sala: SALA_VIVERO, claveAutor: CLAVE_AUTOR_DEFECTO } }).then((r) => {
            setAviso(r.ok ? `Copias quitadas: ${r.quitados}` : "No se pudieron quitar copias.");
            void cargar();
          })
        }
      >
        Quitar copias repetidas
      </button>
      <div className="mt-3 max-h-96 space-y-3 overflow-auto">
        {porFecha.length === 0 && <p className="text-xs text-silenciado">Aún no hay pedidos en esta vista.</p>}
        {porFecha.map(([fecha, lista]) => (
          <div key={fecha}>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-luna">{fechaLinda(fecha)}</p>
            <ul className="space-y-2">
              {lista.map((p) => (
                <li key={p.id} className="rounded-lg bg-superficie-2 p-3 text-xs">
                  <p className="text-sm font-medium">{p.titulo}</p>
                  <p className="mt-1">
                    {p.cliente} · {p.contacto || "sin teléfono"}
                  </p>
                  <p className="text-silenciado">
                    {p.cantidad} planta{p.cantidad === 1 ? "" : "s"} · {p.estado}
                    {p.copias > 1 ? ` · ${p.copias} toques juntos` : ""}
                  </p>
                  {p.nota ? <p className="mt-1 text-silenciado">{p.nota}</p> : null}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {[
                      ["programado", "Programado"],
                      ["pagado", "Pagado"],
                      ["entregado", "Entregado"],
                      ["cancelado", "Cancelar"],
                    ].map(([est, label]) => (
                      <button
                        key={est}
                        type="button"
                        className="rounded-md bg-superficie px-2 py-1 text-[11px]"
                        onClick={() =>
                          void marcarPedido({
                            data: { id: p.id, sala: SALA_VIVERO, estado: est, claveAutor: CLAVE_AUTOR_DEFECTO },
                          }).then(() => cargar())
                        }
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {aviso && <p className="mt-2 text-xs text-luna">{aviso}</p>}
    </section>
  );
}
