import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Underline } from "@/motion/Underline";
import { SlideComponent } from "@/deck/types";
import { motion } from "framer-motion";

const facts = [
  { label: "공급량", value: "2,100만 개", hint: "법정화폐와 달리 발행량 고정" },
  { label: "반감기", value: "4년 주기", hint: "새로 발행되는 코인 절반으로 감소" },
  { label: "현재 발행", value: "95%", hint: "2026.03 · 2,000만 개 돌파" },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell section="01 · 정의" title="비트코인 — 디지털 금" accent="btc">
      <div className="mt-2 flex flex-1 flex-col">
        <Reveal>
          <p className="max-w-[64ch] text-[1.5rem] leading-snug text-[var(--color-fg-muted)] text-pretty">
            2009년 사토시 나카모토가 제안한 세계 최초의 탈중앙화 디지털 자산.
            중앙기관 없이 개인 간 직접거래가 가능하다.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-3 gap-6">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={0.25 + i * 0.12}>
              <motion.div
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-6"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-[1rem] tracking-[0.15em] text-[var(--color-fg-dim)] uppercase">
                  {f.label}
                </div>
                <div className="mt-3 text-[3rem] font-bold leading-none text-[var(--color-btc)]">
                  {f.value}
                </div>
                <div className="mt-3 text-[1.05rem] leading-snug text-[var(--color-fg-muted)]">
                  {f.hint}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.75}>
          <p className="mt-12 text-[1.7rem] leading-snug text-[var(--color-fg)] text-pretty">
            결제수단보다는{" "}
            <Underline when={step >= 1} color="var(--color-btc)" delay={0.2}>
              가치저장수단 · 투자자산
            </Underline>
            으로 인식되며,{" "}
            <span className="text-[var(--color-btc)] font-semibold">디지털 금</span>
            이라 불린다.
          </p>
        </Reveal>
      </div>
    </SlideShell>
  );
};

Slide.meta = { id: "bitcoin", title: "Bitcoin", section: "01" };
Slide.steps = 1;

export default Slide;
