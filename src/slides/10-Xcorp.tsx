import { Wallet, TrendingUp, Coins } from "lucide-react";
import { CompanyShell } from "./_CompanyShell";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";
import { XLogo } from "@/visuals/Logos";

const Slide: SlideComponent = ({ step }) => (
  <CompanyShell
    index={1}
    total={5}
    brand="X.corp"
    brandColor="#ffffff"
    tagline="EVERYTHING APP · SNS + 결제 + 크립토"
    Logo={XLogo}
    headline={
      <>
        SNS · 결제 · 투자를 한 플랫폼으로 묶는{" "}
        <Highlight when={step >= 1} color="#a78bfa" delay={0.15}>
          슈퍼앱 비전
        </Highlight>
        . 이미 절반은 가동 중이다.
      </>
    }
    body={
      <>
        2,500만 이상의 크립토 사용자 기반과 머스크의 PayPal DNA. 다만 뉴욕 등 핵심 주 라이선스
        미취득, 금융 규제 리스크, X 자체의 MAU 하락이 발목을 잡는다.
      </>
    }
    pillars={[
      {
        Icon: Wallet,
        label: "X Money",
        status: "live",
        detail: (
          <>
            P2P 송금 · 인앱 지갑 · 카드 연동 (Visa 파트너십).{" "}
            <span className="text-fg-muted">40+ 주 라이선스, 뉴욕 미취득.</span>
          </>
        ),
      },
      {
        Icon: TrendingUp,
        label: "Smart Cashtags",
        status: "wip",
        detail: (
          <>
            $BTC 등 티커 태그 → 실시간 차트 + 직접 거래.{" "}
            <span className="text-fg-muted">금융 규제 리스크.</span>
          </>
        ),
      },
      {
        Icon: Coins,
        label: "Stablecoin 통합",
        status: "planned",
        detail: (
          <>
            Stripe(Bridge 인수)와 협력 타진 — 크로스보더 결제·수수료 절감 목적.
          </>
        ),
      },
    ]}
  />
);

Slide.meta = { id: "xcorp", title: "X.corp", section: "03" };
Slide.steps = 1;

export default Slide;
