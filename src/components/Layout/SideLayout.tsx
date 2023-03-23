import { Box, Toolbar } from '@mui/material';
import { FC, ReactElement } from 'react';
import SideNavigation from './SideNavigation';

const SideLayout: FC = (props): ReactElement => {
  return (
    <>
      <SideNavigation />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {props.children}
      </Box>
    </>
  );
};

export default SideLayout;
