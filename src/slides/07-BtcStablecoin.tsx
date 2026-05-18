import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Underline } from "@/motion/Underline";
import { SlideComponent } from "@/deck/types";

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell section="02 · 연결" title="비트코인 ↔ 스테이블코인" accent="btc">
      <div className="mt-2 flex flex-1 flex-col">
        <Reveal>
          <p className="text-[1.9rem] leading-snug text-pretty">
            한 줄로 정리하면 —{" "}
            <span className="text-[var(--color-btc)] font-bold">디지털 금</span>{" "}
            <span className="text-[var(--color-fg-muted)]">vs</span>{" "}
            <span className="text-[var(--color-stable)] font-bold">디지털 달러</span>.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="mt-5 max-w-[60ch] text-[1.4rem] leading-snug text-[var(--color-fg-muted)] text-pretty">
            달러로 금을 구매하듯, 스테이블코인으로 비트코인을 구매한다. 즉,
            스테이블코인이 사실상의 <span className="text-white">기축통화</span> 역할.
          </p>
        </Reveal>

        <Reveal delay={0.7}>
          <div className="mt-10 rounded-2xl border border-white/8 bg-white/[0.02] p-7">
            <div className="text-[1rem] tracking-[0.15em] text-[var(--color-fg-dim)] uppercase">
              실제 시장에서
            </div>
            <div className="mt-3 text-[1.8rem] leading-snug">
              바이낸스에서{" "}
              <Underline when={step >= 1} color="var(--color-stable)" delay={0.15}>
                BTC/USDT 거래량 &gt; BTC/USD
              </Underline>
              {" "}— 스테이블코인이 비트코인의 거래 짝.
            </div>

            <div className="mt-6 grid grid-cols-2 gap-5">
              {[
                { label: "BTC / USDT", value: 100, color: "var(--color-stable)", note: "압도적" },
                { label: "BTC / USD", value: 25, color: "var(--color-fg-dim)", note: "보조적" },
              ].map((row, i) => (
                <div key={row.label}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[1.05rem] tracking-wider">{row.label}</span>
                    <span className="text-[0.95rem] text-[var(--color-fg-dim)]">{row.note}</span>
                  </div>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/[0.06]">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: row.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${row.value}%` }}
                      transition={{ duration: 0.9, delay: 0.95 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={1.3}>
          <p className="mt-8 text-[1.25rem] italic text-[var(--color-fg-muted)]">
            "저도 바이낸스에서 BTC/USDT로 비트코인을 구매합니다."
          </p>
        </Reveal>
      </div>
    </SlideShell>
  );
};

Slide.meta = { id: "btc-stable", title: "BTC × Stablecoin", section: "02" };
Slide.steps = 1;

export default Slide;
