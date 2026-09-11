import { especiePorId } from "./catalogo-especies";
import { fuentesOficiales } from "./fuentes";

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

export async function fichaAutomatica(nombre: string, cientifico?: string) {
  const comun = nombre.trim();
  const cienti = (cientifico ?? "").trim();
  const consultas = [
    cienti && `${cienti} planta`,
    cienti,
    comun && `${comun} planta`,
    comun && `${comun} arbusto`,
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

  const partes: string[] = [];
  if (extracto) partes.push(extracto);
  else {
    partes.push(
      `${comun}${cienti ? ` (${cienti})` : ""}. Planta de jardín. Luz: sol o sol filtrado. Riego cuando la tierra seque arriba. Poda ramas secas en luna menguante. Contrasta con las fuentes de abajo.`,
    );
  }
  const links = fuentesOficiales(cienti || comun, comun)
    .map((f) => `${f.nombre}: ${f.url}`)
    .join("\n");
  if (links) partes.push(`Fuentes para contrastar:\n${links}`);
  return partes.join("\n\n").trim();
}

export function fichaDeCatalogo(especieId: string) {
  const e = especiePorId(especieId);
  if (!e) return "";
  return [
    `${e.nombreComun} (${e.nombreCientifico}).`,
    `Luz: ${e.luz}. Riego cada ${e.waterFreqDays} día(s). Abono: ${e.tipoFertilizante}.`,
    e.consejosCuidado.slice(0, 3).join(" "),
    e.toxicidad !== "ninguna_conocida" ? `Cuidado: ${e.toxicidad}.` : "",
  ]
    .filter(Boolean)
    .join(" ");
}
