// ==========================================
// API 공통 응답 구조
// ==========================================

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

// ==========================================
// 인터뷰 주제
// ==========================================

export type MainTopicId = 'frontend' | 'backend';

export type SubTopicId =
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'state'
  | 'quality'
  | 'spring'
  | 'nestjs'
  | 'database'
  | 'network'
  | 'auth';

export interface MainTopic {
  id: MainTopicId;
  label: string;
  subTopics: SubTopic[];
}

export interface SubTopic {
  id: SubTopicId;
  label: string;
}

export const INTERVIEW_TOPICS: MainTopic[] = [
  {
    id: 'frontend',
    label: '프론트엔드',
    subTopics: [
      { id: 'javascript', label: 'Javascript' },
      { id: 'typescript', label: 'TypeScript' },
      { id: 'react', label: 'React' },
      { id: 'state', label: '상태 관리' },
      { id: 'quality', label: '최적화 · 품질' },
    ],
  },
  {
    id: 'backend',
    label: '백엔드',
    subTopics: [
      { id: 'spring', label: 'Spring' },
      { id: 'nestjs', label: 'NestJS' },
      { id: 'database', label: '데이터베이스' },
      { id: 'network', label: 'API 설계 · 통신' },
      { id: 'auth', label: '인증 · 보안' },
    ],
  },
];

// ==========================================
// 인터뷰 진행 관련 타입
// ==========================================

export interface InterviewInfo {
  interviewId: string;
  turnIndex: number;
  question: {
    questionId: string;
    text: string;
  };
  questionType: '기본' | '꼬리';
  remainingFollowupCount: number;
}

export type AnswerStatus = 'READY' | 'ANSWERING' | 'ANSWERED';

export type FaceMetrics = {
  detectedFrames: number;
  expressionDistribution: {
    neutral: number;
    smile: number;
    frown: number;
  };
};

export type VoiceMetrics = {
  avgPitch: number;
  avgVolume: number;
  speakingRate: number;
  timeDistribution: {
    speaking: number;
    pause: number;
  };
};

// ==========================================
// 홈 화면 - 면접 기록 목록 조회 타입
// GET /interview/records
// ==========================================

export interface InterviewRecordMetrics {
  logic: number;
  clarity: number;
  eyeContact: number;
  voice: number;
  star: number;
  time: number;
}

export interface InterviewRecord {
  id: number;
  interviewId: string;
  score: number;
  date: string;
  title: string;
  duration: string;
  questionProgress: string;
  strengths: string[];
  improvements: string[];
  metrics: InterviewRecordMetrics;
}

export type InterviewRecordsResponse = ApiResponse<InterviewRecord[]>;

// ==========================================
// 홈 화면 - 점수 추이 차트 타입
// GET /interview/score-trend
// ==========================================

export interface ScoreTrendItem {
  date: string;
  score: number;
}

export type ScoreTrendResponse = ApiResponse<ScoreTrendItem[]>;

// ==========================================
// 리포트 - 종합 역량 분석 타입
// GET /reports/{id}/summary
// ==========================================

export interface ReportSummarySkills {
  logic: number;
  specificity: number;
  delivery: number;
  eyeContact: number;
  voice: number;
  structure: number;
}

export interface ReportSummaryData {
  skills: ReportSummarySkills;
  strengths: string[];
  improvements: string[];
}

export type ReportSummaryResponse = ApiResponse<ReportSummaryData>;

// ==========================================
// 리포트 - 턴별 지표 타입
// GET /reports/{id}/turn-metrics
// ==========================================

export interface ReportTurnMetricItem {
  question: string;
  time: number;
  eyeOff: number;
  silence: number;
}

export type ReportTurnMetricsResponse = ApiResponse<ReportTurnMetricItem[]>;

// ==========================================
// 면접 리포트 목록 조회 타입 (기존)
// ==========================================

export interface InterviewReportItem {
  interviewId: string;
  title: string;
  interviewStatus: 'DONE' | 'IN_PROGRESS' | 'PENDING';
  reportStatus: 'done' | 'processing' | 'pending';
  totalScore: number;
  generatedAt: string;
  createdAt: string;
}

export type InterviewReportsResponse = ApiResponse<
  PaginatedData<InterviewReportItem>
>;

export interface InterviewReportsParams {
  page?: number;
  size?: number;
}

// ==========================================
// 면접 리포트 상세 조회 타입
// ==========================================

export interface Competency {
  key: string;
  label: string;
  level: string;
  score: number;
  comment: string;
}

export interface TextPatternIssue {
  type: string;
  severity: 'WARNING' | 'ERROR' | 'INFO';
  description: string;
  affectedTurnIndexes: number[];
}

export interface PerTurnScore {
  turnIndex: number;
  score: number | null;
}

export interface TurnSuggestion {
  turnIndex: number;
  question: string;
  weakness: string;
  suggestion: string;
}

export interface TurnHighlight {
  strength: string;
  weakness: string;
  suggestion: string;
}

export interface TurnMetrics {
  questionId?: string;
  answerDuration: number;
  isFollowupQuestion: boolean;
  faceMetrics?: FaceMetrics;
  voiceMetrics?: VoiceMetrics;
}

export interface Turn {
  turnIndex: number;
  questionType: string;
  questionText: string;
  answerText: string;
  score: number | null;
  feedback: string | null;
  highlight: TurnHighlight | null;
  submittedAt: string;
  metrics: TurnMetrics;
}

export interface ReportViewHeader {
  title: string;
  summary: string;
  generatedAt: string;
}

export interface ReportViewSummary {
  totalScore: number | null;
  strengths: string[];
  weaknesses: string[];
  competencies: Competency[];
}

export interface ReportViewAnalysis {
  textPatternIssues: TextPatternIssue[];
  perTurnScores: PerTurnScore[];
}

export interface ReportViewCoaching {
  actionItems: string[];
  turnSuggestions: TurnSuggestion[];
}

export interface ReportViewRecord {
  turns: Turn[];
}

export interface ReportView {
  header: ReportViewHeader;
  summary: ReportViewSummary;
  analysis: ReportViewAnalysis;
  coaching: ReportViewCoaching;
  record: ReportViewRecord;
}

export interface ReportResult {
  summary: string;
  strengths: string[];
  weaknesses: string[];
}

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

export interface InterviewReportDetail {
  interviewId: string;
  title: string;
  interviewStatus: 'DONE' | 'IN_PROGRESS' | 'PENDING';
  report: Report;
}

export type InterviewReportDetailResponse = ApiResponse<InterviewReportDetail>;
