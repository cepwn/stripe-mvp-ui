import { FC, ReactElement } from 'react';
import MainNavigation from './MainNavigation';

const MainLayout: FC = (props): ReactElement => {
  return (
    <>
      <MainNavigation />
      {props.children}
    </>
  );
};

export default MainLayout;
