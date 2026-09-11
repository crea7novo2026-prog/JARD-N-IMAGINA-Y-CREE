import { createServerFn } from "@tanstack/react-start";
import { CATALOGO_ESPECIES } from "@/lib/catalogo-especies";

const MODELOS = ["grok-4.5", "grok-2-vision-1212"];

function sacarNombre(texto: string) {
  const jsonMatch = texto.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]) as { nombre?: string; cientifico?: string; name?: string };
      const nombre = (parsed.nombre || parsed.name || "").trim();
      const cientifico = (parsed.cientifico || "").trim();
      if (nombre) return { nombre, cientifico };
    } catch {
      /* sigue texto libre */
    }
  }
  const limpio = texto
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[\n\r]+/g, " ")
    .replace(/["{}]/g, " ")
    .trim();
  const corte = limpio.split(/[.:,]/)[0]?.trim() ?? "";
  return { nombre: corte.slice(0, 80), cientifico: "" };
}

async function preguntar(apiKey: string, model: string, dataUrl: string) {
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 180,
      temperature: 0,
      messages: [
        {
          role: "system",
          content:
            'Eres viverista de Nicaragua. Mira la foto y responde SOLO JSON: {"nombre":"nombre común en español","cientifico":"Nombre cientifico"}. Usa nombres locales si los sabes (gomero, pingo de oro, sábila).',
        },
        {
          role: "user",
          content: [
            { type: "text", text: "¿Qué planta es? Nombre común en español y científico." },
            { type: "image_url", image_url: { url: dataUrl, detail: "low" } },
          ],
        },
      ],
    }),
  });
  return res;
}

export const sugerirEspeciePorFoto = createServerFn({ method: "POST" })
  .validator((input: { dataUrl: string }) => input)
  .handler(async ({ data }) => {
    const vacio = { ok: false as const, ids: [] as string[], nombre: "", cientifico: "" };
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ...vacio, error: "sin_ia" };
    if (!data.dataUrl.startsWith("data:image")) return { ...vacio, error: "foto" };

    let ultimo = "xai";
    for (const model of MODELOS) {
      try {
        const res = await preguntar(apiKey, model, data.dataUrl);
        if (!res.ok) {
          ultimo = `xai_${res.status}`;
          continue;
        }
        const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
        const texto = body.choices?.[0]?.message?.content ?? "";
        const { nombre, cientifico } = sacarNombre(texto);
        if (!nombre) {
          ultimo = "sin_nombre";
          continue;
        }
        const ids = CATALOGO_ESPECIES.filter((e) => {
          const hay = `${e.nombreComun} ${e.nombreCientifico} ${e.id}`.toLowerCase();
          const n = nombre.toLowerCase();
          const c = cientifico.toLowerCase();
          return hay.includes(n) || (c && hay.includes(c));
        })
          .slice(0, 5)
          .map((e) => e.id);
        return { ok: true as const, ids, nombre, cientifico, error: undefined };
      } catch {
        ultimo = "red";
      }
    }
    return { ...vacio, error: ultimo };
  });
