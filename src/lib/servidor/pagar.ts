import { createServerFn } from "@tanstack/react-start";

const APP = process.env.APP_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || "jard-n-imagina-y-cree-taupe.vercel.app";
const ORIGEN = APP.startsWith("http") ? APP : `https://${APP}`;

const PLANES = {
  mes: { titulo: "Jardín Pro mensual", centavos: 200, intervalo: "month" as const },
  ano: { titulo: "Jardín Pro anual", centavos: 2000, intervalo: "year" as const },
};

export const crearSesionPago = createServerFn({ method: "POST" })
  .validator((input: { plan: "mes" | "ano" }) => input)
  .handler(async ({ data }) => {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) return { ok: false as const, url: "", error: "sin_stripe" };
    const plan = PLANES[data.plan] ?? PLANES.ano;
    const body = new URLSearchParams();
    body.set("mode", "subscription");
    body.set("success_url", `${ORIGEN}/?pago=ok&session_id={CHECKOUT_SESSION_ID}`);
    body.set("cancel_url", `${ORIGEN}/mas`);
    body.set("line_items[0][quantity]", "1");
    body.set("line_items[0][price_data][currency]", "usd");
    body.set("line_items[0][price_data][unit_amount]", String(plan.centavos));
    body.set("line_items[0][price_data][recurring][interval]", plan.intervalo);
    body.set("line_items[0][price_data][product_data][name]", plan.titulo);
    body.set("metadata[plan]", data.plan);
    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
    const json = (await res.json()) as { id?: string; url?: string; error?: { message?: string } };
    if (!res.ok || !json.url) return { ok: false as const, url: "", error: json.error?.message || `stripe_${res.status}` };
    return { ok: true as const, url: json.url, error: undefined };
  });

export const confirmarPago = createServerFn({ method: "POST" })
  .validator((input: { sessionId: string }) => input)
  .handler(async ({ data }) => {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) return { ok: false as const, plan: "" };
    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(data.sessionId)}`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    const json = (await res.json()) as { payment_status?: string; status?: string; metadata?: { plan?: string } };
    const pagado = json.payment_status === "paid" || json.status === "complete";
    if (!pagado) return { ok: false as const, plan: "" };
    return { ok: true as const, plan: json.metadata?.plan || "ano" };
  });
