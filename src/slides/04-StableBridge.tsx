import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";
import { BitcoinLogo, EthereumLogo, TetherLogo, UsdcLogo } from "@/visuals/Logos";

/* ───────── Hero: BTC ↔ Stablecoin ↔ ETH connection ───────── */

function ConnectionHero() {
  return (
    <div className="relative flex items-center justify-center gap-0 py-2">
      {/* rail */}
      <div
        aria-hidden
        className="absolute left-[18%] right-[18%] top-1/2 h-[2px] -translate-y-1/2 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, var(--color-btc), var(--color-stable), var(--color-eth))",
          opacity: 0.4,
        }}
      />
      {/* pulses flowing inward toward the stable hub */}
      <motion.div
        aria-hidden
        className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
        style={{
          left: "18%",
          background: "var(--color-btc)",
          boxShadow: "0 0 14px var(--color-btc)",
        }}
        animate={{ left: ["18%", "50%"], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
        style={{
          right: "18%",
          background: "var(--color-eth)",
          boxShadow: "0 0 14px var(--color-eth)",
        }}
        animate={{ right: ["18%", "50%"], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
      />

      <div className="relative flex w-full items-center justify-between px-[10%]">
        {/* BTC */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col items-center gap-2"
        >
          <BitcoinLogo size={66} />
          <span className="text-caption font-semibold text-btc">비트코인</span>
        </motion.div>

        {/* Stable hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, type: "spring", stiffness: 180, damping: 16 }}
          className="relative flex flex-col items-center gap-2"
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-full blur-2xl"
            animate={{ opacity: [0.25, 0.5, 0.25] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "var(--color-stable)" }}
          />
          <div className="relative flex items-center gap-2">
            <TetherLogo size={72} />
            <UsdcLogo size={72} />
          </div>
          <span className="relative text-caption font-semibold text-stable">
            스테이블코인 · 디지털 달러
          </span>
        </motion.div>

        {/* ETH */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col items-center gap-2"
        >
          <EthereumLogo size={66} />
          <span className="text-caption font-semibold text-eth">이더리움</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ───────── Connection detail card ───────── */

function LinkCard({
  delay,
  color,
  Logo,
  asset,
  points,
}: {
  delay: number;
  color: string;
  Logo: (p: { size?: number }) => JSX.Element;
  asset: string;
  points: { lead: string; body: string }[];
}) {
  return (
    <Reveal delay={delay} duration={0.8}>
      <div
        className="flex h-full flex-col rounded-3xl border bg-surface-1 p-6"
        style={{ borderColor: `color-mix(in srgb, ${color} 30%, transparent)` }}
      >
        <div className="flex items-center gap-3">
          <Logo size={40} />
          <ArrowRight size={20} className="text-fg-faint" strokeWidth={2} />
          <div className="flex items-center gap-1.5">
            <TetherLogo size={32} />
            <UsdcLogo size={32} />
          </div>
          <span className="ml-1 text-eyebrow" style={{ color }}>
            {asset} ↔ Stable
          </span>
        </div>

        <div className="mt-5 space-y-4">
          {points.map((p) => (
            <div key={p.lead} className="flex gap-3">
              <span
                className="mt-2 h-2 w-2 shrink-0 rounded-full"
                style={{ background: color }}
              />
              <div style={{ wordBreak: "keep-all" }}>
                <span className="text-h3 font-semibold leading-snug text-fg">
                  {p.lead}
                </span>
                <span className="ml-1.5 text-body text-fg-muted leading-snug">
                  {p.body}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell
      section="01 · Crypto 생태계 이해"
      title={
        <span
          className="block whitespace-nowrap text-[clamp(1.25rem,2.5vw,2.15rem)] leading-[1.2]"
        >
          스테이블코인 —{" "}
          <span className="text-stable">Crypto를 일상으로 연결하는 디지털 결제 인프라</span>
        </span>
      }
      accent="stable"
    >
      <Reveal>
        <ConnectionHero />
      </Reveal>

      <div className="mt-7 grid grid-cols-2 gap-5">
        <LinkCard
          delay={0.3}
          color="var(--color-btc)"
          Logo={BitcoinLogo}
          asset="BTC"
          points={[
            { lead: "기준통화", body: "— USDT·USDC는 BTC 거래의 기준" },
            { lead: "유동화 기초자산", body: "— BTC 담보 등을 통해 가치를 현금화" },
          ]}
        />
        <LinkCard
          delay={0.45}
          color="var(--color-eth)"
          Logo={EthereumLogo}
          asset="ETH"
          points={[
            { lead: "발행·유통 인프라", body: "— USDT·USDC는 ETH network상에서 구현" },
            { lead: "DeFi 핵심수단", body: "— 결제 · 담보 · 유동성 공급의 기본 화폐" },
          ]}
        />
      </div>

      {/* Bridge to big tech */}
      <Reveal delay={0.7} duration={0.8}>
        <div
          className="relative mt-7 overflow-hidden rounded-3xl border-2 px-7 py-6"
          style={{
            borderColor: "color-mix(in srgb, var(--color-accent) 35%, transparent)",
            background: "color-mix(in srgb, var(--color-accent) 7%, transparent)",
          }}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
            animate={{ opacity: [0.18, 0.34, 0.18] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ background: "var(--color-accent)" }}
          />
          <div className="relative flex items-center gap-5">
            <span className="text-eyebrow text-accent">핵심 메시지</span>
          </div>
          <p
            className="relative mt-2 text-h2 font-semibold leading-snug text-fg text-pretty"
            style={{ wordBreak: "keep-all" }}
          >
            Crypto 생태계의 실용화를 위해서는,{" "}
            <Highlight when={step >= 1} color="var(--color-accent)" delay={0.2}>
              플랫폼 · 기기 · APP 생태계
            </Highlight>
            에 편입이 필요하다.
          </p>
        </div>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "stable-bridge", title: "Stablecoin Bridge", section: "01" };
Slide.steps = 1;

export default Slide;
