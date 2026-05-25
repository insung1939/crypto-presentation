import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { BitcoinLogo, EthereumLogo, TetherLogo, UsdcLogo } from "@/visuals/Logos";

/* ───────── Personality visuals ───────── */

function ScarcityDots() {
  // 10×8 dot grid (80 total); 76 filled = ~95% issued
  const total = 80;
  const filled = 76;
  return (
    <div className="grid grid-cols-10 gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.5 + i * 0.008,
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-2 w-2 rounded-full"
          style={{
            background:
              i < filled
                ? "var(--color-btc)"
                : "color-mix(in srgb, var(--color-btc) 18%, transparent)",
          }}
        />
      ))}
    </div>
  );
}

function NetworkPulse() {
  // 5 nodes in a star layout, connected by lines, with a traveling pulse
  const nodes = [
    { x: 50, y: 14 },
    { x: 14, y: 42 },
    { x: 86, y: 42 },
    { x: 30, y: 84 },
    { x: 70, y: 84 },
  ];
  const edges: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [1, 2],
  ];

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      {edges.map(([a, b], i) => {
        const na = nodes[a];
        const nb = nodes[b];
        return (
          <g key={i}>
            <line
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="var(--color-eth)"
              strokeWidth="0.6"
              strokeOpacity="0.4"
            />
            <motion.circle
              r="1.6"
              fill="var(--color-eth)"
              initial={{ cx: na.x, cy: na.y, opacity: 0 }}
              animate={{
                cx: [na.x, nb.x],
                cy: [na.y, nb.y],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.8,
                delay: 0.6 + i * 0.25,
                repeat: Infinity,
                repeatDelay: 1.4,
                ease: "easeInOut",
              }}
            />
          </g>
        );
      })}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r="3.2"
          fill="var(--color-eth)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
        />
      ))}
    </svg>
  );
}

function FlatPegLine() {
  return (
    <svg viewBox="0 0 100 60" className="h-full w-full">
      {/* dashed center reference */}
      <line
        x1="0"
        y1="30"
        x2="100"
        y2="30"
        stroke="var(--color-stable)"
        strokeWidth="0.4"
        strokeDasharray="2 2"
        strokeOpacity="0.35"
      />
      {/* the price line: draws across, then stays flat with tiny tremor */}
      <motion.path
        d="M 0 30 L 100 30"
        stroke="var(--color-stable)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.4, duration: 1.0, ease: "easeInOut" }}
      />
      {/* $1.00 label */}
      <motion.text
        x="92"
        y="26"
        textAnchor="end"
        fontFamily="ui-monospace, SF Mono, Menlo, monospace"
        fontSize="6"
        fill="var(--color-stable)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        $1.00
      </motion.text>
      {/* anchor dot bouncing on the line */}
      <motion.circle
        cx="50"
        cy="30"
        r="2.4"
        fill="var(--color-stable)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, cx: [10, 90, 10] }}
        transition={{
          opacity: { delay: 1.4, duration: 0.3 },
          cx: { delay: 1.4, duration: 4, repeat: Infinity, ease: "linear" },
        }}
      />
    </svg>
  );
}

/* ───────── Card model ───────── */

type Asset = {
  key: "btc" | "eth" | "stable";
  name: string;
  identity: string;
  color: string;
  brand: string;
  Logo: (p: { size?: number }) => JSX.Element;
  SecondaryLogo?: (p: { size?: number }) => JSX.Element;
  Visual: () => JSX.Element;
  visualClass: string;
  facts: { k: string; v: string }[];
};

const assets: Asset[] = [
  {
    key: "btc",
    name: "Bitcoin",
    identity: "디지털 금",
    color: "var(--color-btc)",
    brand: "btc",
    Logo: BitcoinLogo,
    Visual: ScarcityDots,
    visualClass: "items-center justify-center px-2 py-3",
    facts: [
      { k: "핵심 약속", v: "희소성 · 2,100만 개" },
      { k: "합의 방식", v: "PoW · 10분/블록" },
      { k: "주된 쓰임", v: "가치 저장 · 담보" },
      { k: "변동성", v: "큼" },
    ],
  },
  {
    key: "eth",
    name: "Ethereum",
    identity: "월드 컴퓨터",
    color: "var(--color-eth)",
    brand: "eth",
    Logo: EthereumLogo,
    Visual: NetworkPulse,
    visualClass: "items-center justify-center",
    facts: [
      { k: "핵심 약속", v: "스마트 컨트랙트" },
      { k: "합의 방식", v: "PoS (2022~)" },
      { k: "주된 쓰임", v: "DeFi · NFT · 인프라" },
      { k: "변동성", v: "큼" },
    ],
  },
  {
    key: "stable",
    name: "Stablecoin",
    identity: "디지털 달러",
    color: "var(--color-stable)",
    brand: "stable",
    Logo: TetherLogo,
    SecondaryLogo: UsdcLogo,
    Visual: FlatPegLine,
    visualClass: "items-center justify-center",
    facts: [
      { k: "핵심 약속", v: "1:1 페그" },
      { k: "합의 방식", v: "발행사 준비금" },
      { k: "주된 쓰임", v: "결제 · 송금 · 기준통화" },
      { k: "변동성", v: "거의 없음" },
    ],
  },
];

const Slide: SlideComponent = () => {
  return (
    <SlideShell section="01 · 정리" accent="accent">
      <div className="grid flex-1 grid-cols-3 gap-6">
        {assets.map((a, i) => (
          <motion.div
            key={a.key}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15 + i * 0.13,
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ y: -6 }}
            className="relative flex h-full flex-col overflow-hidden rounded-3xl border bg-surface-1 p-7"
            style={{
              borderColor: `color-mix(in srgb, ${a.color} 30%, transparent)`,
            }}
          >
            {/* breathing brand halo */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl"
              animate={{ opacity: [0.18, 0.32, 0.18] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ background: a.color }}
            />

            {/* Logo + name */}
            <div className="relative flex items-center gap-3">
              <div className="flex items-center gap-2">
                <a.Logo size={44} />
                {a.SecondaryLogo && <a.SecondaryLogo size={44} />}
              </div>
              <div className="text-eyebrow" style={{ color: a.color }}>
                {a.name}
              </div>
            </div>

            {/* Identity */}
            <Reveal delay={0.35 + i * 0.13}>
              <div
                className="mt-4 text-h1 font-bold leading-[1.05]"
                style={{ color: a.color }}
              >
                {a.identity}
              </div>
            </Reveal>

            {/* Personality visual */}
            <div
              className={`mt-7 flex h-[18vh] w-full rounded-2xl border border-border bg-surface-2/60 ${a.visualClass}`}
            >
              <a.Visual />
            </div>

            {/* Fact list */}
            <div className="mt-6 flex-1 space-y-3.5">
              {a.facts.map((f, fi) => (
                <motion.div
                  key={f.k}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.75 + i * 0.08 + fi * 0.08,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-baseline justify-between gap-3 border-b border-border/70 pb-2.5 last:border-0"
                >
                  <span className="text-caption text-fg-dim">{f.k}</span>
                  <span
                    className="text-h3 font-semibold text-fg text-right"
                    style={{ wordBreak: "keep-all" }}
                  >
                    {f.v}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SlideShell>
  );
};

Slide.meta = { id: "compare-three", title: "Three Assets", section: "01" };
Slide.steps = 0;

export default Slide;
