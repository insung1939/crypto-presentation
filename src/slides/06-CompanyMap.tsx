import { motion } from "framer-motion";
import { Swords } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { MetaLogo, XLogo, SamsungLogo, AppleLogo } from "@/visuals/Logos";

type Co = {
  name: string;
  Logo: (p: { size?: number }) => JSX.Element;
  cap: string;
  color: string;
  dark?: boolean;
  projects: string[];
};

type Group = {
  label: string;
  axis: string;
  members: Co[];
};

const groups: Group[] = [
  {
    label: "플랫폼 / 광고 기업",
    axis: "Distribution · Monetization",
    members: [
      {
        name: "Meta",
        Logo: MetaLogo,
        cap: "Distribution",
        color: "#0866FF",
        projects: [
          "USDC 크리에이터 정산 파일럿",
          "소셜커머스 결제 레이어",
          "SNS 인앱결제 데이터 → 광고 ARPU 개선",
        ],
      },
      {
        name: "X",
        Logo: XLogo,
        cap: "Monetization",
        color: "#111827",
        dark: true,
        projects: [
          "X Money — P2P 송금·예치 결제 인프라",
          "Smart Cashtags · XChat 결제",
          "투자 데이터 × 크립토 결제 통합",
        ],
      },
    ],
  },
  {
    label: "디바이스 / OS 기업",
    axis: "Trust · Interface",
    members: [
      {
        name: "Samsung",
        Logo: SamsungLogo,
        cap: "Interface",
        color: "#1428A0",
        projects: [
          "Blockchain Keystore · Blockchain Wallet",
          "Knox 기반 개인키 보안 인프라",
          "비수탁 지갑 ↔ DApp 모바일 접점",
        ],
      },
      {
        name: "Apple",
        Logo: AppleLogo,
        cap: "Trust",
        color: "#1d1d1f",
        dark: true,
        projects: [
          "Apple Wallet / Apple Pay",
          "NFC · Secure Element API",
          "결제 UX·정산 경로 통제 → 마찰 완화",
        ],
      },
    ],
  },
];

const Slide: SlideComponent = () => {
  return (
    <SlideShell
      section="02 · Crypto 기반 주요 사업"
      title="4사는 무엇을, 어떤 역량으로 하고 있나"
      accent="accent"
    >
      <div className="grid flex-1 grid-cols-2 gap-7">
        {groups.map((g, gi) => (
          <Reveal key={g.label} delay={0.15 + gi * 0.15} duration={0.7}>
            <div className="flex h-full flex-col rounded-3xl border border-border bg-surface-1 p-6">
              {/* group header */}
              <div className="flex items-baseline justify-between border-b border-border pb-3">
                <span className="text-h3 font-bold text-fg">{g.label}</span>
                <span className="rounded-full bg-surface-2 px-3 py-1 font-mono text-micro font-semibold text-fg-dim">
                  {g.axis}
                </span>
              </div>

              {/* members stacked */}
              <div className="mt-4 flex flex-1 flex-col gap-4">
                {g.members.map((m, mi) => (
                  <motion.div
                    key={m.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.35 + gi * 0.15 + mi * 0.12,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-1 flex-col rounded-2xl border bg-bg-soft p-5 shadow-card"
                    style={{ borderColor: `color-mix(in srgb, ${m.color} 26%, transparent)` }}
                  >
                    <div className="flex items-center gap-3">
                      <m.Logo size={40} />
                      <span className="text-h3 font-bold leading-none text-fg">{m.name}</span>
                      <span
                        className="ml-auto rounded-full px-3 py-1 text-micro font-bold"
                        style={{
                          background: `color-mix(in srgb, ${m.dark ? "#6b7280" : m.color} 14%, transparent)`,
                          color: m.dark ? "var(--color-fg-muted)" : m.color,
                        }}
                      >
                        {m.cap}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-1 gap-1.5">
                      {m.projects.map((p) => (
                        <div
                          key={p}
                          className="flex gap-2 text-caption text-fg-muted leading-snug"
                          style={{ wordBreak: "keep-all" }}
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: m.color }} />
                          {p}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* tournament foreshadow */}
      <Reveal delay={1}>
        <div className="mt-6 flex items-center justify-center gap-3 text-h3 font-semibold text-fg-muted">
          <Swords size={24} className="text-accent" strokeWidth={1.8} />
          각 그룹에서 <span className="text-accent">우위 기업</span>을 가린 뒤, 최종 1곳을 고른다
        </div>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "company-map", title: "Company Map", section: "02" };
Slide.steps = 0;

export default Slide;
