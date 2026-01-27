export interface User {
  id: string;
  email: string;
  nickname: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
