import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { FC, ReactElement, useContext } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../store/auth-context';
import config from '../../config/default';
import EditProductForm from './EditProductForm';
import { AdminProduct } from './models/adminProduct';
import { ProductFormOnSubmitParams } from './EditProduct';
import LoaderContext from '../../store/loader-context';

const ProductForm: FC = (): ReactElement => {
  const authCtx = useContext(AuthContext);
  const loaderCtx = useContext(LoaderContext);
  const history = useHistory();

  const formSubmissionHandler = async (params: ProductFormOnSubmitParams) => {
    loaderCtx.setIsLoading(true);
    const {
      name,
      features,
      monthlyPriceAmount,
      yearlyPriceAmount,
      active,
      mostPopular,
    } = params;
    // TODO: add error handling
    try {
      await axios.post(
        `${config.api.url}/products`,
        {
          name,
          features,
          monthlyPriceAmount,
          yearlyPriceAmount,
          active,
          mostPopular,
        },
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        },
      );
      history.replace('/admin/products');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        // FIXME: remove console.log
        console.log('error', e.response);
      }
    }
    loaderCtx.setIsLoading(false);
  };

  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      component={RouterLink}
      to="/admin/products"
    >
      Edit Pricing Plans
    </Link>,
    <Typography key="3" color="text.primary">
      Add Plan
    </Typography>,
  ];

  const defaultAdminProduct: AdminProduct = {
    id: '',
    name: '',
    features: '',
    monthlyPriceAmount: '0.00',
    yearlyPriceAmount: '0.00',
    active: false,
    mostPopular: false,
  };

  return (
    <Box
      component="main"
      sx={{
        maxWidth: 600,
        minWidth: 600,
        ml: 5,
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      <Typography
        variant="h4"
        sx={{
          mt: 3,
        }}
      >
        Add Plan
      </Typography>
      <EditProductForm
        adminProduct={defaultAdminProduct}
        onSubmit={formSubmissionHandler}
        isLoading={loaderCtx.isLoading}
      />
    </Box>
  );
};

export default ProductForm;
