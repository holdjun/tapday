"use client";

import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 text-center">
      <Settings className="text-muted-foreground h-16 w-16" />
      <h1 className="mt-6 text-2xl font-bold">设置</h1>
      <p className="text-muted-foreground mt-2">即将在后续版本上线</p>
    </div>
  );
}
