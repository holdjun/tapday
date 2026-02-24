"use client";

import { useCallback, useRef } from "react";
import { ImagePlus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IconConfig } from "@/lib/db";
import { compressImage, readFileAsDataUrl } from "@/lib/icons";
import { IconPreview } from "@/components/common/icon-preview";
import { LucideIconGrid } from "@/components/common/lucide-icon-grid";
import { KeyboardInput } from "@/components/common/keyboard-input";
import { ICON_QUICK_PICKS, PRESET_ICONS } from "@/lib/constants";

interface StepIconProps {
  icon: IconConfig;
  appName: string;
  onChange: (icon: IconConfig) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepIcon({
  icon,
  appName,
  onChange,
  onNext,
  onBack,
}: StepIconProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const dataUrl = await readFileAsDataUrl(file);
      const compressed = await compressImage(dataUrl, 512);
      onChange({ type: "image", imageDataUrl: compressed });
    },
    [onChange],
  );

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6">
      <h2 className="text-2xl font-bold">选一个 App 图标</h2>
      <p className="text-muted-foreground mt-2 text-sm">它会出现在你的桌面上</p>

      {/* Preview */}
      <div className="mt-6">
        <IconPreview icon={icon} appName={appName} />
      </div>

      <Tabs defaultValue="preset" className="mt-6 w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="preset">预设图标</TabsTrigger>
          <TabsTrigger value="keyboard">键盘</TabsTrigger>
          <TabsTrigger value="upload">上传图片</TabsTrigger>
          <TabsTrigger value="ai" disabled>
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            AI
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preset" className="mt-4">
          <LucideIconGrid
            icons={PRESET_ICONS}
            selected={icon.type === "lucide" ? icon.lucideIcon : undefined}
            onSelect={handleLucideSelect}
          />
        </TabsContent>

        <TabsContent value="keyboard" className="mt-4">
          <KeyboardInput
            selected={icon.type === "emoji" ? icon.emoji : undefined}
            onSelect={handleEmojiSelect}
            quickPicks={ICON_QUICK_PICKS}
            hint="可以输入 emoji 也可以是字母"
          />
        </TabsContent>

        <TabsContent value="upload" className="mt-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="border-border flex w-full flex-col items-center gap-3 rounded-2xl border-2 border-dashed py-10 transition-colors hover:border-[var(--theme-color)]"
          >
            <ImagePlus className="text-muted-foreground h-10 w-10" />
            <span className="text-muted-foreground text-sm">
              点击上传图片，自动裁剪为正方形
            </span>
          </button>
        </TabsContent>

        <TabsContent value="ai" className="mt-4">
          <div className="text-muted-foreground flex flex-col items-center gap-2 py-10 text-sm">
            <Sparkles className="h-8 w-8" />
            <span>即将推出</span>
          </div>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
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
          disabled={!icon.emoji && !icon.imageDataUrl && !icon.lucideIcon}
          className="h-12 flex-1 rounded-2xl font-semibold"
          style={{ backgroundColor: "#f97316" }}
        >
          下一步
        </Button>
      </div>
    </div>
  );
}
