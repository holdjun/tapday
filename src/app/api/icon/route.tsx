import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const emoji = searchParams.get("emoji");
  const letter = searchParams.get("letter");
  const color = searchParams.get("color") || "#f97316";
  const size = Number(searchParams.get("size") || "192");

  if (emoji) {
    return new ImageResponse(
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: size * 0.2,
          fontSize: size * 0.65,
        }}
      >
        {emoji}
      </div>,
      { width: size, height: size },
    );
  }

  if (letter) {
    return new ImageResponse(
      <div
        style={{
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: color,
          borderRadius: size * 0.2,
          fontSize: size * 0.5,
          fontWeight: 700,
          color: "white",
        }}
      >
        {letter.charAt(0).toUpperCase()}
      </div>,
      { width: size, height: size },
    );
  }

  // Fallback: default calendar emoji
  return new ImageResponse(
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: size * 0.2,
        fontSize: size * 0.65,
      }}
    >
      📅
    </div>,
    { width: size, height: size },
  );
}
