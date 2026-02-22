// API 공통 응답 구조
export interface ApiResponse<T> {
  success: boolean;
  code: string;
  data: T;
  meta: {
    requestId: string;
    timestamp: string;
  };
}

// 페이지네이션 정보
export interface PageInfo {
  number: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// 페이지네이션된 응답 데이터
export interface PaginatedData<T> {
  items: T[];
  page: PageInfo;
}

// 면접 리포트 아이템 (목록 조회용)
export interface InterviewReportItem {
  interviewId: string;
  title: string;
  interviewStatus: 'DONE' | 'IN_PROGRESS' | 'PENDING';
  reportStatus: 'done' | 'processing' | 'pending';
  totalScore: number;
  generatedAt: string;
  createdAt: string;
}

// 면접 리포트 목록 조회 응답
export type InterviewReportsResponse = ApiResponse<
  PaginatedData<InterviewReportItem>
>;

// 면접 리포트 목록 조회 파라미터
export interface InterviewReportsParams {
  page?: number;
  size?: number;
}

// ==========================================
// 면접 리포트 상세 조회 타입
// ==========================================

// 역량 항목
export interface Competency {
  key: string;
  label: string;
  level: string;
  score: number;
  comment: string;
}

// 텍스트 패턴 이슈
export interface TextPatternIssue {
  type: string;
  severity: 'WARNING' | 'ERROR' | 'INFO';
  description: string;
  affectedTurnIndexes: number[];
}

// 턴별 점수
export interface PerTurnScore {
  turnIndex: number;
  score: number;
}

// 턴별 코칭 제안
export interface TurnSuggestion {
  turnIndex: number;
  question: string;
  weakness: string;
  suggestion: string;
}

// 턴 하이라이트
export interface TurnHighlight {
  strength: string;
  weakness: string;
  suggestion: string;
}

// 턴 메트릭스
export interface TurnMetrics {
  answerDuration: number;
  isFollowupQuestion: boolean;
}

// 턴 (질문-답변 단위)
export interface Turn {
  turnIndex: number;
  questionType: string;
  questionText: string;
  answerText: string;
  score: number;
  feedback: string;
  highlight: TurnHighlight;
  submittedAt: string;
  metrics: TurnMetrics;
}

// View - Header
export interface ReportViewHeader {
  title: string;
  summary: string;
  generatedAt: string;
}

// View - Summary
export interface ReportViewSummary {
  totalScore: number;
  strengths: string[];
  weaknesses: string[];
  competencies: Competency[];
}

// View - Analysis
export interface ReportViewAnalysis {
  textPatternIssues: TextPatternIssue[];
  perTurnScores: PerTurnScore[];
}

// View - Coaching
export interface ReportViewCoaching {
  actionItems: string[];
  turnSuggestions: TurnSuggestion[];
}

// View - Record
export interface ReportViewRecord {
  turns: Turn[];
}

// Report View (화면 렌더링용)
export interface ReportView {
  header: ReportViewHeader;
  summary: ReportViewSummary;
  analysis: ReportViewAnalysis;
  coaching: ReportViewCoaching;
  record: ReportViewRecord;
}

// Report Result (분석 결과)
export interface ReportResult {
  summary: string;
  strengths: string[];
  weaknesses: string[];
}

// Report 전체
export interface Report {
  status: 'done' | 'processing' | 'pending';
  totalScore: number;
  durationSec: number;
  model: string;
  promptVersion: string;
  generatedAt: string;
  result: ReportResult;
  view: ReportView;
}

// 면접 리포트 상세 데이터
export interface InterviewReportDetail {
  interviewId: string;
  title: string;
  interviewStatus: 'DONE' | 'IN_PROGRESS' | 'PENDING';
  report: Report;
}

// 면접 리포트 상세 조회 응답
export type InterviewReportDetailResponse = ApiResponse<InterviewReportDetail>;
