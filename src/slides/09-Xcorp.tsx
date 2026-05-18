import { Layers, Heart, Wallet } from "lucide-react";
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
    tagline="슈퍼앱 · SNS + 송금 + 투자"
    Logo={XLogo}
    headline={
      <>
        SNS · 송금 · 주식 · 암호화폐 투자까지{" "}
        <Highlight when={step >= 1} color="#a78bfa" delay={0.15}>
          하나의 플랫폼으로 통합
        </Highlight>{" "}
        중.
      </>
    }
    body={
      <>
        머스크의 친암호화폐 성향과 PayPal 창업 경험을 고려할 때, 가상자산 결제·송금이
        X 플랫폼 안으로 들어올 가능성이 크다.
      </>
    }
    pillars={[
      {
        Icon: Layers,
        label: "Everything App",
        detail: "SNS·결제·금융을 한 곳에 묶는 슈퍼앱 비전",
      },
      {
        Icon: Heart,
        label: "Pro-crypto",
        detail: "머스크는 BTC·DOGE 등에 일관되게 우호적",
      },
      {
        Icon: Wallet,
        label: "PayPal DNA",
        detail: "결제 시스템 혁신을 이미 한 번 만든 팀",
      },
    ]}
  />
);

Slide.meta = { id: "xcorp", title: "X.corp", section: "03" };
Slide.steps = 1;

export default Slide;
