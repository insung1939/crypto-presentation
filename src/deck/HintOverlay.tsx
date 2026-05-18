import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, ArrowLeftRight, ArrowUpDown } from "lucide-react";

const STORAGE_KEY = "crypto_presentation_hint_seen";

export function HintOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Show on every fresh page load — keynote-style "press F" guidance.
    const seenThisSession = sessionStorage.getItem(STORAGE_KEY);
    if (seenThisSession) return;
    setVisible(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
    const t = setTimeout(() => setVisible(false), 5200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none fixed left-1/2 top-7 z-30 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-5 rounded-full border border-border bg-surface-2 px-5 py-2.5 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <kbd className="rounded-md border border-border bg-surface-3 px-2 py-0.5 font-mono text-micro">
                F
              </kbd>
              <span className="inline-flex items-center gap-1.5 text-micro text-fg-muted">
                <Maximize2 size={14} /> Fullscreen
              </span>
            </div>
            <span className="h-3 w-px bg-fg-faint/40" />
            <div className="flex items-center gap-2">
              <ArrowLeftRight size={14} className="text-fg-dim" />
              <ArrowUpDown size={14} className="text-fg-dim" />
              <span className="text-micro text-fg-muted">탐색</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
