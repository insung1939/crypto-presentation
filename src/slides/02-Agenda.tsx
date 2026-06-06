import { Boxes, Briefcase, Scale, Trophy, MessageCircle } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { FocusDim } from "@/motion/FocusDim";
import { SlideComponent } from "@/deck/types";

const chapters = [
  {
    idx: "01",
    label: "Crypto 생태계 이해",
    hint: "Bitcoin · Ethereum · Stablecoin 연결고리",
    Icon: Boxes,
  },
  {
    idx: "02",
    label: "Crypto 기반 주요 사업",
    hint: "핵심 산업 선정 · 빅테크의 Crypto 사업",
    Icon: Briefcase,
  },
  {
    idx: "03",
    label: "Crypto 기반 기업 우위분석",
    hint: "Meta vs X · Samsung vs Apple",
    Icon: Scale,
  },
  {
    idx: "04",
    label: "최종 투자대상 기업 선정",
    hint: "실시간 투표 · 우리 팀의 선택",
    Icon: Trophy,
  },
  {
    idx: "05",
    label: "Q&A",
    hint: "질문과 토론",
    Icon: MessageCircle,
  },
];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell section="Contents" title="목차" accent="accent">
      <ul className="mt-2 flex flex-1 flex-col justify-center gap-4">
        {chapters.map((row, i) => (
          <Reveal key={row.idx} delay={0.15 + i * 0.09} duration={0.7}>
            <FocusDim focused={step === 0 || step - 1 === i}>
              <li className="flex items-center gap-7 rounded-2xl border border-transparent px-2 py-3.5 transition-colors">
                <span className="font-mono text-[2.2rem] font-medium text-fg-faint tabular-nums">
                  {row.idx}
                </span>

                <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-surface-2 p-3 text-fg-muted">
                  <row.Icon size={26} strokeWidth={1.5} />
                </div>

                <div className="flex flex-col">
                  <span className="text-h2 font-semibold leading-tight">
                    {row.label}
                  </span>
                  <span className="mt-1 text-caption text-fg-dim">
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
