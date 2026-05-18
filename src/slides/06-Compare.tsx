import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { BitcoinLogo, EthereumLogo, TetherLogo } from "@/visuals/Logos";

type Row = {
  key: string;
  name: string;
  role: string;
  trait: string;
  usecase: string;
  color: string;
  Logo: (p: { size?: number }) => JSX.Element;
};

const rows: Row[] = [
  {
    key: "btc",
    name: "Bitcoin",
    role: "디지털 금",
    trait: "공급량 2,100만 고정",
    usecase: "가치 저장 · 투자",
    color: "var(--color-btc)",
    Logo: BitcoinLogo,
  },
  {
    key: "eth",
    name: "Ethereum",
    role: "분산 플랫폼",
    trait: "스마트 컨트랙트",
    usecase: "DeFi · NFT · 발행 인프라",
    color: "var(--color-eth)",
    Logo: EthereumLogo,
  },
  {
    key: "stable",
    name: "Stablecoin",
    role: "디지털 달러",
    trait: "1:1 페그 · 변동성 ≈ 0",
    usecase: "송금 · 거래 · 담보",
    color: "var(--color-stable)",
    Logo: TetherLogo,
  },
];

const Slide: SlideComponent = () => {
  return (
    <SlideShell section="01 · 정리" title="세 자산을 한 장으로" accent="accent">
      <div className="mt-4 grid flex-1 grid-cols-3 gap-6">
        {rows.map((r, i) => (
          <Reveal key={r.key} delay={0.2 + i * 0.13} duration={0.85}>
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.35 }}
              className="relative flex h-full flex-col overflow-hidden rounded-3xl border bg-surface-1 p-8"
              style={{
                borderColor: `color-mix(in srgb, ${r.color} 30%, transparent)`,
              }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl"
                style={{ background: r.color }}
              />

              <div className="flex items-center gap-4">
                <r.Logo size={48} />
                <span
                  className="text-eyebrow"
                  style={{ color: r.color }}
                >
                  {r.name}
                </span>
              </div>

              <div
                className="mt-5 text-h1 font-bold leading-[1.05]"
                style={{ color: r.color }}
              >
                {r.role}
              </div>

              <div className="mt-10 space-y-6">
                <div>
                  <div className="text-micro text-fg-faint">핵심 특성</div>
                  <div className="mt-1.5 text-h3 leading-snug">{r.trait}</div>
                </div>
                <div>
                  <div className="text-micro text-fg-faint">대표 유스케이스</div>
                  <div className="mt-1.5 text-h3 leading-snug">{r.usecase}</div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.8}>
        <p className="mt-10 text-center text-lead text-fg-muted">
          이제 이 세 자산이 <span className="text-fg">어떻게 엮이는지</span> 살펴봅니다.
        </p>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "compare-three", title: "Three Assets", section: "01" };
Slide.steps = 0;

export default Slide;
