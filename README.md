# Okno

Онлайн-запись к мастерам: дёшево, просто и красиво. Это альтернатива YCLIENTS и Booksy для мастеров-одиночек и небольших салонов.

«Окно» по-русски — свободное время у мастера, а по-польски *okno* значит «окно». Название работает на обоих рынках.

**PRD:** https://claude.ai/artifact/Fg6rZbNyoxJxxYig8onEJv

## Стек (из PRD)

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui + Lucide
- PostgreSQL (Supabase или Neon) + Drizzle ORM
- Вход: Better Auth или Supabase Auth (телефон, Apple, Google, Telegram)
- Фоновые задачи: Inngest или Trigger.dev
- Telegram-бот: grammY · Email: Resend · Оплата: Stripe Billing
- Хостинг: Vercel · Аналитика и ошибки: PostHog + Sentry

## Первый шаг

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir
npx shadcn@latest init
```

## Этапы

0. Проверка спроса: 20 разговоров с мастерами, лендинг с листом ожидания.
1. MVP для мастера-одиночки: страница, запись, вход, календарь, клиенты, напоминания, базовая аналитика.
2. Платный запуск: Stripe, лист ожидания, отзывы.
3. Команды и салоны.
4. Рост.
