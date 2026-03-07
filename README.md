## Bakmyunjun Project

> 음성 · 표정 · 답변 내용을 종합 분석하는 AI 기반 모의 면접 서비스

<br />

## ⚙️ Installation

```
pnpm install
pnpm dev
```

<br />

## 👥 Frontend Member

> 이유진 ( @uzzini )

- 로그인 페이지 개발
- 면접 진행 페이지 개발
- 면접 진행 전반적인 플로우 설계 및 구현
- STT 기반 음성 텍스트 변환 기능 구현
- 음성 분석 로직 개발 ( Voice Metrics )
- 얼굴 분석 로직 개발 ( Face Metrics )

<br />

> 이유진 ( @JIN921 )

- 홈 페이지 개발
- 면접 결과 리포트 상세 페이지 개발
- 면접 기록 조회 기능 구현
- 리포트 데이터 UI 구성 및 렌더링

<br />

## 🔐 Authentication Flow

1. OAuth 로그인
2. code → backend 전달
3. JWT 발급
4. Axios Interceptor로 accessToken 자동 갱신

<br />

## 💬 Interview Flow

1. **면접 설정**
   - 리포트 제목 입력
   - 면접 주제 선택 ( Frontend / Backend )

2. **질문 표시**

3. **답변 시작**
   - STT 시작
   - Voice Metrics 분석
   - Face Metrics 분석

4. **답변 종료**

5. **메트릭 계산**

6. **결과 저장**

<br />

## ✨ Key Features

1. 음성 기반 답변 분석
   - Web Speech API 기반 실시간 STT (Speech-to-Text)
   - Web Audio API를 활용한 Voice Metrics 분석
   - 평균 음량, 음성 피치, 발화 시간 등 음성 데이터 수집

2. 표정 분석
   - 웹캠 영상 기반 얼굴 감지 및 표정 분석
   - 표정 분포 데이터 생성 ( 긍정, 부정, 무표정 )

3. 면접 진행 시스템
   - 질문 기반 인터뷰 진행
   - 다음 질문 / 꼬리 질문 선택 가능 ( 꼬리 질문 최대 2회 제공 )
   - 답변 시간 측정 및 데이터 수집

4. 면접 리포트 제공
   - 음성 · 표정 · 답변 데이터를 기반으로 면접 결과 리포트 생성
   - 이전 면접 기록 조회 및 상세 리포트 확인

5. OAuth 기반 인증
   - OAuth 로그인 지원 ( GitHub / Kakao )
   - JWT 기반 인증 관리

<br />

## 📂 Folder Structure

```
src/
 ├─ apis/                 # 서버 API 요청 함수 (axios 기반)
 ├─ assets/               # 이미지, 아이콘 등 정적 리소스
 ├─ components/           # UI 컴포넌트
 │   ├─ home/             # 홈 화면 관련 컴포넌트
 │   ├─ interview/        # 면접 진행 화면 컴포넌트
 │   ├─ layout/           # 공통 레이아웃 (Header, Footer)
 │   ├─ modal/            # 모달 UI 컴포넌트
 │   ├─ report/           # 면접 결과 리포트 화면 컴포넌트
 │   ├─ ui/               # shadcn/ui 기반 공통 UI 컴포넌트
 │   └─ Loader.tsx        # 로딩 상태 표시 컴포넌트
 │
 ├─ hooks/                # 커스텀 React Hooks
 │   ├─ mutations/        # React Query Mutation ( 데이터 생성 / 수정 )
 │   ├─ queries/          # React Query Query ( 데이터 조회 )
 │   ├─ useStartInterview.ts   # 면접 시작 로직
 │   ├─ useInterviewAnswer.ts  # 면접 답변 상태 및 처리 로직
 │   ├─ useSpeechToText.ts     # Web Speech API 기반 음성 → 텍스트 변환
 │   ├─ useVoiceRecorder.ts    # 마이크 녹음 및 오디오 스트림 처리
 │   ├─ useVoiceMetrics.ts     # 음성 데이터 분석 ( pitch, volume 등 )
 │   ├─ useFaceMetrics.ts      # 얼굴 / 표정 분석
 │   └─ useSyncPermissions.tsx # 카메라 · 마이크 권한 상태 동기화
 │
 ├─ lib/                  # 유틸 함수 및 공통 코드
 │
 ├─ pages/                # 라우팅되는 페이지 컴포넌트
 │   ├─ auth/             # OAuth 로그인 및 인증 처리 페이지
 │   ├─ Home.tsx          # 메인 홈 화면
 │   ├─ InterviewPage.tsx # 면접 진행 페이지
 │   ├─ NotFound.tsx      # 404 페이지
 │   └─ ReportPage.tsx    # 면접 결과 리포트 페이지
 │
 ├─ providers/            # 전역 Provider 설정
 ├─ routes/               # 라우터 설정
 ├─ stores/               # 전역 상태 관리 ( Zustand )
 ├─ types/                # TypeScript 타입 정의
 │
 ├─ AppAuthInitializer.tsx # 앱 초기 실행 시 인증 상태 초기화
 └─ main.tsx               # 애플리케이션 진입점
```
