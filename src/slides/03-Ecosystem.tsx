import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Shake } from "@/motion/Shake";
import { SlideComponent } from "@/deck/types";
import { BitcoinLogo, EthereumLogo } from "@/visuals/Logos";

type Row = { k: string; v: string; sub?: string };

type AssetCol = {
  key: "btc" | "eth";
  name: string;
  identity: string;
  color: string;
  Logo: (p: { size?: number }) => JSX.Element;
  rows: Row[];
  cap: string;
};

const cols: AssetCol[] = [
  {
    key: "btc",
    name: "Bitcoin",
    identity: "디지털 금",
    color: "var(--color-btc)",
    Logo: BitcoinLogo,
    rows: [
      {
        k: "정의",
        v: "탈중앙화된 디지털 가치저장 자산",
        sub: "가치저장 · 투자 · 담보 · 인플레이션 헤지",
      },
      {
        k: "기원",
        v: "2009 · 사토시 나카모토",
        sub: "최초의 가상자산",
      },
      {
        k: "현황",
        v: "시가총액 약 1조 2,100억 달러",
        sub: "약 1,600조 원 · 제도권 편입 중인 ‘디지털 금’",
      },
    ],
    cap: "가상자산 시장의 신뢰 · 유동성 기준점",
  },
  {
    key: "eth",
    name: "Ethereum",
    identity: "디지털 금융 인프라",
    color: "var(--color-eth)",
    Logo: EthereumLogo,
    rows: [
      {
        k: "정의",
        v: "스마트컨트랙트 기반 블록체인 플랫폼",
        sub: "dApp · 토큰 발행 · 금융 자동화 · 결제 인프라",
      },
      {
        k: "기원",
        v: "2015 · 비탈릭 부테린",
        sub: "프로그래머블 블록체인",
      },
      {
        k: "현황",
        v: "시가총액 약 1,880억 달러",
        sub: "약 260조 원 · 스테이블코인 공급의 절반 이상 호스팅",
      },
    ],
    cap: "가상자산 서비스가 실제 작동하는 기술 · 금융 인프라",
  },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell
      section="01 · Crypto 생태계 이해"
      title="비트코인과 이더리움"
      accent="accent"
    >
      <div className="grid flex-1 grid-cols-2 gap-6">
        {cols.map((c, ci) => (
          <motion.div
            key={c.key}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15 + ci * 0.14,
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative flex h-full flex-col overflow-hidden rounded-3xl border bg-surface-1 p-7"
            style={{
              borderColor: `color-mix(in srgb, ${c.color} 32%, transparent)`,
            }}
          >
            {/* breathing halo */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl"
              animate={{ opacity: [0.16, 0.3, 0.16] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ background: c.color }}
            />

            {/* header */}
            <div className="relative flex items-center gap-4">
              <motion.div
                initial={{ rotate: -8, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ delay: 0.25 + ci * 0.14, duration: 0.7 }}
              >
                <c.Logo size={56} />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-eyebrow" style={{ color: c.color }}>
                  {c.name}
                </span>
                <span
                  className="text-h1 font-bold leading-[1.05]"
                  style={{ color: c.color }}
                >
                  {c.identity}
                </span>
              </div>
            </div>

            {/* rows */}
            <div className="relative mt-7 flex-1 space-y-5">
              {c.rows.map((r, ri) => {
                const isStatus = r.k === "현황";
                return (
                  <Reveal
                    key={r.k}
                    delay={0.45 + ci * 0.08 + ri * 0.12}
                    duration={0.6}
                  >
                    <div className="flex gap-4">
                      <span
                        className="mt-1 w-12 shrink-0 text-caption font-semibold"
                        style={{ color: c.color }}
                      >
                        {r.k}
                      </span>
                      <div className="min-w-0">
                        <div
                          className="text-h3 font-semibold leading-snug text-fg"
                          style={{ wordBreak: "keep-all" }}
                        >
                          {isStatus ? (
                            <Shake when={step >= 1} intensity={2}>
                              {r.v}
                            </Shake>
                          ) : (
                            r.v
                          )}
                        </div>
                        {r.sub && (
                          <div
                            className="mt-1 text-caption text-fg-dim leading-snug"
                            style={{ wordBreak: "keep-all" }}
                          >
                            {r.sub}
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* ecosystem-function caption */}
            <Reveal delay={0.95 + ci * 0.08}>
              <div
                className="relative mt-6 rounded-2xl border px-5 py-4 text-caption font-medium leading-snug"
                style={{
                  borderColor: `color-mix(in srgb, ${c.color} 28%, transparent)`,
                  background: `color-mix(in srgb, ${c.color} 8%, transparent)`,
                  color: "var(--color-fg-muted)",
                  wordBreak: "keep-all",
                }}
              >
                <span
                  className="mr-2 font-semibold"
                  style={{ color: c.color }}
                >
                  생태계 기능
                </span>
                {c.cap}
              </div>
            </Reveal>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-right text-micro text-fg-faint">
        ※ 시가총액은 2026. 6. 6. 기준
      </div>
    </SlideShell>
  );
};

Slide.meta = { id: "ecosystem", title: "BTC vs ETH", section: "01" };
Slide.steps = 1;

export default Slide;
