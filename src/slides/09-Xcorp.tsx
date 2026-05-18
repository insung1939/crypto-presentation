import { CompanyShell } from "./_CompanyShell";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";

const Slide: SlideComponent = ({ step }) => (
  <CompanyShell
    index={1}
    total={5}
    brand="X.corp"
    brandColor="#ffffff"
    tagline="슈퍼앱 · SNS + 송금 + 투자"
    headline={
      <>
        SNS·송금·주식·암호화폐 투자까지{" "}
        <Highlight when={step >= 1} color="#ffffff" delay={0.1}>
          하나의 플랫폼
        </Highlight>
        으로 통합 중.
      </>
    }
    body={
      <>
        머스크의 친암호화폐 성향과 PayPal 창업 경험을 고려할 때,
        가상자산 결제·송금이 X 플랫폼 안으로 들어올 가능성이 높다.
      </>
    }
  />
);

Slide.meta = { id: "xcorp", title: "X.corp", section: "03" };
Slide.steps = 1;

export default Slide;
