import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Underline } from "@/motion/Underline";
import { SlideComponent } from "@/deck/types";

const stablecoins = [
  { name: "USDT", issuer: "Tether · 2014", cap: 1870, share: 60 },
  { name: "USDC", issuer: "Circle · 2018", cap: 750, share: 25 },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell section="01 · 정의" title="스테이블코인 — 디지털 달러" accent="stable">
      <div className="mt-2 flex flex-1 flex-col">
        <Reveal>
          <p className="max-w-[68ch] text-[1.5rem] leading-snug text-[var(--color-fg-muted)] text-pretty">
            가격이 항상 1달러로 유지되도록 설계된 가상자산. 발행사가{" "}
            <span className="text-white">1코인당 실제 달러를 1:1로 보유</span>한다.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-6">
          {stablecoins.map((c, i) => (
            <Reveal key={c.name} delay={0.25 + i * 0.15}>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-[2.4rem] font-bold leading-none text-[var(--color-stable)]">
                      {c.name}
                    </div>
                    <div className="mt-2 text-[1.05rem] text-[var(--color-fg-muted)]">
                      {c.issuer}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[1.7rem] font-semibold tabular-nums">
                      ${c.cap}B
                    </div>
                    <div className="text-[0.95rem] text-[var(--color-fg-dim)]">시가총액</div>
                  </div>
                </div>
                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.08]">
                  <motion.div
                    className="h-full rounded-full bg-[var(--color-stable)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${c.share}%` }}
                    transition={{ duration: 0.9, delay: 0.5 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <div className="mt-2 font-mono text-[0.95rem] text-[var(--color-fg-dim)] tabular-nums">
                  글로벌 점유율 ≈ {c.share}%
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.85}>
          <p className="mt-10 text-[1.55rem] leading-snug text-pretty">
            두 코인의 합산 점유율은{" "}
            <Underline when={step >= 1} color="var(--color-stable)" delay={0.2}>
              약 85%
            </Underline>{" "}
            (2025.10 기준) · 사실상 시장을 양분.
          </p>
        </Reveal>

        <Reveal delay={1.1}>
          <div className="mt-6 inline-flex w-fit items-center gap-3 rounded-full border border-[var(--color-stable)]/40 bg-[var(--color-stable)]/[0.08] px-5 py-2 text-[1.1rem]">
            <span className="font-mono text-[0.95rem] tracking-[0.1em] text-[var(--color-stable)] uppercase">
              2025
            </span>
            <span>
              미국 <strong className="text-white">GENIUS Act</strong> 통과 — 제도권 편입 본격화
            </span>
          </div>
        </Reveal>
      </div>
    </SlideShell>
  );
};

Slide.meta = { id: "stablecoin", title: "Stablecoin", section: "01" };
Slide.steps = 1;

export default Slide;
