import { especiePorId } from "./catalogo-especies";
import { plagaPorId } from "./catalogo-plagas";
import { fuentesOficiales } from "./fuentes";
import { nombreEnNicaragua } from "./nombres-nicaragua";
import type { Especie } from "./tipos";

async function wikiResumen(titulo: string, origen: "es" | "en") {
  const sum = await fetch(
    `https://${origen}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(titulo)}`,
  );
  if (!sum.ok) return "";
  const ficha = (await sum.json()) as { extract?: string; title?: string; type?: string };
  if (ficha.type === "disambiguation") return "";
  if (!ficha.extract) return "";
  return `${ficha.title ?? titulo}. ${ficha.extract}`;
}

async function wikiBusca(frase: string, origen: "es" | "en") {
  const busca = await fetch(
    `https://${origen}.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(frase)}&format=json&origin=*&srlimit=3`,
  );
  if (!busca.ok) return "";
  const data = (await busca.json()) as { query?: { search?: { title: string }[] } };
  const titulos = data.query?.search?.map((s) => s.title) ?? [];
  for (const titulo of titulos) {
    const texto = await wikiResumen(titulo, origen);
    if (texto) return texto;
  }
  return "";
}

function tipoEtiqueta(tipo: Especie["tipo"]) {
  if (tipo === "arbol") return "árbol";
  if (tipo === "suculenta") return "suculenta";
  if (tipo === "huerto") return "huerto";
  if (tipo === "flor") return "flor";
  if (tipo === "exterior") return "exterior";
  return "interior";
}

function alturaPorTipo(tipo: Especie["tipo"]) {
  if (tipo === "arbol") return "De 3 a 12 m en tierra; menos en maceta.";
  if (tipo === "suculenta") return "Baja a media. Crece lento.";
  if (tipo === "huerto") return "Según variedad: de 30 cm a 2 m.";
  if (tipo === "flor") return "Media. Crece en temporada de flor.";
  return "En maceta suele quedar de 40 cm a 1,5 m.";
}

function desarrolloPorTipo(tipo: Especie["tipo"]) {
  if (tipo === "suculenta") return "Lento. Guarda agua en hoja o tallo.";
  if (tipo === "arbol") return "Lento al inicio; luego copa y raíz fuertes.";
  if (tipo === "huerto") return "Rápido en lluvias y calor de Nicaragua.";
  return "Moderado si hay luz y riego medido.";
}

function florPorTipo(tipo: Especie["tipo"]) {
  if (tipo === "flor") return "Flor principal en meses cálidos y con buena luz.";
  if (tipo === "huerto") return "Flor y fruto en temporada de cultivo; retira fruto pasado.";
  if (tipo === "arbol") return "Flor o fruto según especie; años buenos con sol de mañana.";
  return "Algunas no florecen en interior; prioriza hoja sana.";
}

function reproPorTipo(tipo: Especie["tipo"]) {
  if (tipo === "suculenta") return "Hoja o esqueje de tallo. Deja callo 1–2 días.";
  if (tipo === "huerto") return "Semilla o plantón. Siembra en luna creciente si sigues luna.";
  if (tipo === "arbol") return "Semilla o injerto. Esqueje solo en especies que lo aceptan.";
  return "Esqueje de tallo en agua o sustrato húmedo. Evita sol fuerte los primeros días.";
}

function compatibilidad(tipo: Especie["tipo"]) {
  if (tipo === "suculenta") return "Junto a cactus y plantas de poco riego. No con helechos.";
  if (tipo === "huerto") return "Mejor con hierbas y hortalizas de similar riego. Evita sombra densa.";
  if (tipo === "interior") return "Bien con otras de luz filtrada. Separa si hay cochinilla.";
  return "Deja espacio de aire entre plantas para evitar hongos.";
}

function noHacer(tipo: Especie["tipo"]) {
  if (tipo === "suculenta") return "No riegues cada día. No dejes plato con agua. No sol de mediodía de golpe.";
  if (tipo === "huerto") return "No mojes la hoja de noche. No abones nitrógeno de más en flor.";
  return "No riegues con tierra aún mojada. No pongas sol directo de mediodía de un día para otro.";
}

function nutricion(e?: Especie) {
  const abono = e?.tipoFertilizante || "Equilibrado 10-10-10 diluido";
  const dias = e?.diasFrecuenciaFertilizante ?? 28;
  const temp = e?.temporadaFertilizante || "Meses de crecimiento";
  return [
    `Orgánico: humus, compost maduro o té de lombriz cada 4–6 semanas.`,
    `Minerales: N (hoja), P (raíz y flor), K (defensa). Hierro y magnesio si la hoja amarillea con nervios verdes.`,
    `De vivero: ${abono}. Cada ${dias} días. ${temp}.`,
    "Nunca abones planta sedienta ni raíz podrida.",
  ].join("\n");
}

