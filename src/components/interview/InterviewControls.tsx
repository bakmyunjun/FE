import { Button } from '../ui/button';
import { PlayIcon, MessageSquareOff } from 'lucide-react';
import type { AnswerStatus } from '@/types/interview';

type Props = {
  answerStatus: AnswerStatus;
  onAnswerStart: () => void;
  onAnswerStop: () => void;
  onNextQuestion: () => void;
};

export default function InterviewControls({
  answerStatus,
  onAnswerStart,
  onAnswerStop,
  onNextQuestion,
}: Props) {
  return (
    <div className="mt-8 flex justify-center gap-4">
      {answerStatus === 'READY' && (
        <Button size="lg" onClick={onAnswerStart}>
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
          답변 종료
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
