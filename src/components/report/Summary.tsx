import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { SummaryRadarChart } from './SummaryRadarChart';
import { reportSummaryMock } from '@/lib/mock';

export default function Summary() {
  const { skills, strengths, improvements } = reportSummaryMock;

  return (
    <div className="flex flex-row gap-4">
      <Card className="w-full">
        <CardHeader className="font-semibold">종합 역량 분석</CardHeader>
        <CardContent>
          <SummaryRadarChart skills={skills} />
        </CardContent>
      </Card>
      <div className="flex w-full flex-col gap-4">
        <Card>
          <CardHeader className="flex flex-row gap-2 font-semibold">
            <CheckCircle className="text-green-600" />
            강점 TOP3
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
            개선점 TOP3
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {improvements.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
