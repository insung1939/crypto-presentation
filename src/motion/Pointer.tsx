import { motion } from "framer-motion";

type Props = {
  when?: boolean;
  size?: number;
  color?: string;
  direction?: "down" | "right" | "left" | "up";
  className?: string;
};

const rotation: Record<NonNullable<Props["direction"]>, number> = {
  down: 0,
  right: -90,
  left: 90,
  up: 180,
};

export function Pointer({
  when = true,
  size = 36,
  color = "var(--color-accent)",
  direction = "down",
  className,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={when ? { opacity: 1, y: [0, 8, 0] } : { opacity: 0, y: -10 }}
      transition={{
        opacity: { duration: 0.3 },
        y: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
      }}
      style={{ width: size, height: size, color, rotate: rotation[direction] }}
      className={className}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </motion.div>
  );
}
