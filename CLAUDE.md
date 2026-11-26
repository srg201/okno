# Okno — контекст для Claude

Сервис онлайн-записи к мастерам (барберы, маникюр, репетиторы). Полный PRD: https://claude.ai/artifact/Fg6rZbNyoxJxxYig8onEJv

## Роли

- Гость / клиент: смотрит страницу бизнеса `/{slug}`, выбирает услугу → мастера → время, входит (Telegram, Google, Apple) только на шаге подтверждения.
- Бизнес: solo (мастер-ИП) или team (владелец, администратор, мастер). Роль хранится в `membership`, а не в `user`.

## Правила, которые нельзя нарушать

- Двойная запись невозможна: в PostgreSQL exclusion constraint на `booking` по (staff_id, tstzrange(starts_at, ends_at)) для активных статусов.
- Время хранится в UTC, показывается в часовом поясе бизнеса.
- Расчёт свободных слотов — одна чистая функция с тестами.
- `client` принадлежит бизнесу (заметки одного салона не видны другому); ручная запись создаёт `client` без `user_id`.
- Каждый запрос к данным бизнеса проверяет `membership`.
- Mobile-first: цели касания не меньше 44 px.

## Стек

Next.js App Router + TypeScript, Tailwind + shadcn/ui, Drizzle + PostgreSQL, grammY, Resend, Stripe, Vercel.

## Сейчас

Этап 1 — MVP для мастера-одиночки. Команды, депозиты, каталог и нативные приложения в MVP не входят.

## Разработка

- `pnpm dev` / `build` / `lint` / `typecheck` / `format`.
- shadcn/ui: стиль new-york, база Radix (`radix-ui`), иконки Lucide, тема в `src/app/globals.css`, компоненты в `src/components/ui`.
- Компоненты добавляются через `npx shadcn@latest add <name>`. Если ui.shadcn.com недоступен (403), исходник берётся из `github.com/shadcn-ui/ui/apps/v4/registry/new-york-v4/ui/`, а импорт `"cn"` заменяется на `"@/lib/utils"`.
- Next.js 16 отличается от старых версий: см. `AGENTS.md` и `node_modules/next/dist/docs/`.
- Пакеты: только pnpm. Не ставьте пакеты при запущенном `pnpm dev` — Turbopack ломается, нужен перезапуск.
- Вход: Better Auth (`src/lib/auth.ts`, клиент `src/lib/auth-client.ts`, роут `src/app/api/auth/[...all]`) через Telegram (официальный OIDC, плагин `genericOAuth`), Google и Apple. Провайдер включается, только если заданы его переменные (`src/lib/auth-providers.ts`). Страницы `/sign-in` и `/account`.
- Telegram: `accountId` в таблице `account` = числовой id пользователя Telegram, по нему бот пишет (`src/lib/telegram.ts`, `notifyUser(userId, text)`). Scope `telegram:bot_access` даёт боту право писать. Пользователь Google/Apple подключает Telegram в `/account` (`linkSocial`).
- Таблицы Better Auth — `supabase/migrations/0002_better_auth.sql` (RLS включён без политик). Better Auth ходит в Postgres напрямую через `DATABASE_URL`; Supabase JS-клиент (`src/utils/supabase/server.ts`) — с публичным ключом и RLS. Supabase Auth не используем.
