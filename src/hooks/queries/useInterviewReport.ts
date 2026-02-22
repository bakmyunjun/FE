import { useQuery } from '@tanstack/react-query';
import { getInterviewReport } from '@/apis/interview';

export const interviewReportKeys = {
  all: ['interviewReport'] as const,
  detail: (interviewId: string) =>
    [...interviewReportKeys.all, interviewId] as const,
};

export function useInterviewReport(interviewId: string) {
  return useQuery({
    queryKey: interviewReportKeys.detail(interviewId),
    queryFn: () => getInterviewReport(interviewId),
    enabled: !!interviewId,
  });
}
