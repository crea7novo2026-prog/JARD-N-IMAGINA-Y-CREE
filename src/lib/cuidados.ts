import { CATALOGO_ESPECIES, especiePorId } from "./catalogo-especies";
import { plagaPorId } from "./catalogo-plagas";
import { afinidadCoincide, infoLunar, type InfoLunar } from "./luna";
import type { EntradaBitacora, Especie, Planta } from "./tipos";
import { aIsoDia, diasEntre, inicioDelDia, sumarDias } from "./utils";

export function intervaloRiego(planta: Planta, especie: Especie): number {
  const aprendido = planta.intervaloRiegoAprendido;
  if (aprendido && aprendido >= 2 && aprendido <= 40) return aprendido;
  let dias = especie.waterFreqDays;
  if (planta.tamanoMaceta === "chica") dias = Math.max(2, dias - 1);
  if (planta.tamanoMaceta === "grande") dias += 1;
  if (planta.ubicacion === "interior") dias += 1;
  if (planta.ubicacion === "huerto") dias = Math.max(2, dias - 1);
  return dias;
}

export function proximoRiego(planta: Planta, especie: Especie, hoy = new Date()): Date {
  const base = planta.ultimoRiego ? new Date(planta.ultimoRiego) : new Date(planta.fechaAdquisicion);
  return sumarDias(base, intervaloRiego(planta, especie));
}

export function proximoFertilizante(planta: Planta, especie: Especie): Date {
  const base = planta.ultimoFertilizante
    ? new Date(planta.ultimoFertilizante)
    : new Date(planta.fechaAdquisicion);
  return sumarDias(base, especie.diasFrecuenciaFertilizante);
}

export function proximoPoda(planta: Planta): Date {
  const base = planta.ultimaPoda ? new Date(planta.ultimaPoda) : new Date(planta.fechaAdquisicion);
  return sumarDias(base, 45);
}

export function diasHasta(fecha: Date, hoy = new Date()): number {
  return diasEntre(inicioDelDia(hoy), inicioDelDia(fecha));
}

export type TareaHoy = {
  planta: Planta;
  especie: Especie;
  clase: "regar" | "fertilizar" | "luna" | "plaga" | "observar";
  titulo: string;
  detalle: string;
  urgente: boolean;
};

export function aprenderIntervalo(planta: Planta, riegos: EntradaBitacora[]): number | undefined {
  const fechas = riegos
    .filter((e) => e.plantaId === planta.id && e.tipo === "riego")
    .map((e) => new Date(e.fechaIso).getTime())
    .sort((a, b) => a - b);
  if (planta.ultimoRiego) fechas.push(new Date(planta.ultimoRiego).getTime());
  const unicas = [...new Set(fechas.map((t) => aIsoDia(new Date(t))))]
    .map((d) => new Date(d + "T12:00:00").getTime())
    .sort((a, b) => a - b);
  if (unicas.length < 3) return planta.intervaloRiegoAprendido;
  const huecos: number[] = [];
  for (let i = 1; i < unicas.length; i++) {
    const d = Math.round((unicas[i] - unicas[i - 1]) / 86_400_000);
    if (d >= 2 && d <= 40) huecos.push(d);
  }
  if (huecos.length < 2) return planta.intervaloRiegoAprendido;
  const media = huecos.reduce((a, b) => a + b, 0) / huecos.length;
  return Math.round(media);
}

