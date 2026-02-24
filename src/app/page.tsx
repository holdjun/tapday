"use client";

import { useAppConfig } from "@/hooks/use-app-config";

export default function Home() {
  const { config, loading } = useAppConfig();

  if (loading) {
    return null;
  }

  if (!config.setupCompleted) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center p-6 text-center">
        <div className="text-6xl">📅</div>
        <h1 className="mt-6 text-2xl font-bold">欢迎来到 Tapday</h1>
        <p className="text-muted-foreground mt-2">
          Setup 向导即将在下一版本上线
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 text-center">
      <div className="text-6xl">
        {config.icon.type === "emoji" ? config.icon.emoji : "📅"}
      </div>
      <h1 className="mt-6 text-2xl font-bold">{config.name}</h1>
      <p className="text-muted-foreground mt-2">
        日历打卡视图即将在下一版本上线
      </p>
    </div>
  );
}
