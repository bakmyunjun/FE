import axiosInstance from './axios';
import type {
  MainTopicId,
  SubTopicId,
  FaceMetrics,
  VoiceMetrics,
} from '@/types/interview';

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
