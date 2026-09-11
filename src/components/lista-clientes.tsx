import { useEffect, useState } from "react";
import { CLAVE_AUTOR_DEFECTO } from "@/lib/marca";
import { descargarPdfClientes } from "@/lib/pdf-clientes";
import { listarClientes, marcarProCliente } from "@/lib/servidor/clientes";

type Fila = {
  correo: string;
  pais: string;
  telefono: string;
  nombre: string;
  creado_en: string;
  pro: boolean;
  codigo: string;
  pro_en?: string | null;
  pro_hasta?: string | null;
};

function fechaCorta(iso?: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("es-NI", { day: "2-digit", month: "short", year: "numeric" });
}

export function ListaClientes() {
  const [items, setItems] = useState<Fila[]>([]);
  const [aviso, setAviso] = useState("");
  const [ocupado, setOcupado] = useState("");

  async function cargar() {
    const r = await listarClientes({ data: { claveAutor: CLAVE_AUTOR_DEFECTO } });
    if (!r.ok) {
      setAviso(r.error ?? "No se pudo leer la lista.");
      return;
    }
    setItems(r.items);
  }

  useEffect(() => {
    void cargar();
  }, []);

  async function cambiarPro(correo: string, pro: boolean, dias = 30) {
    setOcupado(correo);
    const r = await marcarProCliente({ data: { claveAutor: CLAVE_AUTOR_DEFECTO, correo, pro, dias } });
    setOcupado("");
    if (!r.ok) {
      setAviso(r.error ?? "No se pudo cambiar Pro.");
      return;
    }
    setAviso(pro ? `Pro ${dias} días para ${correo}` : `Pro quitado a ${correo}`);
    await cargar();
  }

  return (
    <section className="mt-5 rounded-xl bg-superficie p-4">
      <p className="text-sm font-medium">Base de clientes (solo tú)</p>
      <p className="mt-1 text-xs text-silenciado">
        Activar Pro suma 30 días. Si ya había pagado y se le acabó, vuelve a activar cuando cancele.
      </p>
      <p className="mt-2 text-xs text-luna">{items.length} cliente(s)</p>
      <ul className="mt-3 max-h-80 space-y-2 overflow-auto text-xs">
        {items.map((c) => (
          <li key={c.correo} className="rounded-lg bg-superficie-2 p-2">
            <p className="font-medium">{c.nombre || "Sin nombre"}</p>
            <p>{c.correo}</p>
            <p>
              +{c.pais} {c.telefono}
            </p>
            <p className="mt-1 font-mono text-luna">{c.codigo}</p>
            <p className={c.pro ? "text-ok" : "text-silenciado"}>{c.pro ? "Pro vigente" : "Cortesía / vencido"}</p>
            <p className="mt-1 text-silenciado">Activado: {fechaCorta(c.pro_en)}</p>
            <p className="text-silenciado">Vence: {fechaCorta(c.pro_hasta)}</p>
            <div className="mt-2 grid grid-cols-2 gap-1">
              <button
                type="button"
                disabled={ocupado === c.correo}
                onClick={() => void cambiarPro(c.correo, true, 30)}
                className="h-9 rounded-md bg-luna text-[11px] font-semibold text-fondo disabled:opacity-60"
              >
                Activar 30 días
              </button>
              <button
                type="button"
                disabled={ocupado === c.correo}
                onClick={() => void cambiarPro(c.correo, true, 365)}
                className="h-9 rounded-md bg-superficie text-[11px] font-semibold disabled:opacity-60"
              >
                Activar 1 año
              </button>
            </div>
            {c.pro && (
              <button
                type="button"
                disabled={ocupado === c.correo}
                onClick={() => void cambiarPro(c.correo, false)}
                className="mt-1 h-8 w-full rounded-md bg-superficie text-[11px] disabled:opacity-60"
              >
                Quitar Pro ahora
              </button>
            )}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-3 h-12 w-full rounded-lg bg-luna text-sm font-semibold text-fondo"
        onClick={() => {
          descargarPdfClientes(items);
          setAviso("PDF descargado.");
        }}
      >
        Descargar PDF
      </button>
      {aviso && <p className="mt-2 text-xs text-luna">{aviso}</p>}
    </section>
  );
}
