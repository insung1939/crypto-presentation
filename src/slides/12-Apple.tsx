import { CompanyShell } from "./_CompanyShell";
import { Underline } from "@/motion/Underline";
import { SlideComponent } from "@/deck/types";

const Slide: SlideComponent = ({ step }) => (
  <CompanyShell
    index={4}
    total={5}
    brand="Apple"
    brandColor="#A1A1A6"
    tagline="결제 + 지갑"
    headline={
      <>
        BitPay 카드를 통해 Apple Pay에서{" "}
        <Underline when={step >= 1} color="#ffffff" delay={0.1}>
          BTC · USDC 간접 결제
        </Underline>{" "}
        가능.
      </>
    }
    body={
      <>
        직접 가상자산 사업은 보수적이지만, Apple Pay·Wallet 결제 인프라의
        지배력 자체가 가장 큰 자산. EU 규제로 NFC가 개방되면 진입 폭이 더 커진다.
      </>
    }
  />
);

Slide.meta = { id: "apple", title: "Apple", section: "03" };
Slide.steps = 1;

export default Slide;
