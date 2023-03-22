import { FC, ReactElement } from 'react';
import SideNavigation from './SideNavigation';

const SideLayout: FC = (props): ReactElement => {
  return (
    <>
      <SideNavigation />
      <main>{props.children}</main>
    </>
  );
};

export default SideLayout;
