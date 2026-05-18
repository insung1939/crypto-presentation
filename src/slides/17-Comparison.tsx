import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { companies, companyMap } from "@/vote/companies";
import { useVoteCounts } from "@/vote/useVoteCounts";
import { companyLogo } from "@/visuals/Logos";

const OUR_PICK = "x" as const;

const Slide: SlideComponent = () => {
  const { counts } = useVoteCounts();
  const sorted = [...companies].sort((a, b) => counts[b.key] - counts[a.key]);
  const winner = sorted[0];
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const hasVotes = total > 0;
  const match = winner.key === OUR_PICK;

  const WinnerLogo = companyLogo[winner.key];
  const OurLogo = companyLogo[OUR_PICK];

  return (
    <SlideShell section="05 · 결론" title="청중과 우리, 같은 선택일까?" accent="accent">
      <div className="grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-12">
        {/* Audience */}
        <Reveal duration={0.85}>
          <div className="rounded-3xl border border-border bg-surface-1 p-10 text-center">
            <div className="text-eyebrow text-fg-dim">청중의 선택</div>
            {hasVotes ? (
              <>
                <div className="mt-6 flex justify-center">
                  <WinnerLogo size={88} />
                </div>
                <div className="mt-5 text-display leading-none text-fg">
                  {winner.name}
                </div>
                <div className="mt-4 text-caption text-fg-dim">
                  <span className="font-mono tabular-nums">
                    {counts[winner.key]}
                  </span>{" "}
                  표 / 총{" "}
                  <span className="font-mono tabular-nums">{total}</span> 표
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
            className="relative overflow-hidden rounded-3xl border-2 bg-bg-soft p-10 text-center shadow-card"
            style={{
              borderColor: "color-mix(in srgb, var(--color-accent) 35%, transparent)",
            }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl"
              style={{ background: "var(--color-accent)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.22 }}
              transition={{ duration: 1.2 }}
            />
            <div className="text-eyebrow text-accent">우리 팀의 선택</div>
            <div className="mt-6 flex justify-center">
              <OurLogo size={88} />
            </div>
            <div className="mt-5 text-display leading-none text-fg">
              {companyMap[OUR_PICK].name}
            </div>
            <div className="mt-4 text-caption text-fg-muted">슈퍼앱 비전 · 결제 DNA</div>
          </div>
        </Reveal>
      </div>

      {hasVotes && (
        <Reveal delay={0.45}>
          <p className="mt-10 text-center text-h3 leading-snug text-pretty">
            {match ? (
              <>
                의견이 <span className="font-bold text-stable">일치</span>합니다 —
                시장도 슈퍼앱 비전에 같은 기대를 걸고 있다는 신호.
              </>
            ) : (
              <>
                의견이 <span className="font-bold text-fg">엇갈렸습니다</span> —
                시장이 보는 매력 포인트가 어디에서 다른지가 흥미로운 질문.
              </>
            )}
          </p>
        </Reveal>
      )}
    </SlideShell>
  );
};

Slide.meta = { id: "comparison", title: "Audience vs Us", section: "05" };
Slide.steps = 0;

export default Slide;
