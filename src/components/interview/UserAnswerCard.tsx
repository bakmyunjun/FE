import { Card, CardContent } from '../ui/card';
import type { AnswerStatus } from '@/types/interview';

type Props = {
  answerStatus: AnswerStatus;
  answerText: string;
};

export default function UserAnswerCard({ answerStatus, answerText }: Props) {
  const getDisplayText = () => {
    if (answerStatus === 'READY') {
      return '질문에 답변해주세요.';
    }

    if (answerStatus === 'ANSWERING' && !answerText.trim()) {
      return '답변을 입력 중입니다…';
    }

    return answerText;
  };

  const text = getDisplayText();

  return (
    <Card className="col-span-2 h-[100px]">
      <CardContent className="flex h-full items-center justify-center p-0">
        <span className="p-4 text-body2 text-muted-foreground">{text}</span>
      </CardContent>
    </Card>
  );
}
