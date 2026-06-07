import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { FocusDim } from "@/motion/FocusDim";
import { SlideComponent } from "@/deck/types";
import { MetaLogo, XLogo } from "@/visuals/Logos";

type Row = {
  label: string;
  meta: string;
  x: string;
  /** delimiter to line-break the cell at (first occurrence) */
  sep?: string;
  headBold?: boolean;
};

const rows: Row[] = [
  {
    label: "전략",
    meta: "규제 회피 · 유통망 집중 — 라이선스 실패 후 규제비용을 외부화하고 보수적으로 재진입",
    x: "직접 금융 인프라 구축 — 인수 → 라이선스 확보 → 금융서비스로 확장",
    sep: "—",
    headBold: true,
  },
  {
    label: "사업구조",
    meta: "결제 데이터 → 소셜 데이터 결합 → 광고 타겟팅 정교화 → ARPU 상승 (광고 의존 높음)",
    x: "송금·결제 수수료 → 예치금 스프레드 → 투자·대출 확장 (광고 의존 낮음)",
  },
  {
    label: "강점",
    meta: "30억+ 이용자(Facebook·Instagram·WhatsApp) → 광고 수익화 연결성",
    x: "직접 금융 인프라 구축력 → 슈퍼앱 확장성 (결제→크립토→투자→대출→송금)",
    sep: "→",
    headBold: true,
  },
  {
    label: "한계",
    meta: "결제+광고 데이터 결합 규제 · 스테이블코인 발행 관련 규제 노출",
    x: "직접 금융 수익화 난도 · 서구권 Product-Market Fit 미검증",
    sep: "·",
    headBold: false,
  },
];

/** Break a cell at `sep` (first occurrence): optional bold headline, detail below. */
function CellText({ text, sep, headBold }: { text: string; sep?: string; headBold?: boolean }) {
  if (!sep) return <>{text}</>;
  const idx = text.indexOf(sep);
  if (idx === -1) return <>{text}</>;
  const head = text.slice(0, idx).trim();
  const rest = text.slice(idx + sep.length).trim();
  return (
    <>
      {headBold ? <span className="font-bold text-fg">{head}</span> : head}
      <br />
      {rest}
    </>
  );
}

const Slide: SlideComponent = ({ step }) => {
  const focused = (i: number) => step === 0 || step - 1 === i;

  return (
    <SlideShell
      section="03 · 우위분석 Ⓐ 플랫폼/광고"
      title="전략과 사업구조 — Meta vs X"
      accent="accent"
    >
      {/* column headers */}
      <Reveal>
        <div className="grid grid-cols-[7rem_1fr_1fr] items-center gap-4 pb-3">
          <span />
          <div className="flex items-center gap-3">
            <MetaLogo size={40} />
            <span className="text-h3 font-bold text-fg">Meta</span>
          </div>
          <div className="flex items-center gap-3">
            <XLogo size={40} />
            <span className="text-h3 font-bold text-fg">X</span>
          </div>
        </div>
      </Reveal>

      <div className="flex flex-1 flex-col">
        {rows.map((r, i) => (
          <Reveal key={r.label} delay={0.15 + i * 0.1}>
            <FocusDim focused={focused(i)} dimOpacity={0.32}>
              <div className="grid grid-cols-[7rem_1fr_1fr] items-stretch gap-4 border-t border-border py-4">
                <div className="flex items-center">
                  <span
                    className="rounded-lg px-3 py-1.5 text-caption font-bold"
                    style={{
                      background: "color-mix(in srgb, var(--color-accent) 12%, transparent)",
                      color: "var(--color-accent)",
                    }}
                  >
                    {r.label}
                  </span>
                </div>
                <motion.div
                  className="rounded-2xl border border-border bg-surface-1 px-5 py-3.5 text-body leading-snug text-fg-muted"
                  style={{ wordBreak: "keep-all" }}
                  animate={{
                    borderColor: focused(i)
                      ? "color-mix(in srgb, #0866FF 35%, transparent)"
                      : "var(--color-border)",
                  }}
                >
                  <CellText text={r.meta} sep={r.sep} headBold={r.headBold} />
                </motion.div>
                <motion.div
                  className="rounded-2xl border bg-surface-1 px-5 py-3.5 text-body leading-snug text-fg"
                  style={{ wordBreak: "keep-all" }}
                  animate={{
                    borderColor: focused(i)
                      ? "color-mix(in srgb, var(--color-accent) 45%, transparent)"
                      : "var(--color-border)",
                    background: focused(i)
                      ? "color-mix(in srgb, var(--color-accent) 6%, transparent)"
                      : "var(--color-surface-1)",
                  }}
                >
                  <CellText text={r.x} sep={r.sep} headBold={r.headBold} />
                </motion.div>
              </div>
            </FocusDim>
          </Reveal>
        ))}
      </div>
    </SlideShell>
  );
};

Slide.meta = { id: "platform-strategy", title: "Meta vs X Strategy", section: "03" };
Slide.steps = rows.length;

export default Slide;
