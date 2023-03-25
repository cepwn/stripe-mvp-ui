import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';
import { LoaderContextProvider } from './store/loader-context';

ReactDOM.render(
  <AuthContextProvider>
    <LoaderContextProvider>
      <App />
    </LoaderContextProvider>
  </AuthContextProvider>,
  document.getElementById('root'),
);
