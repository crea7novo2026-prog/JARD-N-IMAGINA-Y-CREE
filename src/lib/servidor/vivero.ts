import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";

function salaOk(s: string) {
  return /^[A-Z0-9-]{4,24}$/.test(s.trim().toUpperCase());
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
    const cuando = data.cuando.trim();
    if (!salaOk(sala) || !cliente || !cuando || !data.ofertaId) {
      return { ok: false as const, error: "Faltan nombre, planta o fecha del pedido." };
    }
    const sql = await getSql();
    const id = `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const cant = Math.min(20, Math.max(1, Math.round(data.cantidad) || 1));
    await sql`
      insert into comunidad_pedido (id, sala, oferta_id, titulo, cliente, contacto, cantidad, nota, cuando, estado)
      values (
        ${id}, ${sala}, ${data.ofertaId}, ${data.titulo.trim().slice(0, 80)},
        ${cliente}, ${data.contacto.trim().slice(0, 80)}, ${cant},
        ${data.nota.trim().slice(0, 240)}, ${cuando.slice(0, 40)}, 'pedido'
      )
    `;
    return { ok: true as const, id };
  });

export const listarPedidos = createServerFn({ method: "POST" })
  .validator((input: { sala: string }) => input)
  .handler(async ({ data }) => {
    const sala = data.sala.trim().toUpperCase();
    if (!salaOk(sala)) return { ok: false as const, items: [], error: "Sala no válida." };
    const sql = await getSql();
    const items = await sql<{
      id: string;
      oferta_id: string;
      titulo: string;
      cliente: string;
      contacto: string;
      cantidad: number;
      nota: string;
      cuando: string;
      estado: string;
    }>`
      select id, oferta_id, titulo, cliente, contacto, cantidad, nota, cuando, estado
      from comunidad_pedido
      where sala = ${sala}
      order by creado_en desc
      limit 60
    `;
    return { ok: true as const, items, error: undefined };
  });

export const marcarPedido = createServerFn({ method: "POST" })
  .validator((input: { id: string; sala: string; estado: string }) => input)
  .handler(async ({ data }) => {
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
