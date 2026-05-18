import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  section?: string;
  title?: string;
  accent?: "btc" | "eth" | "stable" | "accent" | "default";
  children: ReactNode;
};

const accentColor: Record<NonNullable<Props["accent"]>, string> = {
  btc: "var(--color-btc)",
  eth: "var(--color-eth)",
  stable: "var(--color-stable)",
  accent: "var(--color-accent)",
  default: "var(--color-fg-muted)",
};

export function SlideShell({ section, title, accent = "default", children }: Props) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[var(--color-bg)] px-[6vw] py-[5vh]">
      {(section || title) && (
        <header className="mb-[3vh] flex items-baseline gap-6">
          {section && (
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[1.4rem] font-semibold tracking-wide uppercase"
              style={{ color: accentColor[accent] }}
            >
              {section}
            </motion.span>
          )}
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="text-balance text-[3.2rem] font-bold leading-tight"
            >
              {title}
            </motion.h1>
          )}
        </header>
      )}
      <div className="relative flex flex-1 flex-col">{children}</div>
    </div>
  );
}
