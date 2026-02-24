"use client";

import { useEffect } from "react";
import type { AppConfig } from "@/lib/db";

/**
 * Apply theme color as a CSS custom property on :root.
 * This drives the accent color throughout the app.
 */
export function useTheme(config: AppConfig) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--theme-color", config.themeColor);

    // Dark mode
    if (config.darkMode === "dark") {
      root.classList.add("dark");
    } else if (config.darkMode === "light") {
      root.classList.remove("dark");
    } else {
      // System preference
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent | MediaQueryList) => {
        if (e.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      };
      handler(mq);
      mq.addEventListener(
        "change",
        handler as (e: MediaQueryListEvent) => void,
      );
      return () =>
        mq.removeEventListener(
          "change",
          handler as (e: MediaQueryListEvent) => void,
        );
    }
  }, [config.themeColor, config.darkMode]);
}
