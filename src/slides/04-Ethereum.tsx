import { SlideShell } from "@/deck/SlideShell";
import { Reveal } from "@/motion/Reveal";
import { Underline } from "@/motion/Underline";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";

const dapps = ["DeFi", "DApp", "NFT", "Stablecoin"];

const Slide: SlideComponent = ({ step }) => {
  return (
    <SlideShell section="01 · 정의" title="이더리움 — 단순 코인이 아닌 플랫폼" accent="eth">
      <div className="mt-2 flex flex-1 flex-col">
        <Reveal>
          <p className="max-w-[64ch] text-[1.5rem] leading-snug text-[var(--color-fg-muted)] text-pretty">
            2013년 비탈릭 부테린이 백서를 발표, 2015년 메인넷 출시.
            다양한 블록체인 서비스를 돌릴 수 있는 <em>플랫폼</em>이다.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 rounded-2xl border border-[var(--color-eth)]/30 bg-[var(--color-eth)]/[0.06] p-7">
            <div className="text-[1rem] tracking-[0.15em] text-[var(--color-eth)] uppercase">
              스마트 컨트랙트
            </div>
            <div className="mt-3 text-[2rem] font-semibold leading-snug">
              조건이 충족되면{" "}
              <Underline when={step >= 1} color="var(--color-eth)" delay={0.2}>
                중개인 없이 자동으로 실행
              </Underline>
              되는 계약
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.55}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="text-[1.3rem] text-[var(--color-fg-muted)]">
              이 위에서 작동하는 생태계:
            </span>
            {dapps.map((d, i) => (
              <Reveal key={d} delay={0.7 + i * 0.1} y={8}>
                <span className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-[1.15rem] font-medium">
                  {d}
                </span>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={1.2}>
          <p className="mt-10 text-[1.65rem] leading-snug text-pretty">
            그리고 결정적으로 —{" "}
            <Highlight when={step >= 2} color="var(--color-eth)" delay={0.1}>
              USDT · USDC도 이더리움 위에서 발행
            </Highlight>
            된다.
          </p>
        </Reveal>
      </div>
    </SlideShell>
  );
};

Slide.meta = { id: "ethereum", title: "Ethereum", section: "01" };
Slide.steps = 2;

export default Slide;
