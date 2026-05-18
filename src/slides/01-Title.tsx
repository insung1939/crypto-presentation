import { motion } from "framer-motion";
import { Underline } from "@/motion/Underline";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { BitcoinLogo, EthereumLogo, TetherLogo } from "@/visuals/Logos";

const Slide: SlideComponent = ({ step }) => {
  return (
    <div className="relative grain-bg flex h-full w-full flex-col items-center justify-center overflow-hidden bg-bg px-[7vw]">
      {/* Gradient orb backdrop */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6 }}
        style={{
          background:
            "radial-gradient(circle at 18% 28%, rgba(247,147,26,0.18), transparent 42%), radial-gradient(circle at 82% 72%, rgba(124,141,242,0.18), transparent 44%), radial-gradient(circle at 50% 90%, rgba(47,214,158,0.14), transparent 40%)",
        }}
      />

      {/* Floating logos */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.55, y: 0 }}
        transition={{ duration: 1.4, delay: 0.3 }}
        style={{ top: "18%", left: "12%" }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <BitcoinLogo size={72} />
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.55, y: 0 }}
        transition={{ duration: 1.4, delay: 0.5 }}
        style={{ top: "22%", right: "14%" }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <EthereumLogo size={72} />
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden
        className="pointer-events-none absolute"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.55, y: 0 }}
        transition={{ duration: 1.4, delay: 0.7 }}
        style={{ bottom: "20%", left: "50%", transform: "translateX(-50%)" }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <TetherLogo size={72} />
        </motion.div>
      </motion.div>

      {/* Title */}
      <div className="relative z-10 max-w-[64rem] text-center">
        <Reveal>
          <div className="text-eyebrow text-fg-dim">
            KAIST DFMBA · 재무회계 기말 발표
          </div>
        </Reveal>

        <Reveal delay={0.25} duration={0.9}>
          <h1 className="mt-8 text-display text-balance">
            비트코인, 이더리움,
            <br />
            그리고{" "}
            <Underline
              when={step >= 1}
              color="var(--color-stable)"
              thickness={6}
              delay={0.3}
            >
              스테이블코인
            </Underline>
          </h1>
        </Reveal>

        <Reveal delay={0.6}>
          <p className="mt-10 text-lead text-fg-muted text-pretty">
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
