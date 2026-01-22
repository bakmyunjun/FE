import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';
import { exchangeOAuthToken } from '@/apis/auth';
import type { MutationCallbacks } from '@/types/common';

export function useOAuthLogin(callbacks?: MutationCallbacks) {
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: exchangeOAuthToken,
    onSuccess: ({ user, tokens }) => {
      login({ user, tokens });
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
