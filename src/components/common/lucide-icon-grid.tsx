"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "@/components/common/lucide-icon";

interface LucideIconGridProps {
  icons: readonly string[];
  selected?: string;
  themeColor?: string;
  columns?: number;
  onSelect: (name: string) => void;
}

export function LucideIconGrid({
  icons,
  selected,
  themeColor,
  columns = 6,
  onSelect,
}: LucideIconGridProps) {
  return (
    <div className="max-h-[280px] overflow-y-auto">
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {icons.map((name) => {
          const isSelected = selected === name;
          return (
            <motion.button
              key={name}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSelect(name)}
              className={`flex h-11 items-center justify-center rounded-xl transition-colors ${
                isSelected
                  ? "bg-gray-200 ring-2 ring-[var(--theme-color)] dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <LucideIcon
                name={name}
                className="h-5 w-5"
                style={{ color: isSelected ? themeColor : undefined }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
