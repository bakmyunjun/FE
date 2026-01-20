import axios from 'axios';
import axiosInstance from './axios';
import type { User, Tokens } from '@/types';

interface ExchangeOAuthTokenParams {
  code: string;
  state: string;
}

interface ExchangeOAuthTokenResponse {
  user: User;
  tokens: Tokens;
}

export async function exchangeOAuthToken(
  params: ExchangeOAuthTokenParams,
): Promise<ExchangeOAuthTokenResponse> {
  const response = await axiosInstance.post<{
    data: ExchangeOAuthTokenResponse;
  }>('/auth/oauth/token', params);

  return response.data.data;
}

export const refreshToken = (refreshToken: string) =>
  axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, {
    refreshToken,
  });
