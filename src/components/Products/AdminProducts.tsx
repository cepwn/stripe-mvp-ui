import { Box, Button, Skeleton, Typography } from '@mui/material';
import axios from 'axios';
import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import { Product } from './models/product';
import config from '../../config/default';
import LoaderContext from '../../store/loader-context';
import AdminProductsTable from './AdminProductsTable';

const AdminProducts: FC = (): ReactElement => {
  const authCtx = useContext(AuthContext);
  const loaderCtx = useContext(LoaderContext);
  const [products, setProducts] = useState<Product[]>([]);

  // TODO: add error handling
  const deleteProductHandler = async (id: string) => {
    loaderCtx.setIsLoading(true);
    try {
      await axios.delete(`${config.api.url}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id),
      );
    } catch (e) {
      if (axios.isAxiosError(e)) {
        // FIXME: remove console.log
        console.log('error', e.response);
      }
    }
    loaderCtx.setIsLoading(false);
  };

  // TODO: add error handling
  useEffect(() => {
    (async () => {
      loaderCtx.setIsLoading(true);
      const getProductsResponse = await axios.get<Product[]>(
        `${config.api.url}/products`,
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        },
      );
      setProducts(getProductsResponse.data);
      loaderCtx.setIsLoading(false);
    })();
  }, []);

  return (
    <Box
      component="main"
      sx={{
        maxWidth: 'xs',
        ml: 5,
        mr: 5,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mt: 6,
          mb: 3,
        }}
      >
        Edit Pricing Plans
      </Typography>
      <Button
        sx={{
          marginBottom: 4,
        }}
        variant="contained"
        size="small"
        component={Link}
        to="/admin/products/new"
      >
        + Add Plan
      </Button>
      {loaderCtx.isLoading ? (
        <>
          <Skeleton
            variant="rounded"
            height={50}
            animation="wave"
            sx={{
              mb: 2,
            }}
          />
          <Skeleton
            variant="rounded"
            height={50}
            animation="wave"
            sx={{
              mb: 2,
            }}
          />
        </>
      ) : (
        <AdminProductsTable
          products={products}
          onDeleteProduct={deleteProductHandler}
        />
      )}
    </Box>
  );
};

export default AdminProducts;
