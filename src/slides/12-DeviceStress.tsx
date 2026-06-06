import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { SamsungLogo, AppleLogo } from "@/visuals/Logos";

type Level = "LOW" | "MID" | "HIGH";

const levelStyle: Record<Level, { color: string; label: string }> = {
  LOW: { color: "var(--color-stable)", label: "LOW" },
  MID: { color: "var(--color-btc)", label: "MID" },
  HIGH: { color: "var(--color-warn)", label: "HIGH" },
};

type Cell = { level: Level; note: string };
type Sc = { name: string; trigger: string; samsung: Cell; apple: Cell };

const data: Sc[] = [
  {
    name: "Crypto Meltdown",
    trigger: "BTC −50% · ETH −60%",
    samsung: { level: "MID", note: "갤럭시 프리미엄 수요 5~10% 간접 타격" },
    apple: { level: "LOW", note: "앱 수수료 일시 하락, 핵심 수익 무관" },
  },
  {
    name: "Systemic Run",
    trigger: "디페깅 $1 → $0.85",
    samsung: { level: "LOW", note: "자체 코인 미발행 → 직접 노출 없음" },
    apple: { level: "LOW", note: "Gateway 미운영 → 게이트키퍼 방어" },
  },
  {
    name: "Network Congestion",
    trigger: "ETH 가스비 급등",
    samsung: { level: "MID", note: "온체인 직접 실행 → UX 악화·이탈" },
    apple: { level: "LOW", note: "오프체인/L2 → 오히려 사용자 유입" },
  },
  {
    name: "규제 강화 (DMA)",
    trigger: "플랫폼 개방 강제",
    samsung: { level: "LOW", note: "이미 개방 → 추가 요구 낮음" },
    apple: { level: "HIGH", note: "NFC 강제 개방 + 수수료 압박" },
  },
];

function Badge({ level, animate, delay }: { level: Level; animate: boolean; delay: number }) {
  const s = levelStyle[level];
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7 }}
      animate={animate ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, type: "spring", stiffness: 240, damping: 16 }}
      className="inline-flex shrink-0 items-center rounded-lg px-2.5 py-1 font-mono text-micro font-bold"
      style={{
        background: `color-mix(in srgb, ${s.color} 14%, transparent)`,
        color: s.color,
        boxShadow: level === "HIGH" ? `0 0 0 1.5px ${s.color}` : `inset 0 0 0 1px color-mix(in srgb, ${s.color} 40%, transparent)`,
      }}
    >
      {s.label}
    </motion.span>
  );
}

function CompanyCell({ cell, delay }: { cell: Cell; delay: number }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface-1 px-3.5 py-2.5">
      <Badge level={cell.level} animate delay={delay} />
      <span className="text-caption leading-snug text-fg-muted" style={{ wordBreak: "keep-all" }}>
        {cell.note}
      </span>
    </div>
  );
}

const Slide: SlideComponent = () => {
  return (
    <SlideShell
      section="03 · 우위분석 Ⓑ · 스트레스 테스트"
      title="위기 시나리오별 사업 충격 — Samsung vs Apple"
      accent="accent"
    >
      {/* header */}
      <Reveal>
        <div className="grid grid-cols-[13rem_1fr_1fr] items-center gap-4 pb-2">
          <div className="flex items-center gap-2">
            {(["LOW", "MID", "HIGH"] as Level[]).map((l) => (
              <span key={l} className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: levelStyle[l].color }} />
                <span className="font-mono text-micro text-fg-dim">{l}</span>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <SamsungLogo size={26} />
            <span className="text-h3 font-bold">Samsung</span>
          </div>
          <div className="flex items-center gap-2">
            <AppleLogo size={26} />
            <span className="text-h3 font-bold">Apple</span>
          </div>
        </div>
      </Reveal>

      <div className="flex flex-1 flex-col justify-center">
        {data.map((s, i) => (
          <Reveal key={s.name} delay={0.15 + i * 0.12}>
            <div className="grid grid-cols-[13rem_1fr_1fr] items-stretch gap-4 border-t border-border py-3">
              <div className="flex flex-col justify-center">
                <span className="text-body font-bold text-fg leading-tight" style={{ wordBreak: "keep-all" }}>
                  {s.name}
                </span>
                <span className="text-micro text-fg-dim">{s.trigger}</span>
              </div>
              <CompanyCell cell={s.samsung} delay={0.3 + i * 0.12} />
              <CompanyCell cell={s.apple} delay={0.35 + i * 0.12} />
            </div>
          </Reveal>
        ))}
      </div>

      {/* conclusion */}
      <Reveal delay={0.85}>
        <div className="mt-3 rounded-2xl border border-border bg-surface-2 px-6 py-4">
          <p className="text-body leading-snug text-fg-muted" style={{ wordBreak: "keep-all" }}>
            Samsung은 규제 리스크가 낮지만 <span className="font-semibold text-btc">네트워크 혼잡(S3)에서 생태계 약화</span>.
            Apple은 <span className="font-semibold text-warn">규제(S4)가 최대 리스크</span>이나, 나머지 3개 시나리오에서 구조적으로{" "}
            <span className="font-semibold text-stable">방어적</span>이다.
          </p>
        </div>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "device-stress", title: "Samsung vs Apple Stress", section: "03" };
Slide.steps = 0;

export default Slide;
