import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...entradas: ClassValue[]) {
  return twMerge(clsx(entradas));
}

export function uid(prefijo = "id"): string {
  return `${prefijo}_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
}

export function formatearFecha(iso: string | number | Date): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-NI", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatearFechaCorta(iso: string | number | Date): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-NI", { day: "numeric", month: "short" });
}

export function inicioDelDia(d = new Date()): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function diasEntre(a: Date | string, b: Date | string): number {
  const da = inicioDelDia(new Date(a)).getTime();
  const db = inicioDelDia(new Date(b)).getTime();
  return Math.round((db - da) / 86_400_000);
}

export function sumarDias(d: Date | string, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export function aIsoDia(d: Date | string): string {
  const x = new Date(d);
  const y = x.getFullYear();
  const m = String(x.getMonth() + 1).padStart(2, "0");
  const day = String(x.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
