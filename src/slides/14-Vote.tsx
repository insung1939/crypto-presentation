import { QRCodeSVG } from "qrcode.react";
import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Shake } from "@/motion/Shake";
import { SlideComponent } from "@/deck/types";
import { companies } from "@/vote/companies";

const voteUrl =
  (import.meta.env.VITE_VOTE_URL as string | undefined) ??
  (typeof window !== "undefined" ? `${window.location.origin}/vote` : "");

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell section="04 · 참여" title="여러분이라면, 어디에 투자하시겠습니까?" accent="accent">
      <div className="mt-2 grid flex-1 grid-cols-[auto_1fr] items-center gap-14">
        <Reveal>
          <Shake when={step >= 1} intensity={5}>
            <motion.div
              className="rounded-3xl bg-white p-6 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <QRCodeSVG value={voteUrl} size={300} level="M" includeMargin={false} />
            </motion.div>
          </Shake>
          <div className="mt-4 text-center font-mono text-[0.95rem] text-[var(--color-fg-muted)]">
            {voteUrl.replace(/^https?:\/\//, "")}
          </div>
        </Reveal>

        <div>
          <Reveal delay={0.25}>
            <div className="text-[1.4rem] font-semibold text-[var(--color-accent)]">
              QR을 스캔하세요
            </div>
            <p className="mt-2 text-[1.6rem] leading-snug text-pretty">
              5개 회사 중 <span className="font-bold text-white">한 곳</span>에만
              투표해주세요.
            </p>
          </Reveal>

          <div className="mt-8 space-y-3">
            {companies.map((c, i) => (
              <Reveal key={c.key} delay={0.4 + i * 0.08}>
                <div className="flex items-center gap-4">
                  <span
                    className="inline-block h-3 w-3 rounded-full"
                    style={{ background: c.color }}
                  />
                  <span className="text-[1.4rem] font-semibold" style={{ color: c.color }}>
                    {c.name}
                  </span>
                  <span className="text-[1.1rem] text-[var(--color-fg-muted)]">
                    — {c.tagline}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
};

Slide.meta = { id: "vote-qr", title: "Vote QR", section: "04" };
Slide.steps = 1;

export default Slide;
