import { FC, ReactElement } from 'react';
import './App.css';
import { Box, CssBaseline } from '@mui/material';
import RouteConfig from './routes/RouteConfig';

const App: FC = (): ReactElement => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <RouteConfig />
    </Box>
  );
};

export default App;
