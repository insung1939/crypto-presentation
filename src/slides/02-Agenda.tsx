import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { FocusDim } from "@/motion/FocusDim";
import { SlideComponent } from "@/deck/types";

const chapters = [
  { idx: "01", label: "세 자산의 정의와 특성", hint: "Bitcoin · Ethereum · Stablecoin" },
  { idx: "02", label: "두 자산은 어떻게 연결되는가", hint: "BTC ↔ Stablecoin · ETH ↔ Stablecoin" },
  { idx: "03", label: "빅테크 5사의 가상자산 전략", hint: "X · Google · Samsung · Apple · Meta" },
  { idx: "04", label: "청중과 함께, 그리고 결론", hint: "QR 실시간 투표 · 우리 팀의 선택" },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell section="Agenda" title="오늘 우리가 다룰 것" accent="accent">
      <ul className="mt-6 space-y-7">
        {chapters.map((row, i) => (
          <Reveal key={row.idx} delay={0.1 + i * 0.08}>
            <FocusDim focused={step === 0 || step - 1 === i}>
              <li className="flex items-baseline gap-8">
                <span className="font-mono text-[2rem] text-[var(--color-fg-dim)]">
                  {row.idx}
                </span>
                <div className="flex flex-col">
                  <span className="text-[2.6rem] font-semibold leading-snug">
                    {row.label}
                  </span>
                  <span className="mt-1 text-[1.35rem] text-[var(--color-fg-muted)]">
                    {row.hint}
                  </span>
                </div>
              </li>
            </FocusDim>
          </Reveal>
        ))}
      </ul>
    </SlideShell>
  );
};

Slide.meta = { id: "agenda", title: "Agenda" };
Slide.steps = chapters.length;

export default Slide;
