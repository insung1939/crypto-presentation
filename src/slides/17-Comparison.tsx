import { motion } from "framer-motion";
import { GitMerge, Coins, Rocket } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { companyMap } from "@/vote/companies";
import { useVoteCounts } from "@/vote/useVoteCounts";
import { XLogo, AppleLogo } from "@/visuals/Logos";

const OUR_PICK = "x" as const;

const reasons = [
  { Icon: GitMerge, label: "종적 확장성", body: "SNS → 금융 슈퍼앱" },
  { Icon: Coins, label: "직접 금융 수익", body: "수수료·스프레드·대출" },
  { Icon: Rocket, label: "성장 상방", body: "성공 시 주도권 확보" },
];

const Slide: SlideComponent = () => {
  const { counts } = useVoteCounts();
  const x = counts.x;
  const a = counts.apple;
  const total = x + a;
  const winner = total === 0 ? null : x === a ? "tie" : x > a ? "x" : "apple";
  const match = winner === OUR_PICK;

  const AudienceLogo = winner === "apple" ? AppleLogo : XLogo;
  const audienceName = winner === "apple" ? "Apple" : winner === "x" ? "X" : "—";
  const audienceColor = winner === "apple" ? companyMap.apple.color : companyMap.x.color;

  return (
    <SlideShell section="04 · 결론" title="우리들의 최종 투자처" accent="accent">
      <div className="grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-10">
        {/* Audience */}
        <Reveal duration={0.85}>
          <div className="rounded-3xl border border-border bg-surface-1 p-9 text-center">
            <div className="text-eyebrow text-fg-dim">청중의 선택</div>
            {total > 0 ? (
              <>
                <div className="mt-6 flex justify-center">
                  {winner === "tie" ? (
                    <div className="flex items-center gap-3">
                      <XLogo size={64} />
                      <AppleLogo size={64} />
                    </div>
                  ) : (
                    <AudienceLogo size={84} />
                  )}
                </div>
                <div className="mt-5 text-display leading-none text-fg">
                  {winner === "tie" ? "동률" : audienceName}
                </div>
                <div className="mt-4 text-caption text-fg-dim">
                  <span className="font-mono tabular-nums" style={{ color: audienceColor }}>
                    X {x}
                  </span>{" "}
                  ·{" "}
                  <span className="font-mono tabular-nums" style={{ color: companyMap.apple.color }}>
                    Apple {a}
                  </span>{" "}
                  / 총 <span className="font-mono tabular-nums">{total}</span> 표
                </div>
              </>
            ) : (
              <>
                <div className="mt-12 text-display leading-none text-fg-faint">—</div>
                <div className="mt-4 text-caption text-fg-dim">투표 집계 대기 중</div>
              </>
            )}
          </div>
        </Reveal>

        {/* VS */}
        <motion.div
          className="text-h2 font-bold text-fg-faint"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          vs
        </motion.div>

        {/* Our team */}
        <Reveal delay={0.15} duration={0.85}>
          <div
            className="relative overflow-hidden rounded-3xl border-2 bg-bg-soft p-9 text-center shadow-card"
            style={{ borderColor: "color-mix(in srgb, var(--color-accent) 35%, transparent)" }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl"
              style={{ background: "var(--color-accent)" }}
              animate={{ opacity: [0.16, 0.3, 0.16] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="text-eyebrow text-accent">우리들의 선택</div>
            <div className="mt-5 flex justify-center">
              <XLogo size={80} />
            </div>
            <div className="mt-4 text-display leading-none text-fg">X</div>
            <div className="mt-5 flex justify-center gap-2">
              {reasons.map((r) => (
                <div key={r.label} className="flex flex-col items-center gap-1 rounded-xl border border-border bg-surface-1 px-3 py-2">
                  <r.Icon size={18} className="text-accent" strokeWidth={1.9} />
                  <span className="text-micro font-bold text-fg">{r.label}</span>
                  <span className="text-[0.7rem] text-fg-dim" style={{ wordBreak: "keep-all" }}>{r.body}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Scenario message */}
      {total > 0 && (
        <Reveal delay={0.4}>
          <p className="mt-9 text-center text-h3 leading-snug text-pretty" style={{ wordBreak: "keep-all" }}>
            {match ? (
              <>
                의견이 <span className="font-bold text-stable">일치</span>합니다 — 시장도{" "}
                <span className="font-semibold text-fg">직접 금융·슈퍼앱 비전</span>에 같은 베팅을 걸고 있다는 신호.
              </>
            ) : winner === "tie" ? (
              <>
                <span className="font-bold text-fg">팽팽한 동률</span> — 고위험·상방(X)과 저위험·방어(Apple) 사이, 시장의 고민이 그대로 드러납니다.
              </>
            ) : (
              <>
                의견이 <span className="font-bold text-fg">엇갈렸습니다</span> — 청중은{" "}
                <span className="font-semibold" style={{ color: companyMap.apple.color }}>저위험·접점 통제(Apple)</span>를, 우리는{" "}
                <span className="font-semibold text-accent">고위험·성장 상방(X)</span>을 택했습니다. 어느 리스크를 감수할 것인가의 차이.
              </>
            )}
          </p>
        </Reveal>
      )}
    </SlideShell>
  );
};

Slide.meta = { id: "comparison", title: "Audience vs Us", section: "04" };
Slide.steps = 0;

export default Slide;
