import { motion } from "framer-motion";
import { Layers, Heart, Wallet, Globe2, AlertTriangle } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Stagger } from "@/motion/Stagger";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";
import { XLogo } from "@/visuals/Logos";

const reasons = [
  {
    n: "01",
    Icon: Layers,
    title: "통합된 비전",
    body: "SNS · 결제 · 금융을 하나의 플랫폼으로 묶는 방향성",
  },
  {
    n: "02",
    Icon: Heart,
    title: "친암호화폐 성향",
    body: "머스크는 BTC·DOGE 등에 일관되게 우호적",
  },
  {
    n: "03",
    Icon: Wallet,
    title: "PayPal DNA",
    body: "결제 시스템 혁신 경험을 이미 보유",
  },
  {
    n: "04",
    Icon: Globe2,
    title: "스테이블코인 결제",
    body: "통합 시 글로벌 결제 시스템으로 확장 가능",
  },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell section="05 · 결론" title="우리 팀의 선택" accent="accent">
      <Reveal>
        <div className="flex flex-wrap items-center gap-6">
          <span className="text-lead text-fg-muted">우리는</span>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4"
          >
            <XLogo size={72} />
            <span className="text-display leading-none text-fg">
              <Highlight when={step >= 1} color="var(--color-accent)" delay={0.4}>
                X.corp
              </Highlight>
            </span>
          </motion.div>
          <span className="text-lead text-fg-muted">를 골랐습니다.</span>
        </div>
      </Reveal>

      <Stagger delay={0.5} step={0.1} className="mt-12 grid grid-cols-2 gap-5">
        {reasons.map((r) => (
          <motion.div
            key={r.n}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-border bg-surface-1 p-6"
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-caption text-fg-faint tabular-nums">
                {r.n}
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <r.Icon size={22} strokeWidth={1.7} />
              </div>
              <span className="text-h3 font-semibold">{r.title}</span>
            </div>
            <div className="mt-3 ml-[3.7rem] text-caption text-fg-muted leading-snug">
              {r.body}
            </div>
          </motion.div>
        ))}
      </Stagger>

      <Reveal delay={1.05}>
        <div className="mt-9 inline-flex w-fit items-center gap-3 rounded-2xl border border-warn/40 bg-warn/[0.08] px-5 py-3.5">
          <AlertTriangle size={20} className="text-warn" strokeWidth={1.7} />
          <span className="text-micro tracking-[0.12em] text-warn">RISK</span>
          <span className="text-caption">
            각국 규제 · KYC/AML 이슈가 해결해야 할 핵심 과제
          </span>
        </div>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "our-choice", title: "Our Choice", section: "05" };
Slide.steps = 1;

export default Slide;
