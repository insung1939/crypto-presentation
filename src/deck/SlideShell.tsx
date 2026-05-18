import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  section?: string;
  title?: ReactNode;
  accent?: "btc" | "eth" | "stable" | "accent" | "warn" | "default";
  children: ReactNode;
};

const accentColor: Record<NonNullable<Props["accent"]>, string> = {
  btc: "var(--color-btc)",
  eth: "var(--color-eth)",
  stable: "var(--color-stable)",
  accent: "var(--color-accent)",
  warn: "var(--color-warn)",
  default: "var(--color-fg-muted)",
};

export function SlideShell({ section, title, accent = "default", children }: Props) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[var(--color-bg)] px-[7vw] pb-[7vh] pt-[6vh]">
      {(section || title) && (
        <header className="mb-[5vh] flex flex-col gap-3">
          {section && (
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-eyebrow"
              style={{ color: accentColor[accent] }}
            >
              {section}
            </motion.span>
          )}
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-h1 text-balance text-[var(--color-fg)]"
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
