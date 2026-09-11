alter table clientes_app add column if not exists pro boolean not null default false;
alter table clientes_app add column if not exists pro_en timestamptz;
