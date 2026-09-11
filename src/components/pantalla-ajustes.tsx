import { useRef, useState } from "react";
import { LIMITE_GRATIS, useJardin } from "@/lib/almacen";
import { pedirAvisos } from "@/lib/avisos";
import { codigoClienteDeCorreo } from "@/lib/marca";
import { traerJardin } from "@/lib/servidor/sincronizar";
import { HojaPro } from "./hoja-pro";

export function PantallaAjustes() {
  const ajustes = useJardin((s) => s.ajustes);
  const setAjustes = useJardin((s) => s.setAjustes);
  const plantas = useJardin((s) => s.plantas);
  const exportar = useJardin((s) => s.exportarJson);
  const importar = useJardin((s) => s.importarJson);
  const aplicar = useJardin((s) => s.aplicarCopia);
  const [msg, setMsg] = useState("");
  const [pro, setPro] = useState(false);
  const [claveRecibida, setClaveRecibida] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const codigo = ajustes.correoCliente.includes("@") ? codigoClienteDeCorreo(ajustes.correoCliente) : "";

  function bajarCopia() {
    const blob = new Blob([exportar()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diario-luna-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMsg("Copia descargada.");
  }

  async function aplicarClave() {
    const clave = claveRecibida.trim().toUpperCase();
    if (clave.length < 4) {
      setMsg("Pega la clave que te dio el autor.");
      return;
    }
    setOcupado(true);
    setAjustes({ codigoActualizacion: clave, codigoJardin: clave });
    const r = await traerJardin({ data: { codigo: clave } });
    setOcupado(false);
    if (r.ok && r.carga) {
      try {
        aplicar(JSON.parse(r.carga), true);
      } catch {
        /* pack de vitrina u otro formato */
      }
      setAjustes({ codigoActualizacion: clave, syncEn: new Date().toISOString() });
      setMsg("Actualización recibida. El diario y las ofertas se refrescan con esa clave.");
      return;
    }
    setMsg("Clave guardada. Cuando el autor publique, este aparato se actualizará al abrir la app.");
  }

  return (
    <main className="px-5 pb-8 pt-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-silenciado">Cliente</p>
      <h1 className="mt-1 text-2xl font-semibold">Ajustes</h1>
      <p className="mt-1 text-sm text-silenciado">
        Aquí no hay claves del autor. Solo pegas la que te compartan, si te la dieron.
      </p>

      <label className="mt-6 block text-sm">
        Nombre para mostrar
        <input
          value={ajustes.nombreMostrar}
          onChange={(e) => setAjustes({ nombreMostrar: e.target.value })}
          placeholder="Cómo te saludamos"
          className="mt-1 h-12 w-full rounded-lg bg-superficie px-3 text-sm outline-none"
        />
      </label>
      <label className="mt-4 block text-sm">
        Ciudad o valle
        <input
          value={ajustes.ciudad}
          onChange={(e) => setAjustes({ ciudad: e.target.value })}
          className="mt-1 h-12 w-full rounded-lg bg-superficie px-3 text-sm outline-none"
        />
      </label>

      <label className="mt-5 flex min-h-12 items-center justify-between gap-3 rounded-xl bg-superficie px-4">
        <span className="text-sm">Avisos de riego, abono y poda</span>
        <input
          type="checkbox"
          checked={ajustes.recordatoriosActivos}
          onChange={(e) => {
            setAjustes({ recordatoriosActivos: e.target.checked });
            if (e.target.checked) void pedirAvisos();
          }}
          className="size-5 accent-[#E7D7A2]"
        />
      </label>
      <button
        type="button"
        className="mt-2 h-11 w-full rounded-lg bg-superficie text-sm"
        onClick={() => void pedirAvisos()}
      >
        Permitir notificaciones del navegador
      </button>

      {codigo && (
        <section className="mt-6 rounded-xl bg-superficie p-4">
          <p className="text-sm font-medium">Tu código de cliente</p>
          <p className="mt-1 text-sm text-silenciado">
            Mándalo por WhatsApp cuando pagues Jardín Pro. El vivero lo usa para activarte.
          </p>
          <p className="mt-3 font-mono text-lg text-luna">{codigo}</p>
          <p className="mt-1 text-xs text-silenciado">{ajustes.correoCliente}</p>
        </section>
      )}

      <section className="mt-6 rounded-xl bg-superficie p-4">
        <p className="text-sm font-medium">Actualizar con una clave compartida</p>
        <p className="mt-1 text-sm text-silenciado">
          El autor te entrega una clave personal. Pégala aquí. No se muestran secretos de la app.
        </p>
        {ajustes.codigoActualizacion ? (
          <p className="mt-3 text-xs text-silenciado">Ya hay una clave activa en este aparato.</p>
        ) : null}
        <input
          value={claveRecibida}
          onChange={(e) => setClaveRecibida(e.target.value.toUpperCase())}
          placeholder="Pega la clave que te compartieron"
          className="mt-3 h-12 w-full rounded-lg bg-superficie-2 px-3 font-mono text-sm outline-none"
        />
        <button
          type="button"
          disabled={ocupado}
          onClick={() => void aplicarClave()}
          className="mt-2 h-12 w-full rounded-lg bg-luna text-sm font-semibold text-fondo disabled:opacity-60"
        >
          Guardar y actualizar
        </button>
      </section>

      <section className="mt-6 rounded-xl bg-superficie p-4">
        <p className="text-sm font-medium">Plan</p>
        <p className="mt-1 text-sm text-silenciado">
          {ajustes.demoPro
            ? "Jardín Pro activo en este aparato."
            : `Cortesía: ${plantas.length} / ${LIMITE_GRATIS} plantas. Luego $2/mes o $20/año.`}
        </p>
        {!ajustes.demoPro && (
          <button
            type="button"
            className="mt-3 h-11 rounded-lg bg-luna px-4 text-sm font-semibold text-fondo"
            onClick={() => setPro(true)}
          >
            Ver Jardín Pro
          </button>
        )}
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-sm font-semibold">Copia de este aparato</h2>
        <button type="button" onClick={bajarCopia} className="h-12 w-full rounded-lg bg-superficie text-sm font-medium">
          Exportar JSON
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="h-12 w-full rounded-lg bg-superficie text-sm font-medium"
        >
          Importar JSON
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            const texto = await f.text();
            const r = importar(texto);
            setMsg(r.ok ? "Copia restaurada." : r.error ?? "Error");
          }}
        />
        {msg && <p className="text-sm text-ok">{msg}</p>}
      </section>
      <HojaPro abierta={pro} onCerrar={() => setPro(false)} />
    </main>
  );
}
