import { FC, ReactElement, useContext } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import AuthContext from '../components/store/auth-context';
import UnauthorizedPage from '../pages/UnathorizedPage';

const ProtectedRoute: FC<RouteProps> = ({
  children,
  ...props
}): ReactElement => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Route
      {...props}
      render={() => {
        if (!isLoggedIn) return <Route component={UnauthorizedPage} />;
        return children;
      }}
    />
  );
};

export default ProtectedRoute;
