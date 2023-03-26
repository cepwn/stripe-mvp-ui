import { Grid, Skeleton } from '@mui/material';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { format } from 'date-fns';
import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import config from '../../config/default';
import AuthContext from '../../store/auth-context';
import LoaderContext from '../../store/loader-context';
import { PriceInterval, Subscription } from '../Billing/subscription.model';

const PaymentSuccess: FC = (): ReactElement => {
  const authCtx = useContext(AuthContext);
  const loaderCtx = useContext(LoaderContext);

  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const { subscriptionId } = useParams<{
    subscriptionId: string;
  }>();

  // TODO: add error handling
  useEffect(() => {
    (async () => {
      loaderCtx.setIsLoading(true);
      const refreshSubscriptionResponse = await axios.patch<Subscription>(
        `${config.api.url}/billing/subscriptions/${subscriptionId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        },
      );
      setSubscription(refreshSubscriptionResponse.data);
      loaderCtx.setIsLoading(false);
    })();
  }, []);

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Payment Success
        </Typography>

        {!subscription && (
          <>
            <Skeleton
              variant="rounded"
              height={30}
              animation="wave"
              sx={{
                mb: 2,
                mt: 5,
              }}
            />
            <Skeleton
              variant="rounded"
              height={30}
              animation="wave"
              sx={{
                mb: 2,
              }}
            />
            <Skeleton
              variant="rounded"
              height={30}
              animation="wave"
              sx={{
                mb: 2,
              }}
            />
            <Skeleton
              variant="rounded"
              height={30}
              animation="wave"
              sx={{
                mb: 2,
              }}
            />
            <Skeleton
              variant="rounded"
              height={30}
              animation="wave"
              sx={{
                mb: 2,
              }}
            />
            <Skeleton
              variant="rounded"
              height={30}
              animation="wave"
              sx={{
                mb: 2,
              }}
            />
          </>
        )}
        {subscription && (
          <Grid container spacing={2}>
            <Grid item container direction="column" xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Order Summary
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Typography gutterBottom>Price Plan:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    {subscription.productName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Price:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    ${subscription.priceAmount}
                    {subscription.priceInterval === PriceInterval.Month
                      ? '/mo'
                      : '/yr'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Period Start Date:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    {format(new Date(subscription.currentPeriodStart), 'P')}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Period End Date:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    {format(new Date(subscription.currentPeriodEnd), 'P')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container direction="column" xs={12}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Payment details
              </Typography>
              <Grid container>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card Type:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    {subscription.cardName.charAt(0).toUpperCase() +
                      subscription.cardName.slice(1)}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Card Number:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>
                    XXXX-XXXX-XXXX-{subscription.cardLast4}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  );
};

export default PaymentSuccess;
