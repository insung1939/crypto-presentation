import { motion } from "framer-motion";
import {
  TrendingUp,
  AlertCircle,
  Rocket,
  Users,
  CreditCard,
  ShieldCheck,
  Smartphone,
  ChevronRight,
} from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";

const flow = [
  {
    Icon: TrendingUp,
    title: "성숙한 Crypto 시장",
    body: "시장은 이미 상당한 성숙 단계에 진입",
    color: "var(--color-eth)",
  },
  {
    Icon: AlertCircle,
    title: "낮은 소비자 사용성",
    body: "결제·송금·투자·보관이 여전히 복잡",
    color: "var(--color-warn)",
  },
  {
    Icon: Rocket,
    title: "관건은 서비스 확장",
    body: "코인 발행·보유보다 일상 사용성 개선",
    color: "var(--color-stable)",
  },
];

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
      title="왜 Big Tech가 Crypto 상용화의 핵심인가"
      accent="accent"
    >
      {/* Step 1 — logical flow */}
      <div className="flex items-stretch gap-3">
        {flow.map((f, i) => (
          <div key={f.title} className="flex flex-1 items-center gap-3">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.18, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 rounded-2xl border bg-surface-1 px-5 py-4"
              style={{ borderColor: `color-mix(in srgb, ${f.color} 28%, transparent)` }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{ background: `color-mix(in srgb, ${f.color} 15%, transparent)`, color: f.color }}
                >
                  <f.Icon size={19} strokeWidth={1.9} />
                </div>
                <span className="text-h3 font-bold leading-tight text-fg">{f.title}</span>
              </div>
              <div className="mt-2 text-caption text-fg-muted leading-snug" style={{ wordBreak: "keep-all" }}>
                {f.body}
              </div>
            </motion.div>
            {i < flow.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.18 }}
              >
                <ChevronRight size={24} className="text-fg-faint" strokeWidth={2.2} />
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* transition */}
      <Reveal delay={0.7}>
        <p className="mt-6 text-center text-h3 font-semibold text-fg" style={{ wordBreak: "keep-all" }}>
          이 역할을 할 수 있는 주체가 <span className="text-accent">Big Tech</span>다 — 네 가지 역량 때문이다.
        </p>
      </Reveal>

      {/* Step 2 — capabilities (reveal on step ≥ 1) */}
      <div className="mt-5 grid grid-cols-4 gap-4">
        {capabilities.map((c, i) => (
          <Reveal key={c.en} when={step >= 1} delay={i * 0.1} y={18}>
            <div
              className="relative flex h-full flex-col items-center overflow-hidden rounded-2xl border bg-surface-1 p-5 text-center"
              style={{ borderColor: `color-mix(in srgb, ${c.color} 30%, transparent)` }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: `color-mix(in srgb, ${c.color} 16%, transparent)`, color: c.color }}
              >
                <c.Icon size={24} strokeWidth={1.8} />
              </div>
              <div className="mt-3 text-h3 font-bold" style={{ color: c.color }}>
                {c.en}
              </div>
              <div className="text-micro font-semibold text-fg-dim">{c.ko}</div>
              <div className="mt-2 text-caption text-fg-muted leading-snug" style={{ wordBreak: "keep-all" }}>
                {c.detail}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Step 3 — conclusion (reveal on step ≥ 2) */}
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
            <span className="text-accent">Distribution · Monetization · Trust · Interface</span> 역량으로
            대중의{" "}
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

Slide.meta = { id: "core-industry", title: "Core Industry", section: "02" };
Slide.steps = 2;

export default Slide;
