import axiosInstance from './axios';
import type {
  InterviewReportsResponse,
  InterviewReportsParams,
  PaginatedData,
  InterviewReportItem,
  InterviewReportDetailResponse,
  InterviewReportDetail,
} from '@/types/interview';

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
