import axiosInstance from './axios';
import type {
  InterviewReportsResponse,
  InterviewReportsParams,
  PaginatedData,
  InterviewReportItem,
  InterviewReportDetailResponse,
  InterviewReportDetail,
  MainTopicId,
  SubTopicId,
  FaceMetrics,
  VoiceMetrics,
} from '@/types/interview';

// ==========================================
// 면접 진행 API
// ==========================================

interface CreateInterviewParams {
  title: string;
  mainTopicId: MainTopicId;
  subTopicIds: SubTopicId[];
}

interface CreateInterviewResponse {
  interviewId: string;
  title: string;
  status: 'IN_PROGRESS' | 'DONE' | 'FAILED';
  turnIndex: number;
  topics: {
    main: MainTopicId;
    subs: SubTopicId[];
  };
  firstQuestion: {
    questionId: string;
    text: string;
  };
}

interface SubmitTurnParams {
  interviewId: string;
  answerText: string;
  turnIndex: number;
  answerDuration: number;
  faceMetrics: FaceMetrics;
  voiceMetrics: VoiceMetrics;
  isFollowupQuestion: boolean;
}

interface SubmitTurnResponse {
  interviewId: string;
  nextTurnIndex: number;
  status: 'IN_PROGRESS' | 'ANALYZING';
  nextQuestion: {
    questionId: string;
    text: string;
    type: 'base' | 'followup';
  };
  consecutiveFollowupCount: number;
  remainingFollowupCount: number;
}

export async function createInterview(
  params: CreateInterviewParams,
): Promise<CreateInterviewResponse> {
  const { data } = await axiosInstance.post<{
    data: CreateInterviewResponse;
  }>('/interviews', params);

  return data.data;
}

export async function submitTurn(
  params: SubmitTurnParams,
): Promise<SubmitTurnResponse> {
  const { interviewId, ...body } = params;

  const { data } = await axiosInstance.post<{
    data: SubmitTurnResponse;
  }>(`/interviews/${interviewId}/turns`, body);

  return data.data;
}

// ==========================================
// 면접 리포트 API
// ==========================================

/**
 * 면접 리포트 목록 조회
 * GET /interviews/reports
 */
export async function getInterviewReports(
  params: InterviewReportsParams = {},
): Promise<PaginatedData<InterviewReportItem>> {
  const { page = 1, size = 10 } = params;

  const { data } = await axiosInstance.get<InterviewReportsResponse>(
    '/interviews/reports',
    {
      params: { page, size },
    },
  );

  return data.data;
}

/**
 * 면접 리포트 상세 조회
 * GET /interviews/{interviewId}/report
 */
export async function getInterviewReport(
  interviewId: string,
): Promise<InterviewReportDetail> {
  const { data } = await axiosInstance.get<InterviewReportDetailResponse>(
    `/interviews/${interviewId}/report`,
  );

  return data.data;
}
