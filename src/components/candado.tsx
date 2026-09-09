import { useState } from "react";
import { useJardin } from "@/lib/almacen";

const SESION = "diario-luna-abierto";

export function Candado({ children }: { children: React.ReactNode }) {
  const clave = useJardin((s) => s.ajustes.claveAcceso || "LUNA-DIARIO");
  const setAjustes = useJardin((s) => s.setAjustes);
  const [abierto, setAbierto] = useState(() => {
    try {
      return sessionStorage.getItem(SESION) === "1";
    } catch {
      return false;
    }
  });
  const [intento, setIntento] = useState("");
  const [nueva, setNueva] = useState(clave);
  const [error, setError] = useState("");

  if (abierto) return <>{children}</>;

  function entrar() {
    if (intento.trim() !== clave) {
      setError("Esa no es la clave de este diario.");
      return;
    }
    try {
      sessionStorage.setItem(SESION, "1");
    } catch {
      /* ignore */
    }
    setAbierto(true);
  }

  function guardarClave() {
    const limpia = nueva.trim();
    if (limpia.length < 4) {
      setError("Mínimo cuatro caracteres.");
      return;
    }
    setAjustes({ claveAcceso: limpia });
    setIntento(limpia);
    setError("Clave cambiada. Entra con la nueva.");
  }

  return (
    <main className="flex min-h-dvh flex-col justify-center px-6 py-10">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-silenciado">Acceso al diario</p>
      <h1 className="mt-2 font-serif text-3xl leading-tight text-luna">El Diario de las Bitácoras del Jardín y Luna</h1>
      <p className="mt-3 text-sm text-silenciado">
        Esta clave es tuya. Vive en este aparato. Sin ella no se abre el inventario ni las fichas.
      </p>
      <div className="mt-6 rounded-xl bg-superficie p-4">
        <p className="text-xs uppercase tracking-[0.14em] text-silenciado">Tu clave actual</p>
        <p className="mt-2 font-mono text-2xl tracking-wide text-luna">{clave}</p>
        <p className="mt-2 text-xs text-silenciado">Cópiala. Luego puedes cambiarla abajo.</p>
      </div>
      <label className="mt-5 block text-sm">
        Escribe la clave para trabajar
        <input
          value={intento}
          onChange={(e) => setIntento(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") entrar();
          }}
          className="mt-1 h-12 w-full rounded-lg bg-superficie px-3 font-mono text-sm outline-none"
        />
      </label>
      <button
        type="button"
        onClick={entrar}
        className="mt-3 h-12 w-full rounded-lg bg-luna text-sm font-semibold text-fondo"
      >
        Entrar al diario
      </button>
      <label className="mt-8 block text-sm">
        Cambiar clave
        <input
          value={nueva}
          onChange={(e) => setNueva(e.target.value)}
          className="mt-1 h-12 w-full rounded-lg bg-superficie px-3 font-mono text-sm outline-none"
        />
      </label>
      <button
        type="button"
        onClick={guardarClave}
        className="mt-3 h-11 w-full rounded-lg bg-superficie text-sm font-medium"
      >
        Guardar clave nueva
      </button>
      {error && <p className="mt-3 text-sm text-alerta">{error}</p>}
    </main>
  );
}
