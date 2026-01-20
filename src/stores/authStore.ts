import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Tokens } from '@/types';

interface AuthState {
  user: User | null;
  tokens: Tokens | null;
  login: (payload: { user: User; tokens: Tokens }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,

      login: ({ user, tokens }) =>
        set({
          user,
          tokens,
        }),

      logout: () => {
        set({ user: null, tokens: null });
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
      }),
    },
  ),
);
