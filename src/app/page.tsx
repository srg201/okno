import { SiteHeader } from "@/components/site-header";
import { ScheduleGrid } from "@/components/landing/schedule-grid";
import { WaitlistForm } from "@/components/landing/waitlist-form";

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
    text: "Телефон, Apple, Google или Telegram. Без пароля и без анкеты.",
  },
  {
    title: "Готово",
    text: "Запись в вашем календаре, напоминание уходит клиенту само.",
  },
];

const features = [
  {
    title: "Своя страница записи",
    text: "Адрес вида okno/имя. Услуги, цены, адрес и свободное время — ссылку можно поставить в шапку профиля.",
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

function Folio({ n, title, id }: { n: string; title: string; id?: string }) {
  return (
    <div
      id={id}
      className="grid scroll-mt-20 gap-2 border-t border-black pt-4 md:grid-cols-12"
    >
      <span className="text-6xl leading-none font-bold text-swiss tabular-nums md:col-span-3 md:text-8xl">
        {n}
      </span>
      <h2 className="text-3xl leading-tight font-bold tracking-tight md:col-span-9 md:text-5xl">
        {title}
      </h2>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-white font-swiss text-black">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl gap-12 px-4 pt-12 pb-20 md:grid-cols-12 md:px-8 md:pt-20">
          <div className="md:col-span-6">
            <p className="mb-6 text-sm">
              Онлайн-запись для барберов, мастеров маникюра и репетиторов
            </p>
            <h1 className="text-5xl leading-[0.95] font-bold tracking-tighter md:text-7xl">
              Клиенты сами
              <br />
              находят ваши
              <br />
              <span className="text-swiss">окна.</span>
            </h1>
            <p className="mt-8 max-w-md text-lg leading-snug">
              Страница записи, календарь и напоминания в Telegram для мастера,
              который работает один. От $0 в месяц, без оплаты за год вперёд.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#waitlist"
                className="flex h-12 items-center bg-swiss px-6 font-bold text-white hover:bg-black"
              >
                Встать в лист ожидания
              </a>
              <a
                href="#how"
                className="flex h-12 items-center border border-black px-6 hover:bg-black hover:text-white"
              >
                Как это работает
              </a>
            </div>
          </div>
          <div className="md:col-span-6 md:pt-10">
            <ScheduleGrid />
          </div>
        </section>

        {/* 01 How */}
        <section className="mx-auto max-w-6xl px-4 pb-24 md:px-8">
          <Folio
            n="01"
            id="how"
            title="Запись — пять шагов, вход только в конце"
          />
          <ol className="mt-10 grid border-l border-black sm:grid-cols-2 md:grid-cols-5">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="border-r border-b border-black p-5 md:border-t"
              >
                <span className="text-4xl font-bold tabular-nums">{i + 1}</span>
                <h3 className="mt-6 font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-snug text-neutral-700">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* 02 Features */}
        <section className="mx-auto max-w-6xl px-4 pb-24 md:px-8">
          <Folio
            n="02"
            id="features"
            title="Всё, что нужно одному мастеру. Ничего лишнего."
          />
          <div className="mt-10 grid gap-px border border-black bg-black sm:grid-cols-2 md:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="bg-white p-6">
                <h3 className="text-xl font-bold tracking-tight">{f.title}</h3>
                <p className="mt-3 leading-snug text-neutral-700">{f.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-neutral-600">
            Склада, телефонии и расчёта зарплат нет — они нужны салону, а не
            мастеру. Для салонов будет тариф Team.
          </p>
        </section>

        {/* 03 Pricing */}
        <section className="mx-auto max-w-6xl px-4 pb-24 md:px-8">
          <Folio n="03" id="pricing" title="Цена, которую мастер не замечает" />
          <div className="mt-10 grid border-l border-black md:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={
                  "flex flex-col border-t border-r border-b border-black p-6 " +
                  (p.accent ? "bg-black text-white" : "")
                }
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-2xl font-bold">{p.name}</h3>
                  <span
                    className={
                      "text-sm " +
                      (p.accent ? "text-white/70" : "text-neutral-600")
                    }
                  >
                    {p.for}
                  </span>
                </div>
                <p className="mt-8 text-6xl font-bold tracking-tighter tabular-nums">
                  {p.price}
                </p>
                <p
                  className={
                    "mt-1 text-sm " +
                    (p.accent ? "text-white/70" : "text-neutral-600")
                  }
                >
                  {p.period}
                </p>
                <ul className="mt-8 grid gap-2 text-sm">
                  {p.items.map((it) => (
                    <li
                      key={it}
                      className={
                        "border-t pt-2 " +
                        (p.accent ? "border-white/30" : "border-black/20")
                      }
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 04 Comparison */}
        <section className="mx-auto max-w-6xl px-4 pb-24 md:px-8">
          <Folio n="04" title="Если вы сейчас в YCLIENTS" />
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-black">
                  <th className="w-1/3 py-3 pr-4 font-normal text-neutral-600" />
                  <th className="py-3 pr-4 text-lg font-bold text-swiss">
                    Okno
                  </th>
                  <th className="py-3 text-lg font-bold">YCLIENTS</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.label} className="border-b border-black">
                    <td className="py-4 pr-4 text-sm text-neutral-600">
                      {row.label}
                    </td>
                    <td className="py-4 pr-4 font-bold">{row.okno}</td>
                    <td className="py-4">{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-600">
            Цены YCLIENTS — с{" "}
            <a
              href="https://www.yclients.ru/info/pricing"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              yclients.ru/info/pricing
            </a>{" "}
            на 26 ноября 2026 года.
          </p>
        </section>

        {/* 05 Waitlist */}
        <section id="waitlist" className="scroll-mt-16 bg-black text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-12 md:px-8">
            <div className="md:col-span-5">
              <span className="text-6xl leading-none font-bold text-swiss md:text-8xl">
                05
              </span>
              <h2 className="mt-4 text-3xl leading-tight font-bold tracking-tight md:text-5xl">
                Откроем доступ первым из списка
              </h2>
              <p className="mt-6 max-w-sm text-white/70">
                Okno в разработке. Оставьте почту — напишем, когда можно будет
                создать свою страницу записи.
              </p>
            </div>
            <div className="md:col-span-7 md:pt-4">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm md:px-8">
        <span className="font-bold">Okno</span>
        <span className="text-neutral-600">Онлайн-запись к мастерам</span>
      </footer>
    </div>
  );
}
