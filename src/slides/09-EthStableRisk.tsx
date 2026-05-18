import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, TrendingDown } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Stagger } from "@/motion/Stagger";
import { SlideComponent } from "@/deck/types";

type Case = {
  date: string;
  head: string;
  detail: string;
};

const ethToStable: Case[] = [
  {
    date: "2021",
    head: "이더리움 가스비 폭등",
    detail:
      "DeFi 붐 당시 가스비가 건당 수만 원까지 급등 — 소액 USDC 송금 비용이 송금액을 초과하는 역전 발생. 트래픽이 Polygon·Solana로 이탈하는 계기.",
  },
  {
    date: "2022.09",
    head: "The Merge — ETHW 포크",
    detail:
      "PoW→PoS 전환 시점, Circle이 \"전환 후 체인만 지원\"을 사전 공지. 결과적으로 포크 체인(ETHW)의 USDC 가치는 사실상 0이 됨 — 발행사의 선택이 체인 운명을 좌우.",
  },
];

const stableToEth: Case[] = [
  {
    date: "2020.03",
    head: "코로나 → ETH 43% 폭락 → DAI 연쇄 청산",
    detail:
      "ETH 담보로 발행된 DAI의 담보가치가 한계선을 밑돌며 대규모 강제 청산. 청산 ETH 매도가 하락을 가속화. 일부 청산은 0 DAI 입찰가로 낙찰되는 시스템 오류까지.",
  },
  {
    date: "2023.03",
    head: "SVB 사태 → USDC $0.87 디페깅",
    detail:
      "Circle의 예치금 33억 달러가 동결되며 USDC 디페깅. USDC 비중 높던 DAI와 ETH 기반 DeFi 전반의 신뢰가 흔들리며 수백억 달러 유동성이 단기간에 이탈.",
  },
];

function CaseCard({ c, color }: { c: Case; color: string }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-border bg-surface-1 p-5"
    >
      <div className="flex items-baseline gap-3">
        <span
          className="font-mono text-micro tabular-nums tracking-wider"
          style={{ color }}
        >
          {c.date}
        </span>
        <span className="h-px flex-1" style={{ background: `${color}30` }} />
      </div>
      <div className="mt-3 text-h3 font-semibold leading-snug text-pretty">
        {c.head}
      </div>
      <div className="mt-3 text-caption text-fg-muted leading-snug text-pretty">
        {c.detail}
      </div>
    </motion.div>
  );
}

const Slide: SlideComponent = () => {
  return (
    <SlideShell
      section="02 · 연결의 리스크"
      title="이더리움 ↔ 스테이블코인 — 양방향 리스크"
      accent="warn"
    >
      <Reveal>
        <p className="max-w-[72ch] text-lead leading-snug text-fg-muted text-pretty">
          긴밀한 연결은 한쪽의 충격이 다른 쪽으로 전이되는{" "}
          <span className="text-fg">양방향 구조적 취약점</span>을 만든다.
          실제로 4번 일어났다.
        </p>
      </Reveal>

      {/* Direction 1: ETH risk → Stablecoin */}
      <Reveal delay={0.3} duration={0.7}>
        <div className="mt-9">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-eyebrow text-eth">ETH 운영 리스크</span>
            <ArrowRight size={18} className="text-eth" strokeWidth={1.8} />
            <span className="text-eyebrow text-stable">스테이블코인 영향</span>
          </div>
          <Stagger delay={0.1} step={0.08} className="grid grid-cols-2 gap-4">
            {ethToStable.map((c) => (
              <CaseCard key={c.date} c={c} color="var(--color-eth)" />
            ))}
          </Stagger>
        </div>
      </Reveal>

      {/* Direction 2: Stablecoin risk → ETH */}
      <Reveal delay={0.55} duration={0.7}>
        <div className="mt-7">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-eyebrow text-stable">스테이블코인 리스크</span>
            <ArrowRight size={18} className="text-stable" strokeWidth={1.8} />
            <span className="text-eyebrow text-eth">ETH 영향</span>
          </div>
          <Stagger delay={0.1} step={0.08} className="grid grid-cols-2 gap-4">
            {stableToEth.map((c) => (
              <CaseCard key={c.date} c={c} color="var(--color-stable)" />
            ))}
          </Stagger>
        </div>
      </Reveal>

      <Reveal delay={1}>
        <div className="mt-7 inline-flex w-fit items-center gap-3 rounded-2xl border border-warn/40 bg-warn/[0.08] px-5 py-3">
          <AlertTriangle size={18} className="text-warn" strokeWidth={1.7} />
          <span className="text-caption text-pretty">
            <strong className="text-fg">BlackRock · JP모건</strong>이 이더리움 위에 토큰화 펀드를 올리기 시작한 지금,
            이 연결의 파급력은 <span className="text-fg">전통 금융 시스템 전반</span>으로 확장 중.
          </span>
          <TrendingDown size={18} className="text-warn" strokeWidth={1.7} />
        </div>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "eth-stable-risk", title: "Bidirectional Risk", section: "02" };
Slide.steps = 0;

export default Slide;
