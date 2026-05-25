import { motion } from "framer-motion";
import { Home, Fuel, Building2 } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Stagger } from "@/motion/Stagger";
import { Underline } from "@/motion/Underline";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";
import { EthereumLogo, TetherLogo, UsdcLogo } from "@/visuals/Logos";

const pillars = [
  {
    Icon: Home,
    title: "본거지",
    head: "USDT · USDC가 처음 발행·유통된 곳",
    body: "ERC-20 표준 위에서 두 코인이 태어났고, 가장 깊은 유동성이 여전히 이더리움에 있다.",
  },
  {
    Icon: Fuel,
    title: "연료",
    head: "스테이블 전송 수수료 = ETH",
    body: "스테이블코인 거래가 늘면 가스 수요가 늘고, 이는 ETH 수요로 직결되는 구조.",
  },
  {
    Icon: Building2,
    title: "기축통화",
    head: "DeFi의 가격 기준",
    body: "Aave·Uniswap 등 주요 DeFi의 핵심 유동성은 스테이블코인 — 없으면 사실상 작동 X.",
  },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell section="02 · 연결" title="이더리움 ↔ 스테이블코인" accent="eth">
      {/* Identity strip + flowing dots */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-5 text-h2 leading-tight">
          <div className="flex items-center gap-3">
            <EthereumLogo size={48} />
            <span className="font-bold text-eth">플랫폼</span>
          </div>

          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-2 w-2 rounded-full bg-stable"
                animate={{ opacity: [0.2, 1, 0.2], x: [0, 10, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <TetherLogo size={48} />
              <UsdcLogo size={48} />
            </div>
            <span className="font-bold text-stable">그 위의 화폐</span>
          </div>

          <span className="ml-3 text-lead text-fg-muted">
            — 도로와 그 위를 흐르는 돈.
          </span>
        </div>
      </Reveal>

      {/* Three pillars */}
      <Stagger delay={0.3} step={0.13} className="mt-9 grid grid-cols-3 gap-5">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="flex h-full flex-col rounded-3xl border border-border bg-surface-1 p-6"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-h2 font-bold text-eth leading-none">
                {`①②③`[i]}
              </span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-eth/15 text-eth">
                <p.Icon size={20} strokeWidth={1.8} />
              </div>
            </div>
            <div className="mt-5 text-eyebrow text-eth">{p.title}</div>
            <div className="mt-2 text-h3 font-semibold leading-snug text-pretty">
              {p.head}
            </div>
            <div className="mt-4 text-body text-fg-muted leading-snug text-pretty">
              {p.body}
            </div>
          </motion.div>
        ))}
      </Stagger>

      {/* Payoff */}
      <Reveal delay={1.0} duration={0.8}>
        <p className="mt-9 text-h3 leading-snug text-pretty">
          그래서 이더리움과 스테이블코인은{" "}
          <Highlight when={step >= 1} color="var(--color-eth)" delay={0.15}>
            한 몸으로 움직인다
          </Highlight>
          {" "}— 한쪽이 흔들리면{" "}
          <Underline when={step >= 1} color="var(--color-warn)" delay={0.45}>
            다른 쪽도 흔들린다
          </Underline>
          .
        </p>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "eth-stable", title: "ETH × Stablecoin", section: "02" };
Slide.steps = 1;

export default Slide;
