import { FC, ReactElement } from 'react';
import './App.css';
import AdminProductsPage from './pages/AdminProductsPage';
import AuthPage from './pages/AuthPage';
import BillingPage from './pages/BillingPage';
import NotFoundPage from './pages/NotFoundPage';
import UserProductsPage from './pages/UserProductsPage';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import NewProductPage from './pages/NewProductPage';
import EditProductPage from './pages/EditProductPage';
import MainLayout from './components/Layout/MainLayout';
import SideLayout from './components/Layout/SideLayout';

const App: FC = (): ReactElement => {
  const logged = false;
  return (
    <BrowserRouter>
      <MainLayout>
        {logged ? (
          <SideLayout>
            <Switch>
              <Redirect from="/" to="/products" exact />
              <Route path="/products" component={UserProductsPage} />
              <Route path="/billing" component={BillingPage} />
              <Route path="/admin/products" component={AdminProductsPage} />
              <Route path="/admin/products/new" component={NewProductPage} />
              <Route
                path="/admin/products/:productId/edit"
                component={EditProductPage}
              />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </SideLayout>
        ) : (
          <>
            <Switch>
              <Redirect from="/" to="/auth" exact />
              <Route path="/auth" component={AuthPage} exact />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </>
        )}
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;
