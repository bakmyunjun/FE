import { useQuery } from '@tanstack/react-query';
import { getScoreTrend } from '@/apis/interview';

export const scoreTrendKeys = {
  all: ['scoreTrend'] as const,
};

export function useScoreTrend() {
  return useQuery({
    queryKey: scoreTrendKeys.all,
    queryFn: getScoreTrend,
  });
}
