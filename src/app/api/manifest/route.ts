import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { parsePwaCookieFromHeader } from "@/lib/pwa-cookie";

export async function GET() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
  const data = parsePwaCookieFromHeader(cookieHeader);

  const name = data?.n || "Tapday";
  const themeColor = data?.t || "#f97316";
  const emoji = data?.e || "📅";
  const iconType = data?.it || "emoji";

  // For uploaded images, fall back to letter-based icon
  const iconParam =
    iconType === "emoji" && emoji
      ? `emoji=${encodeURIComponent(emoji)}`
      : `letter=${encodeURIComponent(name.charAt(0))}&color=${encodeURIComponent(themeColor)}`;

  const manifest = {
    name,
    short_name: name,
    description: `${name} — Powered by Tapday`,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: themeColor,
    icons: [
      {
        src: `/api/icon?${iconParam}&size=192`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `/api/icon?${iconParam}&size=512`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };

  return NextResponse.json(manifest, {
    headers: {
      "Content-Type": "application/manifest+json",
      "Cache-Control": "no-cache",
    },
  });
}
