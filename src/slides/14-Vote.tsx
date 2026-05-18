import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { companies, CompanyKey, companyMap } from "@/vote/companies";
import { useVoteCounts } from "@/vote/useVoteCounts";
import { companyLogo } from "@/visuals/Logos";
import { isSupabaseConfigured } from "@/lib/supabase";

const voteUrl =
  (import.meta.env.VITE_VOTE_URL as string | undefined) ??
  (typeof window !== "undefined" ? `${window.location.origin}/vote` : "");

function VoteBar({
  k,
  rank,
  count,
  max,
  total,
  fresh,
  isLeader,
}: {
  k: CompanyKey;
  rank: number;
  count: number;
  max: number;
  total: number;
  fresh: boolean;
  isLeader: boolean;
}) {
  const c = companyMap[k];
  const Logo = companyLogo[k];
  const widthPct = max > 0 ? (count / max) * 100 : 0;
  const sharePct = total ? (count / total) * 100 : 0;

  return (
    <motion.div
      layout
      transition={{ layout: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }}
      className="relative rounded-2xl border bg-white/[0.025] px-5 py-4 backdrop-blur-sm"
      style={{
        borderColor: isLeader
          ? `color-mix(in srgb, ${c.color} 55%, transparent)`
          : "var(--color-border)",
        boxShadow: isLeader
          ? `0 0 60px color-mix(in srgb, ${c.color} 22%, transparent)`
          : "none",
      }}
    >
      {/* fresh-vote flash overlay */}
      <AnimatePresence>
        {fresh && (
          <motion.div
            key="flash"
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ background: `${c.color}33` }}
          />
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4">
        <span
          className="font-mono text-caption tabular-nums"
          style={{ color: isLeader ? c.color : "var(--color-fg-dim)" }}
        >
          {String(rank).padStart(2, "0")}
        </span>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center">
          <Logo size={40} />
        </div>

        <div className="flex flex-1 items-baseline justify-between">
          <div className="flex items-baseline gap-3">
            <span
              className="text-[1.65rem] font-bold leading-none"
              style={{ color: c.color }}
            >
              {c.name}
            </span>
            <span className="text-caption text-[var(--color-fg-dim)]">
              {c.tagline}
            </span>
          </div>
          <div className="text-right font-mono tabular-nums">
            <span className="text-[1.9rem] font-bold leading-none">{count}</span>
            <span className="ml-2 text-caption text-[var(--color-fg-dim)]">
              {sharePct.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/[0.05]">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${c.color}, color-mix(in srgb, ${c.color} 70%, white))`,
          }}
          animate={{ width: `${widthPct}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  );
}

const Slide: SlideComponent = () => {
  const { counts, fresh } = useVoteCounts();
  const [freshKey, setFreshKey] = useState<CompanyKey | null>(null);

  useEffect(() => {
    if (!fresh) return;
    setFreshKey(fresh.key);
    const t = setTimeout(() => setFreshKey(null), 900);
    return () => clearTimeout(t);
  }, [fresh]);

  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const max = Math.max(1, ...Object.values(counts));
  const sorted = [...companies].sort((a, b) => counts[b.key] - counts[a.key]);
  const leaderKey =
    sorted[0] && counts[sorted[0].key] > 0 && counts[sorted[0].key] > counts[sorted[1].key]
      ? sorted[0].key
      : null;

  return (
    <SlideShell section="04 · 청중의 선택" title="여러분이라면 어디에 투자하시겠습니까?" accent="accent">
      {!isSupabaseConfigured() && (
        <div className="mb-4 rounded-xl border border-[var(--color-warn)]/40 bg-[var(--color-warn)]/10 px-4 py-3 text-caption text-[var(--color-warn)]">
          ⚠ Supabase 미설정 — 실시간 집계가 동작하지 않습니다.
        </div>
      )}

      <div className="grid flex-1 grid-cols-[auto_1fr] items-center gap-12">
        {/* LEFT — QR */}
        <Reveal duration={0.8}>
          <div className="flex flex-col items-center">
            <motion.div
              className="rounded-3xl bg-white p-5"
              style={{
                boxShadow:
                  "0 30px 80px -20px rgba(167, 139, 250, 0.35), 0 0 0 1px rgba(255,255,255,0.06)",
              }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <QRCodeSVG value={voteUrl} size={240} level="M" includeMargin={false} />
            </motion.div>
            <div className="mt-5 text-eyebrow text-[var(--color-accent)]">
              SCAN TO VOTE
            </div>
            <div className="mt-2 font-mono text-micro text-[var(--color-fg-dim)]">
              {voteUrl.replace(/^https?:\/\//, "")}
            </div>
          </div>
        </Reveal>

        {/* RIGHT — Results */}
        <Reveal delay={0.15} duration={0.8}>
          <div className="flex flex-col">
            <div className="mb-5 flex items-baseline justify-between">
              <span className="text-eyebrow text-[var(--color-fg-dim)]">
                LIVE
                <motion.span
                  className="ml-2 inline-block h-2 w-2 rounded-full bg-[var(--color-stable)]"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              </span>
              <div className="font-mono tabular-nums">
                <motion.span
                  key={total}
                  initial={{ scale: 1.15, color: "#a78bfa" }}
                  animate={{ scale: 1, color: "#ffffff" }}
                  transition={{ duration: 0.5 }}
                  className="text-[2.4rem] font-bold"
                >
                  {total}
                </motion.span>
                <span className="ml-2 text-caption text-[var(--color-fg-dim)]">
                  표 누적
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              {sorted.map((c, i) => (
                <VoteBar
                  key={c.key}
                  k={c.key}
                  rank={i + 1}
                  count={counts[c.key]}
                  max={max}
                  total={total}
                  fresh={freshKey === c.key}
                  isLeader={leaderKey === c.key}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </SlideShell>
  );
};

Slide.meta = { id: "vote", title: "Vote + Results", section: "04" };
Slide.steps = 0;

export default Slide;
