import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { TrendingDown, Droplets, Network } from "lucide-react";
import { MetaLogo, XLogo } from "@/visuals/Logos";

type Scenario = {
  n: string;
  Icon: typeof TrendingDown;
  name: string;
  trigger: string;
  metrics: string[];
  meta: string;
  x: string;
};

const scenarios: Scenario[] = [
  {
    n: "S1",
    Icon: TrendingDown,
    name: "Crypto Meltdown",
    trigger: "BTC −50% · ETH −60% 투매",
    metrics: ["공정가치 평가손실", "손상차손", "EPS"],
    meta: "직접 보유 적음 → P/L 충격 제한적",
    x: "자체 보유·가격 연동 → P/L 충격 노출",
  },
  {
    n: "S2",
    Icon: Droplets,
    name: "Systemic Run",
    trigger: "스테이블코인 디페깅 · 뱅크런",
    metrics: ["LCR", "유동비율", "유동부채"],
    meta: "유통 채널 → 상환부채·LCR 부담 제한적",
    x: "예치·자체코인 운영 → 유동성 리스크 ↑",
  },
  {
    n: "S3",
    Icon: Network,
    name: "Network Congestion",
    trigger: "ETH 가스비 급등",
    metrics: ["지급수수료", "EBITDA", "영업이익률"],
    meta: "인프라 위탁 → 온체인 비용 외부화",
    x: "직접 운영 → 운영비·지급수수료·마진 압박",
  },
];

const COLS = "grid grid-cols-[16rem_1fr_1fr] gap-5";

const Slide: SlideComponent = () => {
  return (
    <SlideShell
      section="03 · 우위분석 Ⓐ · 재무 스트레스 테스트"
      title="Black Swan Stress Test — Meta vs X"
      accent="accent"
    >
      {/* header */}
      <Reveal>
        <div className={`${COLS} items-center pb-2`}>
          <span className="text-eyebrow text-fg-dim">위기 시나리오 · 회계지표</span>
          <div className="flex items-center gap-3">
            <MetaLogo size={34} />
            <span className="text-h3 font-bold">Meta</span>
            <span className="text-micro text-fg-dim">유통 채널 구조</span>
          </div>
          <div className="flex items-center gap-3">
            <XLogo size={34} />
            <span className="text-h3 font-bold">X</span>
            <span className="text-micro text-accent">직접 운영 구조</span>
          </div>
        </div>
      </Reveal>

      {/* big rows fill the slide */}
      <div className="flex flex-1 flex-col">
        {scenarios.map((s, i) => (
          <Reveal key={s.n} delay={0.2 + i * 0.14} className="flex-1">
            <div className={`${COLS} h-full items-stretch border-t border-border py-4`}>
              {/* scenario + accounting metrics */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-lg"
                    style={{ background: "var(--tint-accent)", color: "var(--color-accent)" }}
                  >
                    <s.Icon size={18} strokeWidth={1.9} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-h3 font-bold leading-none text-fg">{s.name}</span>
                    <span className="mt-1 text-caption text-fg-dim">{s.trigger}</span>
                  </div>
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
              </div>

              {/* Meta */}
              <div className="flex items-center rounded-2xl border border-border bg-surface-1 px-6 text-lead leading-snug text-fg-muted" style={{ wordBreak: "keep-all" }}>
                {s.meta}
              </div>

              {/* X — emphasized */}
              <div
                className="flex items-center rounded-2xl border-2 px-6 text-lead font-medium leading-snug text-fg"
                style={{
                  wordBreak: "keep-all",
                  borderColor: "color-mix(in srgb, var(--color-accent) 40%, transparent)",
                  background: "color-mix(in srgb, var(--color-accent) 5%, transparent)",
                }}
              >
                {s.x}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideShell>
  );
};

Slide.meta = { id: "platform-stress", title: "Meta vs X Stress", section: "03" };
Slide.steps = 0;

export default Slide;
