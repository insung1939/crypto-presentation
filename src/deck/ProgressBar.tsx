import { motion } from "framer-motion";

type Props = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: Props) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex items-center gap-4 px-6 pb-4">
      <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/8">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent)]"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="font-mono text-[0.95rem] tabular-nums text-[var(--color-fg-dim)]">
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
}
