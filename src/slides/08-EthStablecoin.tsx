import { motion } from "framer-motion";
import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { SlideComponent } from "@/deck/types";

const flows = ["송금", "결제", "거래", "DeFi 담보"];

const Slide: SlideComponent = () => {
  return (
    <SlideShell section="02 · 연결" title="이더리움 ↔ 스테이블코인" accent="eth">
      <div className="mt-2 flex flex-1 flex-col">
        <Reveal>
          <p className="text-[1.9rem] leading-snug text-pretty">
            한 줄로 정리하면 —{" "}
            <span className="text-[var(--color-eth)] font-bold">인프라</span>{" "}
            <span className="text-[var(--color-fg-muted)]">vs</span>{" "}
            <span className="text-[var(--color-stable)] font-bold">그 위의 화폐</span>.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <p className="mt-5 max-w-[64ch] text-[1.4rem] leading-snug text-[var(--color-fg-muted)] text-pretty">
            이더리움은 디지털 경제가 돌아가는 도로이고, 스테이블코인은 그 위를 흐르는 화폐.
            사람들은 이더리움 위에서 스테이블코인으로 경제활동을 한다.
          </p>
        </Reveal>

        <Reveal delay={0.7}>
          <div className="mt-10 rounded-2xl border border-white/8 bg-white/[0.02] p-7">
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-8">
              <div className="text-center">
                <div className="text-[1rem] tracking-[0.15em] text-[var(--color-eth)] uppercase">
                  Layer
                </div>
                <div className="mt-2 text-[2.6rem] font-bold text-[var(--color-eth)]">
                  Ethereum
                </div>
                <div className="mt-1 text-[1.05rem] text-[var(--color-fg-muted)]">분산 플랫폼</div>
              </div>

              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="text-[2.2rem] text-[var(--color-fg-muted)]"
              >
                →
              </motion.div>

              <div className="text-center">
                <div className="text-[1rem] tracking-[0.15em] text-[var(--color-stable)] uppercase">
                  Currency
                </div>
                <div className="mt-2 text-[2.6rem] font-bold text-[var(--color-stable)]">
                  USDT · USDC
                </div>
                <div className="mt-1 text-[1.05rem] text-[var(--color-fg-muted)]">
                  ERC-20 토큰
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {flows.map((f, i) => (
                <Reveal key={f} delay={1.0 + i * 0.1} y={6}>
                  <span className="rounded-full border border-[var(--color-stable)]/30 bg-[var(--color-stable)]/[0.06] px-4 py-1.5 text-[1.1rem] font-medium">
                    {f}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </SlideShell>
  );
};

Slide.meta = { id: "eth-stable", title: "ETH × Stablecoin", section: "02" };
Slide.steps = 0;

export default Slide;
