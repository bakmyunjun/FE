import type { Turn } from '@/types/interview';

interface Props {
  turn: Turn;
}

export default function TurnItem({ turn }: Props) {
  const hasFeedback = turn.feedback !== null;
  const hasHighlight = turn.highlight !== null;
  const questionTypeLabel =
    turn.questionType === 'followup' ? '꼬리질문' : '기본질문';

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
              {turn.metrics.answerDuration}초 · {questionTypeLabel}
            </p>
          </div>
        </div>
      </div>

      {/* 답변 */}
      <div className="mt-3 rounded-md bg-muted/50 p-3">
        <p className="text-sm text-muted-foreground">
          {turn.answerText || '(답변 없음)'}
        </p>
      </div>

      {/* 피드백 */}
      {hasFeedback && (
        <div className="mt-3 text-sm">
          <p className="text-muted-foreground">{turn.feedback}</p>
        </div>
      )}

      {/* 하이라이트 */}
      {turn.highlight && (
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
      )}

      {/* 분석 대기 중 메시지 */}
      {!hasFeedback && !hasHighlight && (
        <p className="mt-3 text-xs text-muted-foreground">
          분석 결과가 아직 준비되지 않았습니다.
        </p>
      )}
    </div>
  );
}
