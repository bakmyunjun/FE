import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import InterviewHeader from '@/components/interview/InterviewHeader';
import InterviewTimer from '@/components/interview/InterviewTimer';
import InterviewControls from '@/components/interview/InterviewControls';
import { useState, useEffect } from 'react';
import type { AnswerStatus } from '@/types/interview';

const INITIAL_TIME = 90; // 1분 30초

export default function InterviewPage() {
  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('READY');
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  // Timer
  useEffect(() => {
    if (answerStatus !== 'ANSWERING') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          setAnswerStatus('ANSWERED');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answerStatus]);

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
    setTimeLeft(INITIAL_TIME);
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
              <InterviewTimer timeLeft={timeLeft} />
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
