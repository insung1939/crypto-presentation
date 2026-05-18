import { motion } from "framer-motion";
import { Underline } from "@/motion/Underline";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";

const Slide: SlideComponent = ({ step }) => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-[var(--color-bg)] px-[6vw]">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{
          background:
            "radial-gradient(circle at 20% 30%, color-mix(in srgb, var(--color-btc) 25%, transparent), transparent 45%), radial-gradient(circle at 80% 70%, color-mix(in srgb, var(--color-eth) 25%, transparent), transparent 45%), radial-gradient(circle at 50% 90%, color-mix(in srgb, var(--color-stable) 18%, transparent), transparent 40%)",
        }}
      />

      <div className="relative z-10 max-w-[60rem] text-center">
        <Reveal>
          <div className="mb-6 text-[1.3rem] font-medium tracking-[0.3em] text-[var(--color-fg-muted)] uppercase">
            KAIST DFMBA · 재무회계 기말 발표
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <h1 className="text-balance text-[5.2rem] font-bold leading-[1.1]">
            비트코인, 이더리움,
            <br />
            그리고{" "}
            <Underline when={step >= 1} color="var(--color-stable)" thickness={6} delay={0.2}>
              스테이블코인
            </Underline>
          </h1>
        </Reveal>

        <Reveal delay={0.5}>
          <p className="mt-10 text-[1.6rem] leading-relaxed text-[var(--color-fg-muted)] text-pretty">
            세 자산의 특성과 연결 관계, 그리고 빅테크는 어디로 가는가
          </p>
        </Reveal>
      </div>
    </div>
  );
};

Slide.meta = { id: "title", title: "Title" };
Slide.steps = 1;

export default Slide;
