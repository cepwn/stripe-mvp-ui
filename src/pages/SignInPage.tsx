import { FC, ReactElement } from 'react';
import AuthForm, { AuthMode } from '../components/Auth/AuthForm';

const SignInPage: FC = (): ReactElement => {
  return <AuthForm authMode={AuthMode.SingIn} />;
};

export default SignInPage;
