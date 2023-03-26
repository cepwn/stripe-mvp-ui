import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';
import { LoaderContextProvider } from './store/loader-context';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e61955',
    },
    secondary: {
      main: '#1E1E1E',
    },
  },
});

ReactDOM.render(
  <AuthContextProvider>
    <LoaderContextProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </LoaderContextProvider>
  </AuthContextProvider>,
  document.getElementById('root'),
);
