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
    trigger: "BTC −50% · ETH −60% 위험자산 투매",
    metrics: ["공정가치 평가손실", "손상차손", "당기순이익", "EPS"],
  },
  {
    Icon: Droplets,
    name: "Systemic Run",
    trigger: "스테이블코인 디페깅 · 48h 온체인 뱅크런",
    metrics: ["LCR", "유동비율", "유동부채", "채권처분손실"],
  },
  {
    Icon: Network,
    name: "Network Congestion",
    trigger: "ETH 트래픽 폭증 · 가스비 급등",
    metrics: ["지급수수료", "EBITDA", "영업이익률"],
  },
];

function Box({
  Logo,
  name,
  position,
  points,
  emphasize,
  delay,
}: {
  Logo: (p: { size?: number }) => JSX.Element;
  name: string;
  position: string;
  points: string[];
  emphasize?: boolean;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className="flex h-full flex-col rounded-2xl border bg-surface-1 p-6"
        style={{
          borderColor: emphasize ? "color-mix(in srgb, var(--color-accent) 40%, transparent)" : "var(--color-border)",
          background: emphasize ? "color-mix(in srgb, var(--color-accent) 5%, transparent)" : "var(--color-surface-1)",
          borderWidth: emphasize ? 2 : 1,
        }}
      >
        <div className="flex items-center gap-3">
          <Logo size={36} />
          <span className="text-h3 font-bold">{name}</span>
        </div>
        <div className="mt-3 text-body font-bold" style={{ color: emphasize ? "var(--color-accent)" : "var(--color-fg)" }}>
          {position}
        </div>
        <div className="mt-3 space-y-1.5">
          {points.map((p) => (
            <div key={p} className="flex gap-2 text-caption leading-snug text-fg-muted" style={{ wordBreak: "keep-all" }}>
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: emphasize ? "var(--color-accent)" : "var(--color-fg-faint)" }} />
              {p}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

const Slide: SlideComponent = () => {
  return (
    <SlideShell
      section="03 · 우위분석 Ⓐ · 재무 스트레스 테스트"
      title="Black Swan Stress Test — Meta vs X"
      accent="accent"
    >
      <Reveal>
        <p className="text-body text-fg-dim" style={{ wordBreak: "keep-all" }}>
          먼저 <span className="font-semibold text-fg-muted">어떤 위기에서 어떤 회계지표가 흔들리는지</span>를 정의하고, 두 기업의 사업구조가 그 충격을 어떻게 받는지 본다.
        </p>
      </Reveal>

      {/* Scenarios — define which accounting metrics break */}
      <div className="mt-5 grid grid-cols-3 gap-4">
        {scenarios.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.13, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border bg-surface-1 p-5"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-h3 font-bold text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "var(--tint-accent)", color: "var(--color-accent)" }}>
                <s.Icon size={18} strokeWidth={1.9} />
              </div>
            </div>
            <div className="mt-3 text-h3 font-bold text-fg">{s.name}</div>
            <div className="mt-1 text-caption text-fg-dim leading-snug" style={{ wordBreak: "keep-all" }}>
              {s.trigger}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {s.metrics.map((m) => (
                <span key={m} className="rounded-md border border-border bg-bg-soft px-2 py-0.5 font-mono text-micro text-fg-muted">
                  {m}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Structural difference — Meta vs X */}
      <div className="mt-6 grid flex-1 grid-cols-2 gap-5">
        <Box
          Logo={MetaLogo}
          name="Meta"
          position="유통 채널 중심 구조"
          delay={0.7}
          points={[
            "스테이블코인 발행·수탁자가 아닌 유통 채널",
            "Circle · Stripe · Bridge에 인프라를 위탁",
            "디페깅·온체인 비용 충격을 일부 외부화",
            "직접 상환부채·LCR 부담은 제한적",
          ]}
        />
        <Box
          Logo={XLogo}
          name="X"
          position="직접 금융 인프라 운영 구조"
          emphasize
          delay={0.85}
          points={[
            "예치·송금·자체 스테이블코인 직접 운영",
            "예치부채·유동성 리스크를 직접 부담",
            "확장할수록 운영비·지급수수료·마진 압박",
            "리스크는 크나 직접 수익·주도권 확보",
          ]}
        />
      </div>

      <Reveal delay={1.1}>
        <p className="mt-5 text-body leading-snug text-fg-muted" style={{ wordBreak: "keep-all" }}>
          정리하면, Meta는 위탁 구조라 직접 리스크가 제한적이다. X는 금융 인프라를 직접 구축하는 만큼 리스크가 더 크지만,{" "}
          <span className="font-semibold text-fg">성공 시 수익성과 주도권도 더 직접적으로 확보</span>할 수 있다.
        </p>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "platform-stress", title: "Meta vs X Stress", section: "03" };
Slide.steps = 0;

export default Slide;
