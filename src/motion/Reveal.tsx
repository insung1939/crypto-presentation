import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  when?: boolean;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  className?: string;
  children: ReactNode;
};

export function Reveal({
  when = true,
  delay = 0,
  duration = 0.55,
  y = 16,
  x = 0,
  className,
  children,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      animate={when ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
