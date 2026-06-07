import { motion } from "framer-motion";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";

// 팀원 이름 — 받는 대로 채우면 마지막 줄에 자동 표시됨
const members: string[] = [];

const Slide: SlideComponent = () => (
  <div className="relative grain-bg flex h-full w-full flex-col items-center justify-center overflow-hidden bg-bg px-[7vw]">
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6 }}
      style={{
        background:
          "radial-gradient(circle at 50% 55%, rgba(109,59,212,0.18), transparent 55%), radial-gradient(circle at 85% 85%, rgba(15,157,106,0.12), transparent 50%)",
      }}
    />

    <div className="relative z-10 flex flex-col items-center text-center">
      <Reveal>
        <div className="text-eyebrow text-fg-dim">KAIST DFMBA · 재무회계</div>
      </Reveal>

      <Reveal delay={0.25} duration={0.9}>
        <h2 className="mt-7 text-display text-balance leading-[1.02] text-fg">
          Thank you
        </h2>
      </Reveal>

      <Reveal delay={0.55}>
        <motion.div
          initial={{ scale: 0.92 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          className="mt-6 inline-flex items-center gap-3 rounded-full border border-border bg-bg-soft px-7 py-3 shadow-card"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-accent" />
          <span className="font-mono text-[1.5rem] font-bold tracking-[0.18em] text-accent">
            Q &amp; A
          </span>
        </motion.div>
      </Reveal>

      <Reveal delay={0.9}>
        <div className="mt-10 flex flex-col items-center gap-2">
          <div className="rounded-full border border-accent/40 bg-accent/[0.08] px-6 py-2 text-h3 font-bold text-accent">
            9조
          </div>
          {members.length > 0 && (
            <div className="mt-1 text-caption text-fg-muted">
              {members.join("  ·  ")}
            </div>
          )}
        </div>
      </Reveal>
    </div>
  </div>
);

Slide.meta = { id: "closing", title: "Closing" };
Slide.steps = 0;

export default Slide;
