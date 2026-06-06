import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { companyMap } from "@/vote/companies";
import { useVoteCounts } from "@/vote/useVoteCounts";
import { XLogo, AppleLogo } from "@/visuals/Logos";
import { isSupabaseConfigured } from "@/lib/supabase";

const voteUrl =
  (import.meta.env.VITE_VOTE_URL as string | undefined) ??
  (typeof window !== "undefined" ? `${window.location.origin}/vote` : "");

const X_COLOR = companyMap.x.color;
const A_COLOR = companyMap.apple.color;

function Count({ value }: { value: number }) {
  return (
    <motion.span
      key={value}
      initial={{ scale: 1.2, opacity: 0.7 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="font-mono tabular-nums"
    >
      {value}
    </motion.span>
  );
}

const Slide: SlideComponent = () => {
  const { counts, fresh } = useVoteCounts();
  const [bump, setBump] = useState<"x" | "apple" | null>(null);

  useEffect(() => {
    if (!fresh) return;
    if (fresh.key === "x" || fresh.key === "apple") {
      setBump(fresh.key);
      const t = setTimeout(() => setBump(null), 700);
      return () => clearTimeout(t);
    }
  }, [fresh]);

  const x = counts.x;
  const a = counts.apple;
  const total = x + a;
  const xShare = total ? (x / total) * 100 : 50;
  const aShare = total ? (a / total) * 100 : 50;
  const leader = total === 0 ? null : x === a ? "tie" : x > a ? "x" : "apple";

  return (
    <SlideShell
      section="04 · 청중의 선택"
      title="여러분이라면 어디에 투자하시겠습니까?"
      accent="accent"
    >
      {!isSupabaseConfigured() && (
        <div className="mb-4 rounded-xl border border-warn/40 bg-warn/10 px-4 py-3 text-caption text-warn">
          ⚠ Supabase 미설정 — 실시간 집계가 동작하지 않습니다.
        </div>
      )}

      <div className="grid flex-1 grid-cols-[auto_1fr] items-center gap-14">
        {/* QR */}
        <Reveal duration={0.8}>
          <div className="flex flex-col items-center">
            <motion.div
              className="rounded-3xl bg-white p-5"
              style={{ boxShadow: "0 1px 2px rgba(15,15,30,0.06), 0 30px 80px -20px rgba(109,59,212,0.35)" }}
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <QRCodeSVG value={voteUrl} size={228} level="M" includeMargin={false} />
            </motion.div>
            <div className="mt-5 text-eyebrow text-accent">SCAN TO VOTE</div>
            <div className="mt-2 font-mono text-micro text-fg-dim">
              {voteUrl.replace(/^https?:\/\//, "")}
            </div>
          </div>
        </Reveal>

        {/* Head-to-head */}
        <Reveal delay={0.15} duration={0.8}>
          <div className="flex flex-col">
            {/* LIVE total */}
            <div className="mb-5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-eyebrow text-fg-dim">
                LIVE
                <motion.span
                  className="inline-block h-2 w-2 rounded-full bg-stable"
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
              </span>
              <div className="text-fg">
                <span className="text-[2.4rem] font-bold leading-none">
                  <Count value={total} />
                </span>
                <span className="ml-2 text-caption text-fg-dim">표 누적</span>
              </div>
            </div>

            {/* logos + counts */}
            <div className="flex items-end justify-between">
              <motion.div
                className="flex items-center gap-3"
                animate={{ scale: bump === "x" ? 1.06 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <XLogo size={56} />
                <div>
                  <div className="text-h3 font-bold leading-none">X</div>
                  <div className="text-micro text-fg-dim">{companyMap.x.tagline}</div>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 text-right"
                animate={{ scale: bump === "apple" ? 1.06 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <div>
                  <div className="text-h3 font-bold leading-none">Apple</div>
                  <div className="text-micro text-fg-dim">{companyMap.apple.tagline}</div>
                </div>
                <AppleLogo size={56} />
              </motion.div>
            </div>

            {/* split bar */}
            <div className="relative mt-4 flex h-16 overflow-hidden rounded-2xl bg-surface-2">
              <motion.div
                className="flex items-center justify-start pl-5"
                style={{ background: `linear-gradient(90deg, ${X_COLOR}, color-mix(in srgb, ${X_COLOR} 70%, #555))` }}
                animate={{ width: `${xShare}%` }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-mono text-[1.5rem] font-bold tabular-nums text-white">
                  {Math.round(xShare)}%
                </span>
              </motion.div>
              <motion.div
                className="flex flex-1 items-center justify-end pr-5"
                style={{ background: `linear-gradient(90deg, color-mix(in srgb, ${A_COLOR} 70%, white), ${A_COLOR})` }}
              >
                <span className="font-mono text-[1.5rem] font-bold tabular-nums text-white">
                  {Math.round(aShare)}%
                </span>
              </motion.div>
            </div>

            {/* raw counts */}
            <div className="mt-4 flex justify-between text-fg">
              <span className="text-h3 font-bold" style={{ color: leader === "x" ? X_COLOR : undefined }}>
                <Count value={x} /> <span className="text-caption font-normal text-fg-dim">표</span>
              </span>
              <span className="text-h3 font-bold" style={{ color: leader === "apple" ? A_COLOR : undefined }}>
                <Count value={a} /> <span className="text-caption font-normal text-fg-dim">표</span>
              </span>
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
