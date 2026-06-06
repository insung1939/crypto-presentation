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
};

const metaNodes: Node[] = [
  { year: "2019", label: "Libra 발표", note: "글로벌 디지털 화폐" },
  { year: "2020~21", label: "Diem · Novi", note: "리브랜딩 · 규제 충돌" },
  { year: "2023~24", label: "완전 철수", note: "자산 매각", tone: "fail" },
  { year: "이후", label: "USDC 정산 우회", note: "유통 채널로 재진입", tone: "ghost" },
];

const xNodes: Node[] = [
  { year: "2022", label: "Twitter 인수" },
  { year: "2023~24", label: "결제 인프라", note: "MTL 라이선스 확보" },
  { year: "2025", label: "결제 출시", note: "Visa · Cross River" },
  { year: "2026", label: "X Money 베타" },
  { year: "2027+", label: "금융 슈퍼앱", note: "확장", tone: "win" },
];

function Lane({
  Logo,
  brandColor,
  nodes,
  railColor,
  fadeTail,
  baseDelay,
}: {
  Logo: (p: { size?: number }) => JSX.Element;
  brandColor: string;
  nodes: Node[];
  railColor: string;
  fadeTail?: boolean;
  baseDelay: number;
}) {
  return (
    <div className="flex items-center gap-5">
      {/* brand chip */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: baseDelay, duration: 0.5 }}
        className="shrink-0"
      >
        <Logo size={52} />
      </motion.div>

      {/* rail + nodes */}
      <div className="relative flex-1">
        {/* rail */}
        <motion.div
          aria-hidden
          className="absolute left-0 top-[14px] h-[3px] rounded-full"
          style={{
            background: fadeTail
              ? `linear-gradient(90deg, ${railColor} 55%, color-mix(in srgb, ${railColor} 10%, transparent))`
              : `linear-gradient(90deg, ${railColor}, color-mix(in srgb, ${railColor} 60%, white))`,
          }}
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: baseDelay + 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="relative flex justify-between">
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
                animate={{ opacity: n.tone === "ghost" ? 0.6 : 1, y: 0 }}
                transition={{
                  delay: baseDelay + 0.4 + i * 0.18,
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex w-[19%] flex-col items-center text-center"
              >
                {/* dot */}
                <div
                  className="relative flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 bg-bg"
                  style={{ borderColor: dotColor }}
                >
                  {n.tone === "fail" ? (
                    <XCircle size={18} style={{ color: dotColor }} strokeWidth={2.4} />
                  ) : n.tone === "win" ? (
                    <TrendingUp size={16} style={{ color: dotColor }} strokeWidth={2.6} />
                  ) : (
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ background: dotColor }}
                    />
                  )}
                  {n.tone === "win" && (
                    <motion.div
                      aria-hidden
                      className="absolute inset-0 rounded-full"
                      animate={{ boxShadow: [`0 0 0 0 ${brandColor}55`, `0 0 0 10px ${brandColor}00`] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    />
                  )}
                </div>
                <div className="mt-2 font-mono text-micro font-semibold text-fg-dim">
                  {n.year}
                </div>
                <div
                  className="text-caption font-semibold leading-tight text-fg"
                  style={{
                    wordBreak: "keep-all",
                    color: n.tone === "fail" ? "var(--color-warn)" : undefined,
                  }}
                >
                  {n.label}
                </div>
                {n.note && (
                  <div className="mt-0.5 text-micro text-fg-faint leading-tight" style={{ wordBreak: "keep-all" }}>
                    {n.note}
                  </div>
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
      title="Meta vs X — 같은 목표, 다른 접근"
      accent="accent"
    >
      <div className="flex flex-1 flex-col justify-center gap-12">
        <Reveal>
          <Lane
            Logo={MetaLogo}
            brandColor="#0866FF"
            railColor="#0866FF"
            nodes={metaNodes}
            fadeTail
            baseDelay={0.2}
          />
        </Reveal>

        <Reveal delay={0.3}>
          <Lane
            Logo={XLogo}
            brandColor="#111827"
            railColor="#111827"
            nodes={xNodes}
            baseDelay={1.4}
          />
        </Reveal>
      </div>

      {/* Core difference */}
      <Reveal delay={2.5}>
        <div className="mt-4 grid grid-cols-2 gap-5">
          <div className="rounded-2xl border border-warn/30 bg-warn/[0.06] px-6 py-4">
            <span className="text-eyebrow text-warn">Meta</span>
            <p className="mt-1 text-h3 font-semibold text-fg" style={{ wordBreak: "keep-all" }}>
              실패 후 <span className="text-warn">규제 회피형</span> 재진입
            </p>
          </div>
          <div
            className="rounded-2xl border-2 px-6 py-4"
            style={{ borderColor: "color-mix(in srgb, var(--color-accent) 40%, transparent)", background: "color-mix(in srgb, var(--color-accent) 7%, transparent)" }}
          >
            <span className="text-eyebrow text-accent">X</span>
            <p className="mt-1 text-h3 font-semibold text-fg" style={{ wordBreak: "keep-all" }}>
              인수 후 <span className="text-accent">직접 금융 인프라</span> 구축
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
