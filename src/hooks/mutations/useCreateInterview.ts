import { useMutation } from '@tanstack/react-query';
import { createInterview } from '@/apis/interview';
import type { MutationCallbacks } from '@/types/common';

export function useCreateInterview(callbacks?: MutationCallbacks) {
  return useMutation({
    mutationFn: createInterview,
    onSuccess: (data) => {
      console.log(data);
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
