import { motion } from "framer-motion";
import { Home, Fuel, Building2 } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Stagger } from "@/motion/Stagger";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";
import { EthereumLogo, TetherLogo, UsdcLogo } from "@/visuals/Logos";

/* ───────── Hero: platform with floating stablecoins ───────── */

function PlatformVisual() {
  // 5 floating tokens above an Ethereum platform bar
  const tokens = [
    { Logo: TetherLogo, delay: 0 },
    { Logo: UsdcLogo, delay: 0.3 },
    { Logo: TetherLogo, delay: 0.6 },
    { Logo: UsdcLogo, delay: 0.9 },
    { Logo: TetherLogo, delay: 1.2 },
  ];

  return (
    <div className="relative">
      {/* Floating tokens row */}
      <div className="grid grid-cols-5 gap-2 px-2">
        {tokens.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5 + i * 0.08,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex justify-center"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: t.delay,
                ease: "easeInOut",
              }}
            >
              <t.Logo size={44} />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Activity pulses traveling down */}
      <div className="relative mt-2 grid h-6 grid-cols-5">
        {tokens.map((_, i) => (
          <div key={i} className="relative flex justify-center">
            <motion.span
              className="absolute h-1.5 w-1.5 rounded-full bg-stable"
              initial={{ top: 0, opacity: 0 }}
              animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: 1.0 + i * 0.18,
                ease: "easeIn",
              }}
            />
          </div>
        ))}
      </div>

      {/* Ethereum platform bar */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.9 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex items-center justify-between overflow-hidden rounded-2xl px-7 py-4"
        style={{
          background:
            "linear-gradient(135deg, var(--color-eth), color-mix(in srgb, var(--color-eth) 70%, black))",
        }}
      >
        <div className="flex items-center gap-3 text-white">
          <EthereumLogo size={40} />
          <div className="leading-tight">
            <div className="text-eyebrow text-white/70">PLATFORM</div>
            <div className="text-h3 font-bold leading-none">Ethereum</div>
          </div>
        </div>
        <div className="text-right text-caption text-white/85">
          모든 거래의 가스비 = <span className="font-semibold text-white">ETH</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ───────── Pillar cards ───────── */

const pillars = [
  {
    Icon: Home,
    title: "본거지",
    head: "USDT · USDC가 처음 발행되고, 가장 깊은 유동성이 여기에 있다.",
  },
  {
    Icon: Fuel,
    title: "연료",
    head: "스테이블 전송 수수료를 ETH로 낸다. 거래량 ↑ = ETH 수요 ↑.",
  },
  {
    Icon: Building2,
    title: "기축통화",
    head: "Aave · Uniswap 등 DeFi의 핵심 유동성 — 없으면 작동 X.",
  },
];

/* ───────── Slide ───────── */

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell section="02 · 연결" title="이더리움 ↔ 스테이블코인" accent="eth">
      <Reveal>
        <p
          className="text-lead text-fg-muted text-pretty"
          style={{ wordBreak: "keep-all" }}
        >
          이더리움은 도로, 스테이블코인은 그 위를 흐르는 화폐.
        </p>
      </Reveal>

      {/* Hero — platform with floating stablecoins */}
      <Reveal delay={0.25} duration={0.85}>
        <div className="mt-8 rounded-3xl border border-eth/30 bg-eth/[0.05] p-6">
          <PlatformVisual />
        </div>
      </Reveal>

      {/* 3 pillars */}
      <Stagger delay={0.7} step={0.12} className="mt-6 grid grid-cols-3 gap-4">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="flex h-full flex-col rounded-2xl border border-border bg-surface-1 p-5"
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-h3 font-bold text-eth leading-none">
                {`①②③`[i]}
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-eth/15 text-eth">
                <p.Icon size={18} strokeWidth={1.8} />
              </div>
              <span className="text-eyebrow text-eth">{p.title}</span>
            </div>
            <div
              className="mt-3 text-body text-fg leading-snug text-pretty"
              style={{ wordBreak: "keep-all" }}
            >
              {p.head}
            </div>
          </motion.div>
        ))}
      </Stagger>

      {/* Payoff */}
      <Reveal delay={1.15} duration={0.75}>
        <p
          className="mt-7 text-h3 leading-snug text-pretty"
          style={{ wordBreak: "keep-all" }}
        >
          그래서 이더리움과 스테이블코인은{" "}
          <Highlight when={step >= 1} color="var(--color-eth)" delay={0.15}>
            한 몸으로 움직인다.
          </Highlight>
        </p>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "eth-stable", title: "ETH × Stablecoin", section: "02" };
Slide.steps = 1;

export default Slide;
