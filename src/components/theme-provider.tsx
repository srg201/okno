"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// На сервере скрипт темы должен исполняться (убирает мигание темы).
// На клиенте React 19 ругается на любой исполняемый <script>, поэтому там
// помечаем его как data-блок. У скрипта уже есть suppressHydrationWarning.
const scriptProps =
  typeof window === "undefined" ? undefined : { type: "application/json" };

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider scriptProps={scriptProps} {...props}>
      {children}
    </NextThemesProvider>
  );
}
