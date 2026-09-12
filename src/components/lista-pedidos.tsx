import { useEffect, useState } from "react";
import { CLAVE_AUTOR_DEFECTO, SALA_VIVERO } from "@/lib/marca";
import { listarPedidos, marcarPedido } from "@/lib/servidor/vivero";

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

export function ListaPedidos() {
  const [items, setItems] = useState<Pedido[]>([]);
  const [aviso, setAviso] = useState("");

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

  return (
    <section className="mt-5 rounded-xl bg-superficie p-4">
      <p className="text-sm font-medium">Pedidos del vivero</p>
      <p className="mt-1 text-xs text-silenciado">Solo tú los ves aquí. El cliente no ve esta lista.</p>
      <p className="mt-2 text-xs text-luna">{items.length} pedido(s)</p>
      <ul className="mt-3 max-h-80 space-y-2 overflow-auto">
        {items.length === 0 && <li className="text-xs text-silenciado">Aún no hay pedidos.</li>}
        {items.map((p) => (
          <li key={p.id} className="rounded-lg bg-superficie-2 p-3 text-xs">
            <p className="text-sm font-medium">
              {p.titulo} · {p.cantidad} · {p.cuando}
            </p>
            <p className="mt-1 text-silenciado">
              {p.cliente} {p.contacto ? `· ${p.contacto}` : ""} · {p.estado}
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
      {aviso && <p className="mt-2 text-xs text-luna">{aviso}</p>}
    </section>
  );
}
