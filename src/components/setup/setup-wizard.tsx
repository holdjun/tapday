"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { AppConfig, IconConfig, MarkerConfig } from "@/lib/db";
import { defaultConfig } from "@/lib/db";
import { StepName } from "./step-name";
import { StepIcon } from "./step-icon";
import { StepMarker } from "./step-marker";
import { StepTheme } from "./step-theme";
import { StepComplete } from "./step-complete";

const TOTAL_STEPS = 4;

interface SetupWizardProps {
  onComplete: (config: AppConfig) => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export function SetupWizard({ onComplete }: SetupWizardProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [draft, setDraft] = useState<AppConfig>({
    ...defaultConfig,
    name: "",
  });

  const goNext = useCallback(() => {
    setDirection(1);
    setStep((s) => s + 1);
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  }, []);

  const updateDraft = useCallback((updates: Partial<AppConfig>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleComplete = useCallback(() => {
    onComplete({ ...draft, setupCompleted: true });
  }, [draft, onComplete]);

  const isComplete = step > TOTAL_STEPS - 1;

  return (
    <div className="flex min-h-svh flex-col">
      {/* Progress bar */}
      {!isComplete && (
        <div className="fixed top-0 right-0 left-0 z-50 px-6 pt-[calc(env(safe-area-inset-top)+12px)]">
          <div className="mx-auto flex max-w-md gap-1.5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: draft.themeColor || "#f97316" }}
                  initial={{ width: "0%" }}
                  animate={{ width: i <= step ? "100%" : "0%" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step content */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full"
          >
            {step === 0 && (
              <StepName
                value={draft.name}
                onChange={(name) => updateDraft({ name })}
                onNext={goNext}
              />
            )}
            {step === 1 && (
              <StepIcon
                icon={draft.icon}
                appName={draft.name}
                onChange={(icon: IconConfig) => updateDraft({ icon })}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {step === 2 && (
              <StepMarker
                marker={draft.marker}
                icon={draft.icon}
                themeColor={draft.themeColor}
                onChange={(marker: MarkerConfig) => updateDraft({ marker })}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {step === 3 && (
              <StepTheme
                themeColor={draft.themeColor}
                onChange={(themeColor) => updateDraft({ themeColor })}
                onNext={goNext}
                onBack={goBack}
              />
            )}
            {isComplete && (
              <StepComplete config={draft} onComplete={handleComplete} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
