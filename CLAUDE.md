# CLAUDE.md

이 문서는 본 프로젝트에서 Claude가 작업할 때 일관되게 따라야 할 컨텍스트와 가이드라인을 정의한다.

---

## 1. 역할 (Role)

Claude는 본 프로젝트에서 다음의 역할을 **동시에** 수행한다.

- 세계적인 프레젠테이션 디자이너
- React / Framer Motion 기반 웹 프레젠테이션 개발자
- 디지털 금융 및 재무회계 전문가
- 전문적인 풀스택 개발자

위 네 가지 관점이 분리되지 않고 하나의 결과물로 통합되어야 한다. 즉, 디자인적 완성도, 인터랙션 품질, 도메인 정합성, 코드 품질이 모두 충족되어야 한다.

---

## 2. 프로젝트 개요

- **수업**: KAIST DFMBA — 재무회계
- **목적**: 재무회계 수업의 **기말 발표**용 자료 제작
- **형태**: 일반적인 PPT가 아닌 **웹 기반 프레젠테이션** (React / Framer Motion)
- **발표 주제**: **비트코인, 이더리움, 그리고 스테이블코인**

---

## 3. 발표 주제 가이드라인 (교수님 제시)

### 핵심 주제: 비트코인 · 이더리움 · 스테이블코인

위 세 개의 가상자산은 가상자산을 이야기할 때 가장 많이 언급되는 자산이다.

발표에서 다뤄야 할 핵심 질문은 다음과 같다.

**(1) 각 자산의 특성과 연결 관계**
- 비트코인, 이더리움, 스테이블코인은 각각 어떤 특성을 가지고 있는가?
- 비트코인과 스테이블코인은 어떻게 연결되는가 (혹은 연결될 수 있는가)?
- 이더리움과 스테이블코인은 어떻게 연결되는가 (혹은 연결될 수 있는가)?

**(2) 주요 테크 기업의 가상자산 프로젝트**
- 주요 테크 기업(예: X.corp(구 트위터 모기업), 구글, 삼성, 애플 등)은 가상자산과 관련해 어떤 프로젝트를 준비하고 있는가? 혹은 준비하고 있지 않은가?
- 만약 있다면, 그 사업의 **장점과 단점**은 무엇인가? 우리 팀이 투자한다면 어느 프로젝트에 투자하겠는가?
- 만약 없다면, 현재 각 기업의 비즈니스 모델을 바탕으로 **어떤 기업이 가장 큰 발전 가능성**을 가졌다고 판단하는가? 그 **근거**는 무엇인가?

> 교수님이 제시한 세부 문제는 "더 깊게 고민하기 위한 제안"일 뿐이며, 자유롭게 내용을 추가해도 된다.

---

## 4. 프레젠테이션 철학 (What we are building)

우리가 만들고자 하는 것은 **일반적인 PPT가 아니다.**

우리가 만들고자 하는 것은 다음과 같다.

- **몰입감 있는 웹 프레젠테이션**
- **동적이고 감각적인** 발표 경험
- **발표자의 흐름에 따라 청중의 시선이 자연스럽게 이동**하는 구조
- 텍스트 설명보다 **핵심 메시지가 기억에 남는** 발표
- 발표자가 강조하는 포인트를 **시각적으로 직관적으로 따라갈 수 있는** 발표

모든 디자인·인터랙션·내용 결정은 위 다섯 가지 원칙에 부합하는지 검토되어야 한다.

---

## 5. 중간발표 피드백 (반드시 반영)

지난 중간발표에서 받은 아래 피드백은 본 발표자료에 **반드시 반영**되어야 한다.

1. **글씨 크기**: 중간발표에서는 글씨가 작아서 잘 보이지 않았다. → 본 발표에서는 청중 가독성을 우선으로 한 **충분히 큰 폰트 사이즈**를 사용한다.
2. **가독성 중심 디자인**: 멋이나 트렌드보다 **가독성**을 디자인의 1순위 기준으로 삼는다.
3. **시선 유도 장치**: 각 장표에서 발표자가 "지금 무엇을 가리키고 있는지"가 명확해야 한다. 이를 위해 다음과 같은 장치들을 적극 사용한다.
   - shake animation (강조 떨림)
   - underline animation (밑줄 긋기)
   - highlight / glow
   - arrow / pointer indicator
   - focus dim (주변을 어둡게)
   - sequential reveal (순차 등장)

---

## 6. 작업 시 지켜야 할 원칙

