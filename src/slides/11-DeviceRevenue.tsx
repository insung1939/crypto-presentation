import { motion } from "framer-motion";
import { ShieldCheck, ChevronUp } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { SamsungLogo, AppleLogo, BitcoinLogo, EthereumLogo, TetherLogo } from "@/visuals/Logos";

/* ───────── Phone wallet mock ───────── */
function PhoneMock({
  label,
  Logo,
  frame,
  screen,
  accent,
  delay,
}: {
  label: string;
  Logo: (p: { size?: number }) => JSX.Element;
  frame: string;
  screen: string;
  accent: string;
  delay: number;
}) {
  const tokens = [
    { L: BitcoinLogo, n: "BTC" },
    { L: EthereumLogo, n: "ETH" },
    { L: TetherLogo, n: "USDT" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      <div
        className="w-[120px] rounded-[1.4rem] p-1.5 shadow-card"
        style={{ background: frame }}
      >
        <div
          className="overflow-hidden rounded-[1.1rem] px-2.5 py-3"
          style={{ background: screen }}
        >
          <div className="flex items-center justify-between">
            <Logo size={18} />
            <span className="h-1 w-5 rounded-full" style={{ background: accent, opacity: 0.5 }} />
          </div>
          <div className="mt-2 text-[0.5rem] font-semibold uppercase tracking-wider" style={{ color: accent }}>
            Wallet
          </div>
          <div className="mt-2 space-y-1">
            {tokens.map((t, i) => (
              <motion.div
                key={t.n}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.3 + i * 0.1, duration: 0.4 }}
                className="flex items-center gap-1.5 rounded-md bg-white/70 px-1.5 py-1"
              >
                <t.L size={14} />
                <span className="text-[0.5rem] font-bold text-[#0a0a14]">{t.n}</span>
                <span className="ml-auto h-1 w-4 rounded-full bg-black/15" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <span className="mt-2 text-micro font-semibold text-fg-dim">{label}</span>
    </motion.div>
  );
}

type Row = { label: string; samsung: string; apple: string };

const rows: Row[] = [
  {
    label: "수익 원천",
    samsung: "갤럭시 보안 프리미엄 (기기 판매 단발성)",
    apple: "App Store + Apple Pay 수수료 + 파트너 금융 접근료",
  },
  {
    label: "반복 수익",
    samsung: "기기 판매 1회성 · 구독/수수료 부재",
    apple: "거래마다 결제 수수료 + App Store 30% 지속",
  },
  {
    label: "Crypto 연계",
    samsung: "Blockchain Wallet 무료 · 직접 수수료 없음",
    apple: "NFC/SE API 파트너 수수료 + 앱 과금 + Pay 게이트웨이",
  },
  {
    label: "수익 방어력",
    samsung: "안드로이드 개방 → 경쟁 월렛 침투 쉬움 (락인 약)",
    apple: "iOS 폐쇄 + NFC 통제로 경쟁 배제 (락인 강)",
  },
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
          {/* header */}
          <Reveal>
            <div className="grid grid-cols-[5.5rem_1fr_1fr] items-center gap-3 pb-2">
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
              <div className="grid grid-cols-[5.5rem_1fr_1fr] items-stretch gap-3 border-t border-border py-3">
                <div className="flex items-center">
                  <span className="text-caption font-bold text-fg-dim">{r.label}</span>
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

        {/* wallet mocks */}
        <div className="flex flex-col items-center justify-center gap-5 border-l border-border pl-8">
          <div className="flex gap-4">
            <PhoneMock label="Samsung Wallet" Logo={SamsungLogo} frame="#1428A0" screen="#eef1fb" accent="#1428A0" delay={0.4} />
            <PhoneMock label="Apple Wallet" Logo={AppleLogo} frame="#1d1d1f" screen="#f2f2f4" accent="#1d1d1f" delay={0.6} />
          </div>
        </div>
      </div>

      {/* Samsung's only edge: Knox security */}
      <Reveal delay={0.7}>
        <div className="mt-4 flex items-center gap-4 rounded-2xl border border-stable/30 bg-stable/[0.06] px-6 py-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-stable/15 text-stable">
            <ShieldCheck size={24} strokeWidth={1.9} />
          </div>
          <p className="text-body leading-snug text-fg-muted" style={{ wordBreak: "keep-all" }}>
            <span className="font-bold text-stable">단, 보안은 Samsung 우위</span> — Knox·Secure Element 하드웨어 격리로 개인키 보호 기술력은 세계 최고 수준. 하지만 그것이{" "}
            <span className="font-semibold text-fg">반복 수익으로 이어지진 않는다.</span>
          </p>
        </div>
      </Reveal>
    </SlideShell>
  );
};

Slide.meta = { id: "device-revenue", title: "Samsung vs Apple Revenue", section: "03" };
Slide.steps = 1;

export default Slide;
