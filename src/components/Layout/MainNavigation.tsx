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
import { Link, useHistory } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import LoaderContext from '../../store/loader-context';

const MainNavigation: FC = (): ReactElement => {
  const authCtx = useContext(AuthContext);
  const loaderCtx = useContext(LoaderContext);
  const history = useHistory();

  const handleLogout = () => {
    authCtx.logout();
    history.push('/sign-in');
  };

  return (
    <AppBar
      position="fixed"
      color="secondary"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Box sx={{ width: '100%' }}>
        {loaderCtx.isLoading ? (
          <LinearProgress color="secondary" />
        ) : (
          <LinearProgress variant="determinate" value={100} color="secondary" />
        )}
      </Box>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, color: '#ffffff', textDecoration: 'none' }}
          component={Link}
          to="/"
        >
          Emplicit
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
