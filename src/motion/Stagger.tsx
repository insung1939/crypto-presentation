import { Children, ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  delay?: number;
  step?: number;
  y?: number;
  duration?: number;
  className?: string;
  children: ReactNode;
};

export function Stagger({
  delay = 0,
  step = 0.08,
  y = 10,
  duration = 0.65,
  className,
  children,
}: Props) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <motion.div
          initial={{ opacity: 0, y }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration,
            delay: delay + i * step,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}
