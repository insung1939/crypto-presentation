import { motion } from "framer-motion";
import { Crown, Repeat, Lock, ShieldHalf } from "lucide-react";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";
import { SamsungLogo, AppleLogo } from "@/visuals/Logos";

const points = [
  {
    Icon: Repeat,
    tag: "수익성",
    title: "반복 수익 구조",
    body: "App Store 30% + Apple Pay 거래 수수료가 매 거래마다 누적된다",
  },
  {
    Icon: Lock,
    tag: "락인 · 확장성",
    title: "폐쇄형 생태계 장악",
    body: "iOS · NFC 통제로 경쟁 월렛을 배제하고 Crypto 결제 접점을 선점",
  },
  {
    Icon: ShieldHalf,
    tag: "방어력",
    title: "구조적 방어력",
    body: "규제(DMA) 외 모든 시나리오에서 재무 충격이 제한적",
  },
];

const Slide: SlideComponent = ({ step }) => {
  const won = step >= 1;

  return (
    <SlideShell
      section="03 · 우위분석 Ⓑ · 결론"
      title="디바이스/OS 그룹의 승자"
      accent="accent"
    >
      <Reveal>
        <div className="flex items-center justify-center gap-10 py-2">
          {/* Samsung — fades */}
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ opacity: won ? 0.32 : 1, scale: won ? 0.92 : 1, filter: won ? "grayscale(1)" : "grayscale(0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <SamsungLogo size={70} />
            <span className="text-h3 font-bold text-fg-dim">Samsung</span>
          </motion.div>

          <motion.span
            className="text-h2 font-bold text-fg-faint"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            vs
          </motion.span>

          {/* Apple — wins */}
          <motion.div
            className="relative flex flex-col items-center gap-2"
            animate={{ scale: won ? 1.08 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -inset-6 rounded-full blur-2xl"
              animate={{ opacity: won ? [0.3, 0.55, 0.3] : 0 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              style={{ background: "var(--color-accent)" }}
            />
            <motion.div
              className="absolute -top-9"
              initial={{ opacity: 0, y: 8, scale: 0.6 }}
              animate={won ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 240, damping: 14 }}
            >
              <Crown size={34} className="text-accent" fill="var(--color-accent)" strokeWidth={1.5} />
            </motion.div>
            <div className="relative">
              <AppleLogo size={78} />
            </div>
            <span className="relative text-h2 font-bold text-fg">Apple</span>
          </motion.div>
        </div>
      </Reveal>

      <div className="mt-7 grid flex-1 grid-cols-3 gap-5">
        {points.map((p, i) => (
          <motion.div
            key={p.tag}
            initial={{ opacity: 0, y: 20 }}
            animate={won ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: won ? 0.25 + i * 0.14 : 0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-3xl border bg-surface-1 p-6"
            style={{ borderColor: "color-mix(in srgb, var(--color-accent) 28%, transparent)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: "var(--tint-accent)", color: "var(--color-accent)" }}
              >
                <p.Icon size={22} strokeWidth={1.8} />
              </div>
              <span className="text-eyebrow text-accent">{p.tag}</span>
            </div>
            <div className="mt-4 text-h3 font-bold leading-snug text-fg" style={{ wordBreak: "keep-all" }}>
              {p.title}
            </div>
            <div className="mt-2 text-caption text-fg-muted leading-snug" style={{ wordBreak: "keep-all" }}>
              {p.body}
            </div>
          </motion.div>
        ))}
      </div>

    </SlideShell>
  );
};

Slide.meta = { id: "device-verdict", title: "Device Verdict — Apple", section: "03" };
Slide.steps = 1;

export default Slide;
