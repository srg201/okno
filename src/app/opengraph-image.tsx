import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "okno — онлайн-запись для мастера, который работает один";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const semiBold = await readFile(
  join(process.cwd(), "assets/Geist-SemiBold.ttf"),
);
const regular = await readFile(join(process.cwd(), "assets/Geist-Regular.ttf"));

// Превью для ссылок в Telegram, VK, WhatsApp и т. д. — в стиле первого экрана.
export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background:
          "radial-gradient(circle at 58% 32%, #ff4f00 0%, #7a1d00 26%, #000 58%)",
        color: "#c8c8c8",
        fontFamily: "Geist",
        padding: "56px 64px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          fontSize: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            maxWidth: 620,
            color: "#fff",
            lineHeight: 1.2,
          }}
        >
          Онлайн-запись для мастера, который работает один
        </div>
        <div
          style={{
            display: "flex",
            border: "2px solid rgba(255,255,255,0.6)",
            borderRadius: 9999,
            padding: "10px 26px",
            color: "#fff",
          }}
        >
          от $0 в месяц
        </div>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 470,
          fontWeight: 600,
          letterSpacing: -34,
          lineHeight: 0.75,
          color: "#fff",
          marginBottom: -40,
          marginLeft: -12,
        }}
      >
        okno
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Geist", data: regular, style: "normal", weight: 400 },
        { name: "Geist", data: semiBold, style: "normal", weight: 600 },
      ],
    },
  );
}
