"use client";

import { useCallback, useEffect, useState } from "react";
import { type AppConfig, defaultConfig, getConfig, saveConfig } from "@/lib/db";

export function useAppConfig() {
  const [config, setConfig] = useState<AppConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConfig()
      .then(setConfig)
      .finally(() => setLoading(false));
  }, []);

  const updateConfig = useCallback(
    async (updates: Partial<AppConfig>) => {
      const newConfig = { ...config, ...updates };
      setConfig(newConfig);
      await saveConfig(newConfig);
    },
    [config],
  );

  return { config, loading, updateConfig };
}
