import React, {
  useState,
  useEffect,
  useCallback,
  FC,
  ReactElement,
} from 'react';
import jwt_decode from 'jwt-decode';
import { getRemainingTimeMillis } from '../../util/date';

let logoutTimer: NodeJS.Timeout;

type AuthContextObj = {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string, remainingTimeMillis: number) => void;
  logout: () => void;
};

const AuthContext = React.createContext<AuthContextObj>({
  token: '',
  isLoggedIn: false,
  login: () => undefined,
  logout: () => undefined,
});

const retrieveTokenData = (): {
  token: string;
  remainingTimeMillis: number;
} => {
  const token = localStorage.getItem('token');

  if (!token) {
    return { token: '', remainingTimeMillis: 0 };
  }

  const tokenPayload = jwt_decode<{
    iat: number;
    exp: number;
  }>(token);

  const { exp } = tokenPayload;

  const remainingTimeMillis = getRemainingTimeMillis(exp);

  if (remainingTimeMillis <= 0) {
    localStorage.removeItem('token');
    return { token: '', remainingTimeMillis: 0 };
  }

  return {
    token,
    remainingTimeMillis,
  };
};

export const AuthContextProvider: FC = (props): ReactElement => {
  const tokenData = retrieveTokenData();

  const [token, setToken] = useState<string>(tokenData.token);

  const isLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken('');
    localStorage.removeItem('token');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token: string, remainingTimeMillis: number) => {
    setToken(token);
    localStorage.setItem('token', token);
    logoutTimer = setTimeout(logoutHandler, remainingTimeMillis);
  };

  useEffect(() => {
    if (tokenData) {
      // FIXME: REMOVE THIS LOG
      console.log(
        'setTimeout for token with remainingTimeMillis:',
        tokenData.remainingTimeMillis,
      );
      logoutTimer = setTimeout(logoutHandler, tokenData.remainingTimeMillis);
    }
  }, [tokenData, logoutHandler]);

  const contextValue: AuthContextObj = {
    token,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
