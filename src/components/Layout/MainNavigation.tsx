import { Logout } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  LinearProgress,
  Toolbar,
  Typography,
} from '@mui/material';
import { FC, ReactElement, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import LoaderContext from '../../store/loader-context';

const MainNavigation: FC = (): ReactElement => {
  const authCtx = useContext(AuthContext);
  const loaderCtx = useContext(LoaderContext);
  const history = useHistory();

  const handleLogout = () => {
    authCtx.logout();
    history.replace('/sign-in');
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Box sx={{ width: '100%' }}>
        {loaderCtx.isLoading ? (
          <LinearProgress />
        ) : (
          <LinearProgress variant="determinate" value={100} />
        )}
      </Box>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Stripe MVP
        </Typography>
        {authCtx.isLoggedIn && (
          <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MainNavigation;
