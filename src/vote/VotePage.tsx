import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useVote } from "./useVote";
import { useVoteCounts } from "./useVoteCounts";
import { companies, companyMap } from "./companies";
import { companyLogo } from "@/visuals/Logos";

export function VotePage() {
  const { choice, submit, submitting, error } = useVote();
  const { counts } = useVoteCounts();

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="flex min-h-screen flex-col items-stretch bg-bg px-5 py-6 text-fg">
      <header className="mb-6 text-center">
        <div className="text-eyebrow text-fg-dim">KAIST DFMBA · 재무회계</div>
        <h1 className="mt-3 text-balance text-[1.8rem] font-bold leading-tight">
          어느 빅테크에 투자하시겠습니까?
        </h1>
        <p className="mt-2 text-caption text-fg-dim">
          5개 중 한 곳에만 투표해주세요 · 한 번만 가능
        </p>
      </header>

      <AnimatePresence mode="wait">
        {!choice ? (
          <motion.div
            key="picker"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-1 flex-col gap-3"
          >
            {companies.map((c, i) => {
              const Logo = companyLogo[c.key];
              return (
                <motion.button
                  key={c.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                  whileTap={{ scale: 0.98 }}
                  disabled={submitting}
                  onClick={() => submit(c.key)}
                  className="relative w-full overflow-hidden rounded-2xl border border-border bg-white/[0.03] px-5 py-4 text-left transition active:bg-white/[0.08] disabled:opacity-60"
                >
                  <div className="flex items-center gap-4">
                    <Logo size={48} />
                    <div className="flex-1">
                      <div className="text-[1.35rem] font-bold" style={{ color: c.color }}>
                        {c.name}
                      </div>
                      <div className="mt-0.5 text-caption text-fg-dim">{c.tagline}</div>
                    </div>
                    <span
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[1.2rem]"
                      style={{
                        background: `color-mix(in srgb, ${c.color} 18%, transparent)`,
                        color: c.color,
                      }}
                    >
                      →
                    </span>
                  </div>
                </motion.button>
              );
            })}
            {error && (
              <div className="mt-3 rounded-xl border border-warn/40 bg-warn/10 px-4 py-3 text-caption text-warn">
                {error}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-1 flex-col"
          >
            <div className="rounded-3xl border border-border bg-white/[0.03] px-5 py-7 text-center">
              <div className="mb-3 flex justify-center">
                <CheckCircle2 size={36} strokeWidth={1.6} className="text-stable" />
              </div>
              <div className="text-eyebrow text-fg-dim">투표 완료</div>
              <div
                className="mt-3 text-[2.2rem] font-bold leading-tight"
                style={{ color: companyMap[choice].color }}
              >
                {companyMap[choice].name}
              </div>
              <div className="mt-1 text-caption text-fg-dim">
                감사합니다 — 발표 화면에서 결과를 확인하세요
              </div>
            </div>

            <div className="mt-6 text-caption text-fg-dim">
              현재 집계 · 총 <span className="font-mono tabular-nums">{total}</span>표
            </div>
            <div className="mt-3 flex flex-1 flex-col gap-2">
              {companies.map((c) => {
                const pct = total ? (counts[c.key] / total) * 100 : 0;
                return (
                  <div key={c.key} className="rounded-xl bg-white/[0.04] px-3 py-2.5">
                    <div className="flex items-center justify-between text-caption">
                      <span style={{ color: c.color }} className="font-semibold">
                        {c.name}
                      </span>
                      <span className="font-mono tabular-nums text-fg-dim">
                        {counts[c.key]} · {pct.toFixed(0)}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${c.color}, color-mix(in srgb, ${c.color} 70%, white))`,
                        }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
