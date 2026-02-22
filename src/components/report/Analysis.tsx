import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MessagesSquare, BarChart3 } from 'lucide-react';
import TextPatternItem from '@/components/report/component/TextPatternItem';
import { TurnMetricsChart } from './TurnMetricsChart';
import type { ReportViewAnalysis } from '@/types/interview';

interface Props {
  analysis: ReportViewAnalysis;
}

export default function Analysis({ analysis }: Props) {
  const { textPatternIssues, perTurnScores } = analysis;

  return (
    <div className="flex flex-col gap-6">
      {/* 텍스트 패턴 분석 */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 font-semibold">
          <MessagesSquare className="h-5 w-5" />
          텍스트 패턴 분석
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {textPatternIssues.length > 0 ? (
            textPatternIssues.map((issue, index) => (
              <TextPatternItem
                key={index}
                title={issue.type}
                description={issue.description}
                example={`관련 질문: ${issue.affectedTurnIndexes.map((i) => `Q${i}`).join(', ')}`}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              특이 패턴이 발견되지 않았습니다.
            </p>
          )}
        </CardContent>
      </Card>

      {/* 턴별 점수 */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 font-semibold">
          <BarChart3 className="h-5 w-5" />
          턴별 점수
        </CardHeader>
        <CardContent>
          {perTurnScores.length > 0 ? (
            <TurnMetricsChart perTurnScores={perTurnScores} />
          ) : (
            <p className="text-sm text-muted-foreground">
              턴별 점수 데이터가 없습니다.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
