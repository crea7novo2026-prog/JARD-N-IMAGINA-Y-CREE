create table if not exists comunidad_msg (
  id text primary key,
  sala text not null,
  autor text not null,
  es_autor boolean not null default false,
  cuerpo text not null,
  creado_en timestamptz not null default now()
);

create index if not exists comunidad_msg_sala on comunidad_msg (sala, creado_en);

create table if not exists comunidad_oferta (
  id text primary key,
  sala text not null,
  planta_id text,
  titulo text not null,
  detalle text not null default '',
  precio text not null,
  pago_url text not null,
  activa boolean not null default true,
  actualizado_en timestamptz not null default now()
);

create index if not exists comunidad_oferta_sala on comunidad_oferta (sala, activa);
