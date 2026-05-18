import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Stagger } from "@/motion/Stagger";
import { Underline } from "@/motion/Underline";
import { SlideComponent } from "@/deck/types";
import { PayPalLogo } from "@/visuals/Logos";

type Row = {
  label: string;
  legacy: string;
  pyusd: string;
  highlight?: boolean;
};

const rows: Row[] = [
  { label: "자산 분류", legacy: "현금 · 예금", pyusd: "수탁자산", highlight: true },
  { label: "부채 계상", legacy: "없음", pyusd: "수탁부채 (공정가치)", highlight: true },
  { label: "수익 구조", legacy: "거래 수수료 + float 이자(소액)", pyusd: "수수료 ≈90% 절감 + 준비금(국채) 이자" },
  { label: "수익 인식", legacy: "수수료 단순 계상", pyusd: "수수료 + 이자 + 환전 분리 계상" },
  { label: "평가 방식", legacy: "액면가 그대로", pyusd: "매 결산 공정가치 측정 (디페깅 시 평가손실)", highlight: true },
  { label: "공시 부담", legacy: "낮음", pyusd: "SEC Note 별도 작성", highlight: true },
  { label: "정산 주기", legacy: "D+2 (은행 경유)", pyusd: "블록체인 확정 즉시" },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell
      section="03 · 핀테크 사례"
      title={
        <span className="inline-flex items-center gap-5">
          <motion.span
            initial={{ rotate: -8, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <PayPalLogo size={56} />
          </motion.span>
          <span>PayPal — 이미 직접 발행한 한 명</span>
        </span>
      }
      accent="accent"
    >
      <Reveal>
        <div className="grid grid-cols-[1fr_auto] items-end gap-8">
          <p className="max-w-[64ch] text-lead leading-snug text-fg-muted text-pretty">
            <strong className="text-fg">PYUSD</strong> — Paxos 발행, 1:1 달러 담보 스테이블코인. 2023.08 출시 후{" "}
            <Underline when={step >= 1} color="var(--color-accent)" delay={0.2}>
              GENIUS Act 기준을 충족한 최초의 대형 스테이블코인
            </Underline>
            으로 연방 승인 확보.
          </p>
          <div className="flex shrink-0 gap-3">
            {[
              { v: "$3.8B", k: "시가총액" },
              { v: "$4.1B", k: "월간 전송" },
              { v: "0.38%", k: "글로벌 점유율" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-xl border border-border bg-white/2.5 px-4 py-2 text-center"
              >
                <div className="font-mono text-h3 font-bold leading-none tabular-nums">{s.v}</div>
                <div className="mt-1 font-mono text-[0.7rem] tracking-wider text-fg-dim uppercase">{s.k}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.35} duration={0.85}>
        <div className="mt-7 flex items-baseline justify-between">
          <span className="text-eyebrow text-fg-dim">재무회계 관점 · 기업 정산 비교</span>
          <span className="text-caption text-fg-faint">기존 달러 정산  vs  PYUSD 정산</span>
        </div>

        <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-white/[0.015]">
          <div className="grid grid-cols-[1.1fr_1.4fr_1.5fr] border-b border-border bg-white/3 px-5 py-3 text-eyebrow text-fg-dim">
            <span>항목</span>
            <span>기존 달러 정산</span>
            <span className="text-accent">PYUSD 정산</span>
          </div>
          <Stagger delay={0.1} step={0.05}>
            {rows.map((r, i) => (
              <div
                key={r.label}
                className="grid grid-cols-[1.1fr_1.4fr_1.5fr] items-center border-b border-border/60 px-5 py-2.5 last:border-0"
                style={{
                  background: r.highlight
                    ? "color-mix(in srgb, var(--color-accent) 5%, transparent)"
                    : i % 2 === 1
                      ? "rgba(255,255,255,0.01)"
                      : "transparent",
                }}
              >
                <span className="text-caption font-semibold">{r.label}</span>
                <span className="text-caption text-fg-muted">{r.legacy}</span>
                <span className="flex items-center gap-2 text-caption text-fg">
                  {r.highlight && (
                    <CheckCircle2 size={14} className="shrink-0 text-accent" strokeWidth={2} />
                  )}
                  <span>{r.pyusd}</span>
                </span>
              </div>
            ))}
          </Stagger>
        </div>
      </Reveal>

      <Reveal delay={0.85}>
        <p className="mt-5 text-caption text-fg-dim text-pretty">
          한계: PayPal 생태계 내부에서만 작동 — 외부 가맹점 호환성·제3자 거래소 유동성은 USDT(62.5%) · USDC(24%) 대비 압도적으로 낮음.
        </p>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "paypal", title: "PayPal · PYUSD", section: "03" };
Slide.steps = 1;

export default Slide;
