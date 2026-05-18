import { CompanyShell } from "./_CompanyShell";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";

const Slide: SlideComponent = ({ step }) => (
  <CompanyShell
    index={5}
    total={5}
    brand="Meta"
    brandColor="#0866FF"
    tagline="Libra · Diem · 결제 시스템"
    headline={
      <>
        <Highlight when={step >= 1} color="#0866FF" delay={0.1}>
          좌초된 실험
        </Highlight>
        , 그러나 가능성은 여전.
      </>
    }
    body={
      <>
        과거 Libra·Diem 프로젝트로 글로벌 디지털 화폐를 시도했으나 규제로 중단.
        다만 Facebook·Instagram·WhatsApp의 글로벌 사용자 기반은 여전히
        결제·송금 인프라로 전환될 수 있는 가장 큰 잠재력 중 하나.
      </>
    }
  />
);

Slide.meta = { id: "meta", title: "Meta", section: "03" };
Slide.steps = 1;

export default Slide;
