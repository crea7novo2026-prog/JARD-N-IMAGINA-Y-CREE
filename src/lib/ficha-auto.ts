import { especiePorId } from "./catalogo-especies";
import { fuentesOficiales } from "./fuentes";

export async function fichaAutomatica(nombre: string, cientifico?: string) {
  const frase = [cientifico, nombre].filter(Boolean).join(" ");
  const partes: string[] = [];
  try {
    const busca = await fetch(
      `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(`${frase} planta`)}&format=json&origin=*&srlimit=1`,
    );
    const data = (await busca.json()) as { query?: { search?: { title: string }[] } };
    const titulo = data.query?.search?.[0]?.title;
    if (titulo) {
      const sum = await fetch(
        `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(titulo)}`,
      );
      const ficha = (await sum.json()) as { extract?: string; title?: string };
      if (ficha.extract) partes.push(`${ficha.title ?? titulo}. ${ficha.extract}`);
    }
  } catch {
    /* sin red */
  }
  const links = fuentesOficiales(cientifico || nombre, nombre)
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
