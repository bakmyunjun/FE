import axiosInstance from './axios';

interface ExchangeOAuthTokenParams {
  code: string;
  state: string;
}

export function exchangeOAuthToken({ code, state }: ExchangeOAuthTokenParams) {
  return axiosInstance.post('/auth/oauth/token', {
    code,
    state,
  });
}
