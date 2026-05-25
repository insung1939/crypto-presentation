import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";

type Case = {
  date: string;
  head: string;
  body: string;
  metric: { value: string; label: string };
};

const ethToStable: Case = {
  date: "2021 · DeFi 붐",
  head: "이더리움 가스비 폭등",
  body: "수요가 몰리며 가스비가 건당 수만 원까지 급등. 소액 USDC 송금에서 수수료가 송금액을 넘는 역전이 발생했다.",
  metric: { value: "수수료 > 송금액", label: "역전 현상" },
};

const stableToEth: Case = {
  date: "2023.03 · SVB 사태",
  head: "USDC 0.87달러 디페깅",
  body: "Circle의 예치금 33억 달러가 실리콘밸리은행에 묶이며 USDC가 일시적으로 0.87달러까지 추락. 이더리움 DeFi 전반의 신뢰가 흔들렸다.",
  metric: { value: "$0.87", label: "USDC 최저점" },
};

function CaseCard({
  c,
  color,
  delay,
}: {
  c: Case;
  color: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} duration={0.8}>
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.3 }}
        className="flex h-full flex-col rounded-3xl border border-border bg-surface-1 p-7"
      >
        <div className="flex items-baseline gap-3">
          <span
            className="font-mono text-micro tabular-nums tracking-wider"
            style={{ color }}
          >
            {c.date}
          </span>
          <span
            className="h-px flex-1"
            style={{ background: `color-mix(in srgb, ${color} 35%, transparent)` }}
          />
        </div>

        <div className="mt-4 text-h2 font-bold leading-snug text-pretty">
          {c.head}
        </div>

        <div className="mt-5 flex items-baseline gap-3">
          <span
            className="text-[2.6rem] font-bold leading-none"
            style={{ color }}
          >
            {c.metric.value}
          </span>
          <span className="text-caption text-fg-dim">{c.metric.label}</span>
        </div>

        <div className="mt-5 text-body text-fg-muted leading-snug text-pretty">
          {c.body}
        </div>
      </motion.div>
    </Reveal>
  );
}

function DirectionLabel({
  from,
  to,
  fromColor,
  toColor,
}: {
  from: string;
  to: string;
  fromColor: string;
  toColor: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-3">
      <span className="text-eyebrow" style={{ color: fromColor }}>
        {from}
      </span>
      <ArrowRight size={18} strokeWidth={1.8} style={{ color: fromColor }} />
      <span className="text-eyebrow" style={{ color: toColor }}>
        {to} 영향
      </span>
    </div>
  );
}

const Slide: SlideComponent = () => {
  return (
    <SlideShell
      section="02 · 연결의 그림자"
      title="양방향 리스크 — 한쪽이 흔들리면 다른 쪽도 흔들린다"
      accent="warn"
    >
      <Reveal>
        <p className="max-w-[74ch] text-lead text-fg-muted text-pretty">
          긴밀한 연결은 한쪽 충격이 다른 쪽으로 전이되는{" "}
          <span className="text-fg">구조적 취약점</span>도 함께 만든다.
        </p>
      </Reveal>

      <div className="mt-9 grid flex-1 grid-cols-2 gap-6">
        <div className="flex flex-col">
          <DirectionLabel
            from="ETH 운영 리스크"
            to="스테이블코인"
            fromColor="var(--color-eth)"
            toColor="var(--color-stable)"
          />
          <CaseCard c={ethToStable} color="var(--color-eth)" delay={0.25} />
        </div>

        <div className="flex flex-col">
          <DirectionLabel
            from="스테이블코인 리스크"
            to="ETH"
            fromColor="var(--color-stable)"
            toColor="var(--color-eth)"
          />
          <CaseCard c={stableToEth} color="var(--color-stable)" delay={0.4} />
        </div>
      </div>

      <Reveal delay={0.85}>
        <div className="mt-7 inline-flex w-fit items-center gap-3 rounded-2xl border border-warn/40 bg-warn/[0.08] px-5 py-3">
          <AlertTriangle size={20} className="text-warn" strokeWidth={1.7} />
          <span className="text-caption text-pretty">
            <strong className="text-fg">BlackRock · JP모건</strong>이 이더리움 위에 토큰화 펀드를 올리는 지금,
            이 연결의 파급력은 <span className="text-fg">전통 금융 시스템</span>으로 확장 중이다.
          </span>
        </div>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "eth-stable-risk", title: "Bidirectional Risk", section: "02" };
Slide.steps = 0;

export default Slide;
