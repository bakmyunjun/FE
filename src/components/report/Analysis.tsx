import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { EyeIcon, MessagesSquare, Volume2 } from 'lucide-react';
import ProgressRow from '@/components/report/component/ProgressRow';
import TextPatternItem from '@/components/report/component/TextPatternItem';
import { Progress } from '@/components/ui/progress';

export default function Analysis() {
  return (
    <div className="flex flex-col gap-6">
      {/* 텍스트 패턴 분석 */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 font-semibold">
          <MessagesSquare className="h-5 w-5" />
          텍스트 패턴 분석
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <TextPatternItem
            title="STAR 기법 누락"
            description="일부 답변에서 결과(Result) 부분이 명확하지 않음"
            example="질문 3, 7번에서 행동 후 결과 미언급"
          />
          <TextPatternItem
            title="근거 부족"
            description="주장에 대한 구체적인 데이터나 사례가 부족"
            example="“많은 경험” → 구체 횟수나 기간 필요"
          />
          <TextPatternItem
            title="중복 표현"
            description="특정 어휘가 반복적으로 사용됨"
            example="“그래서”, “것 같습니다” 과다 사용 (평균 5회/답변)"
          />
        </CardContent>
      </Card>

      {/* 비언어 / 음성 경향 요약 */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-2 font-semibold">
          <EyeIcon className="h-5 w-5" />
          비언어 / 음성 경향 요약
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* 비언어 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-medium">
              <EyeIcon className="h-4 w-4" />
              시선 이동률
            </div>
            <Progress
              value={68}
              className="w-full bg-muted"
              indicatorClassName="bg-emerald-500"
            />

            <p className="text-xs text-muted-foreground">
              이동이 잦은 구간: 질문 3, 7, 9
            </p>

            <ProgressRow label="깜빡임 패턴" value="분당 18회 (정상)" />
            <ProgressRow label="고개 움직임" value="적절, 긴장도 보통" />
          </div>

          {/* 음성 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-medium">
              <Volume2 className="h-4 w-4" />
              음성 분석
            </div>

            <ProgressRow label="피치 중앙값" value="215 Hz" />
            <ProgressRow label="피치 범위" value="68 Hz" />
            <ProgressRow label="피치 변동성" value="28.0%" />

            <div>
              <ProgressRow label="침묵 비율" value="15%" />
              <Progress
                value={25}
                className="w-full bg-muted"
                indicatorClassName="bg-blue-500"
              />
            </div>
          </div>
          {/* 턴별 지표 */}
          <div className="space-y-3">
            <div className="font-medium">턴별 지표</div>
            <div className="h-[240px] rounded-md bg-muted" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
