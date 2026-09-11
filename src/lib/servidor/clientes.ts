import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { CLAVE_AUTOR_DEFECTO } from "@/lib/marca";

function claveAutorOk(clave?: string) {
  const esperada = (typeof process !== "undefined" && process.env.AUTOR_CLAVE?.trim()) || CLAVE_AUTOR_DEFECTO;
  return (clave ?? "").trim() === esperada;
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
}

export const registrarCliente = createServerFn({ method: "POST" })
  .validator((input: { correo: string; pais: string; telefono: string; nombre?: string }) => input)
  .handler(async ({ data }) => {
    const correo = data.correo.trim().toLowerCase();
    const pais = data.pais.replace(/\D/g, "").slice(0, 5);
    const telefono = data.telefono.replace(/\D/g, "").slice(0, 15);
    const nombre = (data.nombre ?? "").trim().slice(0, 80);
    if (!correoOk(correo)) return { ok: false as const, error: "Ese correo no se entiende.", codigo: "" };
    if (!pais || telefono.length < 6) return { ok: false as const, error: "Falta el teléfono con código de país.", codigo: "" };
    const sql = await getSql();
    await asegurarColumnasPro();
    const id = `cl_${correo.replace(/[^a-z0-9]/g, "").slice(0, 24)}`;
    await sql`
      insert into clientes_app (id, correo, pais, telefono, nombre, creado_en)
      values (${id}, ${correo}, ${pais}, ${telefono}, ${nombre}, now())
      on conflict (correo) do update set
        pais = excluded.pais,
        telefono = excluded.telefono,
        nombre = excluded.nombre
    `;
    return { ok: true as const, codigo: codigoClienteDeCorreo(correo) };
  });

export const listarClientes = createServerFn({ method: "POST" })
  .validator((input: { claveAutor?: string }) => input)
  .handler(async ({ data }) => {
    if (!claveAutorOk(data.claveAutor)) {
      return { ok: false as const, items: [] as never[], error: "Solo el autor ve la lista." };
    }
    const sql = await getSql();
    await asegurarColumnasPro();
    const items = await sql<{
      id: string;
      correo: string;
      pais: string;
      telefono: string;
      nombre: string;
      creado_en: string;
      pro: boolean;
    }>`
      select id, correo, pais, telefono, nombre, creado_en, coalesce(pro, false) as pro
      from clientes_app
      order by creado_en desc
      limit 500
    `;
    return {
      ok: true as const,
      items: items.map((c) => ({ ...c, codigo: codigoClienteDeCorreo(c.correo) })),
    };
  });

export const marcarProCliente = createServerFn({ method: "POST" })
  .validator((input: { claveAutor?: string; correo: string; pro: boolean }) => input)
  .handler(async ({ data }) => {
    if (!claveAutorOk(data.claveAutor)) return { ok: false as const, error: "Solo el autor puede activar Pro." };
    const correo = data.correo.trim().toLowerCase();
    if (!correoOk(correo)) return { ok: false as const, error: "Correo no válido." };
    const sql = await getSql();
    await asegurarColumnasPro();
    const filas = await sql.query<{ correo: string }>(
      "update clientes_app set pro = $1, pro_en = case when $1 then now() else null end where lower(correo) = $2 returning correo",
      [data.pro, correo],
    );
    if (!filas.length) return { ok: false as const, error: "No está ese cliente. Pídele que abra la app una vez." };
    return { ok: true as const };
  });

export const estadoProCliente = createServerFn({ method: "POST" })
  .validator((input: { correo: string }) => input)
  .handler(async ({ data }) => {
    const correo = data.correo.trim().toLowerCase();
    if (!correoOk(correo)) return { ok: true as const, pro: false, codigo: "" };
    const sql = await getSql();
    await asegurarColumnasPro();
    const filas = await sql.query<{ pro: boolean }>(
      "select coalesce(pro, false) as pro from clientes_app where lower(correo) = $1 limit 1",
      [correo],
    );
    return {
      ok: true as const,
      pro: Boolean(filas[0]?.pro),
      codigo: codigoClienteDeCorreo(correo),
    };
  });
