import { motion } from "framer-motion";
import { Briefcase, Database, Target } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { companyMap } from "@/vote/companies";
import { useVoteCounts } from "@/vote/useVoteCounts";
import { XLogo, AppleLogo } from "@/visuals/Logos";

const X_COLOR = companyMap.x.color; // #111827
const A_COLOR = companyMap.apple.color; // #0071e3

type Criterion = { Icon: typeof Briefcase; label: string; x: string; apple: string };

const criteria: Criterion[] = [
  {
    Icon: Briefcase,
    label: "본업화 정도",
    x: "Crypto 금융 중심으로 사업모델 재정의",
    apple: "Crypto를 기존 생태계에 흡수",
  },
  {
    Icon: Database,
    label: "금융 데이터 확보력",
    x: "데이터를 한 플랫폼에 결합",
    apple: "결제 UX를 통제",
  },
  {
    Icon: Target,
    label: "전략적 동기",
    x: "금융사업 전환의 전략적 필요성 높음",
    apple: "안정적 HW·서비스 수익 → Crypto 동기 낮음",
  },
];

const Slide: SlideComponent = ({ step }) => {
  const { counts } = useVoteCounts();
  const x = counts.x ?? 0;
  const a = counts.apple ?? 0;
  const total = x + a;
  const winner = total === 0 ? null : x === a ? "tie" : x > a ? "x" : "apple";

  const conclusion =
    winner === "apple"
      ? "청중은 Apple을, 저희는 X를 선택했습니다. 안정성과 성장 가능성 사이에서 판단이 갈렸습니다."
      : winner === "x"
        ? "청중과 저희 모두 X를 선택했습니다. 성장 가능성과 주도권 측면에서 X의 매력이 더 크다고 본 것입니다."
        : winner === "tie"
          ? "청중의 선택은 동률이었습니다. Apple의 안정성과 X의 성장 가능성 사이에서 판단이 팽팽하게 갈렸습니다."
          : "아직 집계된 표가 없습니다. 우리 팀의 선택은 X입니다.";

  return (
    <SlideShell section="04 · 결론" title="우리 팀은 왜 X를 선택했나" accent="accent">
      {/* matchup header */}
      <Reveal>
        <div className="grid grid-cols-[1fr_11rem_1fr] items-center gap-4">
          <div
            className="flex items-center gap-3 rounded-2xl border-2 px-5 py-3"
            style={{ borderColor: "color-mix(in srgb, var(--color-accent) 45%, transparent)", background: "color-mix(in srgb, var(--color-accent) 6%, transparent)" }}
          >
            <XLogo size={44} />
            <div>
              <div className="text-h3 font-bold leading-none text-fg">X</div>
              <div className="mt-1 text-micro font-bold text-accent">우리 팀의 선택</div>
            </div>
          </div>
          <div className="text-center text-caption font-semibold text-fg-faint">비교 기준</div>
          <div
            className="flex items-center justify-end gap-3 rounded-2xl border-2 px-5 py-3"
            style={{ borderColor: `color-mix(in srgb, ${A_COLOR} 32%, transparent)` }}
          >
            <div className="text-right">
              <div className="text-h3 font-bold leading-none text-fg">Apple</div>
              <div className="mt-1 text-micro text-fg-dim">대안</div>
            </div>
            <AppleLogo size={44} />
          </div>
        </div>
      </Reveal>

      {/* 3 criteria */}
      <div className="mt-5 flex flex-1 flex-col justify-center gap-3">
        {criteria.map((c, i) => (
          <Reveal key={c.label} delay={0.2 + i * 0.13}>
            <div className="grid grid-cols-[1fr_11rem_1fr] items-stretch gap-4">
              {/* X — our pick */}
              <div
                className="flex items-center rounded-xl border px-5 py-3.5 text-body font-medium leading-snug text-fg"
                style={{ wordBreak: "keep-all", borderColor: "color-mix(in srgb, var(--color-accent) 38%, transparent)", background: "color-mix(in srgb, var(--color-accent) 5%, transparent)" }}
              >
                {c.x}
              </div>
              {/* criterion */}
              <div className="flex flex-col items-center justify-center gap-1.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-fg-muted">
                  <c.Icon size={20} strokeWidth={1.9} />
                </div>
                <span className="text-center text-micro font-bold text-fg" style={{ wordBreak: "keep-all" }}>
                  {c.label}
                </span>
              </div>
              {/* Apple */}
              <div
                className="flex items-center rounded-xl border px-5 py-3.5 text-body leading-snug text-fg-muted"
                style={{ wordBreak: "keep-all", borderColor: `color-mix(in srgb, ${A_COLOR} 22%, transparent)` }}
              >
                {c.apple}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* vote-dependent conclusion */}
      <Reveal when={step >= 1} delay={0.1} className="mt-5">
        <div className="rounded-2xl border-2 px-7 py-5" style={{ borderColor: "color-mix(in srgb, var(--color-accent) 35%, transparent)", background: "color-mix(in srgb, var(--color-accent) 6%, transparent)" }}>
          <div className="flex items-center gap-3 text-eyebrow text-fg-dim">
            <span>청중 투표</span>
            {total > 0 && (
              <span className="flex items-center gap-3 font-mono text-caption">
                <span style={{ color: winner === "x" || winner === "tie" ? X_COLOR : "var(--color-fg-faint)", fontWeight: 700 }}>X {x}</span>
                <span className="text-fg-faint">·</span>
                <span style={{ color: winner === "apple" || winner === "tie" ? A_COLOR : "var(--color-fg-faint)", fontWeight: 700 }}>Apple {a}</span>
              </span>
            )}
          </div>
          <motion.p
            key={conclusion}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-2 text-h3 font-semibold leading-snug text-fg"
            style={{ wordBreak: "keep-all" }}
          >
            {conclusion}
          </motion.p>
        </div>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "comparison", title: "Why X", section: "04" };
Slide.steps = 1;

export default Slide;
