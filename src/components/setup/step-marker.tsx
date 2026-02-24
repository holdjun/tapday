"use client";

import { useCallback } from "react";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideIcon } from "@/components/common/lucide-icon";
import { LucideIconGrid } from "@/components/common/lucide-icon-grid";
import { KeyboardInput } from "@/components/common/keyboard-input";
import type { IconConfig, MarkerConfig } from "@/lib/db";
import { MARKER_QUICK_PICKS, PRESET_ICONS } from "@/lib/constants";

interface StepMarkerProps {
  marker: MarkerConfig;
  icon: IconConfig;
  themeColor: string;
  onChange: (marker: MarkerConfig) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepMarker({
  marker,
  icon,
  themeColor,
  onChange,
  onNext,
  onBack,
}: StepMarkerProps) {
  const previewDays = [3, 5, 7, 8, 12, 14, 15];

  const handleLucideSelect = useCallback(
    (name: string) => {
      onChange({ type: "lucide", lucideIcon: name });
    },
    [onChange],
  );

  const handleEmojiSelect = useCallback(
    (emoji: string) => {
      onChange({ type: "emoji", emoji });
    },
    [onChange],
  );

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6">
      <h2 className="text-2xl font-bold">选打卡标记</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        打卡后日历上显示的标记样式
      </p>

      {/* Calendar preview */}
      <div className="mt-6 w-full rounded-2xl bg-gray-50 p-4 dark:bg-gray-800/50">
        <div className="mb-2 text-center text-xs font-medium text-gray-500">
          预览效果
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["一", "二", "三", "四", "五", "六", "日"].map((d) => (
            <div
              key={d}
              className="text-muted-foreground text-center text-[10px]"
            >
              {d}
            </div>
          ))}
          {Array.from({ length: 21 }, (_, i) => i + 1).map((day) => {
            const isMarked = previewDays.includes(day);
            return (
              <div
                key={day}
                className="flex h-8 items-center justify-center rounded-lg text-xs"
              >
                {isMarked ? (
                  <motion.span
                    key={`${marker.type}-${marker.emoji}-${marker.lucideIcon}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 15,
                      delay: day * 0.02,
                    }}
                    className="flex items-center justify-center"
                  >
                    {marker.type === "lucide" && marker.lucideIcon ? (
                      <LucideIcon
                        name={marker.lucideIcon}
                        className="h-4 w-4"
                        style={{ color: themeColor }}
                      />
                    ) : (
                      <span className="text-sm">
                        {marker.emoji ||
                          (icon.type === "emoji" ? icon.emoji : "✅")}
                      </span>
                    )}
                  </motion.span>
                ) : (
                  <span className="text-muted-foreground/40">{day}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Tabs defaultValue="svg" className="mt-6 w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="svg">预设图标</TabsTrigger>
          <TabsTrigger value="keyboard">键盘</TabsTrigger>
          <TabsTrigger value="ai" disabled>
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            AI
          </TabsTrigger>
        </TabsList>

        <TabsContent value="svg" className="mt-4">
          <LucideIconGrid
            icons={PRESET_ICONS}
            selected={marker.type === "lucide" ? marker.lucideIcon : undefined}
            themeColor={themeColor}
            onSelect={handleLucideSelect}
          />
        </TabsContent>

        <TabsContent value="keyboard" className="mt-4">
          <KeyboardInput
            selected={marker.type === "emoji" ? marker.emoji : undefined}
            onSelect={handleEmojiSelect}
            quickPicks={MARKER_QUICK_PICKS}
          />
        </TabsContent>

        <TabsContent value="ai" className="mt-4">
          <div className="text-muted-foreground flex flex-col items-center gap-2 py-10 text-sm">
            <Sparkles className="h-8 w-8" />
            <span>即将推出</span>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex w-full gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="h-12 flex-1 rounded-2xl"
        >
          上一步
        </Button>
        <Button
          onClick={onNext}
          className="h-12 flex-1 rounded-2xl font-semibold"
          style={{ backgroundColor: themeColor }}
        >
          下一步
        </Button>
      </div>
    </div>
  );
}
