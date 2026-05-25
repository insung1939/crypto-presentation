import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";
import { BitcoinLogo, TetherLogo, EthereumLogo } from "@/visuals/Logos";

/* ───────── Pipeline flow visual ───────── */

function CollateralPipeline() {
  // 3 stations with a token traveling through them
  const stations = [
    {
      Logo: BitcoinLogo,
      label: "BTC",
      sub: "보유",
      tint: "var(--color-btc)",
    },
    {
      Logo: EthereumLogo,
      label: "WBTC",
      sub: "이더리움 위",
      tint: "var(--color-eth)",
    },
    {
      Logo: TetherLogo,
      label: "스테이블 대출",
      sub: "DeFi 담보",
      tint: "var(--color-stable)",
      highlight: true,
    },
  ];

  return (
    <div className="relative">
      {/* Connecting rail */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[8%] right-[8%] top-[34px] h-[2px] rounded-full"
        style={{
          background:
            "linear-gradient(90deg, var(--color-btc), var(--color-eth), var(--color-stable))",
          opacity: 0.35,
        }}
      />

      {/* Traveling token */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[26px] h-5 w-5 rounded-full"
        style={{
          left: "8%",
          background:
            "radial-gradient(circle, white 0%, color-mix(in srgb, var(--color-stable) 80%, white) 60%, transparent 70%)",
          boxShadow: "0 0 16px color-mix(in srgb, var(--color-stable) 60%, white)",
        }}
        animate={{
          left: ["8%", "50%", "92%"],
          background: [
            "radial-gradient(circle, white 0%, var(--color-btc) 60%, transparent 70%)",
            "radial-gradient(circle, white 0%, var(--color-eth) 60%, transparent 70%)",
            "radial-gradient(circle, white 0%, var(--color-stable) 60%, transparent 70%)",
          ],
        }}
        transition={{
          duration: 3.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
      />

      {/* Stations */}
      <div className="grid grid-cols-3 gap-3">
        {stations.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5 + i * 0.18,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col items-center gap-2"
          >
            <div
              className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full"
              style={{
                background: "var(--color-bg)",
                boxShadow: `0 0 0 2px color-mix(in srgb, ${s.tint} 60%, transparent)`,
              }}
            >
              <s.Logo size={44} />
            </div>
            <div
              className="text-caption font-semibold leading-tight"
              style={{ color: s.tint }}
            >
              {s.label}
            </div>
            <div className="text-micro text-fg-dim leading-tight">{s.sub}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ───────── Trade-pair race bars ───────── */

function TradePairBars() {
  const rows = [
    {
      label: "BTC / USDT",
      value: 100,
      color: "var(--color-stable)",
      note: "압도적 1위",
    },
    {
      label: "BTC / USD",
      value: 25,
      color: "var(--color-fg-faint)",
      note: "보조적",
    },
  ];

  return (
    <div className="space-y-5">
      {rows.map((row, i) => (
        <div key={row.label}>
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-caption tracking-wider">
              {row.label}
            </span>
            <span className="text-micro text-fg-dim">{row.note}</span>
          </div>
          <div className="mt-2.5 h-3.5 overflow-hidden rounded-full bg-surface-2">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${row.color}, color-mix(in srgb, ${row.color} 70%, white))`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${row.value}%` }}
              transition={{
                duration: 1.1,
                delay: 0.7 + i * 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───────── Slide ───────── */

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell section="02 · 연결" title="비트코인 ↔ 스테이블코인" accent="btc">
      {/* Opposing identity strip */}
      <Reveal>
        <div
          className="flex flex-wrap items-center gap-x-5 gap-y-3 text-h2 leading-tight"
          style={{ wordBreak: "keep-all" }}
        >
          <div className="flex items-center gap-3">
            <BitcoinLogo size={48} />
            <span className="font-bold text-btc">디지털 금</span>
          </div>
          <ArrowLeftRight size={26} strokeWidth={1.6} className="text-fg-faint" />
          <div className="flex items-center gap-3">
            <TetherLogo size={48} />
            <span className="font-bold text-stable">디지털 달러</span>
          </div>
          <span className="ml-2 text-lead text-fg-muted">
            정반대 성격, 그래서 더 단단히 묶인다.
          </span>
        </div>
      </Reveal>

      {/* Two connections side-by-side */}
      <div className="mt-8 grid flex-1 grid-cols-2 gap-5">
        {/* ① 거래의 기준통화 */}
        <Reveal delay={0.25} duration={0.85}>
          <div className="flex h-full flex-col rounded-3xl border border-border bg-surface-1 p-7">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-h2 font-bold text-stable leading-none">
                ①
              </span>
              <span className="text-eyebrow text-stable">거래의 기준통화</span>
            </div>

            <div
              className="mt-5 text-h3 leading-snug text-pretty"
              style={{ wordBreak: "keep-all" }}
            >
              달러로 금을 사듯,{" "}
              <Highlight when={step >= 1} color="var(--color-stable)" delay={0.2}>
                스테이블코인으로 비트코인을 산다.
              </Highlight>
            </div>

            <div className="mt-7">
              <TradePairBars />
            </div>

            <div
              className="mt-auto pt-6 text-caption text-fg-muted leading-snug text-pretty"
              style={{ wordBreak: "keep-all" }}
            >
              세계 최대 거래소 바이낸스에서도 BTC/USDT 거래량이 BTC/USD를 압도한다.
            </div>
          </div>
        </Reveal>

        {/* ② 담보 ↔ 유동성 */}
        <Reveal delay={0.4} duration={0.85}>
          <div className="flex h-full flex-col rounded-3xl border border-btc/25 bg-btc/[0.06] p-7">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-h2 font-bold text-btc leading-none">
                ②
              </span>
              <span className="text-eyebrow text-btc">담보 → 유동성 전환</span>
            </div>

            <div
              className="mt-5 text-h3 leading-snug text-pretty"
              style={{ wordBreak: "keep-all" }}
            >
              비트코인을{" "}
              <Highlight when={step >= 1} color="var(--color-btc)" delay={0.4}>
                팔지 않고도
              </Highlight>{" "}
              쓸 수 있는 달러로 바꾼다.
            </div>

            <div className="mt-9">
              <CollateralPipeline />
            </div>

            <div
              className="mt-auto pt-6 text-caption text-fg-muted leading-snug text-pretty"
              style={{ wordBreak: "keep-all" }}
            >
              Aave · MakerDAO 같은 DeFi에서 WBTC를 담보로 스테이블코인을 빌릴 수 있다 —
              비트코인의 가치를 유동화하는 통로.
            </div>
          </div>
        </Reveal>
      </div>

      {/* Bottom takeaway */}
      <Reveal delay={1.5} duration={0.7}>
        <p
          className="mt-7 text-h3 leading-snug text-pretty"
          style={{ wordBreak: "keep-all" }}
        >
          비트코인은 가만히 저장되고,{" "}
          <span className="font-semibold text-stable">
            스테이블코인이 그 가치를 거래·유동화
          </span>
          한다.
        </p>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "btc-stable", title: "BTC × Stablecoin", section: "02" };
Slide.steps = 1;

export default Slide;
