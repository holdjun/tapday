"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Download, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "@/components/common/lucide-icon";
import type { AppConfig } from "@/lib/db";

interface StepCompleteProps {
  config: AppConfig;
  onComplete: () => void;
}

function MarkerDisplay({ config }: { config: AppConfig }) {
  if (config.marker.type === "lucide" && config.marker.lucideIcon) {
    return (
      <LucideIcon
        name={config.marker.lucideIcon}
        className="h-5 w-5"
        style={{ color: config.themeColor }}
      />
    );
  }
  return <span className="text-lg">{config.marker.emoji || "✅"}</span>;
}

function IconDisplay({ config }: { config: AppConfig }) {
  if (config.icon.type === "image" && config.icon.imageDataUrl) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={config.icon.imageDataUrl}
        alt="icon"
        className="h-full w-full object-cover"
      />
    );
  }
  if (config.icon.type === "lucide" && config.icon.lucideIcon) {
    return <LucideIcon name={config.icon.lucideIcon} className="h-5 w-5" />;
  }
  return <span className="text-xl">{config.icon.emoji || "📅"}</span>;
}

type Platform = "ios" | "android" | "other";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return "ios";
  if (/Android/.test(ua)) return "android";
  return "other";
}

export function StepComplete({ config, onComplete }: StepCompleteProps) {
  const platform = useMemo(() => detectPlatform(), []);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onComplete();
    setSaved(true);
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-6xl"
      >
        🎉
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-2xl font-bold"
      >
        设置完成！
      </motion.h2>

      {/* Config summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 w-full space-y-3 rounded-2xl bg-gray-50 p-5 dark:bg-gray-800/50"
      >
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">名称</span>
          <span className="font-medium">{config.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">图标</span>
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-white dark:bg-gray-700">
            <IconDisplay config={config} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">打卡标记</span>
          <MarkerDisplay config={config} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">主题色</span>
          <div
            className="h-6 w-6 rounded-full"
            style={{ backgroundColor: config.themeColor }}
          />
        </div>
      </motion.div>

      {!saved ? (
        /* Step 1: Save config first */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 w-full"
        >
          <Button
            onClick={handleSave}
            className="h-12 w-full rounded-2xl text-base font-semibold text-white"
            style={{ backgroundColor: config.themeColor }}
          >
            开始打卡 →
          </Button>
        </motion.div>
      ) : (
        /* Step 2: After save, show install guide */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 w-full"
        >
          <div className="w-full rounded-2xl border border-dashed p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Download className="h-4 w-4" />
              添加到主屏幕
            </h3>
            {platform === "ios" ? (
              <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                点击 Safari 底部的{" "}
                <Share className="inline h-3.5 w-3.5 align-text-bottom" />{" "}
                分享按钮 → 选择「添加到主屏幕」
              </p>
            ) : platform === "android" ? (
              <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                点击浏览器菜单 → 选择「添加到主屏幕」或「安装应用」
              </p>
            ) : (
              <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
                在浏览器地址栏右侧点击安装图标，或在菜单中选择「安装应用」
              </p>
            )}
            <p className="text-muted-foreground mt-2 text-xs opacity-60">
              安装后桌面图标将显示你设置的名称和图标
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
