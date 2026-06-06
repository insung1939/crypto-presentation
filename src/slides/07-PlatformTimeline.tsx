import { motion } from "framer-motion";
import { XCircle, TrendingUp } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { MetaLogo, XLogo } from "@/visuals/Logos";

type Node = {
  year: string;
  label: string;
  note?: string;
  tone?: "fail" | "win" | "ghost";
  logo?: string;
};

const metaNodes: Node[] = [
  { year: "2019", label: "Libra 발표", note: "글로벌 디지털 화폐 시도" },
  { year: "2020~21", label: "Diem · Novi", note: "달러 연동 축소 · 규제 충돌", logo: "/brand/diem.svg" },
  { year: "2022", label: "완전 철수", note: "Diem 청산 · Novi 종료", tone: "fail" },
  { year: "2025", label: "전략 전환", note: "발행 포기 · 유통망 전략", tone: "ghost" },
  { year: "2026", label: "USDC 파일럿", note: "크리에이터 정산 시도", tone: "ghost", logo: "/brand/usdc.svg" },
  { year: "2027+", label: "글로벌 확장", note: "160개국+ · P2P·소셜커머스", tone: "ghost" },
];

const xNodes: Node[] = [
  { year: "2022", label: "Twitter 인수", note: "슈퍼앱 전략 선언" },
  { year: "2023~24", label: "인프라 구축", note: "MTL · BaaS 기반 확보" },
  { year: "2025", label: "결제 레일 확보", note: "Visa · Cross River", logo: "/brand/visa.svg" },
  { year: "2026", label: "X Money 베타", note: "송금 · 예치 · 카드" },
  { year: "2027+", label: "금융 슈퍼앱", note: "스테이블코인 · 투자 · 대출", tone: "win" },
];

function Lane({
  Logo,
  brandColor,
  nodes,
  fadeTail,
  baseDelay,
}: {
  Logo: (p: { size?: number }) => JSX.Element;
  brandColor: string;
  nodes: Node[];
  fadeTail?: boolean;
  baseDelay: number;
}) {
  return (
    <div className="flex items-start gap-5">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: baseDelay, duration: 0.5 }}
        className="mt-1 shrink-0"
      >
        <Logo size={48} />
      </motion.div>

      <div className="relative flex-1">
        {/* rail */}
        <motion.div
          aria-hidden
          className="absolute left-0 top-[14px] h-[3px] rounded-full"
          style={{
            background: fadeTail
              ? `linear-gradient(90deg, ${brandColor} 42%, color-mix(in srgb, ${brandColor} 12%, transparent))`
              : `linear-gradient(90deg, ${brandColor}, color-mix(in srgb, ${brandColor} 60%, white))`,
          }}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: baseDelay + 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="relative flex">
          {nodes.map((n, i) => {
            const dotColor =
              n.tone === "fail"
                ? "var(--color-warn)"
                : n.tone === "ghost"
                  ? "var(--color-fg-faint)"
                  : brandColor;
            return (
              <motion.div
                key={n.year + n.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: n.tone === "ghost" ? 0.62 : 1, y: 0 }}
                transition={{ delay: baseDelay + 0.4 + i * 0.16, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-1 flex-col items-center px-1 text-center"
              >
                <div
                  className="relative flex h-[28px] w-[28px] items-center justify-center rounded-full border-2 bg-bg"
                  style={{ borderColor: dotColor }}
                >
                  {n.tone === "fail" ? (
                    <XCircle size={16} style={{ color: dotColor }} strokeWidth={2.4} />
                  ) : n.tone === "win" ? (
                    <TrendingUp size={15} style={{ color: dotColor }} strokeWidth={2.6} />
                  ) : (
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: dotColor }} />
                  )}
                  {n.tone === "win" && (
                    <motion.div
                      aria-hidden
                      className="absolute inset-0 rounded-full"
                      animate={{ boxShadow: [`0 0 0 0 ${brandColor}55`, `0 0 0 9px ${brandColor}00`] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                  )}
                </div>
                <div className="mt-2 font-mono text-micro font-semibold text-fg-dim">{n.year}</div>
                <div
                  className="text-caption font-bold leading-tight text-fg"
                  style={{ wordBreak: "keep-all", color: n.tone === "fail" ? "var(--color-warn)" : undefined }}
                >
                  {n.label}
                </div>
                {n.note && (
                  <div className="mt-0.5 text-[0.72rem] leading-tight text-fg-faint" style={{ wordBreak: "keep-all" }}>
                    {n.note}
                  </div>
                )}
                {n.logo && (
                  <span className="mt-1.5 inline-flex items-center rounded-md bg-white px-1.5 py-1 shadow-sm ring-1 ring-black/5">
                    <img src={n.logo} alt="" className="h-3.5 w-auto object-contain" />
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const Slide: SlideComponent = () => {
  return (
    <SlideShell
      section="03 · 우위분석 Ⓐ 플랫폼/광고"
      title="Meta vs X · 크립토 사업 타임라인"
      accent="accent"
    >
      <div className="flex flex-1 flex-col justify-center gap-12">
        <Reveal>
          <Lane Logo={MetaLogo} brandColor="#0866FF" nodes={metaNodes} fadeTail baseDelay={0.2} />
        </Reveal>
        <Reveal delay={0.3}>
          <Lane Logo={XLogo} brandColor="#111827" nodes={xNodes} baseDelay={1.5} />
        </Reveal>
      </div>

      <Reveal delay={2.6}>
        <div className="mt-4 grid grid-cols-2 gap-5">
          <div className="rounded-2xl border border-warn/30 bg-warn/[0.06] px-6 py-4">
            <span className="text-eyebrow text-warn">Meta</span>
            <p className="mt-1 text-h3 font-semibold text-fg" style={{ wordBreak: "keep-all" }}>
              직접 발행 실패 후, <span className="text-warn">규제 회피형 유통 전략</span>으로 재진입
            </p>
          </div>
          <div
            className="rounded-2xl border-2 px-6 py-4"
            style={{ borderColor: "color-mix(in srgb, var(--color-accent) 40%, transparent)", background: "color-mix(in srgb, var(--color-accent) 7%, transparent)" }}
          >
            <span className="text-eyebrow text-accent">X</span>
            <p className="mt-1 text-h3 font-semibold text-fg" style={{ wordBreak: "keep-all" }}>
              인수 직후부터 <span className="text-accent">직접 금융 인프라</span>를 쌓아 슈퍼앱으로 확장
            </p>
          </div>
        </div>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "platform-timeline", title: "Meta vs X Timeline", section: "03" };
Slide.steps = 0;

export default Slide;
