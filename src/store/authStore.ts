import { create } from 'zustand';
import api from '@/utils/api';
import type { User, LoginRequest, ApiResponse, LoginResponse } from '@/types';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string | null, refreshToken: string | null) => void;
  initializeFromStorage: () => void;
}

const getStoredTokens = () => {
  if (typeof window === 'undefined') return { accessToken: null, refreshToken: null };
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
  };
};

const getStoredUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userJson = localStorage.getItem('user');
  if (!userJson) return null;
  try {
    return JSON.parse(userJson) as User;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getStoredUser(),
  accessToken: getStoredTokens().accessToken,
  refreshToken: getStoredTokens().refreshToken,
  isAuthenticated: Boolean(getStoredTokens().accessToken && getStoredUser()),

  login: async (email: string, password: string) => {
    const payload: LoginRequest = { email, password };
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', payload);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Login failed');
    }

    const { user, accessToken, refreshToken } = response.data.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', JSON.stringify(user));

    set({
      user,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  setUser: (user: User | null) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    set({ user });
  },

  setTokens: (accessToken: string | null, refreshToken: string | null) => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }
    set({
      accessToken,
      refreshToken,
      isAuthenticated: Boolean(accessToken && (getStoredUser() || true)),
    });
  },

  initializeFromStorage: () => {
    const { accessToken } = getStoredTokens();
    const user = getStoredUser();
    set({
      user,
      accessToken,
      refreshToken: getStoredTokens().refreshToken,
      isAuthenticated: Boolean(accessToken && user),
    });
  },
}));
