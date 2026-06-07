import { Fragment } from "react";
import { motion } from "framer-motion";
import { TrendingUp, AlertCircle, Rocket, ChevronRight } from "lucide-react";
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
    body: "결제 · 송금 · 투자 · 보관이 여전히 복잡",
    color: "var(--color-warn)",
  },
  {
    Icon: Rocket,
    title: "관건은 서비스 확장",
    body: "코인 발행·보유보다 일상 사용성 개선",
    color: "var(--color-stable)",
  },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell
      section="02 · Crypto 기반 주요 사업"
      title="관건은 코인이 아니라, 소비자 사용성"
      accent="accent"
    >
      <div className="flex flex-1 flex-col justify-center">
        {/* logical flow */}
        <div className="flex items-stretch gap-4">
          {flow.map((f, i) => (
            <Fragment key={f.title}>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-1 flex-col rounded-3xl border bg-surface-1 px-7 py-9"
                style={{ borderColor: `color-mix(in srgb, ${f.color} 30%, transparent)` }}
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: `color-mix(in srgb, ${f.color} 15%, transparent)`, color: f.color }}
                >
                  <f.Icon size={28} strokeWidth={1.9} />
                </div>
                <div className="mt-5 text-h2 font-bold leading-tight text-fg">{f.title}</div>
                <div className="mt-3 text-lead text-fg-muted leading-snug" style={{ wordBreak: "keep-all" }}>
                  {f.body}
                </div>
              </motion.div>
              {i < flow.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.18 }}
                  className="flex shrink-0 items-center"
                >
                  <ChevronRight size={30} className="text-fg-faint" strokeWidth={2.2} />
                </motion.div>
              )}
            </Fragment>
          ))}
        </div>

        {/* teaser → next slide answers it */}
        <Reveal delay={0.75}>
          <p className="mt-14 text-center text-h2 font-bold text-fg" style={{ wordBreak: "keep-all" }}>
            그렇다면,{" "}
            <Highlight when={step >= 1} color="var(--color-accent)" delay={0.2}>
              누가
            </Highlight>{" "}
            이 역할을 할 수 있는가?
          </p>
        </Reveal>
      </div>
    </SlideShell>
  );
};

Slide.meta = { id: "core-industry", title: "Core Industry", section: "02" };
Slide.steps = 1;

export default Slide;
