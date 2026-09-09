import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";

const MAX = 1_400_000;

export const publicarJardin = createServerFn({ method: "POST" })
  .validator((input: { codigo: string; carga: string }) => input)
  .handler(async ({ data }) => {
    const codigo = data.codigo.trim().toUpperCase();
    if (!/^[A-Z0-9-]{4,24}$/.test(codigo)) {
      return { ok: false as const, error: "Código no válido." };
    }
    if (data.carga.length > MAX) {
      return { ok: false as const, error: "El jardín es demasiado pesado para subir. Quita fotos grandes." };
    }
    const sql = await getSql();
    await sql`
      insert into jardin_sync (codigo, carga, actualizado_en)
      values (${codigo}, ${data.carga}, now())
      on conflict (codigo) do update set carga = excluded.carga, actualizado_en = now()
    `;
    return { ok: true as const };
  });

export const traerJardin = createServerFn({ method: "POST" })
  .validator((input: { codigo: string }) => input)
  .handler(async ({ data }) => {
    const codigo = data.codigo.trim().toUpperCase();
    if (!/^[A-Z0-9-]{4,24}$/.test(codigo)) {
      return { ok: false as const, carga: null as string | null, error: "Código no válido." };
    }
    const sql = await getSql();
    const rows = await sql<{ carga: string }>`
      select carga from jardin_sync where codigo = ${codigo} limit 1
    `;
    const carga = rows[0]?.carga ?? null;
    if (!carga) return { ok: false as const, carga: null, error: "Ese código aún no tiene jardín publicado." };
    return { ok: true as const, carga, error: undefined };
  });
