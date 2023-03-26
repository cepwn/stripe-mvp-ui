import { Box, Breadcrumbs, Link, Skeleton, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { Link as RouterLink, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../store/auth-context';
import config from '../../config/default';
import { Product } from './models/product';
import EditProductForm from './EditProductForm';
import LoaderContext from '../../store/loader-context';

export type ProductFormOnSubmitParams = {
  name: string;
  features: string;
  monthlyPriceAmount: string;
  yearlyPriceAmount: string;
  active: boolean;
  mostPopular: boolean;
};

const EditProduct: FC<{ productId: string }> = (): ReactElement => {
  const { productId } = useParams<{ productId: string }>();
  const loaderCtx = useContext(LoaderContext);
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const [product, setProduct] = useState<Product | null>(null);

  // TODO: add error handling
  useEffect(() => {
    (async () => {
      loaderCtx.setIsLoading(true);
      const getProductResponse = await axios.get<Product>(
        `${config.api.url}/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        },
      );
      setProduct(getProductResponse.data);
      loaderCtx.setIsLoading(false);
    })();
  }, []);

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
      await axios.patch(
        `${config.api.url}/products/${productId}`,
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
      history.push('/admin/products');
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
      Edit Plan
    </Typography>,
  ];

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
        Edit Plan
      </Typography>
      {product ? (
        <EditProductForm
          product={product}
          onSubmit={formSubmissionHandler}
          isLoading={loaderCtx.isLoading}
        />
      ) : (
        <>
          <Skeleton
            variant="rounded"
            height={50}
            width={370}
            animation="wave"
            sx={{
              mt: 4,
              mb: 2,
            }}
          />
          <Skeleton
            variant="rounded"
            height={50}
            width={370}
            animation="wave"
            sx={{
              mb: 2,
            }}
          />
          <Skeleton
            variant="rounded"
            height={50}
            width={370}
            animation="wave"
            sx={{
              mb: 2,
            }}
          />
          <Skeleton
            variant="rounded"
            height={100}
            width={370}
            animation="wave"
            sx={{
              mb: 2,
            }}
          />
        </>
      )}
    </Box>
  );
};

export default EditProduct;
