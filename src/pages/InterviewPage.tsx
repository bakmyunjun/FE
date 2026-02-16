import { Card, CardContent } from '@/components/ui/card';
import InterviewSettingModal from '@/components/modal/InterviewSettingModal';
import InterviewHeader from '@/components/interview/InterviewHeader';
import QuestionCard from '@/components/interview/QuestionCard';
import InterviewTimer from '@/components/interview/InterviewTimer';
import UserFaceCard from '@/components/interview/UserFaceCard';
import UserAnswerCard from '@/components/interview/UserAnswerCard';
import VoiceWaveCard from '@/components/interview/VoiceWaveCard';
import InterviewControls from '@/components/interview/InterviewControls';
import Loader from '@/components/Loader';
import { toast } from 'sonner';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePermissionsStore } from '@/stores/permissionsStore';
import { useSyncPermissions } from '@/hooks/useSyncPermissions';
import { useInterviewAnswer } from '@/hooks/useInterviewAnswer';
import { useSubmitTurn } from '@/hooks/mutations/useNextTurn';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import type { InterviewInfo, AnswerStatus } from '@/types/interview';

const MAX_TURN = 10;
const INITIAL_TIME = 90; // 1분 30초

export default function InterviewPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const interviewInfo = queryClient.getQueryData<InterviewInfo>(
    QUERY_KEYS.interview.current,
  );

  useSyncPermissions();
  const { cameraPermission, micPermission } = usePermissionsStore();

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isSettingModalOpen, setIsSettingModalOpen] = useState(true);
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

  const { mutate: submitTurn, isPending: isSubmitTurnPending } = useSubmitTurn({
    onSuccess: () => {
      if (isLastTurn) {
        toast.success('수고하셨습니다!', {
          description: '면접 결과를 확인해보세요.',
        });
        navigate(`/report/${interviewInfo?.interviewId}`);
        return;
      }

      setAnswerStatus('READY');
      setTimeLeft(INITIAL_TIME);
      resetAnswer();
    },
    onError: () => {
      console.error('[Interview] 답변 제출 실패');
      toast.error('답변 제출에 문제가 발생했습니다.', {
        position: 'top-center',
      });
    },
  });

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

  const canAnswer = cameraPermission && micPermission && !isSubmitTurnPending;

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

  const handleNextTurn = (isFollowup: boolean) => {
    if (!interviewInfo) return;
    if (!faceMetrics || !voiceMetrics) {
      toast.error('분석 데이터가 아직 준비되지 않았습니다.');
      return;
    }

    submitTurn({
      interviewId: interviewInfo.interviewId,
      answerText,
      turnIndex: interviewInfo.turnIndex,
      answerDuration: INITIAL_TIME - timeLeft,
      faceMetrics,
      voiceMetrics,
      isFollowupQuestion: isFollowup,
    });
  };

  if (isSettingModalOpen) {
    return (
      <InterviewSettingModal
        open
        onCancel={() => navigate('/')}
        onConfirm={() => {
          setIsSettingModalOpen(false);
        }}
      />
    );
  }

  if (!interviewInfo) {
    return <Loader />;
  }

  const isLastTurn = interviewInfo.turnIndex >= MAX_TURN;

  return (
    <div>
      <InterviewHeader
        currentTurn={interviewInfo.turnIndex}
        maxTurn={MAX_TURN}
      />

      <div className="mx-auto max-w-5xl px-10 py-6">
        <QuestionCard interviewInfo={interviewInfo} />

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
          answerStatus={answerStatus}
          canAnswer={canAnswer}
          isSubmitting={isSubmitTurnPending}
          isLastTurn={isLastTurn}
          remainingFollowupCount={interviewInfo.remainingFollowupCount}
          onAnswerStart={handleAnswerStart}
          onAnswerStop={handleAnswerStop}
          onNextTurn={handleNextTurn}
        />
      </div>
    </div>
  );
}
