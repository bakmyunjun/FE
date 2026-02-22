import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { TurnMetricsChart } from './TurnMetricsChart';
import { useReportTurnMetrics } from '@/hooks/queries/useReportTurnMetrics';

interface Props {
  reportId: number;
}

export default function Analysis({ reportId }: Props) {
  const { data: turnMetrics, isLoading } = useReportTurnMetrics(reportId);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* 턴별 지표 */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 font-semibold">
          <BarChart3 className="h-5 w-5" />
          턴별 지표
        </CardHeader>
        <CardContent>
          {turnMetrics && turnMetrics.length > 0 ? (
            <TurnMetricsChart turnMetrics={turnMetrics} />
          ) : (
            <p className="text-sm text-muted-foreground">
              턴별 지표 데이터가 없습니다.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
