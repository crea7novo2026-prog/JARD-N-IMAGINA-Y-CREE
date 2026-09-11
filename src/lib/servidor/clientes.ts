import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { CLAVE_AUTOR_DEFECTO } from "@/lib/marca";

function claveAutorOk(clave?: string) {
  const c = (clave ?? "").trim();
  if (!c) return false;
  const env = typeof process !== "undefined" ? process.env.AUTOR_CLAVE?.trim() : "";
  return c === CLAVE_AUTOR_DEFECTO || (env ? c === env : false);
}

function correoOk(c: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c);
}

export function codigoClienteDeCorreo(correo: string) {
  const slug = correo.trim().toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 24);
  return `CLI-${slug.slice(0, 8).toUpperCase()}`;
}

async function asegurarColumnasPro() {
  const sql = await getSql();
  await sql.query("alter table clientes_app add column if not exists pro boolean not null default false");
  await sql.query("alter table clientes_app add column if not exists pro_en timestamptz");
  await sql.query("alter table clientes_app add column if not exists pro_hasta timestamptz");
}

function vigente(pro: boolean, hasta?: string | Date | null) {
  if (!pro) return false;
  if (!hasta) return true;
  return new Date(hasta).getTime() > Date.now();
}

export const registrarCliente = createServerFn({ method: "POST" })
  .validator((input: { correo: string; pais: string; telefono: string; nombre?: string }) => input)
  .handler(async ({ data }) => {
    const vacio = { ok: false as const, error: "No se pudo guardar el cliente.", codigo: "", pro: false, proHasta: null as string | null };
    const correo = data.correo.trim().toLowerCase();
    const pais = data.pais.replace(/\D/g, "").slice(0, 5);
    const telefono = data.telefono.replace(/\D/g, "").slice(0, 15);
    const nombre = (data.nombre ?? "").trim().slice(0, 80);
    if (!correoOk(correo)) return { ...vacio, error: "Ese correo no se entiende." };
    if (!pais || telefono.length < 6) return { ...vacio, error: "Falta el teléfono con código de país." };
    try {
      const sql = await getSql();
      await asegurarColumnasPro();
      const id = `cl_${correo.replace(/[^a-z0-9]/g, "").slice(0, 24)}`;
      const ya = await sql.query<{ correo: string }>(
        "select correo from clientes_app where lower(correo) = $1 or id = $2 limit 1",
        [correo, id],
      );
      if (ya.length) {
        await sql.query(
          "update clientes_app set pais = $1, telefono = $2, nombre = $3 where lower(correo) = $4 or id = $5",
          [pais, telefono, nombre, correo, id],
        );
      } else {
        await sql.query(
          "insert into clientes_app (id, correo, pais, telefono, nombre, creado_en) values ($1, $2, $3, $4, $5, now())",
          [id, correo, pais, telefono, nombre],
        );
      }
      const filas = await sql.query<{ pro: boolean; pro_hasta: string | null }>(
        "select coalesce(pro, false) as pro, pro_hasta from clientes_app where lower(correo) = $1 or id = $2 limit 1",
        [correo, id],
      );
      const row = filas[0];
      const pro = vigente(Boolean(row?.pro), row?.pro_hasta ?? null);
      return { ok: true as const, codigo: codigoClienteDeCorreo(correo), pro, proHasta: row?.pro_hasta ?? null };
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error de red o base.";
      return { ...vacio, error: msg.slice(0, 140) };
    }
  });

export const listarClientes = createServerFn({ method: "POST" })
  .validator((input: { claveAutor?: string }) => input)
  .handler(async ({ data }) => {
    if (!claveAutorOk(data.claveAutor)) {
      return { ok: false as const, items: [] as never[], error: "Solo el autor ve la lista." };
    }
    const sql = await getSql();
    await asegurarColumnasPro();
    const items = (await sql.query(
      "select id, correo, pais, telefono, nombre, creado_en, coalesce(pro, false) as pro, pro_en, pro_hasta from clientes_app order by creado_en desc limit 500",
    )) as {
      id: string;
      correo: string;
      pais: string;
      telefono: string;
      nombre: string;
      creado_en: string;
      pro: boolean;
      pro_en: string | null;
      pro_hasta: string | null;
    }[];
    return {
      ok: true as const,
      items: items.map((c) => {
        const activo = vigente(Boolean(c.pro), c.pro_hasta);
        return { ...c, pro: activo, codigo: codigoClienteDeCorreo(c.correo) };
      }),
    };
  });

export const marcarProCliente = createServerFn({ method: "POST" })
  .validator((input: { claveAutor?: string; correo: string; pro: boolean; dias?: number }) => input)
  .handler(async ({ data }) => {
    if (!claveAutorOk(data.claveAutor)) return { ok: false as const, error: "Solo el autor puede activar Pro." };
    const correo = data.correo.trim().toLowerCase();
    if (!correoOk(correo)) return { ok: false as const, error: "Correo no válido." };
    const dias = Math.max(1, Math.min(400, data.dias ?? 30));
    const sql = await getSql();
    await asegurarColumnasPro();
    const hasta = new Date(Date.now() + dias * 24 * 60 * 60 * 1000).toISOString();
    const filas = data.pro
      ? await sql.query<{ correo: string }>(
          "update clientes_app set pro = true, pro_en = now(), pro_hasta = $1 where lower(correo) = $2 returning correo",
          [hasta, correo],
        )
      : await sql.query<{ correo: string }>(
          "update clientes_app set pro = false where lower(correo) = $1 returning correo",
          [correo],
        );
    if (!filas.length) return { ok: false as const, error: "No está ese cliente. Pídele que abra la app una vez." };
    return { ok: true as const };
  });

export const estadoProCliente = createServerFn({ method: "POST" })
  .validator((input: { correo: string }) => input)
  .handler(async ({ data }) => {
    const correo = data.correo.trim().toLowerCase();
    if (!correoOk(correo)) return { ok: true as const, pro: false, codigo: "", proEn: null as string | null, proHasta: null as string | null };
    const sql = await getSql();
    await asegurarColumnasPro();
    const filas = await sql.query<{ pro: boolean; pro_en: string | null; pro_hasta: string | null }>(
      "select coalesce(pro, false) as pro, pro_en, pro_hasta from clientes_app where lower(correo) = $1 limit 1",
      [correo],
    );
    const row = filas[0];
    const pro = vigente(Boolean(row?.pro), row?.pro_hasta ?? null);
    return {
      ok: true as const,
      pro,
      codigo: codigoClienteDeCorreo(correo),
      proEn: row?.pro_en ?? null,
      proHasta: row?.pro_hasta ?? null,
    };
  });
