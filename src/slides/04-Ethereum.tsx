import { motion } from "framer-motion";
import { Coins, Boxes, Image as ImageIcon, DollarSign, Zap, ChevronDown } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";
import { EthereumLogo } from "@/visuals/Logos";

type App = {
  label: string;
  Icon: typeof Coins;
  emphasis?: boolean;
};

const apps: App[] = [
  { label: "DeFi", Icon: Coins },
  { label: "DApp", Icon: Boxes },
  { label: "NFT", Icon: ImageIcon },
  { label: "Stablecoin", Icon: DollarSign, emphasis: true },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell
      section="01 · 세 자산"
      title={
        <span className="inline-flex items-center gap-5">
          <motion.span
            initial={{ rotate: -8, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <EthereumLogo size={56} />
          </motion.span>
          <span>이더리움 — 월드 컴퓨터</span>
        </span>
      }
      accent="eth"
    >
      <Reveal>
        <p
          className="text-lead text-fg-muted text-pretty"
          style={{ wordBreak: "keep-all" }}
        >
          2013년 비탈릭 부테린이 백서를 발표, 2015년 메인넷 출시. 블록체인 서비스를 돌릴 수 있는 플랫폼이다.
        </p>
      </Reveal>

      {/* Layered visualization: apps → smart contract → Ethereum */}
      <div className="relative mt-8 flex flex-col gap-4">
        {/* TOP — Apps dropping onto the platform */}
        <div className="grid grid-cols-4 gap-4">
          {apps.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: -34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.9 + i * 0.13,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                animate={
                  a.emphasis && step >= 1
                    ? { y: [0, -4, 0], scale: [1, 1.03, 1] }
                    : {}
                }
                transition={{
                  duration: 1.6,
                  repeat: a.emphasis && step >= 1 ? Infinity : 0,
                  ease: "easeInOut",
                }}
                className={
                  a.emphasis
                    ? "flex items-center justify-center gap-2 rounded-2xl border-2 border-eth bg-eth/[0.14] px-5 py-4 shadow-card"
                    : "flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface-1 px-5 py-4"
                }
                style={
                  a.emphasis
                    ? {
                        boxShadow: `0 0 32px color-mix(in srgb, var(--color-eth) 35%, transparent)`,
                      }
                    : undefined
                }
              >
                <a.Icon
                  size={22}
                  strokeWidth={1.8}
                  className={a.emphasis ? "text-eth" : "text-fg-muted"}
                />
                <span
                  className={
                    a.emphasis
                      ? "text-h3 font-bold text-eth"
                      : "text-h3 font-semibold text-fg"
                  }
                >
                  {a.label}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Connecting arrows */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.4 }}
          className="grid grid-cols-4"
        >
          {apps.map((a) => (
            <div key={a.label} className="flex justify-center">
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronDown
                  size={20}
                  strokeWidth={2}
                  className={a.emphasis ? "text-eth" : "text-fg-faint"}
                />
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* MIDDLE — Smart Contract engine */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl border border-eth/35 bg-eth/[0.06] px-6 py-5"
        >
          <div className="flex items-center gap-5">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-eth/15 text-eth"
            >
              <Zap size={22} strokeWidth={1.8} />
            </motion.div>

            <div className="flex-1">
              <div className="text-eyebrow text-eth">스마트 컨트랙트</div>
              <div
                className="mt-1.5 font-mono text-h3 leading-snug text-fg"
                style={{ wordBreak: "keep-all" }}
              >
                if (조건 충족){" "}
                <span className="text-eth">→</span> 자동 실행 — 중개인 없이.
              </div>
            </div>

            <span className="hidden shrink-0 rounded-full bg-eth/15 px-4 py-1.5 text-caption font-mono text-eth md:inline-flex">
              EVM
            </span>
          </div>
        </motion.div>

        {/* Bottom platform pedestal */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-between gap-6 overflow-hidden rounded-2xl px-7 py-5"
          style={{
            background: "linear-gradient(135deg, var(--color-eth), color-mix(in srgb, var(--color-eth) 75%, black))",
          }}
        >
          <div className="flex items-center gap-4 text-white">
            <EthereumLogo size={48} />
            <div>
              <div className="text-eyebrow text-white/70">PLATFORM · LAYER 1</div>
              <div className="text-h2 font-bold leading-tight">Ethereum</div>
            </div>
          </div>
          <div className="text-right text-caption text-white/85">
            모든 거래의 수수료 = <span className="font-semibold text-white">ETH</span>
            <br />
            2022 The Merge — PoW → PoS
          </div>
        </motion.div>
      </div>

      {/* Payoff */}
      <Reveal delay={1.8} duration={0.75}>
        <p
          className="mt-7 text-h3 leading-snug text-pretty"
          style={{ wordBreak: "keep-all" }}
        >
          그리고 결정적으로 —{" "}
          <Highlight when={step >= 1} color="var(--color-eth)" delay={0.15}>
            USDT · USDC도 이더리움 위에서 발행
          </Highlight>
          된다.
        </p>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "ethereum", title: "Ethereum", section: "01" };
Slide.steps = 2;

export default Slide;
