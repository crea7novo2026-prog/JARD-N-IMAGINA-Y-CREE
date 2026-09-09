create table if not exists comunidad_pedido (
  id text primary key,
  sala text not null,
  oferta_id text not null,
  titulo text not null,
  cliente text not null,
  contacto text not null default '',
  cantidad integer not null default 1,
  nota text not null default '',
  cuando text not null,
  estado text not null default 'pedido',
  creado_en timestamptz not null default now()
);

create index if not exists comunidad_pedido_sala on comunidad_pedido (sala, creado_en);
