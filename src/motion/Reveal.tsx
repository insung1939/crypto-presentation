import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  when?: boolean;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  blur?: boolean;
  className?: string;
  children: ReactNode;
};

export function Reveal({
  when = true,
  delay = 0,
  duration = 0.7,
  y = 10,
  x = 0,
  blur = false,
  className,
  children,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y,
        x,
        filter: blur ? "blur(8px)" : "blur(0px)",
      }}
      animate={
        when
          ? { opacity: 1, y: 0, x: 0, filter: "blur(0px)" }
          : { opacity: 0, y, x, filter: blur ? "blur(8px)" : "blur(0px)" }
      }
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
