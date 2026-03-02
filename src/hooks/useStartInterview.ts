import { useState } from 'react';
import { toast } from 'sonner';
import { useCreateInterview } from '@/hooks/mutations/useCreateInterview';
import { usePermissionsStore } from '@/stores/permissionsStore';
import type { MainTopicId, SubTopicId } from '@/types/interview';

interface UseStartInterviewOptions {
  onSuccess: () => void;
  onError: () => void;
}

interface StartInterviewParams {
  title: string;
  mainTopicId: MainTopicId;
  subTopicIds: SubTopicId[];
}

export function useStartInterview({ onSuccess, onError }: UseStartInterviewOptions) {
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const { setCameraPermission, setMicPermission } = usePermissionsStore();

  const { mutate: createInterview, isPending: isCreatingInterview } =
    useCreateInterview({
      onSuccess,
      onError: () => {
        console.error('[Interview] 면접 생성 실패');
        toast.error('면접 생성에 문제가 발생했습니다.', {
          position: 'top-center',
        });
        onError();
      },
    });

  const startInterview = async (params: StartInterviewParams) => {
    const { title, mainTopicId, subTopicIds } = params;

    setIsRequestingPermission(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setCameraPermission(true);
      setMicPermission(true);

      for (const track of stream.getTracks()) {
        track.stop();
      }

      createInterview({ title, mainTopicId, subTopicIds });
    } catch (err) {
      console.error('권한 요청 실패:', err);
      toast.error('카메라와 마이크 권한이 필요합니다.', {
        description: '브라우저 설정에서 권한을 허용해주세요.',
        position: 'top-center',
      });
    } finally {
      setIsRequestingPermission(false);
    }
  };

  return {
    startInterview,
    isPending: isRequestingPermission || isCreatingInterview,
  };
}
