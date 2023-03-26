import { Box, CircularProgress } from '@mui/material';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import axios from 'axios';
import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import config from '../../config/default';
import AuthContext from '../../store/auth-context';
import LoaderContext from '../../store/loader-context';
import PaymentForm from './PaymentForm';

const Checkout: FC = (): ReactElement => {
  const { priceId } = useParams<{
    priceId: string;
  }>();
  const authCtx = useContext(AuthContext);
  const loaderCtx = useContext(LoaderContext);
  const history = useHistory();

  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);

  const [clientSecret, setClientSecret] = useState<string>('');
  const [subscriptionId, setSubscriptionId] = useState<string>('');

  const handlePaymentSuccess = async () => {
    history.push(`/subscriptions/${subscriptionId}/success`);
  };

  useEffect(() => {
    (async () => {
      loaderCtx.setIsLoading(true);

      try {
        const getPublishableKeyResponse = await axios.get<{
          publishableKey: string;
        }>(`${config.api.url}/billing/stripe-publishable-key`, {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        });
        const { publishableKey } = getPublishableKeyResponse.data;
        setStripePromise(loadStripe(publishableKey));

        const postSubscriptionResponse = await axios.post(
          `${config.api.url}/billing/subscriptions/prices/${priceId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authCtx.token}`,
            },
          },
        );

        const { clientSecret, subscriptionId } = postSubscriptionResponse.data;

        setClientSecret(clientSecret);
        setSubscriptionId(subscriptionId);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          // FIXME: remove console.log
          console.log('error', e.response);
        }
      }

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
          Checkout
        </Typography>
        {loaderCtx.isLoading ? (
          <Box
            sx={{
              minHeight: 350,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm
              onSuccess={handlePaymentSuccess}
              subscriptionId={subscriptionId}
            />
          </Elements>
        )}
      </Paper>
    </Container>
  );
};

export default Checkout;