export function tareasDelDia(
  plantas: Planta[],
  bitacora: EntradaBitacora[],
  hoy = new Date(),
): TareaHoy[] {
  const luna = infoLunar(hoy);
  const out: TareaHoy[] = [];
  for (const planta of plantas) {
    const especie = especiePorId(planta.especieId);
    if (!especie) continue;
    const riego = proximoRiego(planta, especie, hoy);
    const dRiego = diasHasta(riego, hoy);
    if (dRiego <= 0) {
      out.push({
        planta,
        especie,
        clase: "regar",
        titulo: `Regar ${planta.apodo}`,
        detalle: dRiego < 0 ? `Lleva ${Math.abs(dRiego)} día(s) de retraso.` : "Toca hoy según su ritmo.",
        urgente: dRiego < 0,
      });
    } else if (dRiego === 1) {
      out.push({
        planta,
        especie,
        clase: "regar",
        titulo: `${planta.apodo} mañana`,
        detalle: "Prepara agua reposada si es interior.",
        urgente: false,
      });
    }
    const fert = proximoFertilizante(planta, especie);
    if (diasHasta(fert, hoy) <= 0) {
      out.push({
        planta,
        especie,
        clase: "fertilizar",
        titulo: `Nutrir ${planta.apodo}`,
        detalle: `${especie.tipoFertilizante}. ${especie.temporadaFertilizante}.`,
        urgente: false,
      });
    }
    const dPoda = diasHasta(proximoPoda(planta), hoy);
    if (dPoda <= 0) {
      out.push({
        planta,
        especie,
        clase: "luna",
        titulo: `Podar ${planta.apodo}`,
        detalle: especie.podarCuando,
        urgente: false,
      });
    } else if (afinidadCoincide(especie.moonAffinity.podar, luna.fase)) {
      out.push({
        planta,
        especie,
        clase: "luna",
        titulo: `Poda suave · ${planta.apodo}`,
        detalle: especie.podarCuando,
        urgente: false,
      });
    }
    const plagaReciente = bitacora.some(
      (b) =>
        b.plantaId === planta.id &&
        b.tipo === "plaga" &&
        diasEntre(b.fechaIso, hoy) <= 10,
    );
    if (luna.fase === "llena" && especie.plagasComunes.length && !plagaReciente) {
      out.push({
        planta,
        especie,
        clase: "plaga",
        titulo: `Revisar envés · ${planta.apodo}`,
        detalle: `En luna llena conviene mirar ${especie.plagasComunes
          .map((id) => plagaPorId(id)?.nombre ?? id)
          .slice(0, 2)
          .join(" y ")}.`,
        urgente: false,
      });
    }
  }
  if (!out.length && plantas.length) {
    const p = plantas[0];
    const especie = especiePorId(p.especieId);
    if (especie) {
      out.push({
        planta: p,
        especie,
        clase: "observar",
        titulo: "Hoy toca observar",
        detalle: "Anota color, turgencia y bichos. El ritmo de riego se ajusta solo con tus riegos reales.",
        urgente: false,
      });
    }
  }
  const orden = { regar: 0, fertilizar: 1, plaga: 2, luna: 3, observar: 4 };
  return out.sort((a, b) => {
    if (a.urgente !== b.urgente) return a.urgente ? -1 : 1;
    return orden[a.clase] - orden[b.clase];
  });
}

export function consejoLunarPara(especie: Especie, luna: InfoLunar): string {
  const a = especie.moonAffinity;
  const piezas: string[] = [];
  if (afinidadCoincide(a.regar, luna.fase)) piezas.push("riego consciente");
  if (afinidadCoincide(a.fertilizar, luna.fase)) piezas.push("abono suave");
  if (afinidadCoincide(a.podar, luna.fase)) piezas.push("poda o limpieza");
  if (afinidadCoincide(a.sembrar, luna.fase)) piezas.push("siembra o esqueje");
  if (afinidadCoincide(a.plagar, luna.fase)) piezas.push("revisión de plagas");
  if (!piezas.length) return `Hoy la fase no marca una faena concreta para ${especie.nombreComun}. Observa y anota.`;
  return `En ${luna.etiqueta.toLowerCase()}, la tradición de huerto sugiere: ${piezas.join(", ")}.`;
}

export function etiquetaTipo(t: string): string {
  const mapa: Record<string, string> = {
    interior: "Interior",
    exterior: "Exterior",
    huerto: "Huerto",
    suculenta: "Suculenta",
    arbol: "Árbol",
    flor: "Flor",
  };
  return mapa[t] ?? t;
}

export function etiquetaUbicacion(u: string): string {
  const mapa: Record<string, string> = {
    interior: "Interior",
    patio: "Patio",
    huerto: "Huerto",
    balcon: "Balcón",
  };
  return mapa[u] ?? u;
}

export function etiquetaMaceta(t: string): string {
  const mapa: Record<string, string> = { chica: "Chica", mediana: "Mediana", grande: "Grande" };
  return mapa[t] ?? t;
}

export function etiquetaToxicidad(t: string): string {
  const mapa: Record<string, string> = {
    mascotas: "Tóxica para mascotas",
    ninos: "Precaución con niños",
    mascotas_y_ninos: "Tóxica para mascotas y niños",
    ninguna_conocida: "Sin toxicidad conocida",
  };
  return mapa[t] ?? t;
}

export { CATALOGO_ESPECIES };
