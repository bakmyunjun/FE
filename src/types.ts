export type MutationCallbacks = {
  onMutate?: () => void;
  onSettled?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export interface User {
  id: string;
  email: string;
  nickname: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
