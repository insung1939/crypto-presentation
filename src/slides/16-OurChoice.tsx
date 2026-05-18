import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Underline } from "@/motion/Underline";
import { SlideComponent } from "@/deck/types";

const reasons = [
  {
    n: "01",
    title: "통합된 비전",
    body: "SNS · 결제 · 금융을 하나의 플랫폼으로 묶는 방향성",
  },
  {
    n: "02",
    title: "친암호화폐 성향",
    body: "머스크는 BTC·DOGE 등에 일관되게 우호적",
  },
  {
    n: "03",
    title: "PayPal DNA",
    body: "결제 시스템 혁신 경험을 이미 보유",
  },
  {
    n: "04",
    title: "스테이블코인 결제 가능성",
    body: "통합 시 글로벌 결제 시스템으로 확장 가능",
  },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell section="05 · 결론" title="우리 팀의 선택" accent="accent">
      <div className="mt-2 flex flex-1 flex-col">
        <Reveal>
          <div className="flex items-baseline gap-5">
            <span className="text-[1.5rem] text-[var(--color-fg-muted)]">우리는</span>
            <motion.span
              className="text-[4.4rem] font-bold leading-none"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Underline when={step >= 1} color="#ffffff" thickness={5} delay={0.3}>
                X.corp
              </Underline>
            </motion.span>
            <span className="text-[1.5rem] text-[var(--color-fg-muted)]">를 골랐습니다.</span>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-5">
          {reasons.map((r, i) => (
            <Reveal key={r.n} delay={0.55 + i * 0.1}>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[1.1rem] text-[var(--color-fg-dim)]">
                    {r.n}
                  </span>
                  <span className="text-[1.5rem] font-semibold">{r.title}</span>
                </div>
                <div className="mt-2 ml-[2.8rem] text-[1.15rem] leading-snug text-[var(--color-fg-muted)]">
                  {r.body}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={1.05}>
          <div className="mt-8 inline-flex w-fit items-center gap-3 rounded-xl border border-[var(--color-warn)]/40 bg-[var(--color-warn)]/[0.08] px-5 py-3">
            <span className="text-[1.05rem] tracking-[0.12em] text-[var(--color-warn)] uppercase">
              Risk
            </span>
            <span className="text-[1.2rem]">
              각국 규제 · KYC/AML 이슈가 해결해야 할 핵심 과제
            </span>
          </div>
        </Reveal>
      </div>
    </SlideShell>
  );
};

Slide.meta = { id: "our-choice", title: "Our Choice", section: "05" };
Slide.steps = 1;

export default Slide;
