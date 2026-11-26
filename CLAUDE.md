# Okno — контекст для Claude

Сервис онлайн-записи к мастерам (барберы, маникюр, репетиторы). Полный PRD: https://claude.ai/artifact/Fg6rZbNyoxJxxYig8onEJv

## Роли
- Гость / клиент: смотрит страницу бизнеса `/{slug}`, выбирает услугу → мастера → время, входит (телефон, Apple, Google, Telegram) только на шаге подтверждения.
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
- `npm run dev` / `build` / `lint` / `typecheck` / `format`.
- shadcn/ui: стиль new-york, база Radix (`radix-ui`), иконки Lucide, тема в `src/app/globals.css`, компоненты в `src/components/ui`.
- Компоненты добавляются через `npx shadcn@latest add <name>`. Если ui.shadcn.com недоступен (403), исходник берётся из `github.com/shadcn-ui/ui/apps/v4/registry/new-york-v4/ui/`, а импорт `"cn"` заменяется на `"@/lib/utils"`.
- Next.js 16 отличается от старых версий: см. `AGENTS.md` и `node_modules/next/dist/docs/`.
