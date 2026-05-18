import { Coins, Link2, Building2, Users } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { FocusDim } from "@/motion/FocusDim";
import { SlideComponent } from "@/deck/types";

const chapters = [
  {
    idx: "01",
    label: "세 자산의 정의와 특성",
    hint: "Bitcoin · Ethereum · Stablecoin",
    Icon: Coins,
  },
  {
    idx: "02",
    label: "두 자산은 어떻게 연결되는가",
    hint: "BTC ↔ Stablecoin · ETH ↔ Stablecoin",
    Icon: Link2,
  },
  {
    idx: "03",
    label: "빅테크 5사의 가상자산 전략",
    hint: "X · Google · Samsung · Apple · Meta",
    Icon: Building2,
  },
  {
    idx: "04",
    label: "청중과 함께, 그리고 결론",
    hint: "실시간 투표 · 우리 팀의 선택",
    Icon: Users,
  },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell section="Agenda" title="오늘 우리가 다룰 것" accent="accent">
      <ul className="mt-4 flex flex-1 flex-col justify-center gap-6">
        {chapters.map((row, i) => (
          <Reveal key={row.idx} delay={0.15 + i * 0.1} duration={0.75}>
            <FocusDim focused={step === 0 || step - 1 === i}>
              <li className="flex items-center gap-8 rounded-2xl border border-transparent px-2 py-4 transition-colors">
                <span className="font-mono text-[2.4rem] font-medium text-fg-faint tabular-nums">
                  {row.idx}
                </span>

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-surface-2 text-fg-muted">
                  <row.Icon size={28} strokeWidth={1.5} />
                </div>

                <div className="flex flex-col">
                  <span className="text-h2 font-semibold leading-tight">
                    {row.label}
                  </span>
                  <span className="mt-1.5 text-caption text-fg-dim">
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
