import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { SummaryRadarChart } from './SummaryRadarChart';
import type { ReportViewSummary } from '@/types/interview';

interface Props {
  summary: ReportViewSummary;
}

export default function Summary({ summary }: Props) {
  const { strengths, weaknesses, competencies } = summary;

  return (
    <div className="flex flex-row gap-4">
      <Card className="w-full">
        <CardHeader className="font-semibold">종합 역량 분석</CardHeader>
        <CardContent>
          <SummaryRadarChart competencies={competencies} />
        </CardContent>
      </Card>
      <div className="flex w-full flex-col gap-4">
        <Card>
          <CardHeader className="flex flex-row gap-2 font-semibold">
            <CheckCircle className="text-green-600" />
            강점
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {strengths.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row gap-2 font-semibold">
            <CheckCircle className="text-red-700" />
            개선점
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {weaknesses.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
