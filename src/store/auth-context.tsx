import {
  useState,
  useEffect,
  useCallback,
  FC,
  ReactElement,
  createContext,
} from 'react';
import { getTokenRemainingTimeMillis } from '../util/jwt';

let logoutTimer: NodeJS.Timeout;

type AuthContextObj = {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string, remainingTimeMillis: number) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextObj>({
  token: '',
  isLoggedIn: false,
  login: () => undefined,
  logout: () => undefined,
});

const getLocalTokenData = (): {
  token: string;
  remainingTimeMillis: number;
} => {
  const token = localStorage.getItem('token');

  if (!token) {
    return { token: '', remainingTimeMillis: 0 };
  }

  const remainingTimeMillis = getTokenRemainingTimeMillis(token);

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
  const tokenData = getLocalTokenData();
  const { token: storedToken } = tokenData;

  const [token, setToken] = useState<string>(storedToken);

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
    if (storedToken) {
      logoutTimer = setTimeout(logoutHandler, tokenData.remainingTimeMillis);
    }
  }, [storedToken, logoutHandler]);

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
