import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-4 p-4 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h2 className="text-xl font-semibold">Страница не найдена</h2>
      <p className="text-sm text-muted-foreground">
        Возможно, ссылка устарела или мастер сменил адрес страницы.
      </p>
      <Button asChild size="lg" className="h-11">
        <Link href="/">На главную</Link>
      </Button>
    </main>
  );
}
