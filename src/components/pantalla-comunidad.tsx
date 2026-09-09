import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useJardin } from "@/lib/almacen";
import { SALA_COMUNIDAD } from "@/lib/marca";
import { enviarMensaje, listarMensajes } from "@/lib/servidor/comunidad";

type Msg = { id: string; autor: string; es_autor: boolean; cuerpo: string; creado_en: string };

export function PantallaComunidad() {
  const ajustes = useJardin((s) => s.ajustes);
  const sala = SALA_COMUNIDAD;
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [texto, setTexto] = useState("");
  const [aviso, setAviso] = useState("");
  const nombre = ajustes.nombreMostrar.trim() || (ajustes.modoAutor ? "Autor" : "Jardinero");

  async function cargar() {
    if (!sala) return;
    try {
      const m = await listarMensajes({ data: { sala } });
      if (m.ok) setMsgs(m.items);
    } catch {
      setAviso("Sin red ahora. El chat vuelve cuando hay internet.");
    }
  }

  useEffect(() => {
    void cargar();
    const id = window.setInterval(() => void cargar(), 4000);
    return () => window.clearInterval(id);
  }, [sala]);

  async function mandar() {
    if (!sala || !texto.trim()) return;
    const r = await enviarMensaje({
      data: { sala, autor: nombre, esAutor: ajustes.modoAutor, cuerpo: texto },
    });
    if (!r.ok) {
      setAviso(r.error ?? "No se envió.");
      return;
    }
    setTexto("");
    void cargar();
  }

  return (
    <main className="px-5 pb-10 pt-8">
      <p className="text-xs uppercase tracking-[0.16em] text-luna">En línea · libre</p>
      <h1 className="mt-1 text-2xl font-semibold">Comunidad</h1>
      <p className="mt-1 text-sm text-silenciado">
        Sin clave. Preguntas y consejos de jardinería, abiertos para quien tenga la app.
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <span className="flex h-11 items-center justify-center rounded-lg bg-luna text-sm font-medium text-fondo">
          Chat
        </span>
        <Link
          to="/vivero"
          className="flex h-11 items-center justify-center rounded-lg bg-superficie text-sm font-medium"
        >
          Ir al vivero
        </Link>
      </div>
      <section className="mt-4">
        <ul className="max-h-[50vh] space-y-2 overflow-auto rounded-xl bg-superficie p-3">
          {msgs.length === 0 && (
            <li className="text-sm text-silenciado">Aún no hay preguntas. El autor puede empezar con un consejo.</li>
          )}
          {msgs.map((m) => (
            <li key={m.id} className="text-sm">
              <p className="text-[11px] text-luna">{m.es_autor ? "Autor" : m.autor}</p>
              <p className="whitespace-pre-wrap">{m.cuerpo}</p>
            </li>
          ))}
        </ul>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder={ajustes.modoAutor ? "Consejo para la comunidad…" : "Pregunta al autor…"}
          className="mt-3 min-h-20 w-full rounded-xl bg-superficie p-3 text-sm outline-none"
        />
        <button
          type="button"
          onClick={() => void mandar()}
          className="mt-2 h-12 w-full rounded-lg bg-luna text-sm font-semibold text-fondo"
        >
          Enviar
        </button>
      </section>
      {aviso && <p className="mt-3 text-sm text-silenciado">{aviso}</p>}
    </main>
  );
}
