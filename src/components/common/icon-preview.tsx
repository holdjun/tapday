"use client";

import { motion } from "framer-motion";
import type { IconConfig } from "@/lib/db";
import { LucideIcon } from "@/components/common/lucide-icon";

interface IconPreviewProps {
  icon: IconConfig;
  appName: string;
}

export function IconPreview({ icon, appName }: IconPreviewProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center"
    >
      {/* Phone-like frame */}
      <div className="rounded-3xl bg-gray-100 p-6 dark:bg-gray-800">
        <div className="flex flex-col items-center gap-2">
          {/* Icon */}
          <motion.div
            key={
              icon.type === "emoji"
                ? icon.emoji
                : icon.imageDataUrl?.slice(0, 20)
            }
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[18px] bg-white shadow-sm dark:bg-gray-700"
          >
            {icon.type === "image" && icon.imageDataUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={icon.imageDataUrl}
                alt="App icon"
                className="h-full w-full object-cover"
              />
            ) : icon.type === "lucide" && icon.lucideIcon ? (
              <LucideIcon name={icon.lucideIcon} className="h-8 w-8" />
            ) : (
              <span className="text-3xl">{icon.emoji || "📅"}</span>
            )}
          </motion.div>
          {/* App name */}
          <span className="max-w-[80px] truncate text-xs font-medium">
            {appName || "Tapday"}
          </span>
        </div>
      </div>
      <p className="text-muted-foreground mt-2 text-xs">桌面预览效果</p>
    </motion.div>
  );
}
