import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { CLAVE_AUTOR_DEFECTO } from "@/lib/marca";

function salaOk(s: string) {
  return /^[A-Z0-9-]{4,24}$/.test(s.trim().toUpperCase());
}

function claveAutorOk(clave?: string) {
  const c = (clave ?? "").trim();
  if (!c) return false;
  const env = typeof process !== "undefined" ? process.env.AUTOR_CLAVE?.trim() : "";
  return c === CLAVE_AUTOR_DEFECTO || (env ? c === env : false);
}

export const hacerPedido = createServerFn({ method: "POST" })
  .validator(
    (input: {
      sala: string;
      ofertaId: string;
      titulo: string;
      cliente: string;
      contacto: string;
      cantidad: number;
      nota: string;
      cuando: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    const sala = data.sala.trim().toUpperCase();
    const cliente = data.cliente.trim().slice(0, 60);
    const contacto = data.contacto.trim().slice(0, 80);
    const cuando = data.cuando.trim();
    const titulo = data.titulo.trim().slice(0, 80);
    if (!salaOk(sala) || !cliente || !cuando || !data.ofertaId) {
      return { ok: false as const, error: "Faltan nombre, planta o fecha del pedido.", duplicado: false, id: "" };
    }
    const sql = await getSql();
    const cant = Math.min(20, Math.max(1, Math.round(data.cantidad) || 1));
    const ya = await sql.query<{ id: string }>(
      `select id from comunidad_pedido
       where sala = $1 and oferta_id = $2
         and lower(cliente) = lower($3)
         and coalesce(contacto,'') = $4
         and cuando = $5
         and creado_en > now() - interval '2 days'
       order by creado_en desc limit 1`,
      [sala, data.ofertaId, cliente, contacto, cuando.slice(0, 40)],
    );
    if (ya[0]?.id) {
      return { ok: true as const, id: ya[0].id, duplicado: true };
    }
    const id = `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    await sql`
      insert into comunidad_pedido (id, sala, oferta_id, titulo, cliente, contacto, cantidad, nota, cuando, estado)
      values (
        ${id}, ${sala}, ${data.ofertaId}, ${titulo},
        ${cliente}, ${contacto}, ${cant},
        ${data.nota.trim().slice(0, 240)}, ${cuando.slice(0, 40)}, 'pedido'
      )
    `;
    return { ok: true as const, id, duplicado: false };
  });

export const listarPedidos = createServerFn({ method: "POST" })
  .validator((input: { sala: string; claveAutor?: string }) => input)
  .handler(async ({ data }) => {
    if (!claveAutorOk(data.claveAutor)) {
      return { ok: false as const, items: [] as never[], error: "Solo el autor ve los pedidos." };
    }
    const sala = data.sala.trim().toUpperCase();
    if (!salaOk(sala)) return { ok: false as const, items: [], error: "Sala no válida." };
    const sql = await getSql();
    const items = await sql.query(
      `select id, oferta_id, titulo, cliente, contacto, cantidad, nota, cuando, estado, creado_en
       from comunidad_pedido
       where sala = $1
       order by creado_en desc
       limit 80`,
      [sala],
    ) as {
      id: string;
      oferta_id: string;
      titulo: string;
      cliente: string;
      contacto: string;
      cantidad: number;
      nota: string;
      cuando: string;
      estado: string;
      creado_en?: string;
    }[];
    return { ok: true as const, items, error: undefined };
  });

export const marcarPedido = createServerFn({ method: "POST" })
  .validator((input: { id: string; sala: string; estado: string; claveAutor?: string }) => input)
  .handler(async ({ data }) => {
    if (!claveAutorOk(data.claveAutor)) return { ok: false as const };
    const estado = ["pedido", "programado", "pagado", "entregado", "cancelado"].includes(data.estado)
      ? data.estado
      : "pedido";
    const sql = await getSql();
    await sql`
      update comunidad_pedido
      set estado = ${estado}
      where id = ${data.id} and sala = ${data.sala.trim().toUpperCase()}
    `;
    return { ok: true as const };
  });
