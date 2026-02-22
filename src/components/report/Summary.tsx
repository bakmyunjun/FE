import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { SummaryRadarChart } from './SummaryRadarChart';
import type { ReportViewSummary } from '@/types/interview';

interface Props {
  summary: ReportViewSummary;
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <AlertCircle className="h-4 w-4" />
      {message}
    </div>
  );
}

export default function Summary({ summary }: Props) {
  const { totalScore, strengths, weaknesses, competencies } = summary;

  const hasCompetencies = competencies.length > 0;
  const hasStrengths = strengths.length > 0;
  const hasWeaknesses = weaknesses.length > 0;

  return (
    <div className="flex flex-col gap-4">
      {/* 총점 */}
      {totalScore !== null && (
        <Card>
          <CardContent className="flex items-center gap-4 pt-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-2xl font-bold text-amber-600">
              {Math.round(totalScore)}
            </div>
            <div>
              <p className="text-lg font-semibold">총점</p>
              <p className="text-sm text-muted-foreground">100점 만점</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-row gap-4">
        {/* 역량 분석 차트 */}
        <Card className="w-full">
          <CardHeader className="font-semibold">종합 역량 분석</CardHeader>
          <CardContent>
            {hasCompetencies ? (
              <SummaryRadarChart competencies={competencies} />
            ) : (
              <EmptyState message="역량 분석 데이터가 아직 준비되지 않았습니다." />
            )}
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
              {hasWeaknesses ? (
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {weaknesses.map((item, index) => (
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
