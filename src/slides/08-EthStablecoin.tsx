import { motion } from "framer-motion";
import { Send, Wallet, Repeat2, Coins } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Stagger } from "@/motion/Stagger";
import { SlideComponent } from "@/deck/types";
import { EthereumLogo, TetherLogo, UsdcLogo } from "@/visuals/Logos";

const flows = [
  { label: "송금", Icon: Send },
  { label: "결제", Icon: Wallet },
  { label: "거래", Icon: Repeat2 },
  { label: "DeFi 담보", Icon: Coins },
];

const Slide: SlideComponent = () => {
  return (
    <SlideShell section="02 · 연결" title="이더리움 ↔ 스테이블코인" accent="eth">
      <Reveal>
        <div className="flex flex-wrap items-center gap-6 text-h2 leading-tight">
          <span className="font-bold text-eth">인프라</span>
          <span className="text-fg-faint">vs</span>
          <span className="font-bold text-stable">그 위의 화폐</span>
        </div>
      </Reveal>

      <Reveal delay={0.3} duration={0.8}>
        <p className="mt-7 max-w-[68ch] text-lead leading-snug text-fg-muted text-pretty">
          이더리움은 디지털 경제의 도로, 스테이블코인은 그 위를 흐르는 화폐.
          사람들은 이더리움 위에서 스테이블코인으로 경제활동을 한다.
        </p>
      </Reveal>

      <Reveal delay={0.55} duration={0.85}>
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-white/[0.02] p-9">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-10">
            {/* Left: Ethereum */}
            <div className="flex flex-col items-center text-center">
              <EthereumLogo size={84} />
              <div className="mt-4 text-eyebrow text-eth">LAYER</div>
              <div className="mt-2 text-h1 font-bold text-eth">Ethereum</div>
              <div className="mt-1 text-caption text-fg-dim">분산 플랫폼</div>
            </div>

            {/* Flowing dots */}
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-2 w-2 rounded-full bg-stable"
                  animate={{ opacity: [0.2, 1, 0.2], x: [0, 8, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            {/* Right: Stablecoins */}
            <div className="flex flex-col items-center text-center">
              <div className="flex gap-3">
                <TetherLogo size={60} />
                <UsdcLogo size={60} />
              </div>
              <div className="mt-4 text-eyebrow text-stable">CURRENCY</div>
              <div className="mt-2 text-h1 font-bold text-stable">USDT · USDC</div>
              <div className="mt-1 text-caption text-fg-dim">ERC-20 토큰</div>
            </div>
          </div>

          <Stagger delay={1.1} step={0.1} className="mt-10 flex flex-wrap justify-center gap-3">
            {flows.map((f) => (
              <span
                key={f.label}
                className="inline-flex items-center gap-2 rounded-full border border-stable/30 bg-stable/[0.06] px-5 py-2 text-caption font-medium"
              >
                <f.Icon size={16} strokeWidth={1.7} className="text-stable" />
                {f.label}
              </span>
            ))}
          </Stagger>
        </div>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "eth-stable", title: "ETH × Stablecoin", section: "02" };
Slide.steps = 0;

export default Slide;
