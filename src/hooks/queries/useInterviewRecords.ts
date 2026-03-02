import { useQuery } from '@tanstack/react-query';
import { getInterviewRecords } from '@/apis/interview';

export const interviewRecordsKeys = {
  all: ['interviewRecords'] as const,
};

export function useInterviewRecords() {
  return useQuery({
    queryKey: interviewRecordsKeys.all,
    queryFn: getInterviewRecords,
  });
}
