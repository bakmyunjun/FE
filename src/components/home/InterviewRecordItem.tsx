import type { InterviewReportItem } from '@/types/interview';
import { ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface Props {
  record: InterviewReportItem;
}

// 날짜 포맷팅 (ISO -> yyyy-MM-dd)
function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

// 상태 뱃지 스타일
function getStatusBadge(status: InterviewReportItem['reportStatus']) {
  const styles = {
    done: 'bg-green-100 text-green-700',
    processing: 'bg-yellow-100 text-yellow-700',
    pending: 'bg-gray-100 text-gray-700',
  };
  const labels = {
    done: '완료',
    processing: '분석중',
    pending: '대기중',
  };
  return { style: styles[status], label: labels[status] };
}

export function InterviewRecordItem({ record }: Props) {
  const statusBadge = getStatusBadge(record.reportStatus);

  return (
    <Link to={`/report/${record.interviewId}`}>
      <Card className="p-6 transition-colors hover:bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* 점수 */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-600">
              {Math.round(record.totalScore)}
            </div>

            {/* 타이틀 & 메타 */}
            <div>
              <p className="font-semibold">
                {record.title}
                <span
                  className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge.style}`}
                >
                  {statusBadge.label}
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDate(record.createdAt)}
              </p>
            </div>
          </div>

          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </div>
      </Card>
    </Link>
  );
}
