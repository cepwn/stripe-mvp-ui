import { FC, ReactElement } from 'react';
import AuthForm from '../components/Auth/AuthForm';

const SignUpPage: FC = (): ReactElement => {
  return (
    <>
      <h1>SignUp</h1>
      <AuthForm />
    </>
  );
};

export default SignUpPage;
