import { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slides } from "@/slides";
import { startUpbitPolling } from "@/lib/useUpbitPrice";
import { useDeckNav } from "./useDeckNav";
import { ProgressBar } from "./ProgressBar";
import { HintOverlay } from "./HintOverlay";

export function Deck() {
  const total = slides.length;

  // Prefetch live BTC/ETH prices from the very first slide so slide 3
  // shows them instantly (cached) and then keeps updating live.
  useEffect(() => {
    startUpbitPolling();
  }, []);

  const stepsFor = useMemo(
    () => (i: number) => slides[i]?.steps ?? 0,
    [],
  );

  const { slide, step } = useDeckNav({ total, stepsFor });

  const Current = slides[slide];

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-bg">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide}
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Current step={step} />
        </motion.div>
      </AnimatePresence>
      <ProgressBar current={slide} total={total} />
      <HintOverlay />
    </div>
  );
}
