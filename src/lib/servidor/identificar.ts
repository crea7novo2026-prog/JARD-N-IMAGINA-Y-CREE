import { createServerFn } from "@tanstack/react-start";
import { CATALOGO_ESPECIES } from "@/lib/catalogo-especies";

export const sugerirEspeciePorFoto = createServerFn({ method: "POST" })
  .validator((input: { dataUrl: string }) => input)
  .handler(async ({ data }) => {
    const vacio = { ok: false as const, ids: [] as string[], nombre: "", cientifico: "" };
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ...vacio, error: "sin_ia" };
    if (!data.dataUrl.startsWith("data:image")) return { ...vacio, error: "foto" };
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 200,
        messages: [
          {
            role: "system",
            content:
              'Eres viverista. Responde SOLO JSON: {"nombre":"nombre comun en espanol","cientifico":"Nombre cientifico"}.',
          },
          {
            role: "user",
            content: [
              { type: "text", text: "Que planta es en esta foto?" },
              { type: "image_url", image_url: { url: data.dataUrl } },
            ],
          },
        ],
      }),
    });
    if (!res.ok) return { ...vacio, error: `xai_${res.status}` };
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const texto = body.choices?.[0]?.message?.content ?? "";
    const jsonMatch = texto.match(/\{[\s\S]*\}/);
    let nombre = "";
    let cientifico = "";
    try {
      const parsed = JSON.parse(jsonMatch?.[0] ?? texto) as { nombre?: string; cientifico?: string };
      nombre = (parsed.nombre ?? "").trim();
      cientifico = (parsed.cientifico ?? "").trim();
    } catch {
      nombre = "";
    }
    const ids = CATALOGO_ESPECIES.filter((e) => {
      const hay = `${e.nombreComun} ${e.nombreCientifico}`.toLowerCase();
      return (
        (nombre && hay.includes(nombre.toLowerCase())) ||
        (cientifico && hay.includes(cientifico.toLowerCase()))
      );
    })
      .slice(0, 5)
      .map((e) => e.id);
    return { ok: true as const, ids, nombre, cientifico, error: undefined };
  });
