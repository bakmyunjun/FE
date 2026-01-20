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
