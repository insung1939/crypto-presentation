import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slides } from "@/slides";
import { useDeckNav } from "./useDeckNav";
import { ProgressBar } from "./ProgressBar";

export function Deck() {
  const total = slides.length;

  const stepsFor = useMemo(
    () => (i: number) => slides[i]?.steps ?? 0,
    [],
  );

  const { slide, step } = useDeckNav({ total, stepsFor });

  const Current = slides[slide];

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[var(--color-bg)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Current step={step} />
        </motion.div>
      </AnimatePresence>
      <ProgressBar current={slide} total={total} />
    </div>
  );
}