function bloquePlagas(e?: Especie) {
  const ids = e?.plagasComunes?.length ? e.plagasComunes : ["cochinilla-algodonosa", "pulgon", "oidio"];
  const lineas: string[] = [];
  for (const id of ids.slice(0, 4)) {
    const p = plagaPorId(id);
    if (!p) continue;
    lineas.push(
      [
        `${p.nombre}. ${p.signos[0] ?? ""}`,
        `Orgánico: ${p.tratamientosOrganicos.slice(0, 2).join("; ")}.`,
        `Bioquímico / de jardín: ${p.tratamientosQuimicos[0] ?? "Usa producto etiquetado y lee la dosis."}`,
        `Prevención: ${p.prevencion}`,
      ].join(" "),
    );
  }
  if (!lineas.length) {
    return [
      "Revisa envés y brotes cada semana.",
      "Orgánico: agua a presión, jabón potásico, neem al atardecer.",
      "De jardín: azufre o cobre solo si hay hongo, según etiqueta.",
    ].join("\n");
  }
  return lineas.join("\n\n");
}

export function armarInvestigacion(opts: {
  especie?: Especie;
  nombre?: string;
  cientifico?: string;
  wiki?: string;
  notaAutor?: string;
  fichaFoto?: string;
}) {
  const e = opts.especie;
  const comun = e?.nombreComun || opts.nombre?.trim() || "Planta";
  const cienti = e?.nombreCientifico || opts.cientifico?.trim() || "";
  const ni = nombreEnNicaragua({ id: e?.id, comun, cientifico: cienti });
  const tipo = e?.tipo ?? "interior";
  const bloques: string[] = [];

  bloques.push(
    `1. Identidad\n${comun}${cienti ? ` (${cienti})` : ""}${e?.familia ? ` · familia ${e.familia}` : ""}. Tipo: ${tipoEtiqueta(tipo)}.\nEn Nicaragua se conoce como: ${ni || comun}.`,
  );
  if (opts.wiki) bloques.push(opts.wiki);

  bloques.push(`2. Tamaño y desarrollo\nAltura: ${alturaPorTipo(tipo)}\nCrecimiento: ${desarrolloPorTipo(tipo)}`);
  bloques.push(
    `3. Hábitat adecuado\nLuz: ${e?.luz || "Sol de mañana o luz filtrada."}\nTemperatura: ${e ? `${e.tempMinC}–${e.tempMaxC} °C` : "18–32 °C"}. Humedad: ${e?.humedad || "media"}.\nSuelo: ${e?.suelo || "Suelto y con drenaje."}\nEn Nicaragua: patio con sol filtrado o interior luminoso, según la especie.`,
  );
  bloques.push(
    `4. Cómo cuidarla\nRiego: ${e?.waterNotes || "Cuando la tierra seque arriba."} (cada ${e?.waterFreqDays ?? 7} día(s)).\nPoda: ${e?.podarCuando || "Ramas secas en luna menguante."}\nTrasplante: ${e?.trasplantarCuando || "Cuando la maceta se quede chica."}`,
  );
  bloques.push(`5. Nutrición (orgánico, minerales y de vivero)\n${nutricion(e)}`);
  bloques.push(`6 y 7. Plagas y control\n${bloquePlagas(e)}`);
  bloques.push(
    `8. Advertencias\n${e?.toxicidad && e.toxicidad !== "ninguna_conocida" ? `Toxicidad: ${e.toxicidad.replace(/_/g, " ")}.` : "Sin toxicidad conocida; igual lava manos después de podar."}`,
  );
  bloques.push(`9. Flor o fruto\n${florPorTipo(tipo)}`);
  bloques.push(`10. Reproducción\n${reproPorTipo(tipo)}`);
  bloques.push(`11. Compatibilidad\n${compatibilidad(tipo)}`);
  bloques.push(`12. Qué no hacer\n${noHacer(tipo)}`);
  if (e?.consejosCuidado?.length) {
    bloques.push(`13. Consejos de especie\n${e.consejosCuidado.slice(0, 4).join(" ")}`);
  }
  if (opts.notaAutor?.trim()) {
    bloques.push(`14. Nota del vivero\n${opts.notaAutor.trim()}`);
  }
  if (opts.fichaFoto?.trim()) {
    bloques.push(`Lectura de la foto\n${opts.fichaFoto.trim()}`);
  }
  const links = fuentesOficiales(cienti || comun, comun)
    .map((f) => `${f.nombre}: ${f.url}`)
    .join("\n");
  if (links) bloques.push(`Fuentes para contrastar\n${links}`);
  return bloques.join("\n\n").trim();
}

export async function fichaAutomatica(
  nombre: string,
  cientifico?: string,
  extra?: { especieId?: string; notaAutor?: string; fichaFoto?: string },
) {
  const comun = nombre.trim();
  const cienti = (cientifico ?? "").trim();
  const especie = extra?.especieId ? especiePorId(extra.especieId) : undefined;
  const consultas = [
    cienti && `${cienti} planta`,
    cienti,
    comun && `${comun} planta`,
    comun,
  ].filter((x, i, a): x is string => Boolean(x) && a.indexOf(x) === i);

  let extracto = "";
  for (const q of consultas) {
    extracto = await wikiBusca(q, "es");
    if (extracto) break;
  }
  if (!extracto) {
    for (const q of consultas) {
      extracto = await wikiBusca(q, "en");
      if (extracto) break;
    }
  }
  return armarInvestigacion({
    especie,
    nombre: comun,
    cientifico: cienti,
    wiki: extracto,
    notaAutor: extra?.notaAutor,
    fichaFoto: extra?.fichaFoto,
  });
}

export function fichaDeCatalogo(especieId: string, notaAutor?: string) {
  const e = especiePorId(especieId);
  if (!e) return "";
  return armarInvestigacion({ especie: e, notaAutor });
}
