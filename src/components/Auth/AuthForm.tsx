import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
} from '@mui/material';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { FC, ReactElement, useContext } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AuthContext from '../store/auth-context';
import { getTokenRemainingTimeMillis } from '../../util/jwt';

export enum AuthMode {
  SingIn = 'signin',
  SignUp = 'signup',
}

const AuthForm: FC<{ authMode: AuthMode }> = ({ authMode }): ReactElement => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let url;
    if (authMode === AuthMode.SingIn) {
      url = 'http://localhost:3000/users/sign-in';
    } else {
      url = 'http://localhost:3000/users/sign-up';
    }

    try {
      // TODO: use axios instead of fetch
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password'),
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const { jwt: token } = await response.json();
        const remainingTimeMillis = getTokenRemainingTimeMillis(token);
        authCtx.login(token, remainingTimeMillis);
        history.replace('/');
      } else {
        // TODO: handle error
        console.log('error: ', response);
      }
    } catch (e) {
      // TODO: handle error
      console.log('error: ', e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {authMode === AuthMode.SingIn ? 'Sign in' : 'Sign up'}
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {authMode === AuthMode.SingIn ? 'Sign in' : 'Sign up'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              {authMode === AuthMode.SingIn ? (
                <Link variant="body2" component={RouterLink} to="/sign-up">
                  New? Sign up
                </Link>
              ) : (
                <Link variant="body2" component={RouterLink} to="/sign-in">
                  Already registered? Sign in
                </Link>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthForm;
