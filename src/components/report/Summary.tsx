import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function Summary() {
  return (
    <div className="flex flex-row gap-4">
      <Card className="w-full">
        <CardHeader className="font-semibold">종합 역량 분석</CardHeader>
        <CardContent>
          <div className="h-[240px] rounded-md bg-gray-100" />
        </CardContent>
      </Card>
      <div className="flex w-full flex-col gap-4">
        <Card>
          <CardHeader className="flex flex-row gap-2 font-semibold">
            <CheckCircle />
            강점 TOP3
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• 아주 잘합니다</li>
              <li>• 대박 잘합니다</li>
              <li>• 님은 최고예요</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row gap-2 font-semibold">
            <CheckCircle />
            개선점 TOP3
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                • 꾸준한 연습이 중요합니다. 일주일에 2–3회 연습을 권장합니다.
              </li>
              <li>• 과거 세션을 복습하며 개선점을 확인하세요.</li>
              <li>• 점수보다는 구체적인 피드백에 집중하세요.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
