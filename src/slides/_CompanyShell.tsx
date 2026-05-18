import { ReactNode } from "react";
import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";

type Props = {
  index: number;
  total: number;
  brand: string;
  brandColor: string;
  tagline: string;
  headline: ReactNode;
  body: ReactNode;
};

export function CompanyShell({
  index,
  total,
  brand,
  brandColor,
  tagline,
  headline,
  body,
}: Props) {
  return (
    <SlideShell section={`03 · 빅테크 ${index}/${total}`} title={brand} accent="accent">
      <div className="mt-2 flex flex-1 flex-col">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-20 right-[-10%] h-[60vh] w-[60vh] rounded-full opacity-30 blur-3xl"
          style={{ background: brandColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ duration: 1 }}
        />
        <Reveal>
          <div className="inline-flex items-center gap-3">
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ background: brandColor }}
            />
            <span
              className="text-[1.3rem] font-semibold tracking-wide uppercase"
              style={{ color: brandColor }}
            >
              {tagline}
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 text-[2.4rem] font-bold leading-snug text-pretty">
            {headline}
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="mt-10 text-[1.4rem] leading-relaxed text-[var(--color-fg-muted)] text-pretty">
            {body}
          </div>
        </Reveal>
      </div>
    </SlideShell>
  );
}
