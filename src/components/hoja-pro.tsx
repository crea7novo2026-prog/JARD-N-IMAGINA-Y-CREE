import { Check, X } from "lucide-react";
import { useState } from "react";
import { LIMITE_GRATIS, useJardin } from "@/lib/almacen";
import { codigoClienteDeCorreo, enlaceWhatsAppPedido } from "@/lib/marca";
import { crearSesionPago } from "@/lib/servidor/pagar";

const PLANES = [
  { id: "mes" as const, titulo: "Jardín Pro mensual", precio: "$2", detalle: "$2 / mes" },
  { id: "ano" as const, titulo: "Jardín Pro anual", precio: "$20", detalle: "$20 / año" },
];

export function HojaPro({ abierta, onCerrar }: { abierta: boolean; onCerrar: () => void }) {
  const pago = useJardin((s) => s.ajustes.enlacePago);
  const correo = useJardin((s) => s.ajustes.correoCliente);
  const [plan, setPlan] = useState<(typeof PLANES)[number]>(PLANES[1]);
  const [aviso, setAviso] = useState("");
  const [ocupado, setOcupado] = useState(false);
  if (!abierta) return null;
  const elegido = PLANES.find((p) => p.id === plan.id) ?? PLANES[1];
  const codigo = correo.includes("@") ? codigoClienteDeCorreo(correo) : "";

  async function pagarTarjeta() {
    setAviso("");
    setOcupado(true);
    try {
      const r = await crearSesionPago({ data: { plan: elegido.id } });
      if (r.ok && r.url) {
        window.location.href = r.url;
        return;
      }
      setAviso(
        r.error === "sin_stripe"
          ? "Aún falta la clave de Stripe. Paga por WhatsApp y manda tu código."
          : `No se pudo abrir el pago (${r.error ?? "error"}).`,
      );
    } catch {
      setAviso("No se pudo abrir el pago. Prueba WhatsApp.");
    } finally {
      setOcupado(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 p-0 sm:items-center sm:p-6">
      <button className="absolute inset-0" aria-label="Cerrar" onClick={onCerrar} />
      <div className="relative w-full max-w-md rounded-t-2xl bg-superficie p-6 shadow-suave sm:rounded-2xl">
        <button
          type="button"
          onClick={onCerrar}
          className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-md text-silenciado"
          aria-label="Cerrar"
        >
          <X className="size-5" />
        </button>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-luna">Contratar Diario y Luna</p>
        <h2 className="mt-2 font-serif text-3xl leading-tight text-texto">
          Elige mensual o anual. Paga y manda tu código.
        </h2>
        <p className="mt-3 text-sm text-silenciado">
          Las primeras {LIMITE_GRATIS} plantas son de cortesía. El vivero activa Pro cuando ve el pago.
        </p>
        {codigo && (
          <p className="mt-3 rounded-lg bg-superficie-2 px-3 py-2 font-mono text-sm text-luna">
            Tu código: {codigo}
          </p>
        )}
        <div className="mt-5 grid gap-3">
          {PLANES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlan(p)}
              className={`rounded-xl border p-4 text-left ${
                plan.id === p.id ? "border-luna bg-superficie-2" : "border-borde bg-superficie-2"
              }`}
            >
              <p className="text-sm font-medium">{p.titulo}</p>
              <p className="mt-1 font-serif text-2xl text-luna">{p.detalle}</p>
            </button>
          ))}
        </div>
        <ul className="mt-5 space-y-2 text-sm text-silenciado">
          {["Plantas ilimitadas", "Foto, luna y plagas", "Lo activa el vivero al pagar"].map((t) => (
            <li key={t} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-ok" />
              {t}
            </li>
          ))}
        </ul>
        <button
          type="button"
          disabled={ocupado}
          onClick={() => void pagarTarjeta()}
          className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-luna text-sm font-semibold text-fondo disabled:opacity-60"
        >
          {ocupado ? "Abriendo pago…" : `Pagar ${elegido.precio} con tarjeta`}
        </button>
        <a
          href={enlaceWhatsAppPedido({
            titulo: elegido.titulo,
            precio: elegido.precio,
            cliente: codigo || correo,
            cantidad: 1,
            contacto: correo,
            verbo: "contratar",
          })}
          target="_blank"
          rel="noreferrer"
          className="mt-2 flex h-11 w-full items-center justify-center rounded-lg bg-superficie-2 text-sm font-medium"
        >
          Contratar por WhatsApp
        </a>
        {pago && /paypal|mercadopago|stripe/i.test(pago) && (
          <a
            href={pago}
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex h-11 w-full items-center justify-center rounded-lg bg-superficie-2 text-sm font-medium"
          >
            Pagar por PayPal (opcional)
          </a>
        )}
        {aviso && <p className="mt-3 text-center text-sm text-alerta">{aviso}</p>}
        <p className="mt-3 text-center text-xs text-silenciado">
          Manda el pago y tu código. En Ajustes también está el código.
        </p>
      </div>
    </div>
  );
}
