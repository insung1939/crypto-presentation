import { motion } from "framer-motion";

type Props = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: Props) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex items-center gap-4 px-7 pb-5">
      <div className="relative h-[2px] flex-1 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 60%, white))",
          }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="font-mono text-micro tabular-nums text-fg-faint">
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
}
