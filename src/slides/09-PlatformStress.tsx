import { motion } from "framer-motion";
import { TrendingDown, Droplets, Network, ArrowDown } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
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
    meta: "USDC 발행·수탁자가 아닌 유통 채널 → 디페깅 시 직접 상환부채·LCR 부담은 제한적",
    x: "예치·송금·자체 스테이블코인 직접 운영 → 예치부채·유동성 리스크 심화 가능성",
  },
  {
    n: "S3",
    Icon: Network,
    name: "Network Congestion",
    trigger: "ETH 가스비 급등",
    metrics: ["지급수수료", "EBITDA", "영업이익률"],
    meta: "Circle·Stripe·Bridge에 인프라 위탁 → 온체인 비용 충격을 일부 외부화",
    x: "금융 인프라를 직접 보유·운영 → 확장될수록 운영비·지급수수료·마진 압박",
  },
];

const compareRows = scenarios.filter((s) => s.n !== "S1"); // Meta vs X = S2·S3
const COLS = "grid grid-cols-[12rem_1fr_1fr] gap-5";

/** Line-break a cell at the first "→" (arrow leads the consequence on line 2).
 *  Wrapped in a block div so <br/> works inside the flex (items-center) cell. */
function arrowBreak(text: string) {
  const idx = text.indexOf("→");
  if (idx === -1) return <div>{text}</div>;
  return (
    <div>
      {text.slice(0, idx).trim()}
      <br />
      <span className="font-semibold text-accent">→</span> {text.slice(idx + 1).trim()}
    </div>
  );
}

const Slide: SlideComponent = () => {
  return (
    <SlideShell
      section="03 · 우위분석 Ⓐ · 재무 스트레스 테스트"
      title="Black Swan Stress Test — Meta vs X"
      accent="accent"
    >
      {/* TOP — scenario & accounting-metric definitions (S1·S2·S3) */}
      <Reveal>
        <div className="mb-2 text-eyebrow text-fg-dim">
          위기 시나리오 · 흔들리는 회계지표
        </div>
      </Reveal>
      <div className="grid grid-cols-3 gap-4">
        {scenarios.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-border bg-surface-1 px-5 py-3.5"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ background: "var(--tint-accent)", color: "var(--color-accent)" }}
              >
                <s.Icon size={17} strokeWidth={1.9} />
              </div>
              <div className="flex flex-col">
                <span className="text-body font-bold leading-none text-fg">{s.name}</span>
                <span className="mt-0.5 text-micro text-fg-dim">{s.trigger}</span>
              </div>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
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

      {/* divider */}
      <Reveal delay={0.45}>
        <div className="my-4 flex items-center justify-center gap-2 text-caption font-semibold text-fg-dim">
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={20} className="text-accent" strokeWidth={2.2} />
          </motion.span>
          시나리오별 기업 재무 영향
          <span className="font-mono text-micro text-fg-faint">(Scenario 2 · 3)</span>
        </div>
      </Reveal>

      {/* BOTTOM — Meta vs X, scenario 2·3 (enlarged) */}
      <div className="flex flex-1 flex-col">
        {/* header */}
        <Reveal delay={0.55}>
          <div className={`${COLS} items-center pb-1`}>
            <span />
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

        {compareRows.map((s, i) => (
          <Reveal key={s.n} delay={0.65 + i * 0.14} className="flex-1">
            <div className={`${COLS} h-full items-stretch border-t border-border py-4`}>
              {/* scenario label */}
              <div className="flex flex-col justify-center">
                <span className="font-mono text-h3 font-bold text-fg-faint">{s.n}</span>
                <span
                  className="mt-1 text-h3 font-bold leading-tight text-fg"
                  style={{ wordBreak: "keep-all" }}
                >
                  {s.name}
                </span>
                <span className="mt-1 text-caption text-fg-dim" style={{ wordBreak: "keep-all" }}>
                  {s.trigger}
                </span>
              </div>

              {/* Meta */}
              <div
                className="flex items-center rounded-2xl border border-border bg-surface-1 px-6 text-lead leading-snug text-fg-muted"
                style={{ wordBreak: "keep-all" }}
              >
                {arrowBreak(s.meta)}
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
                {arrowBreak(s.x)}
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
