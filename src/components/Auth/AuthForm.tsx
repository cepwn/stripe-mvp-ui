import {
  Container,
  Box,
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
  Alert,
} from '@mui/material';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { FC, ReactElement, useContext, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AuthContext from '../../store/auth-context';
import { getTokenRemainingTimeMillis } from '../../util/jwt';
import useInput from '../../hooks/use-input';
import axios from 'axios';
import config from '../../config/default';
import LoaderContext from '../../store/loader-context';

export enum AuthMode {
  SingIn = 'signin',
  SignUp = 'signup',
}

const AuthForm: FC<{ authMode: AuthMode }> = ({ authMode }): ReactElement => {
  const authCtx = useContext(AuthContext);
  const loaderCtx = useContext(LoaderContext);
  const history = useHistory();
  const [formErrorText, setFormErrorText] = useState<string>('');

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    keyDownHandler: emailKeyDownHandler,
    reset: resetEmailInput,
  } = useInput((value) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value,
    ),
  );

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    keyDownHandler: passwordKeyDownHandler,
    reset: resetPasswordInput,
  } = useInput(
    (value) =>
      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value) &&
      value.length > 7 &&
      value.length < 21,
  );

  let formIsValid = false;

  if (passwordIsValid && emailIsValid) {
    formIsValid = true;
  }

  // TODO: add loading state
  const formSubmissionHandler = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    loaderCtx.setIsLoading(true);
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    let url;
    if (authMode === AuthMode.SingIn) {
      url = `${config.api.url}/users/sign-in`;
    } else {
      url = `${config.api.url}/users/sign-up`;
    }

    try {
      const response = await axios.post<{ jwt: string }>(
        url,
        {
          email: emailValue,
          password: passwordValue,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const { jwt: token } = await response.data;
      const remainingTimeMillis = getTokenRemainingTimeMillis(token);
      authCtx.login(token, remainingTimeMillis);
      history.push('/');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 401) {
          setFormErrorText('Invalid credentials');
          resetPasswordInput();
          resetEmailInput();
        } else if (e.response?.status === 409) {
          setFormErrorText('User already exists, sign in instead');
          resetPasswordInput();
          resetEmailInput();
        } else {
          setFormErrorText('Something went wrong');
        }
      }
    }
    loaderCtx.setIsLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
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
        <Typography variant="h5">
          {authMode === AuthMode.SingIn ? 'Sign in' : 'Sign up'}
        </Typography>
        {formErrorText && (
          <Alert
            severity="error"
            sx={{
              marginTop: 3,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {formErrorText}
          </Alert>
        )}
        <Box
          component="form"
          noValidate
          onSubmit={formSubmissionHandler}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={emailChangeHandler}
                onBlur={emailBlurHandler}
                onKeyDown={emailKeyDownHandler}
                error={emailHasError}
                helperText={
                  emailHasError ? 'Please enter a valid email address.' : ''
                }
                value={emailValue}
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
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                onKeyDown={passwordKeyDownHandler}
                error={passwordHasError}
                helperText={
                  passwordHasError
                    ? 'Password must be between 8 and 20 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character.'
                    : ''
                }
                value={passwordValue}
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
