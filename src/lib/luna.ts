import type { FaseLunarNombre } from "./tipos";

/** Luna nueva de referencia: 6 ene 2000 18:14 UTC */
const LUNA_NUEVA_REF_MS = Date.UTC(2000, 0, 6, 18, 14, 0);
const SINODICO = 29.530588853;

export type InfoLunar = {
  fecha: Date;
  edadDias: number;
  iluminacion: number;
  fase: FaseLunarNombre;
  etiqueta: string;
  consejo: string;
  tradicion: string;
};

export function edadLunarDias(fecha = new Date()): number {
  const ms = fecha.getTime() - LUNA_NUEVA_REF_MS;
  const dias = ms / 86_400_000;
  const edad = ((dias % SINODICO) + SINODICO) % SINODICO;
  return edad;
}

export function iluminacionLunar(edad: number): number {
  return (1 - Math.cos((2 * Math.PI * edad) / SINODICO)) / 2;
}

export function faseDesdeEdad(edad: number): FaseLunarNombre {
  if (edad < 1.84566 || edad >= 27.68487) return "nueva";
  if (edad < 14.76529) return "creciente";
  if (edad < 16.61096) return "llena";
  return "menguante";
}

export function etiquetaFase(fase: FaseLunarNombre): string {
  switch (fase) {
    case "nueva":
      return "Luna nueva";
    case "creciente":
      return "Luna creciente";
    case "llena":
      return "Luna llena";
    case "menguante":
      return "Luna menguante";
  }
}

export function consejoDeFase(fase: FaseLunarNombre): string {
  switch (fase) {
    case "nueva":
      return "Buen momento para sembrar de hoja, planificar camas y observar el suelo antes de un ciclo nuevo.";
    case "creciente":
      return "La savia tiende a subir: riegos constantes, siembra de fruto y abonos suaves rinden más.";
    case "llena":
      return "Cosecha de fruto y flores; revisa plagas — la humedad y el brillo suelen activar insectos.";
    case "menguante":
      return "Savia hacia la raíz: poda de mantenimiento, trasplante con cuidado y control de plagas de suelo.";
  }
}

export function tradicionDeFase(fase: FaseLunarNombre): string {
  switch (fase) {
    case "nueva":
      return "Tradición de huerto: descansar la tierra o sembrar raíces lentas.";
    case "creciente":
      return "Tradición de huerto: empujar el crecimiento aéreo.";
    case "llena":
      return "Tradición de huerto: recolectar y conservar.";
    case "menguante":
      return "Tradición de huerto: podar, desmalezar y fortalecer raíces.";
  }
}

export function infoLunar(fecha = new Date()): InfoLunar {
  const edad = edadLunarDias(fecha);
  const fase = faseDesdeEdad(edad);
  return {
    fecha,
    edadDias: edad,
    iluminacion: iluminacionLunar(edad),
    fase,
    etiqueta: etiquetaFase(fase),
    consejo: consejoDeFase(fase),
    tradicion: tradicionDeFase(fase),
  };
}

export function faseDelDia(fecha: Date): FaseLunarNombre {
  return faseDesdeEdad(edadLunarDias(fecha));
}

export function afinidadCoincide(
  afinidad: FaseLunarNombre | "cualquier",
  fase: FaseLunarNombre,
): boolean {
  return afinidad === "cualquier" || afinidad === fase;
}

export function diasDelMes(anio: number, mes0: number): Date[] {
  const ultimo = new Date(anio, mes0 + 1, 0).getDate();
  const out: Date[] = [];
  for (let d = 1; d <= ultimo; d++) out.push(new Date(anio, mes0, d));
  return out;
}
