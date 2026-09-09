create table if not exists clientes_app (
  id text primary key,
  correo text not null unique,
  pais text not null,
  telefono text not null,
  nombre text not null default '',
  creado_en timestamptz not null default now()
);

create index if not exists clientes_app_creado on clientes_app (creado_en desc);
