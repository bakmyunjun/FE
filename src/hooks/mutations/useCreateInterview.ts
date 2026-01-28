import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createInterview } from '@/apis/interview';
import { QUERY_KEYS } from '@/lib/constants';
import type { InterviewInfo } from '@/types/interview';
import type { MutationCallbacks } from '@/types/common';

export function useCreateInterview(callbacks?: MutationCallbacks) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInterview,
    onSuccess: (data) => {
      const interviewInfo: InterviewInfo = {
        interviewId: data.interviewId,
        title: data.title,
        turnIndex: data.turnIndex,
        question: {
          questionId: data.firstQuestion.questionId,
          text: data.firstQuestion.text,
        },
        questionType: '기본',
      };

      queryClient.setQueryData(QUERY_KEYS.interview.current, interviewInfo);

      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
