import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';

type Quality = '좋음' | '보통';

const badgeVariant: Record<Quality, string> = {
  좋음: 'bg-amber-100 text-amber-700',
  보통: 'bg-blue-100 text-blue-700',
};

export default function Coaching() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="font-semibold">꼬리 질문 품질 분석</CardHeader>

        <CardContent className="flex flex-col gap-3">
          <QuestionItem
            question="그 경험에서 가장 어려웠던 점은 무엇이었나요?"
            description="구체적인 어려움과 해결 과정을 도출하여 문제 해결 능력 평가"
          />

          <QuestionItem
            question="그때 다르게 행동했다면 어떻게 했을까요?"
            description="성찰 능력과 개선 의지를 파악하는 효과적인 질문"
          />

          <QuestionItem
            question="약점을 극복하기 위해 어떤 노력을 하고 있나요?"
            description="자기 개발 의지를 확인할 수 있으나, 더 구체적인 계획 유도 가능"
            quality="좋음"
          />

          <QuestionItem
            question="그 목표를 달성하기 위한 구체적인 계획이 있나요?"
            description="목표 지향성을 평가하나, 실행 가능성 검증 질문 추가 필요"
            quality="좋음"
          />

          <QuestionItem
            question="입사 후 가장 먼저 하고 싶은 일은 무엇인가요?"
            description="열정을 확인할 수 있으나, 회사에 대한 이해도를 더 깊게 평가하는 질문 권장"
            quality="보통"
          />
        </CardContent>
      </Card>
    </div>
  );
}
