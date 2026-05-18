import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useVote } from "./useVote";
import { useVoteCounts } from "./useVoteCounts";
import { companies, companyMap } from "./companies";
import { companyLogo } from "@/visuals/Logos";

export function VotePage() {
  const { choice, submit, submitting, error } = useVote();
  const { counts } = useVoteCounts();

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-bg text-fg">
      <div
        className="mx-auto flex w-full max-w-[36rem] flex-col px-4 py-5"
        style={{
          minHeight: "100dvh",
          paddingBottom: "calc(env(safe-area-inset-bottom, 0) + 1.25rem)",
          paddingTop: "calc(env(safe-area-inset-top, 0) + 1.25rem)",
        }}
      >
        <header className="mb-5 text-center">
          <div className="text-[0.7rem] font-semibold tracking-[0.18em] text-fg-dim uppercase">
            KAIST DFMBA · 재무회계
          </div>
          <h1 className="mt-2.5 text-balance text-[1.55rem] font-bold leading-tight sm:text-[1.85rem]">
            어느 빅테크에<br className="sm:hidden" />
            <span className="sm:hidden"> </span>투자하시겠습니까?
          </h1>
          <p className="mt-2 text-[0.92rem] text-fg-dim">
            한 곳에만 투표 · 1회 가능
          </p>
        </header>

        <AnimatePresence mode="wait">
          {!choice ? (
            <motion.div
              key="picker"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-2.5"
            >
              {companies.map((c, i) => {
                const Logo = companyLogo[c.key];
                return (
                  <motion.button
                    key={c.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.05 * i,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileTap={{ scale: 0.98 }}
                    disabled={submitting}
                    onClick={() => submit(c.key)}
                    className="relative w-full overflow-hidden rounded-2xl border border-border bg-bg-soft px-4 py-3.5 text-left shadow-card transition active:shadow-card-hover disabled:opacity-60"
                  >
                    <div className="flex items-center gap-3.5">
                      <Logo size={44} />
                      <div className="min-w-0 flex-1">
                        <div
                          className="truncate text-[1.18rem] font-bold leading-tight"
                          style={{ color: c.color }}
                        >
                          {c.name}
                        </div>
                        <div className="mt-0.5 truncate text-[0.85rem] text-fg-dim">
                          {c.tagline}
                        </div>
                      </div>
                      <span
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                        style={{
                          background: `color-mix(in srgb, ${c.color} 14%, transparent)`,
                          color: c.color,
                        }}
                      >
                        <ChevronRight size={20} strokeWidth={2.2} />
                      </span>
                    </div>
                  </motion.button>
                );
              })}
              {error && (
                <div className="mt-2 rounded-xl border border-warn/40 bg-warn/10 px-4 py-3 text-[0.9rem] text-warn">
                  {error}
                </div>
              )}
              <p className="mt-3 text-center text-[0.78rem] text-fg-faint">
                투표는 익명 · 본인 단말에서 한 번만 가능
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <div className="rounded-2xl border border-border bg-bg-soft px-5 py-6 text-center shadow-card">
                <div className="mb-2.5 flex justify-center">
                  <CheckCircle2 size={36} strokeWidth={1.6} className="text-stable" />
                </div>
                <div className="text-[0.72rem] font-semibold tracking-[0.2em] text-fg-dim uppercase">
                  투표 완료
                </div>
                <div className="mt-3 flex items-center justify-center gap-3">
                  {(() => {
                    const Logo = companyLogo[choice];
                    return <Logo size={40} />;
                  })()}
                  <div
                    className="text-[1.8rem] font-bold leading-none"
                    style={{ color: companyMap[choice].color }}
                  >
                    {companyMap[choice].name}
                  </div>
                </div>
                <div className="mt-3 text-[0.9rem] text-fg-dim">
                  감사합니다 — 발표 화면에서 결과를 확인하세요
                </div>
              </div>

              <div className="mt-5 flex items-baseline justify-between">
                <span className="text-[0.72rem] font-semibold tracking-[0.2em] text-fg-dim uppercase">
                  Live · 현재 집계
                </span>
                <span className="font-mono tabular-nums text-[1.1rem] font-bold">
                  {total}
                  <span className="ml-1 text-[0.8rem] font-normal text-fg-dim">표</span>
                </span>
              </div>

              <div className="mt-3 flex flex-col gap-2">
                {companies.map((c) => {
                  const pct = total ? (counts[c.key] / total) * 100 : 0;
                  return (
                    <div
                      key={c.key}
                      className="rounded-xl border border-border bg-bg-soft px-3.5 py-2.5"
                    >
                      <div className="flex items-center justify-between text-[0.95rem]">
                        <span style={{ color: c.color }} className="font-semibold">
                          {c.name}
                        </span>
                        <span className="font-mono tabular-nums text-fg-dim">
                          {counts[c.key]} · {pct.toFixed(0)}%
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${c.color}, color-mix(in srgb, ${c.color} 65%, white))`,
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
    </div>
  );
}
