"use client";

import { useEffect } from "react";
import type { AppConfig } from "@/lib/db";
import { applyManifest } from "@/lib/manifest";

interface ManifestUpdaterProps {
  config: AppConfig;
}

/**
 * Client component that keeps the PWA manifest in sync with user config.
 * Renders nothing — purely a side-effect component.
 */
export function ManifestUpdater({ config }: ManifestUpdaterProps) {
  useEffect(() => {
    if (config.setupCompleted) {
      applyManifest(config);
    }
  }, [config]);

  return null;
}
