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

export const registrarCliente = createServerFn({ method: "POST" })
  .validator((input: { correo: string; pais: string; telefono: string; nombre?: string }) => input)
  .handler(async ({ data }) => {
    const correo = data.correo.trim().toLowerCase();
    const pais = data.pais.replace(/\D/g, "").slice(0, 5);
    const telefono = data.telefono.replace(/\D/g, "").slice(0, 15);
    const nombre = (data.nombre ?? "").trim().slice(0, 80);
    if (!correoOk(correo)) return { ok: false as const, error: "Ese correo no se entiende." };
    if (!pais || telefono.length < 6) return { ok: false as const, error: "Falta el teléfono con código de país." };
    const sql = await getSql();
    const id = `cl_${correo.replace(/[^a-z0-9]/g, "").slice(0, 24)}`;
    await sql`
      insert into clientes_app (id, correo, pais, telefono, nombre, creado_en)
      values (${id}, ${correo}, ${pais}, ${telefono}, ${nombre}, now())
      on conflict (correo) do update set
        pais = excluded.pais,
        telefono = excluded.telefono,
        nombre = excluded.nombre
    `;
    return { ok: true as const };
  });

export const listarClientes = createServerFn({ method: "POST" })
  .validator((input: { claveAutor?: string }) => input)
  .handler(async ({ data }) => {
    if (!claveAutorOk(data.claveAutor)) {
      return { ok: false as const, items: [] as never[], error: "Solo el autor ve la lista." };
    }
    const sql = await getSql();
    const items = await sql<{
      id: string;
      correo: string;
      pais: string;
      telefono: string;
      nombre: string;
      creado_en: string;
    }>`
      select id, correo, pais, telefono, nombre, creado_en
      from clientes_app
      order by creado_en desc
      limit 500
    `;
    return { ok: true as const, items };
  });
