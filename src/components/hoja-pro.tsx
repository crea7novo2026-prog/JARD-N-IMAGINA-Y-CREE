import { Check, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { LIMITE_GRATIS, useJardin } from "@/lib/almacen";
import { enlaceWhatsAppPedido } from "@/lib/marca";

const PLANES = [
  { id: "mes" as const, titulo: "Jardín Pro mensual", precio: "$2", detalle: "$2 / mes" },
  { id: "ano" as const, titulo: "Jardín Pro anual", precio: "$20", detalle: "$20 / año" },
];

export function HojaPro({ abierta, onCerrar }: { abierta: boolean; onCerrar: () => void }) {
  const activar = useJardin((s) => s.activarDemoPro);
  const pago = useJardin((s) => s.ajustes.enlacePago);
  const [plan, setPlan] = useState<(typeof PLANES)[number]>(PLANES[1]);
  if (!abierta) return null;
  const elegido = PLANES.find((p) => p.id === plan.id) ?? PLANES[1];
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
          Elige mensual o anual. El cobro es el mismo que el de las plantas.
        </h2>
        <p className="mt-3 text-sm text-silenciado">
          Las primeras {LIMITE_GRATIS} plantas son de cortesía. Para seguir, escríbeme por WhatsApp. PayPal es
          opcional.
        </p>
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
              {p.id === "ano" && (
                <p className="mt-1 text-xs text-silenciado">Cuatro meses de cortesía frente al mes a mes.</p>
              )}
            </button>
          ))}
        </div>
        <ul className="mt-5 space-y-2 text-sm text-silenciado">
          {["Plantas ilimitadas en este dispositivo", "Foto, luna y plagas de tu patio", "Exportar e importar copia JSON"].map(
            (t) => (
              <li key={t} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-ok" />
                {t}
              </li>
            ),
          )}
        </ul>
        <a
          href={enlaceWhatsAppPedido({
            titulo: elegido.titulo,
            precio: elegido.precio,
            cantidad: 1,
            verbo: "contratar",
          })}
          target="_blank"
          rel="noreferrer"
          className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-luna text-sm font-semibold text-fondo"
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
        <button
          type="button"
          className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-superficie-2 text-sm"
          onClick={() => {
            activar();
            onCerrar();
          }}
        >
          <Sparkles className="size-4" />
          Activar demo Pro
        </button>
        <p className="mt-3 text-center text-xs text-silenciado">
          WhatsApp abre el mismo chat de las plantas. El número no se muestra.
        </p>
      </div>
    </div>
  );
}
