import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { DoorOpenIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOpenAlertModal } from '@/stores/alertModalStore';

type Props = {
  currentTurn: number;
  maxTurn: number;
};

export default function InterviewHeader({ currentTurn, maxTurn }: Props) {
  const navigate = useNavigate();
  const openAlertModal = useOpenAlertModal();

  const progressValue = (currentTurn / maxTurn) * 100;

  const handleExit = () => {
    openAlertModal({
      title: '면접을 종료할까요?',
      description: '지금 나가면 답변 내용이 저장되지 않아요.',
      onAction: () => {
        navigate('/');
      },
    });
  };

  return (
    <header className="flex items-center justify-between border-b bg-muted px-8 py-4">
      <div className="flex items-center gap-2">
        <span className="text-sub2">진행도</span>
        <Progress
          value={progressValue}
          className="w-40 border"
          indicatorClassName="bg-emerald-500"
        />
        <span className="text-sub2">
          {currentTurn} / {maxTurn}
        </span>
      </div>
      <Button
        className="hover:text-destructive [&_svg]:!size-8"
        variant="ghost"
        size="icon"
        aria-label="나가기"
        onClick={handleExit}
      >
        <DoorOpenIcon />
      </Button>
    </header>
  );
}
