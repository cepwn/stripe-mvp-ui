import { fromUnixTime } from 'date-fns';

export const getRemainingTimeMillis = (expirationUnixEpoc: number): number => {
  const currentTimeMillis = new Date().getTime();
  const expirationTimeMillis = fromUnixTime(expirationUnixEpoc).getTime();
  return expirationTimeMillis - currentTimeMillis;
};
