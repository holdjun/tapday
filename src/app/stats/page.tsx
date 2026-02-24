"use client";

import { BarChart3 } from "lucide-react";

export default function StatsPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 text-center">
      <BarChart3 className="text-muted-foreground h-16 w-16" />
      <h1 className="mt-6 text-2xl font-bold">统计</h1>
      <p className="text-muted-foreground mt-2">即将在 V1.1 上线</p>
    </div>
  );
}
