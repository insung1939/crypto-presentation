import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Underline } from "@/motion/Underline";
import { SlideComponent } from "@/deck/types";
import { BitcoinLogo, TetherLogo } from "@/visuals/Logos";

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell section="02 · 연결" title="비트코인 ↔ 스테이블코인" accent="btc">
      <Reveal>
        <div className="flex flex-wrap items-center gap-6 text-h2 leading-tight text-pretty">
          <div className="flex items-center gap-3">
            <BitcoinLogo size={48} />
            <span className="font-bold text-btc">디지털 금</span>
          </div>
          <ArrowLeftRight size={28} strokeWidth={1.5} className="text-fg-faint" />
          <div className="flex items-center gap-3">
            <TetherLogo size={48} />
            <span className="font-bold text-stable">디지털 달러</span>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.3} duration={0.8}>
        <p className="mt-7 max-w-[64ch] text-lead leading-snug text-fg-muted text-pretty">
          달러로 금을 구매하듯, 스테이블코인으로 비트코인을 구매한다.
          스테이블코인이 사실상의 <span className="text-fg">기축통화</span> 역할.
        </p>
      </Reveal>

      <Reveal delay={0.55} duration={0.85}>
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-white/[0.02] p-7">
          <div className="text-eyebrow text-fg-dim">실제 시장에서</div>

          <div className="mt-4 text-h3 leading-snug text-pretty">
            바이낸스에서{" "}
            <Underline when={step >= 1} color="var(--color-stable)" delay={0.2}>
              BTC/USDT 거래량 &gt; BTC/USD
            </Underline>{" "}
            — 스테이블코인이 비트코인의 거래 짝.
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6">
            {[
              { label: "BTC / USDT", value: 100, color: "var(--color-stable)", note: "압도적" },
              { label: "BTC / USD", value: 25, color: "var(--color-fg-faint)", note: "보조적" },
            ].map((row, i) => (
              <div key={row.label}>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-caption tracking-wider">{row.label}</span>
                  <span className="text-micro text-fg-dim">{row.note}</span>
                </div>
                <div className="mt-3 h-4 overflow-hidden rounded-full bg-white/[0.05]">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${row.color}, color-mix(in srgb, ${row.color} 70%, white))`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${row.value}%` }}
                    transition={{ duration: 1, delay: 0.95 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={1.4}>
        <p className="mt-6 text-caption text-fg-muted text-pretty">
          향후에는 <span className="text-fg">비트코인을 담보로 스테이블코인을 대출</span>받거나,
          BTC 보유자가 스테이블코인을 통해 유동성을 확보하는 방식으로도 연결될 수 있다.
        </p>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "btc-stable", title: "BTC × Stablecoin", section: "02" };
Slide.steps = 1;

export default Slide;
