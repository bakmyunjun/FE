import axiosInstance from './axios';
import type { MainTopicId, SubTopicId } from '@/types/interview';

interface CreateInterviewParams {
  title: string;
  mainTopicId: MainTopicId;
  subTopicIds: SubTopicId[];
}

interface CreateInterviewResponse {
  interviewId: string;
  title: string;
  status: 'IN_PROGRESS' | 'DONE';
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

export async function createInterview(
  params: CreateInterviewParams,
): Promise<CreateInterviewResponse> {
  const { data } = await axiosInstance.post<{
    data: CreateInterviewResponse;
  }>('/interviews', params);

  return data.data;
}
