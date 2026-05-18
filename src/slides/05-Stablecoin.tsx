import { motion } from "framer-motion";
import { Landmark } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Underline } from "@/motion/Underline";
import { SlideComponent } from "@/deck/types";
import { TetherLogo, UsdcLogo } from "@/visuals/Logos";

type Coin = {
  name: string;
  issuer: string;
  cap: number;
  share: number;
  color: string;
  Logo: (p: { size?: number }) => JSX.Element;
};

const stablecoins: Coin[] = [
  {
    name: "USDT",
    issuer: "Tether · 2014",
    cap: 1870,
    share: 60,
    color: "#2FD69E",
    Logo: TetherLogo,
  },
  {
    name: "USDC",
    issuer: "Circle · 2018",
    cap: 750,
    share: 25,
    color: "#2775CA",
    Logo: UsdcLogo,
  },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell section="01 · 정의" title="스테이블코인 — 디지털 달러" accent="stable">
      <Reveal>
        <p className="max-w-[72ch] text-lead text-fg-muted text-pretty">
          1달러로 가격을 고정한 가상자산. 발행사가{" "}
          <span className="text-fg">1코인당 실제 달러를 1:1로 보유</span>하여,
          <span className="text-fg"> 법정화폐와 가상자산 생태계를 연결하는 매개체</span> 역할을 한다.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-6">
        {stablecoins.map((c, i) => (
          <Reveal key={c.name} delay={0.3 + i * 0.15} duration={0.8}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-3xl border border-border bg-white/[0.02] p-7"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-25 blur-3xl"
                style={{ background: c.color }}
              />
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <c.Logo size={56} />
                  <div>
                    <div
                      className="text-h2 font-bold leading-none"
                      style={{ color: c.color }}
                    >
                      {c.name}
                    </div>
                    <div className="mt-2 text-caption text-fg-dim">{c.issuer}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-h2 font-bold tabular-nums">
                    ${c.cap}B
                  </div>
                  <div className="text-micro text-fg-dim">시가총액</div>
                </div>
              </div>

              <div className="mt-7 h-2.5 overflow-hidden rounded-full bg-white/[0.05]">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${c.color}, color-mix(in srgb, ${c.color} 70%, white))`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${c.share}%` }}
                  transition={{ duration: 1.1, delay: 0.6 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="mt-2 font-mono text-micro text-fg-dim tabular-nums">
                글로벌 점유율 ≈ {c.share}%
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.9} duration={0.8}>
        <p className="mt-10 text-h3 leading-snug text-pretty">
          두 코인의 합산 점유율은{" "}
          <Underline when={step >= 1} color="var(--color-stable)" delay={0.25}>
            약 85%
          </Underline>{" "}
          <span className="text-fg-dim">— 2025.10 기준 · 사실상 시장 양분.</span>
        </p>
      </Reveal>

      <Reveal delay={1.15}>
        <div className="mt-6 inline-flex w-fit items-center gap-3 rounded-2xl border border-stable/40 bg-stable/[0.08] px-5 py-3">
          <Landmark size={22} className="text-stable" strokeWidth={1.7} />
          <span className="font-mono text-micro tracking-[0.12em] text-stable">2025</span>
          <span className="text-caption">
            미국 <strong className="text-fg">GENIUS Act</strong> 통과 — 제도권 편입 본격화
          </span>
        </div>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "stablecoin", title: "Stablecoin", section: "01" };
Slide.steps = 1;

export default Slide;
