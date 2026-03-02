import { useQuery } from '@tanstack/react-query';
import { getInterviewReports } from '@/apis/interview';
import type { InterviewReportsParams } from '@/types/interview';

export const interviewReportsKeys = {
  all: ['interviewReports'] as const,
  list: (params: InterviewReportsParams) =>
    [...interviewReportsKeys.all, params] as const,
};

export function useInterviewReports(params: InterviewReportsParams = {}) {
  return useQuery({
    queryKey: interviewReportsKeys.list(params),
    queryFn: () => getInterviewReports(params),
  });
}
