import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";

type Pillar = {
  Icon: LucideIcon;
  label: string;
  detail: string;
};

type Props = {
  index: number;
  total: number;
  brand: string;
  brandColor: string;
  tagline: string;
  Logo: (p: { size?: number }) => JSX.Element;
  headline: ReactNode;
  body: ReactNode;
  pillars?: Pillar[];
};

export function CompanyShell({
  index,
  total,
  brand,
  brandColor,
  tagline,
  Logo,
  headline,
  body,
  pillars,
}: Props) {
  return (
    <SlideShell
      section={`03 · 빅테크 ${index}/${total}`}
      title={
        <span className="inline-flex items-center gap-5">
          <motion.span
            initial={{ rotate: -8, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Logo size={56} />
          </motion.span>
          <span>{brand}</span>
        </span>
      }
      accent="accent"
    >
      {/* Ambient brand glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-[10%] top-[-15%] h-[55vh] w-[55vh] rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.22 }}
        transition={{ duration: 1.2 }}
        style={{ background: brandColor }}
      />

      <Reveal>
        <div className="inline-flex items-center gap-3 rounded-full border border-border bg-white/[0.04] px-4 py-1.5">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: brandColor }}
          />
          <span
            className="text-eyebrow"
            style={{ color: brandColor }}
          >
            {tagline}
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.25} duration={0.85}>
        <div className="mt-8 text-h2 leading-snug text-pretty">{headline}</div>
      </Reveal>

      <Reveal delay={0.5} duration={0.8}>
        <div className="mt-8 max-w-[68ch] text-lead leading-relaxed text-fg-muted text-pretty">
          {body}
        </div>
      </Reveal>

      {pillars && pillars.length > 0 && (
        <div className="mt-10 grid grid-cols-3 gap-4">
          {pillars.map((p, i) => (
            <Reveal key={p.label} delay={0.75 + i * 0.1}>
              <div className="rounded-2xl border border-border bg-white/[0.025] p-5">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{
                      background: `color-mix(in srgb, ${brandColor} 18%, transparent)`,
                      color: brandColor,
                    }}
                  >
                    <p.Icon size={20} strokeWidth={1.7} />
                  </div>
                  <span className="text-caption font-semibold">{p.label}</span>
                </div>
                <div className="mt-3 text-caption text-fg-dim leading-snug">
                  {p.detail}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </SlideShell>
  );
}
