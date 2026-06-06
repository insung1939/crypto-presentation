import { motion } from "framer-motion";
import {
  ShieldCheck,
  KeyRound,
  Wallet,
  CreditCard,
  Store,
  Nfc,
  ChevronUp,
} from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { SamsungLogo, AppleLogo } from "@/visuals/Logos";

/* ───────── Contrast stacks: security-led vs monetization-led ───────── */
function Stack({
  Logo,
  focus,
  color,
  items,
  tag,
  delay,
}: {
  Logo: (p: { size?: number }) => JSX.Element;
  focus: string;
  color: string;
  items: { Icon: typeof Wallet; label: string }[];
  tag: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-[150px] flex-col rounded-2xl border bg-bg-soft p-4 shadow-card"
      style={{ borderColor: `color-mix(in srgb, ${color} 30%, transparent)` }}
    >
      <div className="flex items-center gap-2">
        <Logo size={26} />
        <span className="text-micro font-bold text-fg-dim">{focus}</span>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {items.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.25 + i * 0.1, duration: 0.4 }}
            className="flex items-center gap-2 rounded-lg px-2.5 py-2"
            style={{ background: `color-mix(in srgb, ${color} 9%, transparent)` }}
          >
            <it.Icon size={16} style={{ color }} strokeWidth={1.9} />
            <span className="text-[0.78rem] font-semibold text-fg" style={{ wordBreak: "keep-all" }}>
              {it.label}
            </span>
          </motion.div>
        ))}
      </div>
      <div
        className="mt-3 rounded-lg py-1.5 text-center text-micro font-bold"
        style={{ background: `color-mix(in srgb, ${color} 14%, transparent)`, color }}
      >
        {tag}
      </div>
    </motion.div>
  );
}

type Row = { label: string; contrast: string; samsung: string; apple: string };

const rows: Row[] = [
  { label: "수익 원천", contrast: "기기 ↔ 수수료", samsung: "갤럭시 보안 프리미엄 · 기기 판매 중심", apple: "App Store + Apple Pay + 파트너 금융 접근료" },
  { label: "반복 수익", contrast: "1회성 ↔ 반복", samsung: "기기 판매 1회성 · 구독/수수료 부재", apple: "거래마다 수수료 · App Store 30% 지속" },
  { label: "Crypto 연계", contrast: "무료 ↔ 과금", samsung: "Wallet 무료 제공 · 직접 수수료 거의 없음", apple: "NFC/SE 파트너 수수료 + 앱 과금 + Pay 게이트웨이" },
  { label: "수익 방어력", contrast: "개방형 ↔ 폐쇄형", samsung: "안드로이드 개방 → 경쟁 월렛 침투 · 락인 약", apple: "iOS·NFC 통제 → 경쟁 배제 · 락인 강" },
];

const Slide: SlideComponent = ({ step }) => {
  const won = step >= 1;
  return (
    <SlideShell
      section="03 · 우위분석 Ⓑ 디바이스/OS"
      title="수익화 구조 — 누가 반복 수익을 가져가는가"
      accent="accent"
    >
      <div className="grid flex-1 grid-cols-[1fr_auto] gap-8">
        {/* comparison table */}
        <div className="flex flex-col">
          <Reveal>
            <div className="grid grid-cols-[7rem_1fr_1fr] items-center gap-3 pb-2">
              <span />
              <div className="flex items-center gap-2">
                <SamsungLogo size={28} />
                <span className="text-h3 font-bold">Samsung</span>
              </div>
              <div className="flex items-center gap-2">
                <AppleLogo size={28} />
                <span className="text-h3 font-bold">Apple</span>
              </div>
            </div>
          </Reveal>

          {rows.map((r, i) => (
            <Reveal key={r.label} delay={0.15 + i * 0.1}>
              <div className="grid grid-cols-[7rem_1fr_1fr] items-stretch gap-3 border-t border-border py-3">
                <div className="flex flex-col justify-center">
                  <span className="text-caption font-bold text-fg">{r.label}</span>
                  <span className="mt-0.5 font-mono text-[0.7rem] text-fg-faint">{r.contrast}</span>
                </div>
                <div className="rounded-xl border border-border bg-surface-1 px-3.5 py-2.5 text-caption leading-snug text-fg-muted" style={{ wordBreak: "keep-all" }}>
                  {r.samsung}
                </div>
                <motion.div
                  className="relative rounded-xl border px-3.5 py-2.5 text-caption leading-snug text-fg"
                  style={{ wordBreak: "keep-all" }}
                  animate={{
                    borderColor: won ? "color-mix(in srgb, var(--color-accent) 45%, transparent)" : "var(--color-border)",
                    background: won ? "color-mix(in srgb, var(--color-accent) 6%, transparent)" : "var(--color-surface-1)",
                  }}
                >
                  {r.apple}
                  <motion.span
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white shadow-card"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={won ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: won ? 0.1 + i * 0.08 : 0, type: "spring", stiffness: 260, damping: 14 }}
                  >
                    <ChevronUp size={15} strokeWidth={3} />
                  </motion.span>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* contrast stacks */}
        <div className="flex items-center gap-4 border-l border-border pl-8">
          <Stack
            Logo={SamsungLogo}
            focus="보안 중심"
            color="var(--color-stable)"
            tag="보안 우위"
            delay={0.4}
            items={[
              { Icon: ShieldCheck, label: "Knox 보안" },
              { Icon: KeyRound, label: "Blockchain Keystore" },
              { Icon: Wallet, label: "비수탁 Wallet" },
            ]}
          />
          <Stack
            Logo={AppleLogo}
            focus="수익화 중심"
            color="var(--color-accent)"
            tag="수익화 우위"
            delay={0.6}
            items={[
              { Icon: CreditCard, label: "Apple Pay 수수료" },
              { Icon: Store, label: "App Store 30%" },
              { Icon: Nfc, label: "NFC / SE API" },
            ]}
          />
        </div>
      </div>

      {/* conclusion */}
      <Reveal delay={0.7}>
        <div className="mt-4 flex items-center gap-4 rounded-2xl border border-border bg-surface-2 px-6 py-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-stable/15 text-stable">
            <ShieldCheck size={24} strokeWidth={1.9} />
          </div>
          <p className="text-body leading-snug text-fg-muted" style={{ wordBreak: "keep-all" }}>
            <span className="font-bold text-stable">보안은 Samsung</span>, <span className="font-bold text-accent">수익화는 Apple</span>. 보안 기술의 우위가 곧 반복 수익의 우위로 이어지지는 않는다 — 두 우위는 별개다.
          </p>
        </div>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "device-revenue", title: "Samsung vs Apple Revenue", section: "03" };
Slide.steps = 1;

export default Slide;
