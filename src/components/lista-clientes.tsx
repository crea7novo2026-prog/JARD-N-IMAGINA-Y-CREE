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
};

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

  async function cambiarPro(correo: string, pro: boolean) {
    setOcupado(correo);
    const r = await marcarProCliente({ data: { claveAutor: CLAVE_AUTOR_DEFECTO, correo, pro } });
    setOcupado("");
    if (!r.ok) {
      setAviso(r.error ?? "No se pudo cambiar Pro.");
      return;
    }
    setAviso(pro ? `Pro activado para ${correo}` : `Pro quitado a ${correo}`);
    await cargar();
  }

  return (
    <section className="mt-5 rounded-xl bg-superficie p-4">
      <p className="text-sm font-medium">Base de clientes (solo tú)</p>
      <p className="mt-1 text-xs text-silenciado">
        Cuando te paguen, toca Activar Pro. El cliente abre la app y se desbloquea solo.
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
            <p className={c.pro ? "text-ok" : "text-silenciado"}>{c.pro ? "Pro activo" : "Cortesía"}</p>
            <button
              type="button"
              disabled={ocupado === c.correo}
              onClick={() => void cambiarPro(c.correo, !c.pro)}
              className="mt-2 h-9 w-full rounded-md bg-luna text-xs font-semibold text-fondo disabled:opacity-60"
            >
              {c.pro ? "Quitar Pro" : "Activar Pro"}
            </button>
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
