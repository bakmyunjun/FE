import { useQuery } from '@tanstack/react-query';
import { getReportTurnMetrics } from '@/apis/interview';

export const reportTurnMetricsKeys = {
  all: ['reportTurnMetrics'] as const,
  detail: (reportId: number) =>
    [...reportTurnMetricsKeys.all, reportId] as const,
};

export function useReportTurnMetrics(reportId: number) {
  return useQuery({
    queryKey: reportTurnMetricsKeys.detail(reportId),
    queryFn: () => getReportTurnMetrics(reportId),
    enabled: reportId > 0,
  });
}
