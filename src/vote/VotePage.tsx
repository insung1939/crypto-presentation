import { useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import confetti from "canvas-confetti";
import { useVote } from "./useVote";
import { useVoteCounts } from "./useVoteCounts";
import { CompanyKey, companyMap } from "./companies";
import { XLogo, AppleLogo } from "@/visuals/Logos";
import { isSupabaseConfigured } from "@/lib/supabase";

const X_COLOR = companyMap.x.color; // #111827
const A_COLOR = companyMap.apple.color; // #0071e3

type Choice = {
  key: CompanyKey;
  Logo: (p: { size?: number }) => JSX.Element;
  name: string;
  tagline: string;
  hint: string;
  color: string;
};

const choices: Choice[] = [
  { key: "x", Logo: XLogo, name: "X", tagline: "금융 슈퍼앱 전환", hint: "직접 금융 인프라로 확장", color: X_COLOR },
  { key: "apple", Logo: AppleLogo, name: "Apple", tagline: "소비자 접점 통제", hint: "결제 UX·생태계 장악", color: A_COLOR },
];

/* ───────── helpers ───────── */
function AnimatedNumber({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 160, damping: 22 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());
  useEffect(() => {
    mv.set(value);
  }, [mv, value]);
  return <motion.span>{display}</motion.span>;
}

function fireBurst(color: string) {
  const defaults = { spread: 75, ticks: 80, gravity: 0.9, decay: 0.93, startVelocity: 40, colors: [color, "#ffffff", "#6d3bd4"] };
  confetti({ ...defaults, particleCount: 70, origin: { x: 0.5, y: 0.4 } });
  confetti({ ...defaults, particleCount: 30, angle: 60, origin: { x: 0, y: 0.6 } });
  confetti({ ...defaults, particleCount: 30, angle: 120, origin: { x: 1, y: 0.6 } });
}

function MeshBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 mesh-drift"
      style={{
        background:
          "radial-gradient(circle at 18% 12%, rgba(17,24,39,0.10), transparent 45%), " +
          "radial-gradient(circle at 85% 20%, rgba(0,113,227,0.16), transparent 45%), " +
          "radial-gradient(circle at 50% 95%, rgba(109,59,212,0.12), transparent 48%)",
      }}
    />
  );
}

/* ───────── duel pick card ───────── */
function DuelCard({
  c,
  index,
  onPick,
  disabled,
}: {
  c: Choice;
  index: number;
  onPick: (k: CompanyKey) => void;
  disabled: boolean;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onPick(c.key)}
      disabled={disabled}
      className="relative w-full overflow-hidden rounded-3xl border-2 bg-bg-soft p-5 text-left shadow-card transition disabled:opacity-60"
      style={{ borderColor: `color-mix(in srgb, ${c.color} 32%, transparent)` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl"
        style={{ background: c.color, opacity: 0.16 }}
      />
      <div className="relative flex items-center gap-4">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl"
          style={{ background: `color-mix(in srgb, ${c.color} 10%, transparent)` }}
        >
          <c.Logo size={52} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[1.6rem] font-bold leading-none text-fg">{c.name}</div>
          <div className="mt-1.5 text-[0.95rem] font-semibold text-fg-muted">{c.tagline}</div>
          <div className="mt-1 flex items-center gap-1.5 text-[0.82rem] text-fg-dim">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: c.color }} />
            {c.hint}
          </div>
        </div>
        <span
          className="inline-flex h-11 shrink-0 items-center gap-1 rounded-full px-3 text-[0.85rem] font-bold text-white"
          style={{ background: c.color }}
        >
          투표 <ChevronRight size={16} strokeWidth={2.6} />
        </span>
      </div>
    </motion.button>
  );
}

