import { motion } from "framer-motion";
import { Highlight } from "@/motion/Highlight";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import {
  BitcoinLogo,
  EthereumLogo,
  TetherLogo,
  XLogo,
  AppleLogo,
} from "@/visuals/Logos";

/* A floating, gently-bobbing logo anchored by absolute position. */
function Floater({
  children,
  top,
  left,
  right,
  bottom,
  delay,
  drift,
  opacity = 0.7,
}: {
  children: React.ReactNode;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay: number;
  drift: number;
  opacity?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity, y: 0 }}
      transition={{ duration: 1.4, delay }}
      style={{ top, left, right, bottom }}
    >
      <motion.div
        animate={{ y: [0, drift, 0] }}
        transition={{
          duration: 6 + Math.abs(drift) * 0.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const Slide: SlideComponent = ({ step }) => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-bg px-[7vw]">
      {/* Gradient orb backdrop */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6 }}
        style={{
          background:
            "radial-gradient(circle at 16% 26%, rgba(247,147,26,0.20), transparent 44%), radial-gradient(circle at 84% 30%, rgba(99,114,229,0.20), transparent 46%), radial-gradient(circle at 50% 96%, rgba(15,157,106,0.16), transparent 42%)",
        }}
      />

      {/* Floating assets (top) */}
      <Floater top="15%" left="11%" delay={0.3} drift={-10}>
        <BitcoinLogo size={70} />
      </Floater>
      <Floater top="19%" right="13%" delay={0.5} drift={-12}>
        <EthereumLogo size={70} />
      </Floater>
      <Floater top="12%" left="50%" delay={0.7} drift={-8}>
        <TetherLogo size={58} />
      </Floater>

      {/* Floating big-tech finalists (bottom corners, subtle) */}
      <Floater bottom="16%" left="15%" delay={0.95} drift={9} opacity={0.5}>
        <XLogo size={52} />
      </Floater>
      <Floater bottom="18%" right="16%" delay={1.1} drift={8} opacity={0.5}>
        <AppleLogo size={52} />
      </Floater>

      {/* Title */}
      <div className="relative z-10 max-w-[68rem] text-center">
        <Reveal>
          <div className="flex flex-col items-center gap-3">
            <motion.span
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className="rounded-full border-2 border-accent bg-accent/[0.1] px-7 py-2 text-h3 font-extrabold tracking-wide text-accent"
            >
              발표 9조
            </motion.span>
            <div className="text-eyebrow text-fg-dim">
              KAIST DFMBA · 재무회계 기말 발표
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25} duration={0.9}>
          <h1 className="mt-8 whitespace-nowrap font-bold leading-[1.04] tracking-[-0.02em] text-[clamp(1.9rem,5vw,4.2rem)]">
            비트코인 · 이더리움 · 스테이블코인
          </h1>
        </Reveal>

        <Reveal delay={0.5} duration={0.9}>
          <p className="mt-7 text-h2 font-semibold text-fg-muted text-balance">
            Crypto 생태계 성숙에 따른{" "}
            <Highlight when={step >= 1} color="var(--color-accent)" delay={0.3}>
              선도기업 선정
            </Highlight>
          </p>
        </Reveal>

        <Reveal delay={0.8}>
          <p className="mt-9 text-lead text-fg-dim text-pretty">
            세 자산의 연결고리부터 — 우리들의 최종 투자처까지
          </p>
        </Reveal>
      </div>

      {/* team footer */}
      <motion.div
        className="absolute inset-x-0 bottom-[6vh] z-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-caption text-fg-dim"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="font-semibold text-fg-muted">9조</span>
        <span className="text-fg-faint">·</span>
        <span>김송미 · 김현준 · 배선익 · 서세현 · 이강병 · 조인성</span>
      </motion.div>
    </div>
  );
};

Slide.meta = { id: "title", title: "Title" };
Slide.steps = 1;

export default Slide;
