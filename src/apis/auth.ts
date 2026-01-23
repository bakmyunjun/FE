import axios from 'axios';
import axiosInstance from './axios';
import type { User, Tokens } from '@/types/auth';

interface ExchangeOAuthTokenParams {
  code: string;
  state: string;
}

interface ExchangeOAuthTokenResponse {
  user: User;
  tokens: Tokens;
}

interface RefreshAccessTokenResponse {
  accessToken: string;
}

export async function exchangeOAuthToken(
  params: ExchangeOAuthTokenParams,
): Promise<ExchangeOAuthTokenResponse> {
  const { data } = await axiosInstance.post<{
    data: ExchangeOAuthTokenResponse;
  }>('/auth/oauth/token', params);

  return data.data;
}

export async function refreshAccessToken(
  refreshToken: string,
): Promise<RefreshAccessTokenResponse> {
  const { data } = await axios.post<{
    data: RefreshAccessTokenResponse;
  }>(`${import.meta.env.VITE_API_BASE_URL}/auth/refresh`, { refreshToken });

  return data.data;
}
