import { FC, ReactElement, useContext } from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import AdminProductsPage from './pages/AdminProductsPage';
import BillingPage from './pages/BillingPage';
import EditProductPage from './pages/EditProductPage';
import NewProductPage from './pages/NewProductPage';
import UserProductsPage from './pages/UserProductsPage';
import ProtectedRoute from './routes/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage';
import SideLayout from './components/Layout/SideLayout';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AuthContext from './components/store/auth-context';

const App: FC = (): ReactElement => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Redirect from="/" to={isLoggedIn ? '/products' : '/sign-in'} exact />
          <Route path="/sign-in" component={SignInPage} exact />
          <Route path="/sign-up" component={SignUpPage} exact />
          <ProtectedRoute
            exact
            path={[
              '/products',
              '/billing',
              '/admin/products',
              '/admin/products/new',
              '/admin/products/:productId/edit',
            ]}
          >
            <SideLayout>
              <Route path="/products" component={UserProductsPage} />
              <Route path="/billing" component={BillingPage} />
              <Route
                path="/admin/products"
                component={AdminProductsPage}
                exact
              />
              <Route path="/admin/products/new" component={NewProductPage} />
              <Route
                path="/admin/products/:productId/edit"
                component={EditProductPage}
              />
            </SideLayout>
          </ProtectedRoute>
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
