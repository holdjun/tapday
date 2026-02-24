"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { THEME_COLORS } from "@/lib/constants";

interface StepThemeProps {
  themeColor: string;
  onChange: (color: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepTheme({
  themeColor,
  onChange,
  onNext,
  onBack,
}: StepThemeProps) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-6xl"
      >
        🎨
      </motion.div>
      <h2 className="mt-8 text-2xl font-bold">选主题色</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        这个颜色会贯穿整个 App
      </p>

      <div className="mt-8 grid grid-cols-4 gap-4">
        {THEME_COLORS.map(({ name, value }) => {
          const isSelected = themeColor === value;
          return (
            <motion.button
              key={value}
              whileTap={{ scale: 0.9 }}
              onClick={() => onChange(value)}
              className="flex flex-col items-center gap-2"
            >
              <motion.div
                animate={isSelected ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-sm"
                style={{ backgroundColor: value }}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Check className="h-6 w-6 text-white" />
                  </motion.div>
                )}
              </motion.div>
              <span
                className={`text-xs ${isSelected ? "font-semibold" : "text-muted-foreground"}`}
              >
                {name}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Live preview bar */}
      <motion.div
        className="mt-8 w-full rounded-2xl p-4"
        style={{ backgroundColor: themeColor }}
        animate={{ backgroundColor: themeColor }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center text-sm font-semibold text-white">
          主题色预览
        </div>
      </motion.div>

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
          className="h-12 flex-1 rounded-2xl font-semibold text-white"
          style={{ backgroundColor: themeColor }}
        >
          完成
        </Button>
      </div>
    </div>
  );
}
