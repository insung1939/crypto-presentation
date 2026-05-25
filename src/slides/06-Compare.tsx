import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { BitcoinLogo, EthereumLogo, TetherLogo } from "@/visuals/Logos";

type Asset = {
  key: string;
  name: string;
  Logo: (p: { size?: number }) => JSX.Element;
  color: string;
};

const assets: Asset[] = [
  { key: "btc", name: "Bitcoin", Logo: BitcoinLogo, color: "var(--color-btc)" },
  { key: "eth", name: "Ethereum", Logo: EthereumLogo, color: "var(--color-eth)" },
  { key: "stable", name: "Stablecoin", Logo: TetherLogo, color: "var(--color-stable)" },
];

type RowKey =
  | "identity"
  | "promise"
  | "consensus"
  | "usecase"
  | "volatility";

const rows: { key: RowKey; label: string; values: Record<string, string> }[] = [
  {
    key: "identity",
    label: "한 줄 정체성",
    values: { btc: "디지털 금", eth: "월드 컴퓨터", stable: "디지털 달러" },
  },
  {
    key: "promise",
    label: "핵심 약속",
    values: {
      btc: "희소성 · 2,100만 개",
      eth: "스마트 컨트랙트",
      stable: "1:1 페그",
    },
  },
  {
    key: "consensus",
    label: "합의 방식",
    values: { btc: "PoW · 10분/블록", eth: "PoS (2022~)", stable: "준비금 담보" },
  },
  {
    key: "usecase",
    label: "주된 쓰임",
    values: {
      btc: "가치 저장 · 담보",
      eth: "DeFi · NFT · 인프라",
      stable: "결제 · 송금 · 기준통화",
    },
  },
  {
    key: "volatility",
    label: "변동성",
    values: { btc: "큼", eth: "큼", stable: "거의 없음" },
  },
];

const Slide: SlideComponent = () => {
  return (
    <SlideShell section="01 · 정리" title="세 자산을 한 장으로" accent="accent">
      <Reveal>
        <p className="max-w-[64ch] text-lead text-fg-muted text-pretty">
          서로 다른 약속, 서로 다른 쓰임 — 그래서 세 자산은 <span className="text-fg">대체재가 아니라 보완재</span>다.
        </p>
      </Reveal>

      {/* Comparison table */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-surface-1">
        {/* Header row */}
        <Reveal delay={0.2} duration={0.7}>
          <div className="grid grid-cols-[1.1fr_1.3fr_1.3fr_1.3fr] items-center gap-4 border-b border-border bg-surface-2 px-7 py-5">
            <div className="text-eyebrow text-fg-faint">구분</div>
            {assets.map((a) => (
              <div key={a.key} className="flex items-center gap-3">
                <a.Logo size={36} />
                <span
                  className="text-h3 font-bold leading-none"
                  style={{ color: a.color }}
                >
                  {a.name}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Body rows */}
        <div className="divide-y divide-border">
          {rows.map((r, i) => (
            <motion.div
              key={r.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.35 + i * 0.08,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="grid grid-cols-[1.1fr_1.3fr_1.3fr_1.3fr] items-center gap-4 px-7 py-5"
            >
              <div className="text-caption text-fg-dim">{r.label}</div>
              {assets.map((a) => {
                const isIdentity = r.key === "identity";
                return (
                  <div
                    key={a.key}
                    className={
                      isIdentity
                        ? "text-h3 font-bold leading-snug"
                        : "text-h3 leading-snug text-fg"
                    }
                    style={isIdentity ? { color: a.color } : undefined}
                  >
                    {r.values[a.key]}
                  </div>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>

      <Reveal delay={0.95}>
        <p className="mt-8 text-h3 leading-snug text-fg-muted text-pretty">
          그렇다면 이 세 자산은 <span className="text-fg">서로 어떻게 엮여 있을까?</span>
        </p>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "compare-three", title: "Three Assets", section: "01" };
Slide.steps = 0;

export default Slide;
