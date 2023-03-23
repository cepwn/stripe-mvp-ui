import { FC, ReactElement } from 'react';
import AuthForm from '../components/Auth/AuthForm';

const SignInPage: FC = (): ReactElement => {
  return (
    <>
      <h1>SignIn</h1>
      <AuthForm />
    </>
  );
};

export default SignInPage;
