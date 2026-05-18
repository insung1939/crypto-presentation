import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  focused: boolean;
  dimOpacity?: number;
  scale?: number;
  className?: string;
  children: ReactNode;
};

export function FocusDim({
  focused,
  dimOpacity = 0.25,
  scale = 1.0,
  className,
  children,
}: Props) {
  return (
    <motion.div
      animate={{
        opacity: focused ? 1 : dimOpacity,
        scale: focused ? scale : 0.98,
        filter: focused ? "blur(0px)" : "blur(0.5px)",
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
