import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import InterviewHeader from '@/components/interview/InterviewHeader';
import InterviewTimer from '@/components/interview/InterviewTimer';
import UserFaceCard from '@/components/interview/UserFaceCard';
import UserAnswerCard from '@/components/interview/UserAnswerCard';
import VoiceWaveCard from '@/components/interview/VoiceWaveCard';
import InterviewControls from '@/components/interview/InterviewControls';
import { toast } from 'sonner';
import { useState, useEffect, useRef } from 'react';
import { usePermissionsStore } from '@/stores/permissionsStore';
import { useSyncPermissions } from '@/hooks/useSyncPermissions';
import { useInterviewAnswer } from '@/hooks/useInterviewAnswer';
import type { AnswerStatus } from '@/types/interview';

const INITIAL_TIME = 90; // 1분 30초

export default function InterviewPage() {
  useSyncPermissions();
  const { cameraPermission, micPermission } = usePermissionsStore();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [answerStatus, setAnswerStatus] = useState<AnswerStatus>('READY');
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  const {
    answerText,
    faceMetrics,
    voiceMetrics,
    voiceWave,
    startAnswer,
    stopAnswer,
    resetAnswer,
  } = useInterviewAnswer(videoRef);

  // Timer
  useEffect(() => {
    if (answerStatus !== 'ANSWERING') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setAnswerStatus('ANSWERED');
          stopAnswer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [answerStatus]);

  useEffect(() => {
    if (answerStatus !== 'ANSWERING') return;

    if (!cameraPermission || !micPermission) {
      setAnswerStatus('ANSWERED');
      stopAnswer();

      toast.warning('권한이 변경되어 답변이 종료되었습니다.');
    }
  }, [cameraPermission, micPermission, answerStatus]);

  const handleAnswerStart = () => {
    if (answerStatus !== 'READY') return;
    setAnswerStatus('ANSWERING');
    startAnswer();
  };

  const handleAnswerStop = () => {
    if (answerStatus !== 'ANSWERING') return;
    setAnswerStatus('ANSWERED');
    stopAnswer();
  };

  const handleNextQuestion = () => {
    console.log('FaceMetrics', faceMetrics);
    console.log('VoiceMetrics', voiceMetrics);
    setAnswerStatus('READY');
    setTimeLeft(INITIAL_TIME);
    resetAnswer();
  };

  const canAnswer = cameraPermission && micPermission;

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
          <UserFaceCard videoRef={videoRef} />
          <UserAnswerCard answerStatus={answerStatus} answerText={answerText} />
          <VoiceWaveCard voiceWave={voiceWave} />
        </div>

        <InterviewControls
          canAnswer={canAnswer}
          answerStatus={answerStatus}
          onAnswerStart={handleAnswerStart}
          onAnswerStop={handleAnswerStop}
          onNextQuestion={handleNextQuestion}
        />
      </div>
    </div>
  );
}
