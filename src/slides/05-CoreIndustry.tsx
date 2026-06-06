import { motion } from "framer-motion";
import { Users, CreditCard, ShieldCheck, Smartphone, ArrowDown } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";

const frictions = ["결제", "송금", "투자", "보관"];

const capabilities = [
  {
    en: "Distribution",
    ko: "유통",
    Icon: Users,
    detail: "대규모 사용자 기반 · 플랫폼 체류시간",
    color: "var(--color-eth)",
  },
  {
    en: "Monetization",
    ko: "수익화",
    Icon: CreditCard,
    detail: "결제 · 인증 인프라",
    color: "var(--color-accent)",
  },
  {
    en: "Trust",
    ko: "신뢰",
    Icon: ShieldCheck,
    detail: "금융업 · 수탁 · 데이터 분석 역량",
    color: "var(--color-stable)",
  },
  {
    en: "Interface",
    ko: "접점",
    Icon: Smartphone,
    detail: "디바이스 · OS 통제력",
    color: "var(--color-btc)",
  },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell
      section="02 · Crypto 기반 주요 사업"
      title={
        <>
          Crypto 상용화의 열쇠 = <span className="text-accent">Big Tech</span>
        </>
      }
      accent="accent"
    >
      {/* Problem */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <p
            className="text-h3 font-semibold leading-snug text-fg"
            style={{ wordBreak: "keep-all" }}
          >
            Crypto 시장은 성숙했지만, 일반 소비자에겐 여전히 멀다 —
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {frictions.map((f, i) => (
              <motion.span
                key={f}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                className="rounded-full border border-warn/35 bg-warn/[0.08] px-3.5 py-1 text-caption font-semibold text-warn"
              >
                {f}
              </motion.span>
            ))}
            <span className="text-body text-fg-muted">이 모두 복잡하고 어렵다.</span>
          </div>
        </div>
      </Reveal>

      {/* Capabilities */}
      <div className="mt-9 grid grid-cols-4 gap-4">
        {capabilities.map((c, i) => (
          <motion.div
            key={c.en}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.6 + i * 0.12,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex flex-col items-center overflow-hidden rounded-3xl border bg-surface-1 p-6 text-center"
            style={{
              borderColor: `color-mix(in srgb, ${c.color} 30%, transparent)`,
            }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -top-16 h-40 w-40 rounded-full blur-3xl"
              animate={{ opacity: [0.14, 0.28, 0.14] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              style={{ background: c.color }}
            />
            <div
              className="relative flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                background: `color-mix(in srgb, ${c.color} 16%, transparent)`,
                color: c.color,
              }}
            >
              <c.Icon size={28} strokeWidth={1.8} />
            </div>
            <div
              className="relative mt-4 text-h3 font-bold"
              style={{ color: c.color }}
            >
              {c.en}
            </div>
            <div className="relative text-caption font-semibold text-fg-dim">
              {c.ko}
            </div>
            <div
              className="relative mt-3 text-caption text-fg-muted leading-snug"
              style={{ wordBreak: "keep-all" }}
            >
              {c.detail}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Convergence */}
      <Reveal delay={1.15}>
        <div className="mt-7 flex flex-col items-center">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={26} className="text-fg-faint" strokeWidth={2} />
          </motion.div>
          <div
            className="mt-3 rounded-2xl px-7 py-4 text-h2 font-bold"
            style={{
              background: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
              color: "var(--color-accent)",
            }}
          >
            <Highlight when={step >= 1} color="var(--color-accent)" delay={0.2}>
              Crypto의 일상 사용성
            </Highlight>{" "}
            개선
          </div>
        </div>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "core-industry", title: "Core Industry", section: "02" };
Slide.steps = 1;

export default Slide;
