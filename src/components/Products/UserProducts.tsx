import {
  Container,
  GlobalStyles,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import config from '../../config/default';
import AuthContext from '../../store/auth-context';
import LoaderContext from '../../store/loader-context';
import { Product } from './models/product';
import UserProductsList from './UserProductsList';

const UserProducts: FC = (): ReactElement => {
  const authCtx = useContext(AuthContext);
  const loaderCtx = useContext(LoaderContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [intervalValue, setIntervalValue] = useState('monthly');

  const handleIntervalChange = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: string,
  ) => {
    setIntervalValue(value);
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

      const activeProducts = getProductsResponse.data.filter((product) => {
        return product.active === true;
      });

      setProducts(activeProducts);
      loaderCtx.setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }}
      />
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 2 }}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Pricing Plans
        </Typography>
      </Container>
      {loaderCtx.isLoading && (
        <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
          <Grid container spacing={5} alignItems="flex-end">
            <Grid item xs={12} md={4}>
              <Skeleton
                variant="rounded"
                width={260}
                height={310}
                animation="wave"
                sx={{
                  mr: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Skeleton
                variant="rounded"
                width={260}
                height={310}
                animation="wave"
                sx={{
                  mr: 2,
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Skeleton
                variant="rounded"
                width={260}
                height={310}
                animation="wave"
                sx={{
                  mr: 2,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      )}
      {!loaderCtx.isLoading && (
        <UserProductsList
          products={products}
          intervalValue={intervalValue}
          onIntervalChange={handleIntervalChange}
        />
      )}
    </>
  );
};

export default UserProducts;
