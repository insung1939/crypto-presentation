import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Shake } from "@/motion/Shake";
import { SlideComponent } from "@/deck/types";
import { BitcoinLogo, EthereumLogo } from "@/visuals/Logos";
import { useUpbitPrice, type UpbitInfo } from "@/lib/useUpbitPrice";

const UP = "var(--color-warn)"; // 상승 (KR 관례: 빨강)
const DOWN = "#2563eb"; // 하락 (파랑)

type Row = { k: string; v: string; sub?: string };

type AssetCol = {
  key: "btc" | "eth";
  market: string;
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
    market: "KRW-BTC",
    name: "Bitcoin",
    identity: "디지털 금",
    color: "var(--color-btc)",
    Logo: BitcoinLogo,
    rows: [
      { k: "정의", v: "탈중앙화된 디지털 가치저장 자산", sub: "가치저장 · 투자 · 담보 · 인플레이션 헤지" },
      { k: "기원", v: "2009 · 사토시 나카모토", sub: "최초의 가상자산" },
      { k: "현황", v: "시가총액 약 1조 2,100억 달러", sub: "약 1,600조 원 · 제도권 편입 중인 ‘디지털 금’" },
    ],
    cap: "가상자산 시장의 신뢰 · 유동성 기준점",
  },
  {
    key: "eth",
    market: "KRW-ETH",
    name: "Ethereum",
    identity: "디지털 금융 인프라",
    color: "var(--color-eth)",
    Logo: EthereumLogo,
    rows: [
      { k: "정의", v: "스마트컨트랙트 기반 블록체인 플랫폼", sub: "dApp · 토큰 발행 · 금융 자동화 · 결제 인프라" },
      { k: "기원", v: "2015 · 비탈릭 부테린", sub: "프로그래머블 블록체인" },
      { k: "현황", v: "시가총액 약 1,880억 달러", sub: "약 260조 원 · 스테이블코인 공급의 절반 이상 호스팅" },
    ],
    cap: "가상자산 서비스가 실제 작동하는 기술 · 금융 인프라",
  },
];

/* ───────── sparkline ───────── */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 30 - ((v - min) / span) * 28 - 1;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="h-8 w-24">
      <motion.polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: "easeInOut", delay: 0.4 }}
      />
    </svg>
  );
}

/* ───────── live price panel ───────── */
function LivePrice({ info, brand }: { info?: UpbitInfo; brand: string }) {
  const trend = !info ? "var(--color-fg-dim)" : info.change === "RISE" ? UP : info.change === "FALL" ? DOWN : "var(--color-fg-dim)";
  const arrow = info?.change === "RISE" ? "▲" : info?.change === "FALL" ? "▼" : "·";
  return (
    <div className="rounded-2xl border border-border bg-bg-soft px-4 py-3">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-micro font-semibold text-fg-dim">
          <motion.span
            className="inline-block h-1.5 w-1.5 rounded-full bg-stable"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          실시간 · Upbit
        </span>
        {info ? (
          <span className="font-mono text-caption font-bold" style={{ color: trend }}>
            {arrow} {Math.abs(info.changeRate * 100).toFixed(2)}%
          </span>
        ) : (
          <span className="text-micro text-fg-faint">불러오는 중…</span>
        )}
      </div>
      <div className="mt-1.5 flex items-end justify-between gap-3">
        {info ? (
          <motion.span
            key={info.price}
            initial={{ color: trend }}
            animate={{ color: "var(--color-fg)" }}
            transition={{ duration: 0.9 }}
            className="font-mono text-h3 font-bold tabular-nums leading-none text-fg"
          >
            ₩{info.price.toLocaleString("ko-KR")}
          </motion.span>
        ) : (
          <span className="font-mono text-h3 font-bold text-fg-faint">₩—</span>
        )}
        {info && info.spark.length > 1 && <Sparkline data={info.spark} color={trend === "var(--color-fg-dim)" ? brand : trend} />}
      </div>
    </div>
  );
}

const Slide: SlideComponent = ({ step }) => {
  const prices = useUpbitPrice();

  return (
    <SlideShell section="01 · Crypto 생태계 이해" title="비트코인과 이더리움" accent="accent">
      <div className="grid flex-1 grid-cols-2 gap-6">
        {cols.map((c, ci) => (
          <motion.div
            key={c.key}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + ci * 0.14, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-full flex-col overflow-hidden rounded-3xl border bg-surface-1 p-7"
            style={{ borderColor: `color-mix(in srgb, ${c.color} 32%, transparent)` }}
          >
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
                <span className="text-h1 font-bold leading-[1.05]" style={{ color: c.color }}>
                  {c.identity}
                </span>
              </div>
            </div>

            {/* rows */}
            <div className="relative mt-6 space-y-4">
              {c.rows.map((r, ri) => {
                const isStatus = r.k === "현황";
                return (
                  <Reveal key={r.k} delay={0.45 + ci * 0.08 + ri * 0.12} duration={0.6}>
                    <div className="flex gap-4">
                      <span className="mt-1 w-12 shrink-0 text-caption font-semibold" style={{ color: c.color }}>
                        {r.k}
                      </span>
                      <div className="min-w-0">
                        <div className="text-h3 font-semibold leading-snug text-fg" style={{ wordBreak: "keep-all" }}>
                          {isStatus ? (
                            <Shake when={step >= 1} intensity={2}>
                              {r.v}
                            </Shake>
                          ) : (
                            r.v
                          )}
                        </div>
                        {r.sub && (
                          <div className="mt-1 text-caption text-fg-dim leading-snug" style={{ wordBreak: "keep-all" }}>
                            {r.sub}
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* live price */}
            <Reveal delay={0.7 + ci * 0.08} className="mt-4">
              <LivePrice info={prices[c.market]} brand={c.color} />
            </Reveal>

            {/* ecosystem-function caption */}
            <Reveal delay={0.95 + ci * 0.08} className="mt-auto pt-5">
              <div
                className="relative rounded-2xl border px-5 py-3.5"
                style={{
                  borderColor: `color-mix(in srgb, ${c.color} 28%, transparent)`,
                  background: `color-mix(in srgb, ${c.color} 8%, transparent)`,
                }}
              >
                <div className="text-micro font-semibold" style={{ color: c.color }}>
                  생태계 기능
                </div>
                <div className="mt-1 whitespace-nowrap text-[1.05rem] font-medium text-fg-muted">
                  {c.cap}
                </div>
              </div>
            </Reveal>
          </motion.div>
        ))}
      </div>

      <div className="mt-3 text-right text-micro text-fg-faint">
        ※ 시가총액은 2026. 6. 6. 기준 · 실시간 시세 Upbit(KRW)
      </div>
    </SlideShell>
  );
};

Slide.meta = { id: "ecosystem", title: "BTC vs ETH", section: "01" };
Slide.steps = 1;

export default Slide;
