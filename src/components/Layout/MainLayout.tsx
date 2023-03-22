import { FC, ReactElement } from 'react';
import MainNavigation from './MainNavigation';

const MainLayout: FC = (props): ReactElement => {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  );
};

export default MainLayout;
