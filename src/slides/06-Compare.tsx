import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";

type Row = {
  key: string;
  name: string;
  role: string;
  trait: string;
  usecase: string;
  color: string;
};

const rows: Row[] = [
  {
    key: "btc",
    name: "Bitcoin",
    role: "디지털 금",
    trait: "공급량 2,100만 고정",
    usecase: "가치 저장 · 투자",
    color: "var(--color-btc)",
  },
  {
    key: "eth",
    name: "Ethereum",
    role: "분산 플랫폼",
    trait: "스마트 컨트랙트",
    usecase: "DeFi · NFT · 발행 인프라",
    color: "var(--color-eth)",
  },
  {
    key: "stable",
    name: "Stablecoin",
    role: "디지털 달러",
    trait: "1:1 페그 · 변동성 ≈ 0",
    usecase: "송금 · 거래 · 담보",
    color: "var(--color-stable)",
  },
];

const Slide: SlideComponent = () => {
  return (
    <SlideShell section="01 · 정리" title="세 자산을 한 장으로" accent="accent">
      <div className="mt-6 grid flex-1 grid-cols-3 gap-6">
        {rows.map((r, i) => (
          <Reveal key={r.key} delay={0.15 + i * 0.12}>
            <motion.div
              className="flex h-full flex-col rounded-2xl border bg-white/[0.02] p-7"
              style={{ borderColor: `color-mix(in srgb, ${r.color} 30%, transparent)` }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="text-[1rem] font-medium tracking-[0.18em] uppercase"
                style={{ color: r.color }}
              >
                {r.name}
              </div>
              <div className="mt-3 text-[2.4rem] font-bold leading-tight" style={{ color: r.color }}>
                {r.role}
              </div>

              <div className="mt-8 space-y-5">
                <div>
                  <div className="text-[0.95rem] tracking-[0.12em] text-[var(--color-fg-dim)] uppercase">
                    핵심 특성
                  </div>
                  <div className="mt-1 text-[1.3rem] text-white leading-snug">{r.trait}</div>
                </div>
                <div>
                  <div className="text-[0.95rem] tracking-[0.12em] text-[var(--color-fg-dim)] uppercase">
                    대표 유스케이스
                  </div>
                  <div className="mt-1 text-[1.3rem] text-white leading-snug">{r.usecase}</div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.7}>
        <p className="mt-8 text-center text-[1.35rem] text-[var(--color-fg-muted)]">
          이제 이 세 자산이 <span className="text-white">어떻게 엮이는지</span> 살펴봅니다.
        </p>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "compare-three", title: "Three Assets", section: "01" };
Slide.steps = 0;

export default Slide;
