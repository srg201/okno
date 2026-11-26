import Link from "next/link";
import { AuthButtons } from "@/components/auth/auth-buttons";

const nav = [
  { href: "#masters", label: "Для кого" },
  { href: "#how", label: "Как работает" },
  { href: "#features", label: "Возможности" },
  { href: "#pricing", label: "Цены" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 text-white mix-blend-difference">
      <div className="flex h-16 items-center justify-between gap-6 px-4 md:px-8">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          okno
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:opacity-60">
              {item.label}
            </a>
          ))}
        </nav>
        <AuthButtons />
      </div>
    </header>
  );
}
