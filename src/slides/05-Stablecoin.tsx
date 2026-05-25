import { motion } from "framer-motion";
import { Landmark, ArrowRightLeft, Banknote, Layers } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Stagger } from "@/motion/Stagger";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";
import { TetherLogo, UsdcLogo } from "@/visuals/Logos";

type Coin = {
  name: string;
  issuer: string;
  share: number;
  color: string;
  Logo: (p: { size?: number }) => JSX.Element;
};

const coins: Coin[] = [
  { name: "USDT", issuer: "Tether · 2014", share: 60, color: "#26A17B", Logo: TetherLogo },
  { name: "USDC", issuer: "Circle · 2018", share: 25, color: "#2775CA", Logo: UsdcLogo },
];

const usecases = [
  { Icon: ArrowRightLeft, label: "해외 송금" },
  { Icon: Banknote, label: "거래소 기준통화" },
  { Icon: Layers, label: "DeFi 담보" },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell section="01 · 세 자산" title="스테이블코인 — 디지털 달러" accent="stable">
      <Reveal>
        <p
          className="text-lead text-fg-muted text-pretty"
          style={{ wordBreak: "keep-all" }}
        >
          달러 등 법정화폐에 <span className="text-fg">1:1로 가치를 연동</span>한 가상자산.
          <br />
          발행사가 1코인당 실제 달러·국채를 보유해 가격 안정성을 확보한다.
        </p>
      </Reveal>

      {/* Two dominant issuers */}
      <div className="mt-8 grid grid-cols-2 gap-5">
        {coins.map((c, i) => (
          <Reveal key={c.name} delay={0.25 + i * 0.12} duration={0.8}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-3xl border border-border bg-surface-1 p-6"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-25 blur-3xl"
                style={{ background: c.color }}
              />
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <c.Logo size={56} />
                  <div>
                    <div className="text-h2 font-bold leading-none" style={{ color: c.color }}>
                      {c.name}
                    </div>
                    <div className="mt-2 text-caption text-fg-dim">{c.issuer}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-h2 font-bold tabular-nums leading-none">
                    {c.share}%
                  </div>
                  <div className="mt-1 text-micro text-fg-dim">점유율</div>
                </div>
              </div>

              <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-surface-2">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${c.color}, color-mix(in srgb, ${c.color} 70%, white))`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${c.share}%` }}
                  transition={{ duration: 1.1, delay: 0.6 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.7}>
        <p
          className="mt-6 text-h3 leading-snug text-pretty"
          style={{ wordBreak: "keep-all" }}
        >
          두 코인의 합산 점유율{" "}
          <Highlight when={step >= 1} color="var(--color-stable)" delay={0.2}>
            약 85%
          </Highlight>
          {" "}— 사실상 시장을 양분한다.
        </p>
      </Reveal>

      {/* Use cases */}
      <Stagger delay={0.95} step={0.1} className="mt-7 flex flex-wrap items-center gap-3">
        <span className="text-caption text-fg-dim mr-1">실용 화폐로서의 쓰임 —</span>
        {usecases.map((u) => (
          <span
            key={u.label}
            className="inline-flex items-center gap-2 rounded-full border border-stable/30 bg-stable/[0.07] px-5 py-2 text-h3 font-medium"
          >
            <u.Icon size={18} strokeWidth={1.7} className="text-stable" />
            {u.label}
          </span>
        ))}
      </Stagger>

      {/* GENIUS Act */}
      <Reveal delay={1.4}>
        <div className="mt-7 inline-flex w-fit items-center gap-3 rounded-2xl border border-stable/40 bg-stable/[0.08] px-5 py-3">
          <Landmark size={22} className="text-stable" strokeWidth={1.7} />
          <span className="font-mono text-micro tracking-[0.12em] text-stable">2025</span>
          <span className="text-caption text-pretty">
            미국 <strong className="text-fg">GENIUS Act</strong> 통과 — 1달러당 고품질 유동자산 1:1 보유 의무 · 매월 준비금 공시
          </span>
        </div>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "stablecoin", title: "Stablecoin", section: "01" };
Slide.steps = 1;

export default Slide;
