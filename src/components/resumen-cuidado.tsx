import type { Especie } from "@/lib/tipos";
import { etiquetaTipo, etiquetaToxicidad } from "@/lib/cuidados";

export function ResumenCuidado({ especie }: { especie: Especie }) {
  return (
    <section className="mt-4 space-y-2 rounded-xl bg-superficie p-4 text-sm">
      <p className="text-xs uppercase tracking-[0.14em] text-luna">Cuidado ahora</p>
      <h3 className="text-base font-semibold">{especie.nombreComun}</h3>
      <p className="text-xs italic text-silenciado">{especie.nombreCientifico}</p>
      <p>
        {etiquetaTipo(especie.tipo)} · riego cada {especie.waterFreqDays} días
      </p>
      <p>{especie.waterNotes}</p>
      <p className="text-silenciado">Luz: {especie.luz}</p>
      <p className="text-silenciado">
        Abono: {especie.tipoFertilizante} cada {especie.diasFrecuenciaFertilizante} días.{" "}
        {especie.temporadaFertilizante}.
      </p>
      <p className="text-silenciado">Suelo: {especie.suelo}. Humedad: {especie.humedad}.</p>
      <p className="text-silenciado">
        {especie.tempMinC}–{especie.tempMaxC} °C · Poda: {especie.podarCuando}
      </p>
      <p className="text-alerta">{etiquetaToxicidad(especie.toxicidad)}</p>
      <ul className="list-disc space-y-1 pl-4 text-silenciado">
        {especie.consejosCuidado.slice(0, 4).map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
    </section>
  );
}
