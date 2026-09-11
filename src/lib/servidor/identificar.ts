import { createServerFn } from "@tanstack/react-start";

export const sugerirEspeciePorFoto = createServerFn({ method: "POST" })
  .validator((input: { dataUrl: string }) => input)
  .handler(async ({ data }) => {
    const vacio = {
      ok: false as const,
      ids: [] as string[],
      nombre: "",
      cientifico: "",
      ficha: "",
    };
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
        max_tokens: 500,
        temperature: 0.2,
        messages: [
          {
            role: "system",
            content:
              'Eres viverista en Nicaragua. Responde SOLO JSON válido, sin markdown: {"nombre":"nombre común en español","cientifico":"Nombre cientifico","luz":"...","riego":"...","abono":"...","plagas":"...","extra":"consejo corto"}.',
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Identifica la planta de la foto. Nombre local si lo sabes (gomero, pingo de oro, sábila). Incluye luz, riego, abono y plagas.",
              },
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
    let ficha = "";
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
      nombre = (p.nombre ?? "").trim();
      cientifico = (p.cientifico ?? "").trim();
      const lineas = [
        nombre && `${nombre}${cientifico ? ` (${cientifico})` : ""}.`,
        p.luz && `Luz: ${p.luz}`,
        p.riego && `Riego: ${p.riego}`,
        p.abono && `Abono: ${p.abono}`,
        p.plagas && `Plagas: ${p.plagas}`,
        p.extra,
      ].filter(Boolean);
      ficha = lineas.join("\n");
    } catch {
      nombre = texto.replace(/[`{}\n]/g, " ").trim().slice(0, 80);
      ficha = texto.slice(0, 800);
    }
    return { ok: true as const, ids: [] as string[], nombre, cientifico, ficha, error: undefined };
  });
