import jwt_decode from 'jwt-decode';
import { getRemainingTimeMillis } from './date';

export const getTokenRemainingTimeMillis = (token: string): number => {
  const tokenPayload = jwt_decode<{
    iat: number;
    exp: number;
  }>(token);
  const { exp } = tokenPayload;
  return getRemainingTimeMillis(exp);
};
