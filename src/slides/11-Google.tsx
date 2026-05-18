import { Network, Handshake, Lock } from "lucide-react";
import { CompanyShell } from "./_CompanyShell";
import { Highlight } from "@/motion/Highlight";
import { SlideComponent } from "@/deck/types";
import { GoogleLogo } from "@/visuals/Logos";

const Slide: SlideComponent = ({ step }) => (
  <CompanyShell
    index={2}
    total={5}
    brand="Google"
    brandColor="#4285F4"
    tagline="GCUL · 기관 금융 인프라"
    Logo={GoogleLogo}
    headline={
      <>
        코인을 발행하지 않는다 — 대신{" "}
        <Highlight when={step >= 1} color="#4285F4" delay={0.15}>
          중립적 블록체인 레이어
        </Highlight>
        를 차지하는 전략.
      </>
    }
    body={
      <>
        Google Cloud Universal Ledger(GCUL) — Python 기반 Layer-1, 결제 자동화·디지털 자산 관리 특화.
        CME Group과 2025년 3월 1차 통합 테스트 완료, 2026년 상업 출시 목표.
      </>
    }
    pillars={[
      {
        Icon: Network,
        label: "GCUL L1",
        status: "wip",
        detail: (
          <>
            Python 스마트 컨트랙트 · 단일 API 접근.{" "}
            <span className="text-fg-muted">현재 프라이빗 테스트넷.</span>
          </>
        ),
      },
      {
        Icon: Handshake,
        label: "CME Group 파트너십",
        status: "wip",
        detail: (
          <>
            2025.03 1차 통합 테스트 완료 → 2025년 후반 시장 참여자 테스트, 2026년 상업 출시.
          </>
        ),
      },
      {
        Icon: Lock,
        label: "Permissioned",
        detail: (
          <>
            승인형 시스템 — 탈중앙화 커뮤니티 반발 + Google의 \"서비스 종료 패턴\" 신뢰 이슈.
          </>
        ),
      },
    ]}
  />
);

Slide.meta = { id: "google", title: "Google", section: "03" };
Slide.steps = 1;

export default Slide;
