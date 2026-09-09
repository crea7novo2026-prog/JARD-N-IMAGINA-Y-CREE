import { LIMITE_GRATIS, useJardin } from "@/lib/almacen";

export function BarraDemo() {
  const n = useJardin((s) => s.plantas.length);
  const pro = useJardin((s) => s.ajustes.demoPro);
  if (pro) return null;
  const quedan = Math.max(0, LIMITE_GRATIS - n);
  const pct = Math.min(100, Math.round((n / LIMITE_GRATIS) * 100));
  return (
    <section className="rounded-xl bg-superficie p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-luna">Demo gratis</p>
      <p className="mt-1 text-sm font-medium">
        {quedan > 0
          ? `${n} de ${LIMITE_GRATIS} plantas de prueba. ${quedan} por agregar sin pagar.`
          : `Usaste las ${LIMITE_GRATIS} de cortesía. La siguiente pide Jardín Pro.`}
      </p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-superficie-2">
        <div className="h-full rounded-full bg-luna" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-2 text-xs text-silenciado">
        Prueba riego, foto, luna y bitácora con tu patio. Luego $2 al mes o $20 al año.
      </p>
    </section>
  );
}
