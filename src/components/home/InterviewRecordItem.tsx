import type { InterviewRecord } from '@/types/interview';
import { ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface Props {
  record: InterviewRecord;
}

export function InterviewRecordItem({ record }: Props) {
  return (
    <Link to={`/report/${record.interviewId}`} state={{ reportId: record.id }}>
      <Card className="p-6 transition-colors hover:bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* 점수 */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-600">
              {Math.round(record.score)}
            </div>

            {/* 정보 */}
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold">{record.title || record.date}</p>
                <span className="text-sm text-muted-foreground">
                  {record.duration}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {record.questionProgress}
              </p>
            </div>
          </div>

          {/* 강점/개선점 태그 */}
          <div className="flex items-center gap-4">
            <div className="flex flex-wrap gap-1">
              {record.strengths.map((strength) => (
                <span
                  key={strength}
                  className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                >
                  {strength}
                </span>
              ))}
              {record.improvements.map((improvement) => (
                <span
                  key={improvement}
                  className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700"
                >
                  {improvement}
                </span>
              ))}
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
