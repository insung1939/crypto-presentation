import { motion } from "framer-motion";
import {
  Users,
  CreditCard,
  ShieldCheck,
  Smartphone,
  ArrowDown,
} from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";

const enablers = ["대규모 사용자 데이터", "디바이스 · OS", "결제 · 인증 인프라"];

const capabilities = [
  { en: "Distribution", ko: "유통", Icon: Users, detail: "대규모 사용자 기반 · 플랫폼 체류시간", color: "var(--color-eth)" },
  { en: "Monetization", ko: "수익화", Icon: CreditCard, detail: "결제 · 인증 인프라", color: "var(--color-accent)" },
  { en: "Trust", ko: "신뢰", Icon: ShieldCheck, detail: "금융업 · 수탁업 · 데이터 분석 역량", color: "var(--color-stable)" },
  { en: "Interface", ko: "접점", Icon: Smartphone, detail: "디바이스 · OS 통제력", color: "var(--color-btc)" },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell
      section="02 · Crypto 기반 주요 사업"
      title={
        <span style={{ wordBreak: "keep-all" }}>
          이 역할을 할 수 있는 주체 = <span className="text-accent">Big Tech</span>
        </span>
      }
      accent="accent"
    >
      {/* enablers Big Tech already owns (light) */}
      <Reveal>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-caption font-semibold text-fg-dim">이미 가진 것</span>
          {enablers.map((e) => (
            <span
              key={e}
              className="rounded-full border border-border bg-surface-1 px-4 py-1.5 text-caption text-fg-muted"
            >
              {e}
            </span>
          ))}
        </div>
      </Reveal>

      {/* connector */}
      <Reveal delay={0.3}>
        <div className="mt-4 flex justify-center">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={24} className="text-fg-faint" strokeWidth={2} />
          </motion.div>
        </div>
      </Reveal>

      {/* 4 capabilities (reveal on step ≥ 1) */}
      <div className="mt-4 grid grid-cols-4 gap-4">
        {capabilities.map((c, i) => (
          <Reveal key={c.en} when={step >= 1} delay={i * 0.1} y={18}>
            <div
              className="relative flex h-full flex-col items-center overflow-hidden rounded-2xl border bg-surface-1 p-5 text-center"
              style={{ borderColor: `color-mix(in srgb, ${c.color} 30%, transparent)` }}
            >
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -top-16 h-40 w-40 rounded-full blur-3xl"
                animate={{ opacity: [0.12, 0.26, 0.12] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                style={{ background: c.color }}
              />
              <div
                className="relative flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: `color-mix(in srgb, ${c.color} 16%, transparent)`, color: c.color }}
              >
                <c.Icon size={24} strokeWidth={1.8} />
              </div>
              <div className="relative mt-3 text-h3 font-bold" style={{ color: c.color }}>
                {c.en}
              </div>
              <div className="relative text-micro font-semibold text-fg-dim">{c.ko}</div>
              <div className="relative mt-2 text-caption text-fg-muted leading-snug" style={{ wordBreak: "keep-all" }}>
                {c.detail}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* conclusion (reveal on step ≥ 2) */}
      <Reveal when={step >= 2} delay={0.1} className="mt-auto pt-6">
        <div
          className="rounded-2xl border-2 px-7 py-5"
          style={{
            borderColor: "color-mix(in srgb, var(--color-accent) 38%, transparent)",
            background: "color-mix(in srgb, var(--color-accent) 7%, transparent)",
          }}
        >
          <p className="text-h3 font-semibold leading-snug text-fg" style={{ wordBreak: "keep-all" }}>
            Crypto 상용화 ={" "}
            <span className="text-accent">Distribution · Monetization · Trust · Interface</span>{" "}
            역량으로 대중의{" "}
            <Highlight when={step >= 2} color="var(--color-accent)" delay={0.3}>
              일상 사용성
            </Highlight>
            을 개선하는 것
          </p>
        </div>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "bigtech-role", title: "Big Tech Role", section: "02" };
Slide.steps = 2;

export default Slide;
