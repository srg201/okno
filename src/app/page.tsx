import { SiteHeader } from "@/components/site-header";
import { HeroCards } from "@/components/landing/hero-cards";
import { Preloader } from "@/components/landing/preloader";
import { Reveal } from "@/components/landing/reveal";
import { ScrollWords } from "@/components/landing/scroll-words";
import { WaitlistForm } from "@/components/landing/waitlist-form";

const niches = [
  "барберы",
  "мастера маникюра",
  "репетиторы",
  "бровисты",
  "массажисты",
  "тату-мастера",
];

const steps = [
  {
    title: "Услуга",
    text: "Клиент открывает вашу страницу и выбирает услугу с ценой и длительностью.",
  },
  { title: "Мастер", text: "Если вы работаете один, шаг пропускается сам." },
  {
    title: "Время",
    text: "Видны только свободные окна — двойная запись невозможна.",
  },
  {
    title: "Вход",
    text: "Телефон, Apple, Google или Telegram. Без пароля и анкеты.",
  },
  {
    title: "Готово",
    text: "Запись в вашем календаре, напоминание уходит клиенту само.",
  },
];

const features = [
  {
    title: "Своя страница записи",
    text: "Услуги, цены, адрес и свободное время. Ссылку можно поставить в шапку профиля.",
  },
  {
    title: "Календарь",
    text: "Неделя и день, ручная запись для тех, кто звонит или пишет в мессенджер.",
  },
  {
    title: "Напоминания с кнопками",
    text: "В Telegram и на почту: «Приду» или «Отменить». Отмена сразу освобождает окно.",
  },
  {
    title: "Карточка клиента",
    text: "История визитов, заметки и неявки. Видна только вам.",
  },
  {
    title: "Правила записи",
    text: "За сколько часов можно записаться и отменить, перерывы между клиентами, выходные.",
  },
  {
    title: "Аналитика",
    text: "Выручка, загрузка, неявки, новые и повторные клиенты — на одном экране.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "навсегда",
    for: "Попробовать",
    items: ["1 мастер", "30 записей в месяц", "Логотип Okno на странице"],
  },
  {
    name: "Solo",
    price: "$5",
    period: "в месяц или $49 в год",
    for: "Мастер, который работает один",
    items: [
      "1 мастер",
      "Записи без лимита",
      "Напоминания в Telegram и на почту",
    ],
    accent: true,
  },
  {
    name: "Team",
    price: "$15",
    period: "в месяц + $4 за мастера",
    for: "Салон, барбершоп",
    items: ["До 15 мастеров", "Роли", "Аналитика по мастерам"],
  },
];

const comparison = [
  {
    label: "Тариф для одного мастера",
    okno: "Solo",
    them: "Нет, минимум 3–4 сотрудника",
  },
  {
    label: "Самая дешёвая лицензия",
    okno: "$5 в месяц",
    them: "от 1 600 ₽ в месяц при оплате за год",
  },
  {
    label: "Как платить",
    okno: "Помесячно",
    them: "Вперёд за 4, 8 или 12 месяцев",
  },
  { label: "Минимальный платёж", okno: "$5", them: "от 8 000 ₽ за 4 месяца" },
  {
    label: "Бесплатно",
    okno: "Тариф Free без срока",
    them: "7 дней пробного периода",
  },
];

function SectionLabel({
  n,
  children,
}: {
  n: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-t border-white/15 pt-4 text-sm text-ash">
      <span>{children}</span>
      <span className="tabular-nums">{n}</span>
    </div>
  );
}

