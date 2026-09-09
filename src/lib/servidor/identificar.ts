import { createServerFn } from "@tanstack/react-start";
import { CATALOGO_ESPECIES, listaBreveCatalogo } from "@/lib/catalogo-especies";

export const sugerirEspeciePorFoto = createServerFn({ method: "POST" })
  .validator((input: { dataUrl: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, ids: [] as string[], error: "sin_ia" };
    }
    const match = data.dataUrl.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
    if (!match) return { ok: false as const, ids: [] as string[], error: "foto" };
    const catalogo = listaBreveCatalogo();
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 250,
        messages: [
          {
            role: "system",
            content:
              "Eres un ayudante de vivero. Solo puedes elegir especies de la lista. Responde JSON puro: {\"ids\":[\"id1\",\"id2\",\"id3\"]}. Máximo 5 ids, del más probable al menos. Nunca inventes un id.",
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Lista id|común|científico:\n${catalogo}\n¿Cuáles coinciden con la foto?`,
              },
              {
                type: "image_url",
                image_url: { url: data.dataUrl },
              },
            ],
          },
        ],
      }),
    });
    if (!res.ok) {
      return { ok: false as const, ids: [] as string[], error: `xai_${res.status}` };
    }
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const texto = body.choices?.[0]?.message?.content ?? "";
    const jsonMatch = texto.match(/\{[\s\S]*\}/);
    let ids: string[] = [];
    try {
      const parsed = JSON.parse(jsonMatch?.[0] ?? texto) as { ids?: string[] };
      ids = (parsed.ids ?? []).filter((id) => CATALOGO_ESPECIES.some((e) => e.id === id));
    } catch {
      ids = [];
    }
    return { ok: true as const, ids, error: undefined };
  });
