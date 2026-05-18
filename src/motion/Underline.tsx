import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  when?: boolean;
  color?: string;
  thickness?: number;
  delay?: number;
  duration?: number;
  className?: string;
  children: ReactNode;
};

export function Underline({
  when = true,
  color = "var(--color-accent)",
  thickness = 4,
  delay = 0,
  duration = 0.6,
  className,
  children,
}: Props) {
  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      <span className="relative z-10">{children}</span>
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        animate={{ scaleX: when ? 1 : 0 }}
        transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 origin-left rounded-full"
        style={{
          height: thickness,
          background: color,
          bottom: -thickness - 2,
        }}
      />
    </span>
  );
}
