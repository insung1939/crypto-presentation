import { Users, MapPin, Boxes } from "lucide-react";
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
    tagline="Libra 좌초 후 — USDC로 우회"
    Logo={MetaLogo}
    headline={
      <>
        자체 토큰 발행 대신{" "}
        <Highlight when={step >= 1} color="#0866FF" delay={0.15}>
          USDC를 빌려 크리에이터 지급
        </Highlight>
        부터 — 좌초된 실험의 두 번째 챕터.
      </>
    }
    body={
      <>
        과거 Libra·Diem이 규제로 좌초된 후 자체 발행은 포기. 대신 필리핀·콜롬비아 Facebook
        크리에이터를 대상으로 USDC 지급을 시작 — Solana · Polygon 체인 사용,{" "}
        <span className="text-fg">2026년 하반기 론칭 목표</span>.
      </>
    }
    pillars={[
      {
        Icon: Users,
        label: "크리에이터 결제",
        status: "planned",
        detail: (
          <>
            FB 크리에이터에게 USDC 디지털 통화 지급.
            <br />
            <span className="text-fg-muted">2026 하반기 론칭 목표.</span>
          </>
        ),
      },
      {
        Icon: MapPin,
        label: "필리핀 · 콜롬비아",
        status: "planned",
        detail: (
          <>
            은행 인프라가 약한 지역부터 — 송금 마찰 해소가 가장 큰 가치인 곳.
          </>
        ),
      },
      {
        Icon: Boxes,
        label: "Solana + Polygon",
        status: "planned",
        detail: (
          <>
            ETH가 아닌 저수수료 체인 선택 — 소액 결제에 가스비가 치명적.
          </>
        ),
      },
    ]}
  />
);

Slide.meta = { id: "meta", title: "Meta", section: "03" };
Slide.steps = 1;

export default Slide;
