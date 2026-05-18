import { motion } from "framer-motion";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";

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
          "radial-gradient(circle at 50% 55%, rgba(167,139,250,0.25), transparent 55%), radial-gradient(circle at 80% 80%, rgba(47,214,158,0.10), transparent 50%)",
      }}
    />

    <div className="relative z-10 text-center">
      <Reveal>
        <div className="text-eyebrow text-fg-muted">Thank you</div>
      </Reveal>
      <Reveal delay={0.25} duration={0.9}>
        <h2 className="mt-7 text-display text-balance leading-[1.04]">
          질문을 받겠습니다.
        </h2>
      </Reveal>
      <Reveal delay={0.6}>
        <div className="mt-12 inline-flex items-center gap-3 rounded-full border border-border bg-white/[0.04] px-5 py-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
          <span className="text-caption text-fg-muted">
            KAIST DFMBA · 재무회계 · 가상자산 팀
          </span>
        </div>
      </Reveal>
    </div>
  </div>
);

Slide.meta = { id: "closing", title: "Closing" };
Slide.steps = 0;

export default Slide;
