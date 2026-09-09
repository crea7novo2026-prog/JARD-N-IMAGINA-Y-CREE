import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { useJardin } from "@/lib/almacen";
import { especiePorId } from "@/lib/catalogo-especies";
import { consejoLunarPara } from "@/lib/cuidados";
import { diasDelMes, faseDelDia, infoLunar, etiquetaFase } from "@/lib/luna";
import { aIsoDia } from "@/lib/utils";

const NOMBRES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

function tono(fase: string) {
  if (fase === "nueva") return "bg-superficie-2 text-silenciado";
  if (fase === "creciente") return "bg-hoja/25 text-texto";
  if (fase === "llena") return "bg-luna text-fondo";
  return "bg-superficie text-texto";
}

export function PantallaLuna() {
  const hoy = new Date();
  const [cursor, setCursor] = useState(() => new Date(hoy.getFullYear(), hoy.getMonth(), 1));
  const [sel, setSel] = useState(hoy);
  const plantas = useJardin((s) => s.plantas);

  const dias = useMemo(
    () => diasDelMes(cursor.getFullYear(), cursor.getMonth()),
    [cursor],
  );
  const offset = dias[0]?.getDay() ?? 0;
  const info = infoLunar(sel);

  return (
    <main className="px-5 pb-8 pt-8">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-silenciado">Calendario</p>
      <h1 className="mt-1 font-serif text-3xl italic text-luna">{info.etiqueta}</h1>
      <p className="mt-2 text-sm text-silenciado">{info.consejo}</p>

      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-md bg-superficie"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          aria-label="Mes anterior"
        >
          <ChevronLeft className="size-5" />
        </button>
        <p className="text-sm font-semibold">
          {MESES[cursor.getMonth()]} {cursor.getFullYear()}
        </p>
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-md bg-superficie"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          aria-label="Mes siguiente"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px] text-silenciado">
        {NOMBRES.map((n) => (
          <div key={n} className="py-1">
            {n}
          </div>
        ))}
        {Array.from({ length: offset }).map((_, i) => (
          <div key={`v${i}`} />
        ))}
        {dias.map((d) => {
          const fase = faseDelDia(d);
          const activo = aIsoDia(d) === aIsoDia(sel);
          const esHoy = aIsoDia(d) === aIsoDia(hoy);
          return (
            <button
              key={aIsoDia(d)}
              type="button"
              onClick={() => setSel(d)}
              className={`flex h-11 flex-col items-center justify-center rounded-md text-xs ${tono(fase)} ${
                activo ? "ring-1 ring-luna" : ""
              }`}
            >
              {d.getDate()}
              {esHoy && <span className="h-0.5 w-3 rounded-full bg-current" />}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-silenciado">
        {etiquetaFase(faseDelDia(sel))} · {Math.round(info.iluminacion * 100)}% · tradición: {info.tradicion}
      </p>
      <p className="mt-3 text-[11px] text-silenciado">
        Calendario de jardín, no oráculo. Mira la planta antes de cortar o abonar.
      </p>

      {plantas.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold">Ese día, en tu inventario</h2>
          <ul className="mt-3 space-y-2">
            {plantas.map((p) => {
              const e = especiePorId(p.especieId);
              if (!e) return null;
              return (
                <li key={p.id} className="rounded-xl bg-superficie p-3 text-sm">
                  <p className="font-medium">{p.apodo}</p>
                  <p className="text-xs text-silenciado">{consejoLunarPara(e, infoLunar(sel))}</p>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
}
