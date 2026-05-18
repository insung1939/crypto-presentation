import { Radio, CreditCard, ShieldCheck } from "lucide-react";
import { CompanyShell } from "./_CompanyShell";
import { Underline } from "@/motion/Underline";
import { SlideComponent } from "@/deck/types";
import { AppleLogo } from "@/visuals/Logos";

const Slide: SlideComponent = ({ step }) => (
  <CompanyShell
    index={4}
    total={5}
    brand="Apple"
    brandColor="#d4d4d8"
    tagline="결제 인프라 개방 · 간접 진입"
    Logo={AppleLogo}
    headline={
      <>
        2024년 iOS 18.1부터 NFC가 개방되면서, 개발자들이{" "}
        <Underline when={step >= 1} color="#ffffff" delay={0.15}>
          Apple Pay 위에 스테이블코인 결제
        </Underline>
        를 얹을 수 있게 됐다.
      </>
    }
    body={
      <>
        직접 코인을 만들지는 않지만, 20억 이상의 디바이스 점유율 자체가 가장 큰 무기. Apple Pay 인프라
        위에서 서드파티가 USDC·EURC를 결제 수단으로 연결하는 방식.
      </>
    }
    pillars={[
      {
        Icon: Radio,
        label: "NFC 개방",
        status: "live",
        detail: (
          <>
            iOS 18.1 (2024) — 외부 개발자가 NFC 직접 접근.
            <br />
            <span className="text-fg-muted">EU 규제 압박에 따른 개방.</span>
          </>
        ),
      },
      {
        Icon: CreditCard,
        label: "Apple Pay × Mesh",
        status: "live",
        detail: (
          <>
            소비자: 원하는 크립토로 결제 / 가맹점: 원하는 스테이블코인으로 정산.
          </>
        ),
      },
      {
        Icon: ShieldCheck,
        label: "Secure Enclave",
        status: "live",
        detail: (
          <>
            하드웨어 보안 — 단, 직접 크립토 서비스 부재 + 보수적 접근으로 선도 포지션 한계.
          </>
        ),
      },
    ]}
  />
);

Slide.meta = { id: "apple", title: "Apple", section: "03" };
Slide.steps = 1;

export default Slide;
