import { motion } from "framer-motion";
import { FileCode2, Fuel, Layers } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Stagger } from "@/motion/Stagger";
import { Underline } from "@/motion/Underline";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";
import { EthereumLogo } from "@/visuals/Logos";

const pillars = [
  {
    Icon: FileCode2,
    title: "스마트 컨트랙트",
    body: "조건이 충족되면 중개인 없이 자동으로 실행되는 계약. DeFi · NFT · DApp의 토대.",
  },
  {
    Icon: Fuel,
    title: "ETH = 가스비",
    body: "이더리움 위 모든 거래는 ETH로 수수료를 지불. 사용량이 곧 수요로 직결.",
  },
  {
    Icon: Layers,
    title: "PoS 전환 (2022)",
    body: "The Merge로 작업증명 → 지분증명. 에너지 소비 99.95% 감소.",
  },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell
      section="01 · 세 자산"
      title={
        <span className="inline-flex items-center gap-5">
          <motion.span
            initial={{ rotate: -8, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <EthereumLogo size={56} />
          </motion.span>
          <span>이더리움 — 월드 컴퓨터</span>
        </span>
      }
      accent="eth"
    >
      <Reveal>
        <p className="max-w-[72ch] text-lead text-fg-muted text-pretty">
          2013년 비탈릭 부테린 백서 발표, 2015년 메인넷 출시. 단순한 코인이 아니라{" "}
          <span className="text-fg">블록체인 서비스를 돌리는 플랫폼</span>.
        </p>
      </Reveal>

      {/* Three pillars */}
      <Stagger delay={0.3} step={0.12} className="mt-9 grid grid-cols-3 gap-5">
        {pillars.map((p) => (
          <motion.div
            key={p.title}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="flex h-full flex-col rounded-2xl border border-eth/25 bg-eth/[0.06] p-6"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-eth/15 text-eth">
              <p.Icon size={22} strokeWidth={1.8} />
            </div>
            <div className="mt-5 text-h3 font-semibold text-eth">{p.title}</div>
            <div className="mt-3 text-body text-fg-muted leading-snug text-pretty">
              {p.body}
            </div>
          </motion.div>
        ))}
      </Stagger>

      {/* Bridge insight */}
      <Reveal delay={0.85} duration={0.85}>
        <div className="mt-10 rounded-3xl border border-border bg-surface-1 p-7">
          <div className="text-eyebrow text-fg-dim">이 발표에서 가장 중요한 한 줄</div>
          <div className="mt-3 text-h2 leading-snug text-pretty">
            세계 시가총액 1·2위 스테이블코인인{" "}
            <Highlight when={step >= 1} color="var(--color-eth)" delay={0.15}>
              USDT · USDC가 발행되는 곳
            </Highlight>{" "}
            이 바로{" "}
            <Underline when={step >= 1} color="var(--color-eth)" delay={0.45}>
              이더리움
            </Underline>
            이다.
          </div>
        </div>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "ethereum", title: "Ethereum", section: "01" };
Slide.steps = 2;

export default Slide;
