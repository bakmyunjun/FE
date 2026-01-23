import { create } from 'zustand';
import type { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: (user) => set({ user }),

  logout: () => {
    set({ user: null });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
}));

export const useIsAuthenticated = (): boolean => {
  return useAuthStore((state) => !!state.user);
};
