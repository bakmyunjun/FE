import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import TopicSelector from '../interview/TopicSelector';
import { useState } from 'react';
import { useCreateInterview } from '@/hooks/mutations/useCreateInterview';
import { usePermissionsStore } from '@/stores/permissionsStore';
import type { MainTopicId, SubTopicId } from '@/types/interview';

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function InterviewSettingModal({
  open,
  onCancel,
  onConfirm,
}: Props) {
  const [title, setTitle] = useState('');
  const [mainTopicId, setMainTopicId] = useState<MainTopicId | null>(null);
  const [subTopicIds, setSubTopicIds] = useState<SubTopicId[]>([]);

  const { mutate: createInterview, isPending: isCreateInterviewPending } =
    useCreateInterview({
      onSuccess: () => {
        onConfirm();
      },
      onError: () => {
        console.error('[Interview] 면접 생성 실패');
        toast.error('면접 생성에 문제가 발생했습니다.', {
          position: 'top-center',
        });
        onCancel();
      },
    });

  const handleSelectMainTopic = (id: MainTopicId) => {
    setMainTopicId(id);
    setSubTopicIds([]);
  };

  const handleToggleSubTopic = (id: SubTopicId) => {
    setSubTopicIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id],
    );
  };

  const { setCameraPermission, setMicPermission } = usePermissionsStore();

  const handleConfirm = async () => {
    if (!mainTopicId) return;

    // 카메라/마이크 권한 요청
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // 권한 허용됨 - 스토어 업데이트
      setCameraPermission(true);
      setMicPermission(true);

      // 스트림 정리 (실제 사용은 InterviewPage에서)
      for (const track of stream.getTracks()) {
        track.stop();
      }

      // 면접 생성
      createInterview({
        title,
        mainTopicId,
        subTopicIds,
      });
    } catch (err) {
      console.error('권한 요청 실패:', err);
      toast.error('카메라와 마이크 권한이 필요합니다.', {
        description: '브라우저 설정에서 권한을 허용해주세요.',
        position: 'top-center',
      });
    }
  };

  const isConfirmEnabled = mainTopicId !== null && subTopicIds.length > 0;

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="w-full max-w-[656px] p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="mb-2">면접 설정</DialogTitle>
          <DialogDescription className="text-caption text-muted-foreground">
            · 기본 질문 1개당 꼬리 질문은 최대 2개까지 제공됩니다.
            <br />· 꼬리 질문을 받거나, 다음 질문으로 넘어가는 것을 선택할 수
            있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4 flex flex-col gap-2">
          <h2 className="text-sub1 font-semibold">면접 레포트 제목</h2>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="면접 레포트 제목을 입력하세요 (미입력 시 자동 생성)"
          />
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <h3 className="text-sub1 font-semibold">면접 주제</h3>
          <TopicSelector
            mainTopicId={mainTopicId}
            subTopicIds={subTopicIds}
            onSelectMainTopic={handleSelectMainTopic}
            onToggleSubTopic={handleToggleSubTopic}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            취소
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isConfirmEnabled || isCreateInterviewPending}
          >
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
