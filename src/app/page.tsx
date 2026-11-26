import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Okno</CardTitle>
          <CardDescription>
            Онлайн-запись к мастерам: дёшево, просто и красиво.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="lg" className="h-11 w-full">
            Записаться
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
