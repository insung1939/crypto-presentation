import { motion } from "framer-motion";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";

const Slide: SlideComponent = () => (
  <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[var(--color-bg)] px-[6vw]">
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      style={{
        background:
          "radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-accent) 28%, transparent), transparent 55%)",
      }}
    />
    <div className="relative z-10 text-center">
      <Reveal>
        <div className="mb-6 text-[1.3rem] font-medium tracking-[0.3em] text-[var(--color-fg-muted)] uppercase">
          Thank you
        </div>
      </Reveal>
      <Reveal delay={0.2}>
        <h2 className="text-balance text-[4.8rem] font-bold leading-[1.1]">
          질문을 받겠습니다.
        </h2>
      </Reveal>
      <Reveal delay={0.5}>
        <div className="mt-10 text-[1.15rem] text-[var(--color-fg-muted)]">
          KAIST DFMBA · 재무회계 · 가상자산 팀
        </div>
      </Reveal>
    </div>
  </div>
);

Slide.meta = { id: "closing", title: "Closing" };
Slide.steps = 0;

export default Slide;
