import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  when?: boolean;
  intensity?: number;
  className?: string;
  children: ReactNode;
};

export function Shake({ when = false, intensity = 6, className, children }: Props) {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (when) setPulse((n) => n + 1);
  }, [when]);

  return (
    <motion.span
      key={pulse}
      animate={
        when
          ? { x: [0, -intensity, intensity, -intensity, intensity, 0] }
          : { x: 0 }
      }
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </motion.span>
  );
}
