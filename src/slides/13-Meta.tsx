import { Globe, Users, History } from "lucide-react";
import { CompanyShell } from "./_CompanyShell";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";
import { MetaLogo } from "@/visuals/Logos";

const Slide: SlideComponent = ({ step }) => (
  <CompanyShell
    index={5}
    total={5}
    brand="Meta"
    brandColor="#0866FF"
    tagline="Libra · Diem · 결제 시스템"
    Logo={MetaLogo}
    headline={
      <>
        <Highlight when={step >= 1} color="#0866FF" delay={0.15}>
          좌초된 실험
        </Highlight>
        , 그러나 가능성은 여전.
      </>
    }
    body={
      <>
        과거 Libra·Diem 프로젝트로 글로벌 디지털 화폐를 시도했으나 규제로 중단.
        Facebook·Instagram·WhatsApp의 글로벌 사용자 기반은 여전히 결제·송금 인프라로
        전환될 수 있는 가장 큰 잠재력 중 하나.
      </>
    }
    pillars={[
      {
        Icon: History,
        label: "Libra 실험",
        detail: "2019 발표 · 2022 중단 (규제 압박)",
      },
      {
        Icon: Users,
        label: "30억 MAU",
        detail: "FB·IG·WhatsApp 합산 글로벌 사용자",
      },
      {
        Icon: Globe,
        label: "재시도 가능성",
        detail: "분배력은 여전 · 규제 명확화 시 재진입",
      },
    ]}
  />
);

Slide.meta = { id: "meta", title: "Meta", section: "03" };
Slide.steps = 1;

export default Slide;
