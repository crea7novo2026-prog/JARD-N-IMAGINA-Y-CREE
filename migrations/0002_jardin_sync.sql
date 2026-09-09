create table if not exists jardin_sync (
  codigo text primary key,
  carga text not null,
  actualizado_en timestamptz not null default now()
);
