import { motion } from "framer-motion";
import { Swords } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { MetaLogo, XLogo, SamsungLogo, AppleLogo } from "@/visuals/Logos";

type Proj = { t: string; logo?: string };
type Co = {
  name: string;
  Logo: (p: { size?: number }) => JSX.Element;
  color: string;
  projects: Proj[];
};
type Group = { label: string; axis: string; tint: string; members: Co[] };

const groups: Group[] = [
  {
    label: "플랫폼 / 광고 기업",
    axis: "Distribution · Monetization",
    tint: "var(--color-eth)",
    members: [
      {
        name: "Meta",
        Logo: MetaLogo,
        color: "#0866FF",
        projects: [
          { t: "USDC 크리에이터 정산 파일럿", logo: "/brand/usdc.svg" },
          { t: "소셜커머스 결제 레이어" },
        ],
      },
      {
        name: "X",
        Logo: XLogo,
        color: "#111827",
        projects: [
          { t: "X Money — P2P 송금·예치 결제 인프라" },
          { t: "Smart Cashtags · XChat 결제" },
        ],
      },
    ],
  },
  {
    label: "디바이스 / OS 기업",
    axis: "Trust · Interface",
    tint: "var(--color-btc)",
    members: [
      {
        name: "Samsung",
        Logo: SamsungLogo,
        color: "#1428A0",
        projects: [
          { t: "Blockchain Keystore · Wallet" },
          { t: "Knox 기반 개인키 보안 인프라" },
        ],
      },
      {
        name: "Apple",
        Logo: AppleLogo,
        color: "#1d1d1f",
        projects: [
          { t: "Apple Wallet / Apple Pay", logo: "/brand/applepay.svg" },
          { t: "NFC · Secure Element API" },
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
            <div
              className="flex h-full flex-col rounded-3xl border p-6"
              style={{
                borderColor: `color-mix(in srgb, ${g.tint} 28%, transparent)`,
                background: `color-mix(in srgb, ${g.tint} 5%, transparent)`,
              }}
            >
              {/* group header */}
              <div className="flex items-baseline justify-between pb-3">
                <span className="text-h3 font-bold text-fg">{g.label}</span>
                <span
                  className="rounded-full px-3 py-1 font-mono text-micro font-bold"
                  style={{ background: `color-mix(in srgb, ${g.tint} 16%, transparent)`, color: g.tint }}
                >
                  {g.axis}
                </span>
              </div>

              {/* members stacked */}
              <div className="mt-1 flex flex-1 flex-col gap-4">
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
                    className="flex flex-1 flex-col rounded-2xl border border-border bg-bg-soft p-5 shadow-card"
                  >
                    <div className="flex items-center gap-3 border-b border-border pb-3">
                      <m.Logo size={40} />
                      <span className="text-h3 font-bold leading-none text-fg">{m.name}</span>
                    </div>

                    <div className="mt-3 flex flex-1 flex-col justify-center gap-2.5">
                      {m.projects.map((p) => (
                        <div key={p.t} className="flex items-center gap-3" style={{ wordBreak: "keep-all" }}>
                          {p.logo ? (
                            <span className="flex h-7 w-9 shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-black/5">
                              <img src={p.logo} alt="" className="h-3.5 w-auto object-contain" />
                            </span>
                          ) : (
                            <span className="ml-1 mr-2 h-2 w-2 shrink-0 rounded-full" style={{ background: m.color }} />
                          )}
                          <span className="text-body font-semibold leading-snug text-fg">{p.t}</span>
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
