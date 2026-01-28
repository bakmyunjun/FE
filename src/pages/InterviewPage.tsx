import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TimerIcon, PlayIcon } from 'lucide-react';
import InterviewHeader from '@/components/interview/InterviewHeader';
import InterviewSettingModal from '@/components/modal/InterviewSettingModal';
import QuestionCard from '@/components/interview/QuestionCard';
import Loader from '@/components/Loader';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';
import type { InterviewInfo } from '@/types/interview';

export default function InterviewPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const interviewInfo = queryClient.getQueryData<InterviewInfo>(
    QUERY_KEYS.interview.current,
  );

  const [isSettingOpen, setIsSettingOpen] = useState(true);

  if (isSettingOpen) {
    return (
      <InterviewSettingModal
        open
        onCancel={() => navigate('/')}
        onConfirm={() => {
          setIsSettingOpen(false);
        }}
      />
    );
  }

  if (!interviewInfo) {
    return <Loader />;
  }

  return (
    <div>
      <InterviewHeader />

      <div className="mx-auto max-w-5xl px-10 py-6">
        <QuestionCard interviewInfo={interviewInfo} />

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

        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg">
            <PlayIcon className="h-6 w-6" />
            답변 시작
          </Button>
          <Button variant="outline">꼬리 질문</Button>
          <Button variant="outline">다음 질문</Button>
        </div>
      </div>
    </div>
  );
}
