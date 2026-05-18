import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Stagger } from "@/motion/Stagger";
import { Underline } from "@/motion/Underline";
import { SlideComponent } from "@/deck/types";
import { BitcoinLogo } from "@/visuals/Logos";

const facts = [
  { label: "공급량", value: "2,100만", unit: "개 고정", hint: "법정화폐와 달리 발행량이 정해져 있음" },
  { label: "반감기", value: "4년", unit: "주기", hint: "새로 발행되는 양이 절반으로 감소" },
  { label: "현재 발행", value: "95", unit: "%", hint: "2026.03 기준 2,000만 개 돌파" },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell
      section="01 · 정의"
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
        <p className="max-w-[64ch] text-lead text-fg-muted text-pretty">
          2009년 사토시 나카모토가 제안한 세계 최초의 탈중앙화 디지털 자산.
          중앙기관 없이 개인 간 직접거래가 가능하다.
        </p>
      </Reveal>

      <Stagger delay={0.35} step={0.12} className="mt-14 grid grid-cols-3 gap-6">
        {facts.map((f) => (
          <motion.div
            key={f.label}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden rounded-2xl border border-border bg-white/[0.02] p-7"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-3xl"
              style={{ background: "var(--color-btc)" }}
            />
            <div className="text-eyebrow text-fg-dim">{f.label}</div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-[4rem] font-bold leading-none text-btc">
                {f.value}
              </span>
              <span className="text-h3 font-semibold text-btc/70">{f.unit}</span>
            </div>
            <div className="mt-4 text-caption leading-snug text-fg-muted">
              {f.hint}
            </div>
          </motion.div>
        ))}
      </Stagger>

      <Reveal delay={0.85} duration={0.8}>
        <p className="mt-12 text-h3 leading-snug text-pretty">
          가격 변동성이 크기 때문에 일상 결제보다는{" "}
          <Underline when={step >= 1} color="var(--color-btc)" delay={0.25}>
            장기 보유 · 투자 · 담보자산
          </Underline>
          으로 활용되며,{" "}
          <span className="font-semibold text-btc">디지털 금</span>이라 불린다.
        </p>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "bitcoin", title: "Bitcoin", section: "01" };
Slide.steps = 1;

export default Slide;
