import type { InterviewRecord } from '@/types/interview';
import { ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface Props {
  record: InterviewRecord;
}

const MAX_TAGS = 2;

export function InterviewRecordItem({ record }: Props) {
  const visibleStrengths = record.strengths.slice(0, MAX_TAGS);
  const visibleImprovements = record.improvements.slice(0, MAX_TAGS);
  const hiddenCount =
    record.strengths.length +
    record.improvements.length -
    visibleStrengths.length -
    visibleImprovements.length;

  return (
    <Link to={`/report/${record.interviewId}`}>
      <Card className="p-6 transition-colors hover:bg-muted/50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            {/* 점수 */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-600">
              {Math.round(record.score)}
            </div>

            {/* 정보 */}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate font-semibold">
                  {record.title || record.date}
                </p>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {record.duration}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {record.questionProgress}
              </p>
            </div>
          </div>

          {/* 강점/개선점 태그 */}
          <div className="flex shrink-0 items-center gap-4">
            <div className="flex max-w-[280px] flex-wrap justify-end gap-1">
              {visibleStrengths.map((strength) => (
                <span
                  key={strength}
                  className="truncate rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                >
                  {strength}
                </span>
              ))}
              {visibleImprovements.map((improvement) => (
                <span
                  key={improvement}
                  className="truncate rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700"
                >
                  {improvement}
                </span>
              ))}
              {hiddenCount > 0 && (
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  +{hiddenCount}
                </span>
              )}
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
