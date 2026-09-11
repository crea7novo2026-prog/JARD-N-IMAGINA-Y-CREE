import { createServerFn } from "@tanstack/react-start";

const vacio = {
  ok: false as const,
  ids: [] as string[],
  nombre: "",
  cientifico: "",
  ficha: "",
};

function dataUrlABlob(dataUrl: string) {
  const match = dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
  if (!match) return null;
  const bytes = Buffer.from(match[2], "base64");
  return { bytes, tipo: match[1] };
}

async function conPlantNet(dataUrl: string, key: string) {
  const archivo = dataUrlABlob(dataUrl);
  if (!archivo) return { ...vacio, error: "foto" };
  const form = new FormData();
  form.append("images", new Blob([archivo.bytes], { type: archivo.tipo || "image/jpeg" }), "foto.jpg");
  form.append("organs", "auto");
  const res = await fetch(
    `https://my-api.plantnet.org/v2/identify/all?api-key=${encodeURIComponent(key)}&lang=es`,
    { method: "POST", body: form },
  );
  if (!res.ok) return { ...vacio, error: `plantnet_${res.status}` };
  const body = (await res.json()) as {
    results?: {
      score?: number;
      species?: {
        scientificNameWithoutAuthor?: string;
        commonNames?: string[];
      };
    }[];
  };
  const top = body.results?.[0];
  const cientifico = top?.species?.scientificNameWithoutAuthor?.trim() ?? "";
  const nombre = (top?.species?.commonNames?.[0] || cientifico).trim();
  if (!nombre) return { ...vacio, error: "sin_nombre" };
  const ficha = [
    `${nombre}${cientifico && cientifico !== nombre ? ` (${cientifico})` : ""}.`,
    "La app buscará riego, abono y plagas enseguida.",
  ].join("\n");
  return { ok: true as const, ids: [] as string[], nombre, cientifico, ficha, error: undefined };
}

async function conXai(dataUrl: string, key: string) {
  const res = await fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "grok-4.5",
      max_tokens: 500,
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            'Eres viverista en Nicaragua. Responde SOLO JSON: {"nombre":"nombre común en español","cientifico":"Nombre cientifico","luz":"...","riego":"...","abono":"...","plagas":"...","extra":"consejo corto"}.',
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Identifica la planta. Nombre, luz, riego, abono y plagas." },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        },
      ],
    }),
  });
  if (!res.ok) return { ...vacio, error: `xai_${res.status}` };
  const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const texto = body.choices?.[0]?.message?.content ?? "";
  const jsonMatch = texto.match(/\{[\s\S]*\}/);
  try {
    const p = JSON.parse(jsonMatch?.[0] ?? texto) as {
      nombre?: string;
      cientifico?: string;
      luz?: string;
      riego?: string;
      abono?: string;
      plagas?: string;
      extra?: string;
    };
    const nombre = (p.nombre ?? "").trim();
    const cientifico = (p.cientifico ?? "").trim();
    const ficha = [
      nombre && `${nombre}${cientifico ? ` (${cientifico})` : ""}.`,
      p.luz && `Luz: ${p.luz}`,
      p.riego && `Riego: ${p.riego}`,
      p.abono && `Abono: ${p.abono}`,
      p.plagas && `Plagas: ${p.plagas}`,
      p.extra,
    ]
      .filter(Boolean)
      .join("\n");
    return { ok: true as const, ids: [] as string[], nombre, cientifico, ficha, error: undefined };
  } catch {
    return { ...vacio, error: "sin_nombre" };
  }
}

export const sugerirEspeciePorFoto = createServerFn({ method: "POST" })
  .validator((input: { dataUrl: string }) => input)
  .handler(async ({ data }) => {
    if (!data.dataUrl.startsWith("data:image")) return { ...vacio, error: "foto" };
    const plantnet = process.env.PLANTNET_API_KEY;
    const xai = process.env.XAI_API_KEY;
    if (plantnet) {
      const r = await conPlantNet(data.dataUrl, plantnet);
      if (r.ok || !xai) return r;
    }
    if (xai) return conXai(data.dataUrl, xai);
    return { ...vacio, error: "sin_ia" };
  });
