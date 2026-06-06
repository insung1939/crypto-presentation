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
  projects: string[];
};

type Group = {
  label: string;
  sub: string;
  members: Co[];
};

const groups: Group[] = [
  {
    label: "플랫폼 / 광고 기업",
    sub: "사용자 접점 · 데이터로 승부",
    members: [
      {
        name: "Meta",
        Logo: MetaLogo,
        cap: "Distribution",
        color: "#0866FF",
        projects: ["USDC 크리에이터 정산 파일럿", "소셜커머스 결제 레이어"],
      },
      {
        name: "X",
        Logo: XLogo,
        cap: "Monetization",
        color: "#1a1a2a",
        projects: ["X Money — P2P 송금·예치", "Smart Cashtags · Xchat 결제"],
      },
    ],
  },
  {
    label: "디바이스 / OS 기업",
    sub: "기기 · 보안 인프라로 승부",
    members: [
      {
        name: "Samsung",
        Logo: SamsungLogo,
        cap: "Interface",
        color: "#1428A0",
        projects: ["Blockchain Wallet · Keystore(Knox)", "NFC / Secure Element API"],
      },
      {
        name: "Apple",
        Logo: AppleLogo,
        cap: "Trust",
        color: "#1d1d1f",
        projects: ["Apple Wallet / Apple Pay", "결제 UX · 후방 정산 경로 통제"],
      },
    ],
  },
];

const Slide: SlideComponent = () => {
  return (
    <SlideShell
      section="02 · Crypto 기반 주요 사업"
      title="빅테크 4사의 Crypto 사업"
      accent="accent"
    >
      <div className="grid flex-1 grid-cols-2 gap-7">
        {groups.map((g, gi) => (
          <Reveal key={g.label} delay={0.15 + gi * 0.15} duration={0.75}>
            <div className="flex h-full flex-col rounded-3xl border border-border bg-surface-1 p-6">
              {/* group header */}
              <div className="flex items-baseline justify-between border-b border-border pb-4">
                <span className="text-h3 font-bold text-fg">{g.label}</span>
                <span className="text-caption text-fg-dim">{g.sub}</span>
              </div>

              {/* members */}
              <div className="mt-5 grid flex-1 grid-cols-2 gap-4">
                {g.members.map((m, mi) => (
                  <motion.div
                    key={m.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.4 + gi * 0.15 + mi * 0.12,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-col rounded-2xl border bg-bg-soft p-5 shadow-card"
                    style={{
                      borderColor: `color-mix(in srgb, ${m.color} 28%, transparent)`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <m.Logo size={44} />
                      <div className="flex flex-col">
                        <span className="text-h3 font-bold leading-none text-fg">
                          {m.name}
                        </span>
                        <span
                          className="mt-1 text-micro font-semibold"
                          style={{ color: m.color === "#1d1d1f" || m.color === "#1a1a2a" ? "var(--color-fg-muted)" : m.color }}
                        >
                          {m.cap}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      {m.projects.map((p) => (
                        <div
                          key={p}
                          className="flex gap-2 text-caption text-fg-muted leading-snug"
                          style={{ wordBreak: "keep-all" }}
                        >
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: m.color }}
                          />
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
      <Reveal delay={0.95}>
        <div className="mt-6 flex items-center justify-center gap-3 text-h3 font-semibold text-fg-muted">
          <Swords size={24} className="text-accent" strokeWidth={1.8} />
          각 그룹에서{" "}
          <span className="text-accent">우위 기업</span>을 가린 뒤, 최종 1곳을 고른다
        </div>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "company-map", title: "Company Map", section: "02" };
Slide.steps = 0;

export default Slide;
