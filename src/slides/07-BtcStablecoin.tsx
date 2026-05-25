import { motion } from "framer-motion";
import { ArrowLeftRight, ArrowRight } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Underline } from "@/motion/Underline";
import { SlideComponent } from "@/deck/types";
import { BitcoinLogo, TetherLogo, EthereumLogo } from "@/visuals/Logos";

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell section="02 · 연결" title="비트코인 ↔ 스테이블코인" accent="btc">
      {/* Opposing identity strip */}
      <Reveal>
        <div className="flex flex-wrap items-center gap-5 text-h2 leading-tight">
          <div className="flex items-center gap-3">
            <BitcoinLogo size={48} />
            <span className="font-bold text-btc">디지털 금</span>
          </div>
          <ArrowLeftRight size={26} strokeWidth={1.6} className="text-fg-faint" />
          <div className="flex items-center gap-3">
            <TetherLogo size={48} />
            <span className="font-bold text-stable">디지털 달러</span>
          </div>
          <span className="ml-3 text-lead text-fg-muted">
            — 정반대 성격, 그래서 더 단단히 묶인다.
          </span>
        </div>
      </Reveal>

      {/* Two connections side-by-side */}
      <div className="mt-8 grid flex-1 grid-cols-2 gap-5">
        {/* ① 거래의 기준통화 */}
        <Reveal delay={0.25} duration={0.85}>
          <div className="flex h-full flex-col rounded-3xl border border-border bg-surface-1 p-7">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-h2 font-bold text-stable leading-none">①</span>
              <span className="text-eyebrow text-stable">거래의 기준통화</span>
            </div>

            <div className="mt-5 text-h3 leading-snug text-pretty">
              달러로 금을 사듯, 스테이블코인으로 비트코인을 산다.
            </div>

            <div className="mt-7 space-y-5">
              {[
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
              ].map((row, i) => (
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
                        duration: 1,
                        delay: 0.8 + i * 0.15,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-6 text-caption text-fg-muted leading-snug text-pretty">
              세계 최대 거래소 바이낸스에서{" "}
              <Underline when={step >= 1} color="var(--color-stable)" delay={0.2}>
                BTC/USDT 거래량이 BTC/USD를 압도
              </Underline>
              한다.
            </div>
          </div>
        </Reveal>

        {/* ② 담보 ↔ 유동성 */}
        <Reveal delay={0.4} duration={0.85}>
          <div className="flex h-full flex-col rounded-3xl border border-btc/25 bg-btc/[0.06] p-7">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-h2 font-bold text-btc leading-none">②</span>
              <span className="text-eyebrow text-btc">담보 → 유동성 전환</span>
            </div>

            <div className="mt-5 text-h3 leading-snug text-pretty">
              비트코인을 <span className="font-semibold">팔지 않고도</span> 쓸 수 있는 달러로 바꾼다.
            </div>

            <div className="mt-7 grid grid-cols-[auto_auto_auto_auto_auto] items-center gap-3">
              <Node Logo={BitcoinLogo} label="BTC" sub="가만히 저장" />
              <Arrow delay={1.0} />
              <Node Logo={EthereumLogo} label="WBTC" sub="이더리움 위로" />
              <Arrow delay={1.2} />
              <Node Logo={TetherLogo} label="대출" sub="스테이블코인" highlight />
            </div>

            <div className="mt-auto pt-6 text-caption text-fg-muted leading-snug text-pretty">
              Aave · MakerDAO 같은 DeFi에서 WBTC를 담보로 스테이블코인을 빌릴 수 있다 —{" "}
              <span className="text-fg">비트코인의 가치를 유동화하는 통로</span>.
            </div>
          </div>
        </Reveal>
      </div>

      {/* Bottom takeaway */}
      <Reveal delay={1.5} duration={0.7}>
        <p className="mt-7 text-h3 leading-snug text-pretty">
          비트코인은 가만히 저장되고,{" "}
          <span className="font-semibold text-stable">스테이블코인이 그 가치를 거래·유동화</span>
          한다.
        </p>
      </Reveal>
    </SlideShell>
  );
};

function Node({
  Logo,
  label,
  sub,
  highlight,
}: {
  Logo: (p: { size?: number }) => JSX.Element;
  label: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center rounded-2xl border px-4 py-3 ${
        highlight
          ? "border-stable/40 bg-stable/[0.08]"
          : "border-border bg-surface-1"
      }`}
    >
      <Logo size={36} />
      <div className="mt-2 text-caption font-semibold leading-none">{label}</div>
      <div className="mt-1 text-micro text-fg-dim leading-none">{sub}</div>
    </div>
  );
}

function Arrow({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="text-fg-faint"
    >
      <ArrowRight size={22} strokeWidth={1.8} />
    </motion.div>
  );
}

Slide.meta = { id: "btc-stable", title: "BTC × Stablecoin", section: "02" };
Slide.steps = 1;

export default Slide;
