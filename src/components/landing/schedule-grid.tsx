// Пример недели мастера: занятые часы — серые, свободные «окна» — оранжевые.
// Это иллюстрация, а не реальные данные: подпись под сеткой говорит об этом.

const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const hours = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

// b — занято, f — свободное окно, пусто — нерабочее время
const week: Record<string, string> = {
  Пн: "bbfbbbbfb ",
  Вт: "bbbbfbbbbb",
  Ср: "fbbbbbfbb ",
  Чт: "bbbfbbbbbf",
  Пт: "bbbbbbbbfb",
  Сб: "bfbbbbb   ",
  Вс: "          ",
};

export function ScheduleGrid() {
  return (
    <figure className="w-full">
      <div
        className="grid border-t border-l border-black text-[11px] tabular-nums sm:text-xs"
        style={{ gridTemplateColumns: "2.75rem repeat(7, minmax(0, 1fr))" }}
      >
        <div className="border-r border-b border-black" />
        {days.map((d) => (
          <div
            key={d}
            className="border-r border-b border-black px-1.5 py-1 font-bold"
          >
            {d}
          </div>
        ))}
        {hours.map((h, row) => (
          <div key={h} className="contents">
            <div className="border-r border-b border-black px-1.5 py-1 text-neutral-500">
              {h}:00
            </div>
            {days.map((d) => {
              const cell = week[d][row];
              return (
                <div
                  key={d}
                  className={
                    "h-7 border-r border-b border-black sm:h-8 " +
                    (cell === "b"
                      ? "bg-neutral-200"
                      : cell === "f"
                        ? "bg-swiss px-1 py-0.5 font-bold text-white"
                        : "bg-white")
                  }
                >
                  {cell === "f" ? `${h}:00` : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <figcaption className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-neutral-600">
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-3 bg-swiss" /> свободное окно
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block size-3 bg-neutral-200" /> запись
        </span>
        <span>Пример недели мастера</span>
      </figcaption>
    </figure>
  );
}
