import { FC, ReactElement, useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import NoNavLayout from '../components/Layout/NoNavLayout';
import SideLayout from '../components/Layout/SideLayout';
import AuthContext from '../store/auth-context';
import AdminProductsPage from '../pages/AdminProductsPage';
import BillingPage from '../pages/BillingPage';
import EditProductPage from '../pages/EditProductPage';
import NewProductPage from '../pages/NewProductPage';
import NotFoundPage from '../pages/NotFoundPage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import UserProductsPage from '../pages/UserProductsPage';
import ProtectedRoute from './ProtectedRoute';
import CheckoutPage from '../pages/CheckoutPage';
import PaymentSuccessPage from '../pages/PaymentSuccessPage';

const RouteConfig: FC = (): ReactElement => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <MainLayout>
        <Switch>
          <Route exact path={['/', '/sign-in', '/sign-up']}>
            <NoNavLayout>
              <Route path="/" exact>
                <Redirect to={isLoggedIn ? '/products' : '/sign-in'} />
              </Route>
              <Route path="/sign-in" component={SignInPage} />
              <Route path="/sign-up" component={SignUpPage} />
            </NoNavLayout>
          </Route>
          <ProtectedRoute
            exact
            path={[
              '/products',
              '/billing',
              '/admin/products',
              '/admin/products/new',
              '/admin/products/:productId/edit',
              '/prices/:priceId/checkout',
              '/subscriptions/:subscriptionId/success',
            ]}
          >
            <SideLayout>
              <Route path="/products" component={UserProductsPage} exact />
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
              <Route
                path="/prices/:priceId/checkout"
                component={CheckoutPage}
                exact
              />
              <Route
                path="/subscriptions/:subscriptionId/success"
                component={PaymentSuccessPage}
                exact
              />
            </SideLayout>
          </ProtectedRoute>
          <NoNavLayout>
            <Route path="*" component={NotFoundPage} />
          </NoNavLayout>
        </Switch>
      </MainLayout>
    </BrowserRouter>
  );
};

export default RouteConfig;