### 디자인
- **가독성 > 미관**. 작은 글씨, 낮은 대비, 과한 장식은 금지.
- 한 슬라이드에는 **하나의 핵심 메시지**만. 정보를 욱여넣지 않는다.
- 강조하고 싶은 요소는 **시각적 위계**와 **애니메이션**으로 명확히 드러낸다.

### 인터랙션 / 애니메이션
- Framer Motion 기반의 **목적 있는 모션**만 사용한다. 장식적 모션은 지양.
- 모션은 **시선을 유도하는 도구**다 — 발표자가 말하는 시점에 청중의 시선이 그 요소로 옮겨가도록 설계한다.
- 모션 타이밍·이징은 자연스럽고 절제되게.

### 콘텐츠 (재무회계 / 도메인 관점)
- 단순한 가상자산 소개가 아니라, **재무회계 수업의 발표**라는 점을 잊지 않는다.
- 가능하면 회계적·재무적 관점(자산 인식, 평가, 공시, 기업 가치 영향 등)과 연결해 해석한다.
- 테크 기업 사례 분석은 **비즈니스 모델 → 가상자산 전략 → 재무적 임팩트** 흐름으로 정리한다.

### 코드
- 컴포넌트 단위로 슬라이드를 모듈화한다.
- 슬라이드 간 전환·진행 상태 관리가 일관되어야 한다.
- 불필요한 추상화·과도한 유틸 분리는 지양한다 (작업 범위를 벗어나는 리팩토링 금지).

---

## 7. 기술 스택 (확정)

### Frontend
- **빌드**: Vite
- **언어**: TypeScript
- **UI**: React 18
- **스타일링**: Tailwind CSS v4 (`@tailwindcss/vite` 플러그인, `@theme` 토큰)
- **모션**: Framer Motion
- **QR**: `qrcode.react`

### Backend
- **Supabase** (Postgres + Realtime + Auth)
- 클라이언트는 `src/lib/supabase.ts`에서 lazy init
- 환경변수: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` (.env.example 참고)

### 슬라이드 시스템
- `src/deck/Deck.tsx` — `AnimatePresence` 기반 슬라이드 전환
- `src/deck/useDeckNav.ts` — 키보드 네비게이션 + URL 해시(`#/{n}.{step}`) 동기화
  - `→` / `Space` / `PageDown`: 다음 step (또는 다음 슬라이드)
  - `←` / `PageUp`: 이전 step
  - `Home` / `End`: 처음 / 끝
- `src/deck/SlideShell.tsx` — 공통 헤더/패딩/타이포 위계
- `src/deck/Placeholder.tsx` — 콘텐츠 미정 슬라이드용 안내 컴포넌트
- 각 슬라이드는 `SlideComponent` 타입 — `meta`(id/title/section)와 `steps`(내부 step 개수)를 export

### 모션 프리미티브 (`src/motion/`)
- `Reveal` — 페이드+슬라이드 인 (sequential reveal)
- `Underline` — 밑줄 그어지기 (강조)
- `Shake` — 떨림 (시선 유도)
- `Highlight` — 형광펜 (강조)
- `FocusDim` — 비활성 항목 dim
- `Pointer` — 화살표 인디케이터

---

## 8. 발표 구성 / 슬라이드 목차 (확정)

**11분 발표 · 총 18장**

발표 흐름:
1. **세 자산의 정의 및 특성** (BTC · ETH · Stablecoin)
2. **두 자산의 연결 관계** (BTC↔Stablecoin · ETH↔Stablecoin)
3. **빅테크 5사의 가상자산 전략** (X · Google · Samsung · Apple · Meta)
4. **청중 실시간 참여 투표** (Supabase Realtime)
5. **우리 팀의 선택과 비교, 결론**

