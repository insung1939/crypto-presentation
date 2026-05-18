import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { useVote } from "./useVote";
import { useVoteCounts } from "./useVoteCounts";
import { companies, CompanyKey, companyMap } from "./companies";
import { companyLogo } from "@/visuals/Logos";

/* ────────────────────────────────────────────────
   Animated counter — number scrubs to its target
   ──────────────────────────────────────────────── */
function AnimatedNumber({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 160, damping: 22 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());
  useEffect(() => {
    mv.set(value);
  }, [mv, value]);
  return <motion.span>{display}</motion.span>;
}

/* ────────────────────────────────────────────────
   Fire confetti in the brand color of the choice
   ──────────────────────────────────────────────── */
function fireBurst(color: string) {
  const defaults = {
    spread: 70,
    ticks: 70,
    gravity: 0.9,
    decay: 0.94,
    startVelocity: 38,
    colors: [color, "#ffffff", "#fde68a"],
  };
  confetti({ ...defaults, particleCount: 60, origin: { x: 0.5, y: 0.35 } });
  confetti({
    ...defaults,
    particleCount: 30,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.55 },
  });
  confetti({
    ...defaults,
    particleCount: 30,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.55 },
  });
}

/* ────────────────────────────────────────────────
   Animated mesh gradient backdrop
   ──────────────────────────────────────────────── */
function MeshBackdrop() {
  return (
    <div
      aria-hidden
      className="mesh-drift pointer-events-none fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(circle at 15% 20%, rgba(217,119,6,0.16), transparent 42%), " +
          "radial-gradient(circle at 85% 25%, rgba(79,95,211,0.18), transparent 42%), " +
          "radial-gradient(circle at 75% 85%, rgba(109,59,212,0.16), transparent 42%), " +
          "radial-gradient(circle at 20% 90%, rgba(15,157,106,0.14), transparent 42%)",
      }}
    />
  );
}

/* ────────────────────────────────────────────────
   Vote pick — one company card
   ──────────────────────────────────────────────── */
function PickCard({
  index,
  k,
  onPick,
  disabled,
}: {
  index: number;
  k: CompanyKey;
  onPick: (k: CompanyKey) => void;
  disabled: boolean;
}) {
  const c = companyMap[k];
  const Logo = companyLogo[k];
  return (
    <motion.button
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 230,
        damping: 22,
        delay: 0.18 + index * 0.07,
      }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onPick(k)}
      disabled={disabled}
      className="group relative w-full overflow-hidden rounded-3xl bg-bg-soft text-left shadow-card transition disabled:opacity-60"
      style={{
        boxShadow: `0 1px 2px rgba(15,15,30,0.04), 0 12px 32px -12px color-mix(in srgb, ${c.color} 28%, rgba(15,15,30,0.08))`,
      }}
    >
      {/* Brand-color halo behind the logo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-6 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background: `color-mix(in srgb, ${c.color} 28%, transparent)`,
          animation: "halo-breathe 4.5s ease-in-out infinite",
          animationDelay: `${index * 0.4}s`,
        }}
      />
      {/* Gradient border */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          padding: 1,
          background: `linear-gradient(135deg, color-mix(in srgb, ${c.color} 32%, transparent), rgba(15,15,30,0.05) 60%)`,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="relative flex items-center gap-4 px-4 py-4 sm:gap-5 sm:px-5 sm:py-5">
        <motion.div
          whileHover={{ rotate: -6 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <Logo size={52} />
        </motion.div>

        <div className="min-w-0 flex-1">
          <div
            className="truncate text-[1.25rem] font-bold leading-tight sm:text-[1.4rem]"
            style={{ color: c.color }}
          >
            {c.name}
          </div>
          <div className="mt-0.5 truncate text-[0.88rem] text-fg-muted sm:text-[0.95rem]">
            {c.tagline}
          </div>
        </div>

        <motion.span
          aria-hidden
          initial={false}
          whileTap={{ x: 6 }}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{
            background: `color-mix(in srgb, ${c.color} 14%, transparent)`,
            color: c.color,
          }}
        >
          <ChevronRight size={22} strokeWidth={2.2} />
        </motion.span>
      </div>
    </motion.button>
  );
}

/* ────────────────────────────────────────────────
   Confirmation card (after vote)
   ──────────────────────────────────────────────── */
