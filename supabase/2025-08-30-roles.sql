-- Tabla de marcas
create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid references auth.users(id) on delete cascade,
  created_at timestamp default now()
);

-- Tabla de miembros de marca
create table if not exists public.brand_members (
  id bigserial primary key,
  brand_id uuid references public.brands(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text check (role in ('controller','partner')) not null,
  created_at timestamp default now()
);

-- Función: verificar si un usuario es admin
create or replace function public.is_admin()
returns boolean as $$
  select auth.uid() in (
    '5bb0ee89-c830-45bb-a226-10cadf335993',
    'f3ee597e-e4e7-44ee-b205-e087a329de98'
  );
$$ language sql stable;

-- Policies ejemplo
alter table public.brands enable row level security;
create policy "admins see all brands"
  on public.brands for select
  using (is_admin() or auth.uid() = owner_id);
