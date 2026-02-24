"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PLACEHOLDER_NAMES } from "@/lib/constants";

interface StepNameProps {
  value: string;
  onChange: (name: string) => void;
  onNext: () => void;
}

export function StepName({ value, onChange, onNext }: StepNameProps) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDER_NAMES.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && value.trim()) {
      onNext();
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="text-6xl"
      >
        ✏️
      </motion.div>
      <h2 className="mt-8 text-2xl font-bold">给你的打卡起个名字</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        这个名字会成为你的专属 App 名称
      </p>
      <div className="relative mt-8 w-full">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={PLACEHOLDER_NAMES[placeholderIndex]}
          className={cn(
            "h-14 rounded-2xl text-center text-lg",
            value ? "caret-current" : "caret-transparent",
          )}
          maxLength={20}
        />
      </div>
      <Button
        onClick={onNext}
        disabled={!value.trim()}
        className="mt-8 h-12 w-full rounded-2xl text-base font-semibold"
        style={{
          backgroundColor: value.trim() ? "#f97316" : undefined,
        }}
      >
        下一步
      </Button>
    </div>
  );
}
