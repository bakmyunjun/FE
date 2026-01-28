import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import type { InterviewInfo } from '@/types/interview';

export default function QuestionCard({
  interviewInfo,
}: {
  interviewInfo: InterviewInfo;
}) {
  return (
    <Card className="mb-6">
      <CardContent className="flex items-center gap-2 p-5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-muted text-sub1 font-semibold">
          {interviewInfo.turnIndex}
        </span>
        <span className="text-sub1 font-semibold">
          {interviewInfo.question.text}
        </span>
        <Badge className="shrink-0" variant="secondary">
          {interviewInfo.questionType}
        </Badge>
      </CardContent>
    </Card>
  );
}
