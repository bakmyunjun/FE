import { useQuery } from '@tanstack/react-query';
import { getReportSummary } from '@/apis/interview';

export const reportSummaryKeys = {
  all: ['reportSummary'] as const,
  detail: (reportId: number) => [...reportSummaryKeys.all, reportId] as const,
};

export function useReportSummary(reportId: number) {
  return useQuery({
    queryKey: reportSummaryKeys.detail(reportId),
    queryFn: () => getReportSummary(reportId),
    enabled: reportId > 0,
  });
}
