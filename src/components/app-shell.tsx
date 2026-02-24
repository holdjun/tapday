"use client";

import { useAppConfig } from "@/hooks/use-app-config";
import { useTheme } from "@/hooks/use-theme";
import { ManifestUpdater } from "@/components/pwa/manifest-updater";
import { BottomNav } from "@/components/common/bottom-nav";

interface AppShellProps {
  children: React.ReactNode;
}

/**
 * Root client shell that provides:
 * - Config loading from IndexedDB
 * - Theme application
 * - Dynamic PWA manifest
 * - Bottom navigation
 *
 * Shows a loading skeleton until config is loaded.
 */
export function AppShell({ children }: AppShellProps) {
  const { config, loading } = useAppConfig();
  useTheme(config);

  if (loading) {
    return (
      <div className="bg-background flex min-h-svh items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--theme-color)]" />
      </div>
    );
  }

  return (
    <>
      <ManifestUpdater config={config} />
      <main className="min-h-svh pb-20">{children}</main>
      {config.setupCompleted && <BottomNav />}
    </>
  );
}
