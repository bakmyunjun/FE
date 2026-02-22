import type { Turn } from '@/types/interview';

interface Props {
  turn: Turn;
}

export default function TurnItem({ turn }: Props) {
  return (
    <div className="rounded-lg border p-4">
      {/* 헤더 */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
            {turn.turnIndex}
          </div>
          <div>
            <p className="font-medium">{turn.questionText}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {turn.metrics.answerDuration}초
              {turn.metrics.isFollowupQuestion && ' · 꼬리질문'}
            </p>
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-600">
          {turn.score}
        </div>
      </div>

      {/* 답변 */}
      <div className="mt-3 rounded-md bg-muted/50 p-3">
        <p className="text-sm text-muted-foreground">{turn.answerText}</p>
      </div>

      {/* 피드백 */}
      <div className="mt-3 text-sm">
        <p className="text-muted-foreground">{turn.feedback}</p>
      </div>

      {/* 하이라이트 */}
      <div className="mt-3 grid grid-cols-1 gap-2 text-xs md:grid-cols-3">
        <div className="rounded-md bg-green-50 p-2">
          <span className="font-medium text-green-700">강점:</span>{' '}
          <span className="text-green-600">{turn.highlight.strength}</span>
        </div>
        <div className="rounded-md bg-red-50 p-2">
          <span className="font-medium text-red-700">약점:</span>{' '}
          <span className="text-red-600">{turn.highlight.weakness}</span>
        </div>
        <div className="rounded-md bg-blue-50 p-2">
          <span className="font-medium text-blue-700">제안:</span>{' '}
          <span className="text-blue-600">{turn.highlight.suggestion}</span>
        </div>
      </div>
    </div>
  );
}
