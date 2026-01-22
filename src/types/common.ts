export type MutationCallbacks = {
  onMutate?: () => void;
  onSettled?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};
