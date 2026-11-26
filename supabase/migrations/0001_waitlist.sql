-- Лист ожидания лендинга (этап 0 из PRD)
create table if not exists public.waitlist (
  id bigint generated always as identity primary key,
  email text not null unique,
  specialty text not null check (specialty in ('barber', 'nails', 'tutor', 'other')),
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Гости могут только добавить себя; читать список не может никто, кроме service role.
create policy "anyone can join waitlist"
  on public.waitlist for insert
  to anon, authenticated
  with check (true);
