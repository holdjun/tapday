import type { AppConfig } from "./db";

interface PwaCookieData {
  /** name */
  n: string;
  /** themeColor */
  t: string;
  /** iconType */
  it: "emoji" | "image" | "lucide";
  /** emoji */
  e?: string;
  /** iconLucideIcon */
  il?: string;
  /** markerType */
  mt: "emoji" | "lucide";
  /** markerEmoji */
  me?: string;
  /** markerLucideIcon */
  ml?: string;
  /** setupCompleted */
  s: boolean;
}

const COOKIE_NAME = "tapday-pwa";
const MAX_AGE = 365 * 24 * 60 * 60; // 1 year

export function setPwaCookie(config: AppConfig): void {
  const data: PwaCookieData = {
    n: config.name,
    t: config.themeColor,
    it: config.icon.type,
    e: config.icon.emoji,
    il: config.icon.lucideIcon,
    mt: config.marker.type,
    me: config.marker.emoji,
    ml: config.marker.lucideIcon,
    s: config.setupCompleted,
  };
  const encoded = encodeURIComponent(JSON.stringify(data));
  document.cookie = `${COOKIE_NAME}=${encoded}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
}

export function readPwaCookie(): Partial<AppConfig> | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;

  try {
    const data: PwaCookieData = JSON.parse(
      decodeURIComponent(match.split("=").slice(1).join("=")),
    );
    return {
      name: data.n,
      themeColor: data.t,
      icon: {
        type: data.it,
        emoji: data.e,
        lucideIcon: data.il,
      },
      marker: {
        type: data.mt,
        emoji: data.me,
        lucideIcon: data.ml,
      },
      setupCompleted: data.s,
    };
  } catch {
    return null;
  }
}

/**
 * Parse the tapday-pwa cookie from a raw Cookie header string (server-side).
 */
export function parsePwaCookieFromHeader(
  cookieHeader: string,
): PwaCookieData | null {
  const match = cookieHeader
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;

  try {
    return JSON.parse(
      decodeURIComponent(match.split("=").slice(1).join("=")),
    ) as PwaCookieData;
  } catch {
    return null;
  }
}
