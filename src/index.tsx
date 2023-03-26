import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';
import { LoaderContextProvider } from './store/loader-context';
import { ThemeProvider } from '@mui/material';
import theme from './config/theme';

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
