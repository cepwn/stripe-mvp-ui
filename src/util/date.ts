export const getRemainingTimeMillis = (expirationUnixEpoc: number): number => {
  const currentTimeMillis = new Date().getTime();
  const expirationTimeMillis = expirationUnixEpoc * 1000;
  const result = expirationTimeMillis - currentTimeMillis;
  return result;
};
