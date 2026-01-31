import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TimerIcon } from 'lucide-react';
import InterviewHeader from '@/components/interview/InterviewHeader';
import InterviewControls from '@/components/interview/InterviewControls';
import { useState } from 'react';
import type { AnswerStatus } from '@/types/interview';

export default function InterviewPage() {
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('READY');

  const handleAnswerStart = () => {
    if (answerStatus !== 'READY') return;
    setAnswerStatus('ANSWERING');
  };

  const handleAnswerStop = () => {
    if (answerStatus !== 'ANSWERING') return;
    setAnswerStatus('ANSWERED');
  };

  const handleNextQuestion = () => {
    setAnswerStatus('READY');
  };

  return (
    <div>
      <InterviewHeader />

      <div className="mx-auto max-w-5xl px-10 py-6">
        <Card className="mb-6">
          <CardContent className="flex items-center gap-2 p-5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border bg-muted text-sub1 font-semibold">
              1
            </span>
            <span className="text-sub1 font-semibold">
              자기소개를 해주세요.
            </span>
            <Badge variant="secondary">기본</Badge>
          </CardContent>
        </Card>

        <div className="grid grid-cols-3 gap-6">
          <Card className="col-span-2 h-[320px]">
            <CardContent className="relative h-full p-0">
              <div className="flex h-full items-center justify-center">
                에이바 영역
              </div>
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-muted px-3 py-1 shadow">
                <TimerIcon className="h-5 w-5" />
                01 : 30
              </div>
            </CardContent>
          </Card>

          <Card className="h-[320px]">
            <CardContent className="flex h-full items-center justify-center p-0">
              사용자 얼굴 영역
            </CardContent>
          </Card>

          <Card className="col-span-2 h-[100px]">
            <CardContent className="flex h-full items-center justify-center p-0">
              내 답변 영역
            </CardContent>
          </Card>

          <Card className="h-[100px]">
            <CardContent className="flex h-full items-center justify-center p-0">
              목소리 파동 영역
            </CardContent>
          </Card>
        </div>

        <InterviewControls
          answerStatus={answerStatus}
          onAnswerStart={handleAnswerStart}
          onAnswerStop={handleAnswerStop}
          onNextQuestion={handleNextQuestion}
        />
      </div>
    </div>
  );
}
