import { CompanyShell } from "./_CompanyShell";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";

const Slide: SlideComponent = ({ step }) => (
  <CompanyShell
    index={3}
    total={5}
    brand="Samsung"
    brandColor="#1428A0"
    tagline="DApp 생태계 · SDK"
    headline={
      <>
        2019년{" "}
        <Highlight when={step >= 1} color="#5b7fd6" delay={0.1}>
          삼성 블록체인 SDK
        </Highlight>
        를 공개 — 디바이스 기반 생태계 주도.
      </>
    }
    body={
      <>
        개방형 협력을 통한 블록체인 생태계 구축. 글로벌 단말 점유율을 활용해
        월렛·하드웨어 보안 영역에서의 분배 우위를 노린다.
      </>
    }
  />
);

Slide.meta = { id: "samsung", title: "Samsung", section: "03" };
Slide.steps = 1;

export default Slide;
