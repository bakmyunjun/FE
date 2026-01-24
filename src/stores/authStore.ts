import { create } from 'zustand';
import type { User } from '@/types/auth';

interface AuthState {
  user: User | null;
  initialized: boolean;
  login: (user: User) => void;
  logout: () => void;
  setInitialized: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  initialized: false,

  login: (user) => set({ user }),

  logout: () => {
    set({ user: null });
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  setInitialized: () => set({ initialized: true }),
}));