/* ───────── live head-to-head ───────── */
function HeadToHead({ x, a }: { x: number; a: number }) {
  const total = x + a;
  const xShare = total ? (x / total) * 100 : 50;
  const aShare = total ? (a / total) * 100 : 50;
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-fg-dim">
          <motion.span
            className="inline-block h-2 w-2 rounded-full bg-stable"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          LIVE 실시간 집계
        </span>
        <span className="font-mono tabular-nums text-fg">
          <span className="text-[1.3rem] font-bold leading-none">
            <AnimatedNumber value={total} />
          </span>
          <span className="ml-1 text-[0.75rem] text-fg-dim">표</span>
        </span>
      </div>

      {/* split bar */}
      <div className="flex h-14 overflow-hidden rounded-2xl bg-surface-2">
        <motion.div
          className="flex items-center justify-start pl-4"
          style={{ background: `linear-gradient(90deg, ${X_COLOR}, color-mix(in srgb, ${X_COLOR} 70%, #555))` }}
          animate={{ width: `${xShare}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="font-mono text-[1.2rem] font-bold tabular-nums text-white">{Math.round(xShare)}%</span>
        </motion.div>
        <motion.div
          className="flex flex-1 items-center justify-end pr-4"
          style={{ background: `linear-gradient(90deg, color-mix(in srgb, ${A_COLOR} 70%, white), ${A_COLOR})` }}
        >
          <span className="font-mono text-[1.2rem] font-bold tabular-nums text-white">{Math.round(aShare)}%</span>
        </motion.div>
      </div>

      {/* labels + counts */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <XLogo size={26} />
          <span className="font-bold text-fg">X</span>
          <span className="font-mono tabular-nums text-fg-dim">
            <AnimatedNumber value={x} />표
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono tabular-nums text-fg-dim">
            <AnimatedNumber value={a} />표
          </span>
          <span className="font-bold text-fg">Apple</span>
          <AppleLogo size={26} />
        </div>
      </div>
    </div>
  );
}

/* ───────── confirmation ───────── */
function Confirmation({ choice }: { choice: CompanyKey }) {
  const c = companyMap[choice];
  const Logo = choice === "apple" ? AppleLogo : XLogo;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="relative overflow-hidden rounded-3xl border-2 bg-bg-soft px-6 py-6 text-center shadow-card"
      style={{ borderColor: `color-mix(in srgb, ${c.color} 35%, transparent)` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(circle at 50% 25%, color-mix(in srgb, ${c.color} 14%, transparent), transparent 60%)` }}
      />
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 14, delay: 0.05 }}
        className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-full text-white"
        style={{ background: c.color }}
      >
        <Check size={26} strokeWidth={3} />
      </motion.div>
      <div className="relative mt-4 flex items-center justify-center gap-3">
        <Logo size={44} />
        <span className="text-[2rem] font-bold leading-none text-fg">{c.name}</span>
      </div>
      <div className="relative mt-2 text-[0.95rem] text-fg-muted">에 투표했습니다 · 감사합니다</div>
    </motion.div>
  );
}

/* ───────── page ───────── */
export function VotePage() {
  const { choice, submit, submitting, error } = useVote();
  const { counts } = useVoteCounts();
  const x = counts.x ?? 0;
  const a = counts.apple ?? 0;

  const lastChoice = useRef<CompanyKey | null>(null);
  useEffect(() => {
    if (choice && lastChoice.current !== choice) {
      const color = companyMap[choice]?.color ?? "#6d3bd4";
      const t = setTimeout(() => fireBurst(color), 80);
      lastChoice.current = choice;
      return () => clearTimeout(t);
    }
    if (!choice) lastChoice.current = null;
  }, [choice]);

  return (
    <>
      <MeshBackdrop />
      <div className="relative flex min-h-[100dvh] flex-col text-fg">
        <div
          className="mx-auto flex w-full max-w-[30rem] flex-1 flex-col px-5 py-7"
          style={{
            paddingBottom: "calc(env(safe-area-inset-bottom, 0) + 1.5rem)",
            paddingTop: "calc(env(safe-area-inset-top, 0) + 1.5rem)",
          }}
        >
          <header className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-fg-dim"
            >
              KAIST DFMBA · 재무회계 · 9조
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-3 text-balance text-[1.7rem] font-bold leading-[1.2] sm:text-[2rem]"
            >
              어디에 투자하시겠습니까?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-2 text-[0.9rem] text-fg-muted"
            >
              X vs Apple · 익명 · 한 번만 가능
            </motion.p>
          </header>

          {!isSupabaseConfigured() && (
            <div className="mt-4 rounded-2xl border border-warn/40 bg-warn/10 px-4 py-3 text-[0.85rem] text-warn">
              ⚠ Supabase 미설정 — 집계가 동작하지 않습니다.
            </div>
          )}

          <div className="flex flex-1 flex-col justify-center">
            <AnimatePresence mode="wait">
              {!choice ? (
                <motion.div
                  key="picker"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col gap-3"
                >
                  <DuelCard c={choices[0]} index={0} onPick={submit} disabled={submitting} />
                  <div className="flex items-center justify-center gap-3">
                    <span className="h-px flex-1 bg-border" />
                    <span className="font-mono text-[0.8rem] font-bold text-fg-faint">VS</span>
                    <span className="h-px flex-1 bg-border" />
                  </div>
                  <DuelCard c={choices[1]} index={1} onPick={submit} disabled={submitting} />

                  {error && (
                    <div className="mt-1 rounded-2xl border border-warn/40 bg-warn/10 px-4 py-3 text-[0.88rem] text-warn">
                      {error}
                    </div>
                  )}
                  <p className="mt-2 text-center text-[0.78rem] text-fg-faint">
                    카드를 탭하면 바로 집계됩니다 · 한 번만 가능
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="thanks"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-6"
                >
                  <Confirmation choice={choice} />
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                    className="rounded-3xl border border-border bg-bg-soft p-5 shadow-card"
                  >
                    <HeadToHead x={x} a={a} />
                  </motion.div>
                  <p className="text-center text-[0.82rem] text-fg-dim">
                    발표 화면에서도 실시간으로 함께 집계됩니다
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
