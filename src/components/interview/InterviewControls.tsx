import { Button } from '../ui/button';
import { PlayIcon, MessageSquareOff } from 'lucide-react';
import type { AnswerStatus } from '@/types/interview';

type Props = {
  canAnswer: boolean;
  answerStatus: AnswerStatus;
  onAnswerStart: () => void;
  onAnswerStop: () => void;
  onNextQuestion: () => void;
};

export default function InterviewControls({
  canAnswer,
  answerStatus,
  onAnswerStart,
  onAnswerStop,
  onNextQuestion,
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

      <Button
        variant="outline"
        disabled={answerStatus !== 'ANSWERED'}
        onClick={onNextQuestion}
      >
        꼬리 질문
      </Button>

      <Button
        variant="outline"
        disabled={answerStatus !== 'ANSWERED'}
        onClick={onNextQuestion}
      >
        다음 질문
      </Button>
    </div>
  );
}
