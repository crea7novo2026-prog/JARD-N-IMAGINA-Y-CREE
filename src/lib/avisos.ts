import { especiePorId } from "./catalogo-especies";
import { diasHasta, proximoFertilizante, proximoPoda, proximoRiego } from "./cuidados";
import type { Planta } from "./tipos";
import { formatearFechaCorta } from "./utils";

const CLAVE = "diario-luna-avisos";

function yaDicho(tag: string): boolean {
  try {
    const raw = sessionStorage.getItem(CLAVE);
    const set = new Set<string>(raw ? JSON.parse(raw) : []);
    if (set.has(tag)) return true;
    set.add(tag);
    sessionStorage.setItem(CLAVE, JSON.stringify([...set]));
    return false;
  } catch {
    return false;
  }
}

export async function pedirAvisos(): Promise<boolean> {
  if (typeof Notification === "undefined") return false;
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;
  const r = await Notification.requestPermission();
  return r === "granted";
}

export function emitirAviso(titulo: string, cuerpo: string, tag: string) {
  if (typeof Notification === "undefined") return;
  if (Notification.permission !== "granted") return;
  if (yaDicho(tag)) return;
  try {
    new Notification(titulo, { body: cuerpo, tag, silent: false });
  } catch {
    /* el navegador bloqueó el aviso */
  }
}

export function revisarMantenimiento(plantas: Planta[], activos: boolean) {
  if (!activos || typeof Notification === "undefined") return;
  if (Notification.permission !== "granted") return;
  const hoy = new Date();
  const dia = hoy.toISOString().slice(0, 10);
  for (const p of plantas) {
    const e = especiePorId(p.especieId);
    if (!e) continue;
    const nombre = p.nombrePropio || p.apodo;
    const r = diasHasta(proximoRiego(p, e), hoy);
    const f = diasHasta(proximoFertilizante(p, e), hoy);
    const po = diasHasta(proximoPoda(p), hoy);
    if (r <= 0) {
      emitirAviso("Toca regar", `${nombre}: el riego vence hoy (${formatearFechaCorta(proximoRiego(p, e))}).`, `riego-${p.id}-${dia}`);
    } else if (r === 1) {
      emitirAviso("Riego mañana", `${nombre} pide agua mañana.`, `riego-m-${p.id}-${dia}`);
    }
    if (f <= 0) {
      emitirAviso("Toca nutrir", `${nombre}: abono según la última vez que nutriste.`, `fert-${p.id}-${dia}`);
    }
    if (po <= 0) {
      emitirAviso("Revisa la poda", `${nombre}: toca limpieza o poda de mantenimiento.`, `poda-${p.id}-${dia}`);
    }
  }
}
