import { AnimatePresence, motion } from "framer-motion";
import { useVote } from "./useVote";
import { useVoteCounts } from "./useVoteCounts";
import { companies, companyMap } from "./companies";

export function VotePage() {
  const { choice, submit, submitting, error } = useVote();
  const { counts } = useVoteCounts();

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="flex min-h-screen flex-col items-stretch bg-[var(--color-bg)] px-5 py-6 text-white">
      <header className="mb-6 text-center">
        <div className="text-[0.85rem] font-medium tracking-[0.25em] text-[var(--color-fg-muted)] uppercase">
          KAIST DFMBA · 재무회계
        </div>
        <h1 className="mt-2 text-balance text-[1.7rem] font-bold leading-tight">
          어느 빅테크에 투자하시겠습니까?
        </h1>
        <p className="mt-2 text-[0.95rem] text-[var(--color-fg-muted)]">
          5개 중 한 곳에만 투표해주세요 · 한 번만 가능합니다
        </p>
      </header>

      <AnimatePresence mode="wait">
        {!choice ? (
          <motion.div
            key="picker"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="flex flex-1 flex-col gap-3"
          >
            {companies.map((c, i) => (
              <motion.button
                key={c.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                whileTap={{ scale: 0.97 }}
                disabled={submitting}
                onClick={() => submit(c.key)}
                className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 text-left transition active:bg-white/[0.08] disabled:opacity-60"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[1.4rem] font-bold" style={{ color: c.color }}>
                      {c.name}
                    </div>
                    <div className="mt-1 text-[0.95rem] text-[var(--color-fg-muted)]">
                      {c.tagline}
                    </div>
                  </div>
                  <span
                    className="ml-3 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[1.1rem]"
                    style={{
                      background: `color-mix(in srgb, ${c.color} 18%, transparent)`,
                      color: c.color,
                    }}
                  >
                    →
                  </span>
                </div>
              </motion.button>
            ))}
            {error && (
              <div className="mt-3 rounded-xl border border-[var(--color-warn)]/40 bg-[var(--color-warn)]/10 px-4 py-3 text-[0.95rem] text-[var(--color-warn)]">
                {error}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-1 flex-col"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-6 text-center">
              <div className="text-[0.85rem] tracking-[0.2em] text-[var(--color-fg-muted)] uppercase">
                투표 완료
              </div>
              <div
                className="mt-2 text-[2rem] font-bold leading-tight"
                style={{ color: companyMap[choice].color }}
              >
                {companyMap[choice].name}
              </div>
              <div className="mt-1 text-[0.95rem] text-[var(--color-fg-muted)]">
                감사합니다 — 발표 화면에서 결과를 확인하세요
              </div>
            </div>

            <div className="mt-6 text-[0.95rem] text-[var(--color-fg-muted)]">
              현재 집계 · 총 {total}표
            </div>
            <div className="mt-3 flex flex-1 flex-col gap-2">
              {companies.map((c) => {
                const pct = total ? (counts[c.key] / total) * 100 : 0;
                return (
                  <div key={c.key} className="rounded-lg bg-white/[0.04] px-3 py-2">
                    <div className="flex items-center justify-between text-[0.95rem]">
                      <span style={{ color: c.color }} className="font-semibold">
                        {c.name}
                      </span>
                      <span className="tabular-nums text-[var(--color-fg-muted)]">
                        {counts[c.key]} · {pct.toFixed(0)}%
                      </span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: c.color }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
