"use client";

import { useAppConfig } from "@/hooks/use-app-config";
import { SetupWizard } from "@/components/setup/setup-wizard";
import type { AppConfig } from "@/lib/db";
import { applyManifest } from "@/lib/manifest";

export default function Home() {
  const { config, loading, updateConfig } = useAppConfig();

  if (loading) {
    return null;
  }

  if (!config.setupCompleted) {
    return (
      <SetupWizard
        onComplete={async (newConfig: AppConfig) => {
          await updateConfig(newConfig);
          applyManifest(newConfig);
        }}
      />
    );
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 text-center">
      <div className="text-6xl">
        {config.icon.type === "emoji"
          ? config.icon.emoji
          : config.icon.type === "lucide"
            ? config.icon.lucideIcon
            : "📅"}
      </div>
      <h1 className="mt-6 text-2xl font-bold">{config.name}</h1>
      <p className="text-muted-foreground mt-2">
        日历打卡视图即将在下一版本上线
      </p>
    </div>
  );
}
