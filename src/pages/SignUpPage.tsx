import { FC, ReactElement } from 'react';
import AuthForm, { AuthMode } from '../components/Auth/AuthForm';

const SignUpPage: FC = (): ReactElement => {
  return <AuthForm authMode={AuthMode.SignUp} />;
};

export default SignUpPage;
