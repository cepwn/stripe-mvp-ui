import { Box, Toolbar } from '@mui/material';
import { FC, ReactElement } from 'react';

const NoNavLayout: FC = (props): ReactElement => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      {props.children}
    </Box>
  );
};

export default NoNavLayout;
