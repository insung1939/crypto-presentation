import { CompanyShell } from "./_CompanyShell";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";

const Slide: SlideComponent = ({ step }) => (
  <CompanyShell
    index={2}
    total={5}
    brand="Google"
    brandColor="#4285F4"
    tagline="블록체인 인프라 · Cloud"
    headline={
      <>
        코인을 발행하지 않는다 — 대신{" "}
        <Highlight when={step >= 1} color="#4285F4" delay={0.1}>
          블록체인 운영 인프라
        </Highlight>
        를 제공한다.
      </>
    }
    body={
      <>
        Google Cloud의 Blockchain Node Engine 등 B2B 인프라가 핵심.
        직접 코인을 만들기보다, 시장 전체의 인프라 레이어를 차지하는 전략.
      </>
    }
  />
);

Slide.meta = { id: "google", title: "Google", section: "03" };
Slide.steps = 1;

export default Slide;
