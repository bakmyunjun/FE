import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const MAIN_TOPIC_BUTTON_CLASS = 'h-10 w-28 px-4';
const SUB_TOPIC_BUTTON_CLASS = 'h-8 w-28 px-4';

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
            placeholder="면접 레포트 제목을 입력하세요"
          />
        </div>

        <div className="mb-4 flex flex-col gap-2">
          <h3 className="text-sub1 font-semibold">면접 주제</h3>

          <div className="mb-2 flex gap-2">
            <Button className={MAIN_TOPIC_BUTTON_CLASS} variant="outline">
              백엔드
            </Button>
            <Button className={MAIN_TOPIC_BUTTON_CLASS} variant="outline">
              프론트엔드
            </Button>
          </div>

          <p className="text-caption text-muted-foreground">
            · 서브 주제를 1개 이상 선택해주세요.
          </p>

          <div className="flex gap-2">
            <Button className={SUB_TOPIC_BUTTON_CLASS} variant="outline">
              subTopic 1
            </Button>
            <Button className={SUB_TOPIC_BUTTON_CLASS} variant="outline">
              subTopic 2
            </Button>
            <Button className={SUB_TOPIC_BUTTON_CLASS} variant="outline">
              subTopic 3
            </Button>
            <Button className={SUB_TOPIC_BUTTON_CLASS} variant="outline">
              subTopic 4
            </Button>
            <Button className={SUB_TOPIC_BUTTON_CLASS} variant="outline">
              subTopic 5
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            취소
          </Button>
          <Button onClick={onConfirm}>확인</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
