"use client";

import { useCallback, useEffect, useState } from "react";
import { type AppConfig, defaultConfig, getConfig, saveConfig } from "@/lib/db";
import { readPwaCookie } from "@/lib/pwa-cookie";

export function useAppConfig() {
  const [config, setConfig] = useState<AppConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConfig()
      .then((dbConfig) => {
        if (!dbConfig.setupCompleted) {
          // IndexedDB empty (new context) — check cookie for cross-context restore
          const cookieConfig = readPwaCookie();
          if (cookieConfig?.setupCompleted) {
            const restored = { ...defaultConfig, ...cookieConfig };
            saveConfig(restored).then(() => setConfig(restored));
            return;
          }
        }
        setConfig(dbConfig);
      })
      .finally(() => setLoading(false));
  }, []);

  const updateConfig = useCallback(async (updates: Partial<AppConfig>) => {
    const current = await getConfig();
    const newConfig = { ...current, ...updates };
    await saveConfig(newConfig);
    setConfig(newConfig);
  }, []);

  return { config, loading, updateConfig };
}
