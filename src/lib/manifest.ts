import type { AppConfig } from "./db";

interface ManifestIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: string;
}

interface WebAppManifest {
  name: string;
  short_name: string;
  description: string;
  start_url: string;
  display: string;
  background_color: string;
  theme_color: string;
  icons: ManifestIcon[];
}

/**
 * Render an emoji to a PNG data URL at the specified size.
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
 * Generate icon data URLs for manifest from user config.
 */
function generateIcons(config: AppConfig): ManifestIcon[] {
  const sizes = [192, 512];
  return sizes.map((size) => {
    let src: string;
    if (config.icon.type === "image" && config.icon.imageDataUrl) {
      src = config.icon.imageDataUrl;
    } else {
      src = emojiToPng(config.icon.emoji ?? "📅", size);
    }
    return { src, sizes: `${size}x${size}`, type: "image/png" };
  });
}

/**
 * Generate a manifest JSON object from user config.
 */
export function generateManifest(config: AppConfig): WebAppManifest {
  return {
    name: config.name,
    short_name: config.name,
    description: `${config.name} — Powered by Tapday`,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: config.themeColor,
    icons: generateIcons(config),
  };
}

let currentBlobUrl: string | null = null;

/**
 * Apply the dynamic manifest to the document.
 * Creates a blob URL from the manifest JSON and updates the <link> tag.
 * Also updates iOS-specific meta tags.
 */
export function applyManifest(config: AppConfig): void {
  // Revoke previous blob URL to avoid memory leaks
  if (currentBlobUrl) {
    URL.revokeObjectURL(currentBlobUrl);
  }

  const manifest = generateManifest(config);
  const blob = new Blob([JSON.stringify(manifest)], {
    type: "application/manifest+json",
  });
  currentBlobUrl = URL.createObjectURL(blob);

  // Update or create <link rel="manifest">
  let manifestLink = document.querySelector(
    'link[rel="manifest"]',
  ) as HTMLLinkElement | null;
  if (!manifestLink) {
    manifestLink = document.createElement("link");
    manifestLink.rel = "manifest";
    document.head.appendChild(manifestLink);
  }
  manifestLink.href = currentBlobUrl;

  // Update iOS meta tags
  updateMetaTag("apple-mobile-web-app-title", config.name);
  updateMetaTag("apple-mobile-web-app-capable", "yes");
  updateMetaTag("apple-mobile-web-app-status-bar-style", "default");

  // Update apple-touch-icon
  const iconSrc =
    config.icon.type === "image" && config.icon.imageDataUrl
      ? config.icon.imageDataUrl
      : emojiToPng(config.icon.emoji ?? "📅", 180);

  let touchIcon = document.querySelector(
    'link[rel="apple-touch-icon"]',
  ) as HTMLLinkElement | null;
  if (!touchIcon) {
    touchIcon = document.createElement("link");
    touchIcon.rel = "apple-touch-icon";
    document.head.appendChild(touchIcon);
  }
  touchIcon.href = iconSrc;

  // Update theme-color meta
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
