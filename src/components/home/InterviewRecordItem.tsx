import type { InterviewRecord } from '@/lib/mock';
import { ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Metric from '@/components/home/InterviewMetric';
import TagSection from '@/components/home/InterviewTagSection';

interface Props {
  record: InterviewRecord;
}

export function InterviewRecordItem({ record }: Props) {
  return (
    <Card className="p-6">
      {/* 상단 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* 점수 */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-lg font-bold text-amber-600">
            {record.score}
          </div>

          {/* 타이틀*/}
          <div>
            <p className="font-semibold">
              {record.date}
              <span className="ml-2 text-sm font-medium text-muted-foreground">
                · {record.duration}
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              {record.questionProgress}
            </p>
          </div>
        </div>

        <ChevronRight className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* 강점, 개선점 */}
      <div className="mt-5 grid grid-cols-2 gap-8">
        <TagSection title="강점" tags={record.strengths} variant="strength" />
        <TagSection
          title="개선점"
          tags={record.improvements}
          variant="improvement"
        />
      </div>

      {/* 하단 지표 */}
      <div className="mt-6 border-t pt-4">
        <div className="grid grid-cols-6 gap-4 text-center">
          <Metric label="논리" value={record.metrics.logic} />
          <Metric label="구체성" value={record.metrics.clarity} />
          <Metric label="시선" value={record.metrics.eyeContact} />
          <Metric label="목소리" value={record.metrics.voice} />
          <Metric label="STAR" value={record.metrics.star} />
          <Metric label="시간" value={record.metrics.time} />
        </div>
      </div>
    </Card>
  );
}
