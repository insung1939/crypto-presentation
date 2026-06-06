import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { SamsungLogo, AppleLogo } from "@/visuals/Logos";

/* risk meter: lower fill = lower risk = more resilient */
function RiskMeter({
  label,
  risk,
  color,
  metrics,
  delay,
}: {
  label: string;
  risk: number; // 0~100
  color: string;
  metrics: string;
  delay: number;
}) {
  const level = risk < 30 ? "낮음" : risk < 60 ? "중간" : "높음";
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-caption font-semibold text-fg">{label}</span>
        <span className="text-micro font-bold" style={{ color }}>
          리스크 {level}
        </span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, color-mix(in srgb, ${color} 60%, white))` }}
          initial={{ width: 0 }}
          animate={{ width: `${risk}%` }}
          transition={{ delay, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="mt-1.5 font-mono text-micro text-fg-faint">{metrics}</div>
    </div>
  );
}

type Co = {
  name: string;
  Logo: (p: { size?: number }) => JSX.Element;
  accent: string;
  liquidity: number;
  liquidityMetric: string;
  profit: number;
  profitMetric: string;
  verdict: string;
  badge: string;
  badgeColor: string;
};

const cos: Co[] = [
  {
    name: "Samsung",
    Logo: SamsungLogo,
    accent: "var(--color-stable)",
    liquidity: 14,
    liquidityMetric: "LCR · 유동비율 안정",
    profit: 22,
    profitMetric: "Crypto 직접 매출 비중 작음",
    verdict: "비수탁·하드웨어 보안 중심 — 직접 정산·상환 의무가 거의 없어 유동성 리스크가 4사 중 가장 낮다.",
    badge: "가장 견고",
    badgeColor: "var(--color-stable)",
  },
  {
    name: "Apple",
    Logo: AppleLogo,
    accent: "var(--color-btc)",
    liquidity: 20,
    liquidityMetric: "직접 상환 의무 낮음",
    profit: 48,
    profitMetric: "지급수수료 · 영업이익률",
    verdict: "상환 리스크는 낮지만, 결제 트래픽이 줄면 수수료 매출이 둔화될 수 있다 — P/L 측 민감도가 상대적으로 높다.",
    badge: "수수료 매출 민감",
    badgeColor: "var(--color-btc)",
  },
];

const Slide: SlideComponent = () => {
  return (
    <SlideShell
      section="03 · 우위분석 Ⓑ · 재무 건전성"
      title="위기에도 무너지지 않는가 — B/S · P/L 회복력"
      accent="accent"
    >
      <Reveal>
        <p className="text-body text-fg-dim" style={{ wordBreak: "keep-all" }}>
          둘 다 <span className="font-semibold text-fg-muted">비수탁 · 직접 발행 회피</span> 구조라 구조적으로 견고하다. 다만 충격이 닿는 재무제표 위치가 다르다.
        </p>
      </Reveal>

      <div className="mt-6 grid flex-1 grid-cols-2 gap-6">
        {cos.map((c, i) => (
          <Reveal key={c.name} delay={0.2 + i * 0.15} duration={0.8}>
            <div
              className="flex h-full flex-col rounded-3xl border bg-surface-1 p-7"
              style={{ borderColor: `color-mix(in srgb, ${c.accent} 30%, transparent)` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <c.Logo size={44} />
                  <span className="text-h2 font-bold">{c.name}</span>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-micro font-bold"
                  style={{ background: `color-mix(in srgb, ${c.badgeColor} 14%, transparent)`, color: c.badgeColor }}
                >
                  {c.badge}
                </span>
              </div>

              <div className="mt-7 space-y-6">
                <RiskMeter
                  label="유동성 리스크 (B/S)"
                  risk={c.liquidity}
                  color={c.accent}
                  metrics={c.liquidityMetric}
                  delay={0.5 + i * 0.15}
                />
                <RiskMeter
                  label="수익성 리스크 (P/L)"
                  risk={c.profit}
                  color={c.accent}
                  metrics={c.profitMetric}
                  delay={0.65 + i * 0.15}
                />
              </div>

              <p
                className="mt-auto pt-7 text-body leading-snug text-fg-muted"
                style={{ wordBreak: "keep-all" }}
              >
                {c.verdict}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideShell>
  );
};

Slide.meta = { id: "device-finance", title: "Samsung vs Apple Finance", section: "03" };
Slide.steps = 0;

export default Slide;
