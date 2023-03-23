import { Typography } from '@mui/material';
import { FC, ReactElement } from 'react';
import NoNavLayout from '../components/Layout/NoNavLayout';

const UnauthorizedPage: FC = (): ReactElement => {
  return (
    <NoNavLayout>
      <Typography variant="h4">Unauthorized !</Typography>
    </NoNavLayout>
  );
};

export default UnauthorizedPage;
