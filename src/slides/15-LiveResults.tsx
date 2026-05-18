import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Shake } from "@/motion/Shake";
import { SlideComponent } from "@/deck/types";
import { companies } from "@/vote/companies";
import { useVoteCounts } from "@/vote/useVoteCounts";
import { isSupabaseConfigured } from "@/lib/supabase";

const Slide: SlideComponent = () => {
  const { counts } = useVoteCounts();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const max = Math.max(1, ...Object.values(counts));
  const sorted = [...companies].sort((a, b) => counts[b.key] - counts[a.key]);
  const leader = sorted[0];
  const leaderCount = counts[leader.key];
  const hasLead = leaderCount > 0 && leaderCount > counts[sorted[1].key];

  return (
    <SlideShell section="04 · 결과" title="실시간 투표 결과" accent="accent">
      {!isSupabaseConfigured() && (
        <div className="mb-4 rounded-xl border border-[var(--color-warn)]/40 bg-[var(--color-warn)]/[0.08] px-4 py-3 text-[1.05rem] text-[var(--color-warn)]">
          ⚠ Supabase가 설정되지 않아 데모 데이터로 표시 중입니다. <code>.env</code>를 확인하세요.
        </div>
      )}

      <div className="mt-2 flex flex-1 flex-col">
        <Reveal>
          <div className="flex items-baseline justify-between">
            <span className="text-[1.3rem] text-[var(--color-fg-muted)]">
              현재까지 총
            </span>
            <span className="font-mono text-[2.4rem] font-bold tabular-nums">
              {total}
              <span className="ml-2 text-[1.2rem] font-normal text-[var(--color-fg-muted)]">표</span>
            </span>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-1 flex-col justify-center space-y-5">
          {sorted.map((c, i) => {
            const n = counts[c.key];
            const widthPct = (n / max) * 100;
            const sharePct = total ? (n / total) * 100 : 0;
            const isLeader = hasLead && i === 0;
            return (
              <Reveal key={c.key} delay={0.1 + i * 0.05}>
                <Shake when={isLeader} intensity={3}>
                  <div
                    className="rounded-2xl border bg-white/[0.02] p-5"
                    style={{
                      borderColor: isLeader
                        ? `color-mix(in srgb, ${c.color} 60%, transparent)`
                        : "color-mix(in srgb, white 8%, transparent)",
                      boxShadow: isLeader
                        ? `0 0 50px color-mix(in srgb, ${c.color} 25%, transparent)`
                        : "none",
                    }}
                  >
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-4">
                        <span
                          className="font-mono text-[1.1rem] tabular-nums"
                          style={{ color: isLeader ? c.color : "var(--color-fg-dim)" }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="text-[1.8rem] font-bold"
                          style={{ color: c.color }}
                        >
                          {c.name}
                        </span>
                        <span className="text-[1.05rem] text-[var(--color-fg-muted)]">
                          {c.tagline}
                        </span>
                      </div>
                      <div className="font-mono text-right tabular-nums">
                        <div className="text-[2rem] font-bold leading-none">
                          {n}
                        </div>
                        <div className="mt-1 text-[0.95rem] text-[var(--color-fg-muted)]">
                          {sharePct.toFixed(0)}%
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: c.color }}
                        animate={{ width: `${widthPct}%` }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                </Shake>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
};

Slide.meta = { id: "live-results", title: "Live Results", section: "04" };
Slide.steps = 0;

export default Slide;
