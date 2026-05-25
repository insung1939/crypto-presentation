import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Stagger } from "@/motion/Stagger";
import { Underline } from "@/motion/Underline";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";
import { BitcoinLogo } from "@/visuals/Logos";

const supports = [
  { k: "탄생", v: "2009", sub: "사토시 나카모토" },
  { k: "반감기", v: "4년", sub: "신규 발행량 ÷ 2" },
  { k: "현재 발행", v: "95%", sub: "2026.03 · 2,000만 개" },
  { k: "합의 방식", v: "PoW", sub: "약 10분 / 블록" },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell
      section="01 · 세 자산"
      title={
        <span className="inline-flex items-center gap-5">
          <motion.span
            initial={{ rotate: -8, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <BitcoinLogo size={56} />
          </motion.span>
          <span>비트코인 — 디지털 금</span>
        </span>
      }
      accent="btc"
    >
      <Reveal>
        <p className="max-w-[68ch] text-lead text-fg-muted text-pretty">
          세계 최초의 <span className="text-fg">탈중앙화 디지털 자산</span>.
          중앙기관 없이 개인 간 직접 거래가 가능하다.
        </p>
      </Reveal>

      {/* Hero — scarcity */}
      <Reveal delay={0.25} duration={0.85}>
        <div className="mt-10 overflow-hidden rounded-3xl border border-btc/30 bg-btc/[0.06] p-8">
          <div className="flex items-center justify-between gap-8">
            <div>
              <div className="text-eyebrow text-btc">희소성 · 영구 고정</div>
              <div className="mt-4 flex items-baseline gap-3 leading-none">
                <span className="text-[6.5rem] font-bold tracking-tight text-btc">
                  2,100만
                </span>
                <span className="text-h2 font-semibold text-btc/80">개</span>
              </div>
              <div className="mt-4 text-h3 text-fg-muted leading-snug max-w-[44ch]">
                더 이상 찍어낼 수 없다. 법정화폐와의{" "}
                <Underline when={step >= 1} color="var(--color-btc)" delay={0.25}>
                  가장 큰 차이
                </Underline>
                .
              </div>
            </div>

            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="shrink-0"
            >
              <BitcoinLogo size={120} />
            </motion.div>
          </div>
        </div>
      </Reveal>

      {/* Supporting facts row */}
      <Stagger delay={0.7} step={0.1} className="mt-8 grid grid-cols-4 gap-4">
        {supports.map((f) => (
          <div
            key={f.k}
            className="rounded-2xl border border-border bg-surface-1 p-5"
          >
            <div className="text-micro text-fg-faint">{f.k}</div>
            <div className="mt-2 text-h2 font-bold text-fg leading-none">
              {f.v}
            </div>
            <div className="mt-2 text-caption text-fg-dim leading-snug">
              {f.sub}
            </div>
          </div>
        ))}
      </Stagger>

      {/* Payoff */}
      <Reveal delay={1.25} duration={0.8}>
        <p className="mt-9 text-h3 leading-snug text-pretty">
          변동성이 큰 만큼 일상 결제가 아닌{" "}
          <Highlight when={step >= 2} color="var(--color-btc)" delay={0.15}>
            장기 보유·가치 저장·담보 자산
          </Highlight>
          으로 자리잡았다 — 시장이 부르는 이름,{" "}
          <span className="font-semibold text-btc">디지털 금</span>.
        </p>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "bitcoin", title: "Bitcoin", section: "01" };
Slide.steps = 2;

export default Slide;
