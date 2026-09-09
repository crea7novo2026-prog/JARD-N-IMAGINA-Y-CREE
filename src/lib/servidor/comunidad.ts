import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { CLAVE_AUTOR_DEFECTO } from "@/lib/marca";

function salaOk(s: string) {
  return /^[A-Z0-9-]{4,24}$/.test(s.trim().toUpperCase());
}

function claveAutorOk(clave?: string) {
  const esperada = (typeof process !== "undefined" && process.env.AUTOR_CLAVE?.trim()) || CLAVE_AUTOR_DEFECTO;
  return (clave ?? "").trim() === esperada;
}

export const listarMensajes = createServerFn({ method: "POST" })
  .validator((input: { sala: string }) => input)
  .handler(async ({ data }) => {
    const sala = data.sala.trim().toUpperCase();
    if (!salaOk(sala)) return { ok: false as const, items: [], error: "Sala no válida." };
    const sql = await getSql();
    const items = await sql<{
      id: string;
      autor: string;
      es_autor: boolean;
      cuerpo: string;
      creado_en: string;
    }>`
      select id, autor, es_autor, cuerpo, creado_en
      from comunidad_msg
      where sala = ${sala}
      order by creado_en asc
      limit 80
    `;
    return { ok: true as const, items, error: undefined };
  });

export const enviarMensaje = createServerFn({ method: "POST" })
  .validator((input: { sala: string; autor: string; esAutor: boolean; cuerpo: string }) => input)
  .handler(async ({ data }) => {
    const sala = data.sala.trim().toUpperCase();
    const cuerpo = data.cuerpo.trim().slice(0, 500);
    const autor = data.autor.trim().slice(0, 40) || "Jardinero";
    if (!salaOk(sala) || !cuerpo) return { ok: false as const, error: "Falta el mensaje o la sala." };
    const sql = await getSql();
    const id = `m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    await sql`
      insert into comunidad_msg (id, sala, autor, es_autor, cuerpo)
      values (${id}, ${sala}, ${autor}, ${data.esAutor}, ${cuerpo})
    `;
    return { ok: true as const };
  });

export const listarOfertas = createServerFn({ method: "POST" })
  .validator((input: { sala: string }) => input)
  .handler(async ({ data }) => {
    const sala = data.sala.trim().toUpperCase();
    if (!salaOk(sala)) return { ok: false as const, items: [], error: "Sala no válida." };
    const sql = await getSql();
    const items = await sql<{
      id: string;
      planta_id: string | null;
      titulo: string;
      detalle: string;
      precio: string;
      pago_url: string;
      foto: string | null;
    }>`
      select id, planta_id, titulo, detalle, precio, pago_url, foto
      from comunidad_oferta
      where sala = ${sala} and activa = true
      order by actualizado_en desc
      limit 200
    `;
    return { ok: true as const, items, error: undefined };
  });

export const publicarOferta = createServerFn({ method: "POST" })
  .validator(
    (input: {
      sala: string;
      id?: string;
      plantaId?: string;
      titulo: string;
      detalle: string;
      precio: string;
      pagoUrl: string;
      foto?: string;
      claveAutor?: string;
    }) => input,
  )
  .handler(async ({ data }) => {
    if (!claveAutorOk(data.claveAutor)) {
      return { ok: false as const, error: "Solo el autor puede publicar plantas en oferta." };
    }
    const sala = data.sala.trim().toUpperCase();
    const titulo = data.titulo.trim().slice(0, 80);
    const precio = data.precio.trim().slice(0, 24);
    const pago = data.pagoUrl.trim().slice(0, 300);
    const foto = (data.foto ?? "").slice(0, 350_000);
    if (!salaOk(sala) || !titulo || !precio) {
      return { ok: false as const, error: "Faltan título o precio." };
    }
    if (pago && !/^https?:\/\//i.test(pago)) {
      return { ok: false as const, error: "El pago, si lo pones, debe ser un enlace https." };
    }
    const sql = await getSql();
    const id = data.id?.trim() || `o_${Date.now().toString(36)}`;
    await sql`
      insert into comunidad_oferta (id, sala, planta_id, titulo, detalle, precio, pago_url, foto, activa, actualizado_en)
      values (${id}, ${sala}, ${data.plantaId ?? null}, ${titulo}, ${data.detalle.trim().slice(0, 280)}, ${precio}, ${pago}, ${foto || null}, true, now())
      on conflict (id) do update set
        titulo = excluded.titulo,
        detalle = excluded.detalle,
        precio = excluded.precio,
        pago_url = excluded.pago_url,
        foto = excluded.foto,
        activa = true,
        actualizado_en = now()
    `;
    return { ok: true as const, id };
  });

export const retirarOferta = createServerFn({ method: "POST" })
  .validator((input: { id: string; sala: string; claveAutor?: string }) => input)
  .handler(async ({ data }) => {
    if (!claveAutorOk(data.claveAutor)) {
      return { ok: false as const, error: "Solo el autor puede quitar una oferta." };
    }
    const sql = await getSql();
    await sql`
      update comunidad_oferta
      set activa = false, actualizado_en = now()
      where id = ${data.id} and sala = ${data.sala.trim().toUpperCase()}
    `;
    return { ok: true as const };
  });
