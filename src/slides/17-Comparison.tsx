import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { companies, companyMap } from "@/vote/companies";
import { useVoteCounts } from "@/vote/useVoteCounts";

const OUR_PICK = "x" as const;

const Slide: SlideComponent = () => {
  const { counts } = useVoteCounts();
  const sorted = [...companies].sort((a, b) => counts[b.key] - counts[a.key]);
  const winner = sorted[0];
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const hasVotes = total > 0;
  const match = winner.key === OUR_PICK;

  return (
    <SlideShell section="05 · 결론" title="청중과 우리, 같은 선택일까?" accent="accent">
      <div className="mt-2 grid flex-1 grid-cols-[1fr_auto_1fr] items-center gap-12">
        <Reveal>
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center">
            <div className="text-[1rem] tracking-[0.2em] text-[var(--color-fg-muted)] uppercase">
              청중의 선택
            </div>
            <div
              className="mt-5 text-[4rem] font-bold leading-none"
              style={{ color: hasVotes ? winner.color : "var(--color-fg-dim)" }}
            >
              {hasVotes ? winner.name : "—"}
            </div>
            <div className="mt-3 text-[1.15rem] text-[var(--color-fg-muted)]">
              {hasVotes
                ? `${counts[winner.key]}표 / 총 ${total}표`
                : "투표 집계 대기 중"}
            </div>
          </div>
        </Reveal>

        <motion.div
          className="text-[3rem] font-bold text-[var(--color-fg-dim)]"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          vs
        </motion.div>

        <Reveal delay={0.15}>
          <div
            className="rounded-3xl border p-8 text-center"
            style={{
              borderColor: "color-mix(in srgb, white 30%, transparent)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <div className="text-[1rem] tracking-[0.2em] text-[var(--color-fg-muted)] uppercase">
              우리 팀의 선택
            </div>
            <div
              className="mt-5 text-[4rem] font-bold leading-none"
              style={{ color: companyMap[OUR_PICK].color }}
            >
              {companyMap[OUR_PICK].name}
            </div>
            <div className="mt-3 text-[1.15rem] text-[var(--color-fg-muted)]">
              슈퍼앱 비전 · 결제 DNA
            </div>
          </div>
        </Reveal>
      </div>

      {hasVotes && (
        <Reveal delay={0.4}>
          <p className="mt-8 text-center text-[1.5rem] leading-snug text-pretty">
            {match ? (
              <>
                의견이 <span className="font-bold text-white">일치</span>합니다 —
                슈퍼앱 비전에 시장도 같은 기대를 걸고 있다는 신호.
              </>
            ) : (
              <>
                의견이 <span className="font-bold text-white">엇갈렸습니다</span> —
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
