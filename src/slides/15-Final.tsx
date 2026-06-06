import { motion } from "framer-motion";
import { TrendingUp, Coins, ShieldAlert } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { FocusDim } from "@/motion/FocusDim";
import { SlideComponent } from "@/deck/types";
import { XLogo, AppleLogo } from "@/visuals/Logos";

const X_COLOR = "#111827";
const A_COLOR = "#0071e3";

type Axis = { Icon: typeof TrendingUp; label: string; x: string; apple: string };

const axes: Axis[] = [
  {
    Icon: TrendingUp,
    label: "성장 확장성",
    x: "종적 확장 — Social Media에서 금융 플랫폼으로",
    apple: "횡적 확산 — 기기·OS에서 Crypto 결제 경험으로",
  },
  {
    Icon: Coins,
    label: "수익화 구조",
    x: "직접 금융 수익 — 수수료·예치금 스프레드·투자·대출",
    apple: "간접 생태계 수익 — 결제 수수료·App Store·기기 락인",
  },
  {
    Icon: ShieldAlert,
    label: "리스크 대응력",
    x: "고위험·상방 개방 — 성공 시 주도권 확보",
    apple: "저위험·관리 용이 — 발행·수탁 회피, 접점 장악",
  },
];

const Slide: SlideComponent = ({ step }) => {
  const focused = (i: number) => step === 0 || step - 1 === i;

  return (
    <SlideShell
      section="04 · 최종 투자대상 기업 선정"
      title="X vs Apple"
      accent="accent"
    >
      {/* identity headers */}
      <Reveal>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-6">
          <div className="flex items-center gap-4 rounded-2xl border-2 px-6 py-4" style={{ borderColor: `color-mix(in srgb, ${X_COLOR} 30%, transparent)` }}>
            <XLogo size={52} />
            <div>
              <div className="text-h3 font-bold text-fg">X</div>
              <div className="text-caption text-fg-muted">금융 슈퍼앱 전환 기업</div>
            </div>
          </div>
          <motion.span
            className="text-h2 font-bold text-fg-faint"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            vs
          </motion.span>
          <div className="flex items-center justify-end gap-4 rounded-2xl border-2 px-6 py-4" style={{ borderColor: `color-mix(in srgb, ${A_COLOR} 35%, transparent)` }}>
            <div className="text-right">
              <div className="text-h3 font-bold text-fg">Apple</div>
              <div className="text-caption text-fg-muted">소비자 접점 통제 기업</div>
            </div>
            <AppleLogo size={52} />
          </div>
        </div>
      </Reveal>

      {/* axes */}
      <div className="mt-6 flex flex-1 flex-col justify-center gap-3">
        {axes.map((a, i) => (
          <Reveal key={a.label} delay={0.2 + i * 0.12}>
            <FocusDim focused={focused(i)} dimOpacity={0.3}>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div className="rounded-xl border px-5 py-3 text-body leading-snug text-fg" style={{ wordBreak: "keep-all", borderColor: `color-mix(in srgb, ${X_COLOR} 22%, transparent)`, background: "var(--color-surface-1)" }}>
                  {a.x}
                </div>
                <div className="flex w-[10rem] flex-col items-center gap-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-fg-muted">
                    <a.Icon size={20} strokeWidth={1.9} />
                  </div>
                  <span className="text-micro font-bold text-fg-dim">{a.label}</span>
                </div>
                <div className="rounded-xl border px-5 py-3 text-body leading-snug text-fg" style={{ wordBreak: "keep-all", borderColor: `color-mix(in srgb, ${A_COLOR} 28%, transparent)`, background: `color-mix(in srgb, ${A_COLOR} 5%, transparent)` }}>
                  {a.apple}
                </div>
              </div>
            </FocusDim>
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <Reveal delay={0.3}>
        <motion.p
          className="mt-4 text-center text-h2 font-bold text-fg"
          animate={{ opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          여러분이라면, <span className="text-accent">어디에 투자하시겠습니까?</span>
        </motion.p>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "final-matchup", title: "X vs Apple", section: "04" };
Slide.steps = axes.length;

export default Slide;
