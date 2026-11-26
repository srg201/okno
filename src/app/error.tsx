"use client"; // Границы ошибок должны быть Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  useEffect(() => {
    // TODO: отправлять в Sentry, когда он будет подключён
    console.error(error);
  }, [error]);

  const digest =
    error instanceof Error && "digest" in error
      ? String((error as Error & { digest?: string }).digest ?? "")
      : "";

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 p-4 text-center">
      <h2 className="text-xl font-semibold">Что-то пошло не так</h2>
      <p className="text-sm text-muted-foreground">
        Попробуйте ещё раз. Если ошибка повторится, напишите нам.
      </p>
      {digest && (
        <p className="font-mono text-xs text-muted-foreground">
          Код ошибки: {digest}
        </p>
      )}
      <Button size="lg" className="h-11" onClick={() => retry()}>
        Попробовать снова
      </Button>
    </main>
  );
}