function Confirmation({ choice }: { choice: CompanyKey }) {
  const c = companyMap[choice];
  const Logo = companyLogo[choice];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative overflow-hidden rounded-3xl bg-bg-soft px-6 py-7 text-center shadow-card"
      style={{
        boxShadow: `0 1px 2px rgba(15,15,30,0.05), 0 24px 60px -18px color-mix(in srgb, ${c.color} 42%, rgba(15,15,30,0.12))`,
      }}
    >
      {/* big brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background: `radial-gradient(circle at 50% 30%, color-mix(in srgb, ${c.color} 18%, transparent), transparent 60%)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative text-[0.75rem] font-semibold tracking-[0.22em] text-fg-dim uppercase"
      >
        <Sparkles size={14} className="-mt-0.5 mr-1 inline align-middle" />
        투표 완료
      </motion.div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.1 }}
        className="relative mx-auto mt-5 w-fit"
      >
        <Logo size={88} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.45 }}
        className="relative mt-4 text-[2rem] font-bold leading-none sm:text-[2.3rem]"
        style={{ color: c.color }}
      >
        {c.name}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="relative mt-2 text-[0.92rem] text-fg-muted"
      >
        {c.tagline}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="relative mt-4 text-[0.9rem] text-fg-dim"
      >
        감사합니다 · 발표 화면에서 실시간 결과를 확인하세요
      </motion.div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────── */
export function VotePage() {
  const { choice, submit, submitting, error } = useVote();
  const { counts } = useVoteCounts();
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const sorted = [...companies].sort((a, b) => counts[b.key] - counts[a.key]);
  const max = Math.max(1, ...Object.values(counts));

  // Fire confetti when transitioning into the voted state.
  const lastChoice = useRef<CompanyKey | null>(null);
  useEffect(() => {
    if (choice && lastChoice.current !== choice) {
      const color = companyMap[choice].color;
      const t = setTimeout(() => fireBurst(color), 80);
      lastChoice.current = choice;
      return () => clearTimeout(t);
    }
    if (!choice) lastChoice.current = null;
  }, [choice]);

  return (
    <>
      <MeshBackdrop />
      <div className="relative min-h-[100dvh] overflow-x-hidden text-fg">
        <div
          className="mx-auto flex w-full max-w-[36rem] flex-col px-4 py-6"
          style={{
            paddingBottom: "calc(env(safe-area-inset-bottom, 0) + 1.5rem)",
            paddingTop: "calc(env(safe-area-inset-top, 0) + 1.25rem)",
          }}
        >
          {/* Header */}
          <motion.header
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="mb-6 text-center"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -6 },
                show: { opacity: 1, y: 0 },
              }}
              className="text-[0.72rem] font-semibold tracking-[0.22em] text-fg-dim uppercase"
            >
              KAIST DFMBA · 재무회계 · 9조
            </motion.div>
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0 },
              }}
              className="mt-3 text-balance text-[1.65rem] font-bold leading-[1.18] sm:text-[2rem]"
            >
              어느 빅테크에<br />투자하시겠습니까?
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 6 },
                show: { opacity: 1, y: 0 },
              }}
              className="mt-2.5 text-[0.92rem] text-fg-muted"
            >
              익명 · 한 번만 가능
            </motion.p>
          </motion.header>

          {/* Body */}
          <AnimatePresence mode="wait">
            {!choice ? (
              <motion.div
                key="picker"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-3"
              >
                {companies.map((c, i) => (
                  <PickCard
                    key={c.key}
                    index={i}
                    k={c.key}
                    onPick={submit}
                    disabled={submitting}
                  />
                ))}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 rounded-2xl border border-warn/40 bg-warn/10 px-4 py-3 text-[0.9rem] text-warn"
                  >
                    {error}
                  </motion.div>
                )}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-3 text-center text-[0.78rem] text-fg-faint"
                >
                  본인 단말에서 한 번만 가능 · 표는 익명으로 집계됩니다
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="thanks"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col"
              >
                <Confirmation choice={choice} />

                {/* Live results */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-6"
                >
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.22em] text-fg-dim uppercase">
                      <motion.span
                        className="inline-block h-2 w-2 rounded-full bg-stable"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />
                      LIVE · 현재 집계
                    </div>
                    <div className="font-mono tabular-nums">
                      <span className="text-[1.4rem] font-bold leading-none">
                        <AnimatedNumber value={total} />
                      </span>
                      <span className="ml-1 text-[0.78rem] font-normal text-fg-dim">
                        표
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-col gap-2">
                    {sorted.map((c, i) => {
                      const n = counts[c.key];
                      const widthPct = (n / max) * 100;
                      const sharePct = total ? (n / total) * 100 : 0;
                      const isLeader =
                        n > 0 && n > counts[sorted[1]?.key ?? c.key];
                      return (
                        <motion.div
                          key={c.key}
                          layout
                          transition={{
                            layout: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                          }}
                          className="rounded-2xl bg-bg-soft px-3.5 py-2.5 shadow-card"
                          style={{
                            boxShadow: isLeader
                              ? `0 1px 2px rgba(15,15,30,0.04), 0 12px 28px -10px color-mix(in srgb, ${c.color} 35%, rgba(15,15,30,0.1))`
                              : undefined,
                          }}
                        >
                          <div className="flex items-center justify-between text-[0.95rem]">
                            <div className="flex items-center gap-2">
                              <span
                                className="font-mono text-[0.78rem] tabular-nums text-fg-faint"
                              >
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span
                                className="font-semibold"
                                style={{ color: c.color }}
                              >
                                {c.name}
                              </span>
                            </div>
                            <span className="font-mono tabular-nums text-fg-muted">
                              <AnimatedNumber value={n} />
                              <span className="ml-2 text-fg-dim">
                                {sharePct.toFixed(0)}%
                              </span>
                            </span>
                          </div>
                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface-2">
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                background: `linear-gradient(90deg, ${c.color}, color-mix(in srgb, ${c.color} 60%, white))`,
                              }}
                              animate={{ width: `${widthPct}%` }}
                              transition={{
                                duration: 0.7,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
