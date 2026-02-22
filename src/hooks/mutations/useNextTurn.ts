import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submitTurn } from '@/apis/interview';
import { QUERY_KEYS } from '@/lib/constants';
import type { InterviewInfo } from '@/types/interview';
import type { MutationCallbacks } from '@/types/common';

export function useSubmitTurn(callbacks?: MutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitTurn,
    onSuccess: (data) => {
      // 면접 결과 분석중 (마지막 턴 제출 완료)
      if (data.status === 'ANALYZING') {
        if (callbacks?.onSuccess) callbacks.onSuccess();
        return;
      }

      const interviewInfo: InterviewInfo = {
        interviewId: data.interviewId,
        turnIndex: data.nextTurnIndex,
        question: {
          questionId: data.nextQuestion.questionId,
          text: data.nextQuestion.text,
        },
        questionType: data.nextQuestion.type === 'followup' ? '꼬리' : '기본',
        remainingFollowupCount: data.remainingFollowupCount,
      };

      queryClient.setQueryData(QUERY_KEYS.interview.current, interviewInfo);

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
