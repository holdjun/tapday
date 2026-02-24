"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

interface KeyboardInputProps {
  onSelect: (value: string) => void;
  quickPicks?: string[];
  selected?: string;
  maxLength?: number;
  hint?: string;
}

export function KeyboardInput({
  onSelect,
  quickPicks = [],
  selected,
  maxLength = 4,
  hint,
}: KeyboardInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (trimmed) {
      onSelect(trimmed);
      setValue("");
    }
  }, [value, onSelect]);

  return (
    <div>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="输入 emoji 或文字"
          className="h-10 flex-1 rounded-xl text-center text-lg"
          maxLength={maxLength}
        />
        <button
          onClick={handleSubmit}
          disabled={!value.trim()}
          className="text-muted-foreground hover:text-foreground shrink-0 rounded-xl px-3 text-sm font-medium transition-colors disabled:opacity-40"
        >
          确定
        </button>
      </div>
      {hint && (
        <p className="text-muted-foreground mt-2 text-center text-xs">{hint}</p>
      )}
      {quickPicks.length > 0 && (
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {quickPicks.map((emoji) => (
            <motion.button
              key={emoji}
              whileTap={{ scale: 0.85 }}
              onClick={() => onSelect(emoji)}
              className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl transition-colors ${
                selected === emoji
                  ? "bg-gray-200 ring-2 ring-[var(--theme-color)] dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {emoji}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
