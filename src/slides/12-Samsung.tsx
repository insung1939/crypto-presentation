import { Smartphone, ShieldCheck, Building2 } from "lucide-react";
import { CompanyShell } from "./_CompanyShell";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";
import { SamsungLogo } from "@/visuals/Logos";

const Slide: SlideComponent = ({ step }) => (
  <CompanyShell
    index={3}
    total={5}
    brand="Samsung"
    brandColor="#5b7fd6"
    tagline="디바이스 보안 + 국내 토큰증권 인프라"
    Logo={SamsungLogo}
    headline={
      <>
        하드웨어 보안과 단말 점유율을 바탕으로{" "}
        <Highlight when={step >= 1} color="#5b7fd6" delay={0.15}>
          B2C 지갑 + B2B 토큰증권
        </Highlight>
        을 동시에 노린다.
      </>
    }
    body={
      <>
        갤럭시에 내장된 Blockchain Keystore는 이미 상용화. 동시에 Samsung SDS가 한국예탁결제원(KSD)
        토큰증권 플랫폼 인프라를 수주 — 2027년 2월까지 구축 예정.
      </>
    }
    pillars={[
      {
        Icon: Smartphone,
        label: "Galaxy Wallet",
        status: "live",
        detail: (
          <>
            BTC · ETH · ERC-20 · TRON 지원.{" "}
            <span className="text-fg-muted">MetaMask 대비 인지도는 낮음.</span>
          </>
        ),
      },
      {
        Icon: ShieldCheck,
        label: "TEE + Knox",
        status: "live",
        detail: (
          <>
            개인 키를 하드웨어 보안 영역에서 보호. 생체 인증·PIN으로 거래 승인.
          </>
        ),
      },
      {
        Icon: Building2,
        label: "Samsung SDS × KSD",
        status: "wip",
        detail: (
          <>
            한국예탁결제원 토큰증권 플랫폼 인프라 구축.{" "}
            <span className="text-fg-muted">2027.02 완료 예정.</span>
          </>
        ),
      },
    ]}
  />
);

Slide.meta = { id: "samsung", title: "Samsung", section: "03" };
Slide.steps = 1;

export default Slide;
