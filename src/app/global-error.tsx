"use client"; // Границы ошибок должны быть Client Components

import "./globals.css";

// Заменяет корневой layout при ошибке, поэтому сам рендерит <html> и <body>.
export default function GlobalError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  console.error(error);

  return (
    <html lang="ru">
      <body className="flex min-h-dvh flex-col items-center justify-center gap-4 p-4 text-center font-sans antialiased">
        <title>Ошибка — Okno</title>
        <h2 className="text-xl font-semibold">Сервис временно недоступен</h2>
        <p className="text-sm text-muted-foreground">
          Мы уже знаем о проблеме. Попробуйте обновить страницу.
        </p>
        <button
          onClick={() => retry()}
          className="h-11 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground"
        >
          Попробовать снова
        </button>
      </body>
    </html>
  );
}
