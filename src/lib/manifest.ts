import type { AppConfig } from "./db";
import { setPwaCookie } from "./pwa-cookie";

/**
 * Render an emoji to a PNG data URL at the specified size.
 * Used for apple-touch-icon (data URLs work in iOS DOM).
 */
export function emojiToPng(emoji: string, size: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.font = `${Math.floor(size * 0.75)}px serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, size / 2, size / 2);
  return canvas.toDataURL("image/png");
}

/**
 * Apply the dynamic manifest and PWA meta tags from user config.
 * - Syncs config to cookie (for server-side manifest route)
 * - Updates <link rel="manifest"> with cache-busting param
 * - Updates apple-touch-icon (data URL, works for iOS)
 * - Updates meta tags (theme-color, apple-mobile-web-app-title)
 */
export function applyManifest(config: AppConfig): void {
  // 1. Sync config to cookie for server-side manifest route
  setPwaCookie(config);

  // 2. Update <link rel="manifest"> with cache-busting param
  let manifestLink = document.querySelector(
    'link[rel="manifest"]',
  ) as HTMLLinkElement | null;
  if (!manifestLink) {
    manifestLink = document.createElement("link");
    manifestLink.rel = "manifest";
    document.head.appendChild(manifestLink);
  }
  manifestLink.href = `/api/manifest?v=${Date.now()}`;

  // 3. Update apple-touch-icon (data URL works for iOS)
  let iconSrc: string;
  if (config.icon.type === "image" && config.icon.imageDataUrl) {
    iconSrc = config.icon.imageDataUrl;
  } else if (config.icon.type === "emoji" && config.icon.emoji) {
    iconSrc = emojiToPng(config.icon.emoji, 180);
  } else {
    // Lucide or fallback: use letter-based icon via API route
    iconSrc = `/api/icon?letter=${encodeURIComponent(config.name.charAt(0))}&color=${encodeURIComponent(config.themeColor)}&size=180`;
  }

  let touchIcon = document.querySelector(
    'link[rel="apple-touch-icon"]',
  ) as HTMLLinkElement | null;
  if (!touchIcon) {
    touchIcon = document.createElement("link");
    touchIcon.rel = "apple-touch-icon";
    document.head.appendChild(touchIcon);
  }
  touchIcon.href = iconSrc;

  // 4. Update meta tags
  updateMetaTag("apple-mobile-web-app-title", config.name);
  updateMetaTag("apple-mobile-web-app-capable", "yes");
  updateMetaTag("apple-mobile-web-app-status-bar-style", "default");
  updateMetaTag("theme-color", config.themeColor);
}

function updateMetaTag(name: string, content: string): void {
  let meta = document.querySelector(
    `meta[name="${name}"]`,
  ) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}
