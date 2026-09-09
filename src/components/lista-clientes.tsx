import { useEffect, useState } from "react";
import { CLAVE_AUTOR_DEFECTO } from "@/lib/marca";
import { descargarPdfClientes } from "@/lib/pdf-clientes";
import { listarClientes } from "@/lib/servidor/clientes";

type Fila = {
  correo: string;
  pais: string;
  telefono: string;
  nombre: string;
  creado_en: string;
};

export function ListaClientes() {
  const [items, setItems] = useState<Fila[]>([]);
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    void listarClientes({ data: { claveAutor: CLAVE_AUTOR_DEFECTO } }).then((r) => {
      if (!r.ok) {
        setAviso(r.error ?? "No se pudo leer la lista.");
        return;
      }
      setItems(r.items);
    });
  }, []);

  return (
    <section className="mt-5 rounded-xl bg-superficie p-4">
      <p className="text-sm font-medium">Base de clientes (solo tú)</p>
      <p className="mt-1 text-xs text-silenciado">
        Correos y teléfonos de quien abre la app. El cliente no ve esta lista.
      </p>
      <p className="mt-2 text-xs text-luna">{items.length} cliente(s)</p>
      <ul className="mt-3 max-h-56 space-y-2 overflow-auto text-xs">
        {items.map((c) => (
          <li key={c.correo} className="rounded-lg bg-superficie-2 p-2">
            <p className="font-medium">{c.nombre || "Sin nombre"}</p>
            <p>{c.correo}</p>
            <p>
              +{c.pais} {c.telefono}
            </p>
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
