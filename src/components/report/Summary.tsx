import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { SummaryRadarChart } from './SummaryRadarChart';
import { useReportSummary } from '@/hooks/queries/useReportSummary';

interface Props {
  reportId: number;
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <AlertCircle className="h-4 w-4" />
      {message}
    </div>
  );
}

export default function Summary({ reportId }: Props) {
  const { data: summary, isLoading } = useReportSummary(reportId);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">로딩 중...</p>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">
          종합 역량 분석 데이터를 불러올 수 없습니다.
        </p>
      </div>
    );
  }

  const { skills, strengths, improvements } = summary;

  const hasStrengths = strengths.length > 0;
  const hasImprovements = improvements.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        {/* 역량 분석 차트 */}
        <Card className="w-full">
          <CardHeader className="font-semibold">종합 역량 분석</CardHeader>
          <CardContent>
            <SummaryRadarChart skills={skills} />
          </CardContent>
        </Card>

        {/* 강점/개선점 */}
        <div className="flex w-full flex-col gap-4">
          <Card>
            <CardHeader className="flex flex-row gap-2 font-semibold">
              <CheckCircle className="text-green-600" />
              강점
            </CardHeader>
            <CardContent>
              {hasStrengths ? (
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {strengths.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              ) : (
                <EmptyState message="강점 분석이 아직 준비되지 않았습니다." />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row gap-2 font-semibold">
              <CheckCircle className="text-red-700" />
              개선점
            </CardHeader>
            <CardContent>
              {hasImprovements ? (
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {improvements.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              ) : (
                <EmptyState message="개선점 분석이 아직 준비되지 않았습니다." />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
