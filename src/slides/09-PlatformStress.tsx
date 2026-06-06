import { motion } from "framer-motion";
import { TrendingDown, Droplets, Network } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { MetaLogo, XLogo } from "@/visuals/Logos";

type Scenario = {
  Icon: typeof TrendingDown;
  name: string;
  trigger: string;
  metrics: string[];
};

const scenarios: Scenario[] = [
  {
    Icon: TrendingDown,
    name: "Crypto Meltdown",
    trigger: "BTC −50% · ETH −60% 투매",
    metrics: ["공정가치 평가손실", "손상차손", "EPS"],
  },
  {
    Icon: Droplets,
    name: "Systemic Run",
    trigger: "스테이블코인 디페깅 · 48h 뱅크런",
    metrics: ["LCR", "유동비율", "유동부채"],
  },
  {
    Icon: Network,
    name: "Network Congestion",
    trigger: "ETH 트래픽 폭증 · 가스비 급등",
    metrics: ["지급수수료", "EBITDA", "영업이익률"],
  },
];

const Slide: SlideComponent = () => {
  return (
    <SlideShell
      section="03 · 우위분석 Ⓐ · 재무 스트레스 테스트"
      title="Black Swan Stress Test — Meta vs X"
      accent="accent"
    >
      <Reveal>
        <p className="text-body text-fg-dim" style={{ wordBreak: "keep-all" }}>
          위기 시나리오별 <span className="font-semibold text-fg-muted">재무·회계 건전성</span>을 평가한다 —
          어떤 회계지표가 흔들리는가.
        </p>
      </Reveal>

      {/* Scenarios */}
      <div className="mt-5 grid grid-cols-3 gap-4">
        {scenarios.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.13, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border bg-surface-1 p-5"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-h3 font-bold text-fg-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ background: "var(--tint-accent)", color: "var(--color-accent)" }}
              >
                <s.Icon size={18} strokeWidth={1.9} />
              </div>
            </div>
            <div className="mt-3 text-h3 font-bold text-fg">{s.name}</div>
            <div className="mt-1 text-caption text-fg-dim leading-snug" style={{ wordBreak: "keep-all" }}>
              {s.trigger}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {s.metrics.map((m) => (
                <span
                  key={m}
                  className="rounded-md border border-border bg-bg-soft px-2 py-0.5 font-mono text-micro text-fg-muted"
                >
                  {m}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Risk contrast */}
      <div className="mt-6 grid flex-1 grid-cols-2 gap-5">
        <Reveal delay={0.7}>
          <div className="flex h-full flex-col rounded-2xl border border-border bg-surface-1 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MetaLogo size={36} />
                <span className="text-h3 font-bold">Meta</span>
              </div>
              <span className="rounded-full border border-stable/40 bg-stable/10 px-3 py-1 text-micro font-bold text-stable">
                리스크 LOW
              </span>
            </div>
            <p className="mt-4 text-body leading-snug text-fg-muted" style={{ wordBreak: "keep-all" }}>
              USDC <span className="font-semibold text-fg">발행·수탁자가 아닌 유통 채널</span>.
              Circle·Stripe·Bridge에 인프라를 위탁해 디페깅·온체인 비용 충격을 외부화 — 직접 상환부채·LCR 부담이 제한적.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.85}>
          <div
            className="relative flex h-full flex-col overflow-hidden rounded-2xl border-2 p-6"
            style={{ borderColor: "color-mix(in srgb, var(--color-warn) 35%, transparent)", background: "color-mix(in srgb, var(--color-warn) 5%, transparent)" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <XLogo size={36} />
                <span className="text-h3 font-bold">X</span>
              </div>
              <span className="rounded-full border border-warn/40 bg-warn/10 px-3 py-1 text-micro font-bold text-warn">
                리스크 HIGH
              </span>
            </div>
            <p className="mt-4 text-body leading-snug text-fg-muted" style={{ wordBreak: "keep-all" }}>
              X Money·예치·송금·자체 스테이블코인을 <span className="font-semibold text-fg">직접 운영</span> —
              예치부채·유동성 리스크가 심화되고, 서비스가 커질수록 운영비·지급수수료·마진 압박이 직접 발생.
            </p>
          </div>
        </Reveal>
      </div>

      <Reveal delay={1.1}>
        <p className="mt-5 text-h3 font-semibold text-fg text-pretty" style={{ wordBreak: "keep-all" }}>
          리스크는 X가 크지만 — 그건{" "}
          <span className="text-accent">직접 소유의 대가</span>다. 수익도 주도권도 X가 가져간다.
        </p>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "platform-stress", title: "Meta vs X Stress", section: "03" };
Slide.steps = 0;

export default Slide;