export default function Home() {
  return (
    <div className="overflow-x-clip bg-black text-ash selection:bg-ember selection:text-white">
      <Preloader />
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative flex min-h-svh flex-col justify-end overflow-hidden px-4 pt-24 pb-6 md:px-8">
          <div
            aria-hidden
            className="glow absolute top-1/3 left-1/4 size-[70vmax] rounded-full bg-[radial-gradient(circle,#ff4f00_0%,#7a1d00_35%,transparent_70%)] opacity-70 blur-3xl"
          />
          <HeroCards />

          <div className="relative grid gap-6 md:grid-cols-12">
            <p className="max-w-sm text-lg leading-snug text-white md:col-span-5">
              Онлайн-запись для мастера, который работает один. Страница,
              календарь и напоминания — от $0 в месяц.
            </p>
            <div className="flex items-end gap-6 text-sm md:col-span-7 md:justify-end">
              <a
                href="#waitlist"
                className="rounded-full bg-white px-6 py-3 font-medium text-black hover:bg-ember hover:text-white"
              >
                Встать в лист ожидания
              </a>
              <a href="#how" className="hidden py-3 hover:text-white sm:block">
                Листайте вниз
              </a>
            </div>
          </div>
          <h1 className="relative mt-6 text-[44vw] leading-[0.75] font-semibold tracking-[-0.07em] text-white">
            okno
          </h1>
        </section>

        {/* Marquee */}
        <div className="overflow-hidden border-y border-white/15 py-5">
          <div className="marquee-track flex w-max gap-10 text-3xl font-semibold tracking-tight whitespace-nowrap text-white md:text-5xl">
            {[...niches, ...niches].map((n, i) => (
              <span key={i} className="flex items-center gap-10">
                {n}
                <span className="size-3 rounded-full bg-ember" />
              </span>
            ))}
          </div>
        </div>

        {/* Statement */}
        <section className="px-4 py-32 md:px-8 md:py-48">
          <div className="mx-auto max-w-6xl">
            <ScrollWords text="«Окно» — свободное время у мастера. Мы делаем так, чтобы клиенты находили его сами, приходили вовремя и возвращались, а вы не переписывались до ночи." />
          </div>
        </section>

        {/* 01 How */}
        <section id="how" className="scroll-mt-16 px-4 pb-32 md:px-8">
          <SectionLabel n="01">Как клиент записывается</SectionLabel>
          <div className="mt-10 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 80} className="bg-black p-6">
                <span className="text-7xl font-semibold tracking-tighter text-white tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-10 text-lg font-medium text-white">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-snug">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 02 Features */}
        <section id="features" className="scroll-mt-16 px-4 pb-32 md:px-8">
          <SectionLabel n="02">Возможности</SectionLabel>
          <h2 className="mt-10 max-w-4xl text-5xl leading-[0.95] font-semibold tracking-tight text-white md:text-8xl">
            Всё для одного мастера. Ничего лишнего.
          </h2>
          <ul className="mt-16">
            {features.map((f, i) => (
              <li key={f.title}>
                <Reveal className="group grid gap-4 border-t border-white/15 py-8 md:grid-cols-12 md:items-baseline">
                  <span className="text-sm tabular-nums md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-3xl font-semibold tracking-tight text-white transition-colors group-hover:text-ember md:col-span-6 md:text-5xl">
                    {f.title}
                  </h3>
                  <p className="max-w-md leading-snug md:col-span-5">
                    {f.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-xl text-sm text-smoke">
            Склада, телефонии и расчёта зарплат нет — они нужны салону, а не
            мастеру. Для салонов будет тариф Team.
          </p>
        </section>

        {/* 03 Pricing */}
        <section id="pricing" className="scroll-mt-16 px-4 pb-32 md:px-8">
          <SectionLabel n="03">Цены</SectionLabel>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {plans.map((p, i) => (
              <Reveal
                key={p.name}
                delay={i * 100}
                className={
                  "flex flex-col rounded-3xl p-7 " +
                  (p.accent ? "bg-ember text-white" : "border border-white/15")
                }
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl font-semibold text-white">
                    {p.name}
                  </h3>
                  <span
                    className={
                      "text-right text-sm " + (p.accent ? "text-white/80" : "")
                    }
                  >
                    {p.for}
                  </span>
                </div>
                <p className="mt-12 text-8xl font-semibold tracking-tighter text-white tabular-nums">
                  {p.price}
                </p>
                <p
                  className={
                    "mt-2 text-sm " + (p.accent ? "text-white/80" : "")
                  }
                >
                  {p.period}
                </p>
                <ul className="mt-10 grid gap-3 text-sm">
                  {p.items.map((it) => (
                    <li
                      key={it}
                      className={
                        "border-t pt-3 " +
                        (p.accent ? "border-white/30" : "border-white/15")
                      }
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 04 Comparison */}
        <section className="px-4 pb-32 md:px-8">
          <SectionLabel n="04">Если вы сейчас в YCLIENTS</SectionLabel>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/30 text-2xl md:text-4xl">
                  <th className="w-1/3 py-4 pr-4" />
                  <th className="py-4 pr-4 font-semibold tracking-tight text-ember">
                    okno
                  </th>
                  <th className="py-4 font-semibold tracking-tight text-white">
                    YCLIENTS
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-white/15">
                    <td className="py-5 pr-4 text-sm">{row.label}</td>
                    <td className="py-5 pr-4 text-lg text-white">{row.okno}</td>
                    <td className="py-5 text-lg">{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-smoke">
            Цены YCLIENTS — с{" "}
            <a
              href="https://www.yclients.ru/info/pricing"
              className="underline hover:text-ash"
              target="_blank"
              rel="noopener noreferrer"
            >
              yclients.ru/info/pricing
            </a>{" "}
            на 26 ноября 2026 года.
          </p>
        </section>

        {/* 05 Waitlist */}
        <section
          id="waitlist"
          className="relative scroll-mt-16 overflow-hidden px-4 py-32 md:px-8"
        >
          <div
            aria-hidden
            className="glow absolute -bottom-1/2 left-1/2 size-[60vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,#ff4f00_0%,#7a1d00_35%,transparent_70%)] opacity-50 blur-3xl"
          />
          <div className="relative">
            <SectionLabel n="05">Лист ожидания</SectionLabel>
            <div className="mt-10 grid gap-12 md:grid-cols-12">
              <h2 className="text-5xl leading-[0.95] font-semibold tracking-tight text-white md:col-span-6 md:text-8xl">
                Откроем доступ первым из списка
              </h2>
              <div className="md:col-span-6 md:pt-4">
                <p className="mb-10 max-w-md">
                  Okno в разработке. Оставьте почту — напишем, когда можно будет
                  создать свою страницу записи.
                </p>
                <WaitlistForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="overflow-hidden px-4 pt-10 md:px-8">
        <div className="flex flex-wrap justify-between gap-4 border-t border-white/15 pt-4 text-sm">
          <span>Онлайн-запись к мастерам</span>
          <a href="#" className="hover:text-white">
            Наверх
          </a>
        </div>
        <p
          aria-hidden
          className="mt-8 -mb-[6vw] text-[44vw] leading-[0.75] font-semibold tracking-[-0.07em] text-white/10"
        >
          okno
        </p>
      </footer>
    </div>
  );
}
