import { motion } from "framer-motion";
import { FileCode2 } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Stagger } from "@/motion/Stagger";
import { Underline } from "@/motion/Underline";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";
import { EthereumLogo } from "@/visuals/Logos";

const dapps = ["DeFi", "DApp", "NFT", "Stablecoin"];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell
      section="01 · 정의"
      title={
        <span className="inline-flex items-center gap-5">
          <motion.span
            initial={{ rotate: -8, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <EthereumLogo size={56} />
          </motion.span>
          <span>이더리움 — 단순 코인이 아닌 플랫폼</span>
        </span>
      }
      accent="eth"
    >
      <Reveal>
        <p className="max-w-[64ch] text-lead text-fg-muted text-pretty">
          2013년 비탈릭 부테린이 백서를 발표, 2015년 메인넷 출시.
          블록체인 서비스를 돌릴 수 있는 <em>플랫폼</em>이다.
        </p>
      </Reveal>

      <Reveal delay={0.35} duration={0.85}>
        <div className="mt-12 overflow-hidden rounded-3xl border border-eth/30 bg-eth/[0.08] p-8">
          <div className="flex items-start gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-eth/15 text-eth">
              <FileCode2 size={26} strokeWidth={1.7} />
            </div>
            <div>
              <div className="text-eyebrow text-eth">스마트 컨트랙트</div>
              <div className="mt-3 text-h2 font-semibold leading-tight text-pretty">
                조건이 충족되면{" "}
                <Underline when={step >= 1} color="var(--color-eth)" delay={0.25}>
                  중개인 없이 자동으로 실행
                </Underline>
                되는 계약
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Stagger delay={0.7} step={0.1} className="mt-10 flex flex-wrap items-center gap-3">
        <span className="text-caption text-fg-dim mr-2">이 위에서 작동하는 생태계 —</span>
        {dapps.map((d) => (
          <span
            key={d}
            className="rounded-full border border-border bg-white/[0.04] px-5 py-2 text-h3 font-medium"
          >
            {d}
          </span>
        ))}
      </Stagger>

      <Reveal delay={1.2} duration={0.85}>
        <p className="mt-12 text-h3 leading-snug text-pretty">
          그리고 결정적으로 —{" "}
          <Highlight when={step >= 2} color="var(--color-eth)" delay={0.15}>
            USDT · USDC도 이더리움 위에서 발행
          </Highlight>
          된다.
        </p>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "ethereum", title: "Ethereum", section: "01" };
Slide.steps = 2;

export default Slide;