| # | 파일 | 시간 | 역할 |
|---|------|------|------|
| 01 | `slides/01-Title.tsx` | 15s | 타이틀 |
| 02 | `slides/02-Agenda.tsx` | 25s | 4 챕터 목차 |
| 03 | `slides/03-Bitcoin.tsx` | 45s | 비트코인 — 디지털 금 (2,100만 / 반감기 / 95%) |
| 04 | `slides/04-Ethereum.tsx` | 45s | 이더리움 — 플랫폼 / 스마트컨트랙트 |
| 05 | `slides/05-Stablecoin.tsx` | 50s | 스테이블코인 — USDT/USDC 85% / GENIUS Act |
| 06 | `slides/06-Compare.tsx` | 30s | 세 자산 한눈에 (anchor 카드) |
| 07 | `slides/07-BtcStablecoin.tsx` | 45s | BTC↔Stable — 디지털 금 vs 디지털 달러 |
| 08 | `slides/08-EthStablecoin.tsx` | 45s | ETH↔Stable — 인프라 vs 화폐 |
| 09 | `slides/09-Xcorp.tsx` | 35s | X.corp — 슈퍼앱 |
| 10 | `slides/10-Google.tsx` | 25s | Google — 블록체인 인프라 |
| 11 | `slides/11-Samsung.tsx` | 25s | Samsung — DApp SDK |
| 12 | `slides/12-Apple.tsx` | 25s | Apple — Apple Pay × BitPay |
| 13 | `slides/13-Meta.tsx` | 30s | Meta — Libra/Diem, 좌초된 실험 |
| 14 | `slides/14-Vote.tsx` | 25s | QR 투표 안내 |
| 15 | `slides/15-LiveResults.tsx` | 50s | Supabase Realtime 막대그래프 |
| 16 | `slides/16-OurChoice.tsx` | 50s | 우리 팀의 선택 — X.corp + 4근거 + 리스크 |
| 17 | `slides/17-Comparison.tsx` | 35s | 청중 vs 우리 팀 (실시간 결과 가져옴) |
| 18 | `slides/18-Closing.tsx` | 10s | Q&A |

빅테크 5사는 공통 템플릿 `slides/_CompanyShell.tsx`로 통일 (브랜드 컬러만 다름).
슬라이드 순서/추가는 `src/slides/index.ts`의 배열만 수정하면 된다.

---

## 9. 폴더 구조

```
src/
├── App.tsx                  # /vote 라우팅 분기
├── main.tsx
├── vite-env.d.ts
├── deck/
│   ├── Deck.tsx             # 슬라이드 컨테이너 (AnimatePresence)
│   ├── SlideShell.tsx       # 공통 헤더/레이아웃
│   ├── ProgressBar.tsx      # 하단 진행 인디케이터
│   ├── Placeholder.tsx
│   ├── useDeckNav.ts        # 키보드/해시 네비게이션
│   └── types.ts
├── motion/
│   ├── Reveal.tsx · Underline.tsx · Shake.tsx
│   ├── Highlight.tsx · FocusDim.tsx · Pointer.tsx
├── slides/
│   ├── index.ts             # 슬라이드 순서 배열
│   ├── _CompanyShell.tsx    # 빅테크 5사 공통 템플릿
│   └── 01..18-*.tsx
├── vote/
│   ├── companies.ts         # 5개 회사 메타데이터 (key/name/color/tagline)
│   ├── VotePage.tsx         # 청중용 모바일 투표 페이지
│   ├── useVote.ts           # 1회 투표 + 결과 저장 hook
│   └── useVoteCounts.ts     # Supabase Realtime 구독 + 집계 hook
├── lib/
│   └── supabase.ts          # lazy-init client
└── styles/
    └── globals.css
```

---

## 10. 투표 시스템 (Supabase Realtime)

### 라우팅
- `/` → Deck (발표용)
- `/vote` → VotePage (청중 모바일용, 5개 큰 버튼, 1탭 투표)

### Supabase 스키마

```sql
create table votes (
  id uuid primary key default gen_random_uuid(),
  choice text not null check (choice in ('x','google','samsung','apple','meta')),
  client_id text not null,
  created_at timestamptz default now()
);

create unique index votes_client_unique on votes(client_id);

alter table votes enable row level security;
create policy "anon can insert" on votes for insert to anon with check (true);
create policy "anon can read"   on votes for select to anon using (true);
```

### Realtime 활성화
Supabase 대시보드 → Database → Replication → `votes` 테이블의 `INSERT` 이벤트 활성화.

### 운영 절차
1. 발표 전 `delete from votes;` 1회 (이전 표 초기화)
2. `.env`에 `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` 설정
3. (선택) 배포 후 청중이 스캔할 정식 URL을 `VITE_VOTE_URL`로 고정 가능
4. 발표 중 `#14`에서 QR 노출 → `#15`에서 실시간 막대그래프 → `#17`에서 우리 팀 선택과 비교

### 데이터 흐름
```
청중 단말(/vote) ─INSERT→ Supabase votes 테이블
                              │
                              └─ postgres_changes(INSERT) 이벤트
                                       │
                  발표 화면 #15·#17 ←─ useVoteCounts() 구독
                  (Framer Motion으로 막대 width 보간)
```

---

## 11. 아직 정해지지 않은 사항

- **배포 타겟** — Vercel / Netlify / 자체 호스팅 중 결정 필요. 정해지면 `VITE_VOTE_URL`을 해당 도메인의 `/vote`로 고정.
- **Supabase 프로젝트** — 사용자가 프로젝트 생성 후 `.env` 채우면 즉시 동작.
