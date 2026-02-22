import { Button } from '../ui/button';
import { PlayIcon, MessageSquareOff, PowerIcon } from 'lucide-react';
import type { AnswerStatus } from '@/types/interview';

type Props = {
  answerStatus: AnswerStatus;
  canAnswer: boolean;
  isSubmitting: boolean;
  isLastTurn: boolean;
  remainingFollowupCount: number;
  onAnswerStart: () => void;
  onAnswerStop: () => void;
  onNextTurn: (isFollowup: boolean) => void;
};

export default function InterviewControls({
  answerStatus,
  canAnswer,
  isSubmitting,
  isLastTurn,
  remainingFollowupCount,
  onAnswerStart,
  onAnswerStop,
  onNextTurn,
}: Props) {
  return (
    <div className="mt-8 flex justify-center gap-4">
      {answerStatus === 'READY' && (
        <Button size="lg" onClick={onAnswerStart} disabled={!canAnswer}>
          <PlayIcon className="h-6 w-6" />
          답변 시작
        </Button>
      )}

      {answerStatus === 'ANSWERING' && (
        <Button
          size="lg"
          className="bg-emerald-500 hover:bg-emerald-600"
          onClick={onAnswerStop}
        >
          <MessageSquareOff className="h-6 w-6" />
          답변 완료
        </Button>
      )}

      {!isLastTurn && (
        <>
          {remainingFollowupCount > 0 && (
            <Button
              variant="outline"
              onClick={() => onNextTurn(true)}
              disabled={answerStatus !== 'ANSWERED' || isSubmitting}
            >
              꼬리 질문
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => onNextTurn(false)}
            disabled={answerStatus !== 'ANSWERED' || isSubmitting}
          >
            다음 질문
          </Button>
        </>
      )}

      {isLastTurn && (
        <Button
          size="lg"
          variant="destructive"
          onClick={() => onNextTurn(false)}
          disabled={answerStatus !== 'ANSWERED' || isSubmitting}
        >
          <PowerIcon className="h-6 w-6" />
          면접 종료
        </Button>
      )}
    </div>
  );
}
