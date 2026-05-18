import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  when?: boolean;
  color?: string;
  delay?: number;
  duration?: number;
  className?: string;
  children: ReactNode;
};

export function Highlight({
  when = true,
  color = "var(--color-accent)",
  delay = 0,
  duration = 0.55,
  className,
  children,
}: Props) {
  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        animate={{ scaleX: when ? 1 : 0 }}
        transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-[-0.15em] bottom-[0.08em] top-[0.55em] origin-left -z-0 rounded-md"
        style={{
          background: `color-mix(in srgb, ${color} 35%, transparent)`,
        }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}
