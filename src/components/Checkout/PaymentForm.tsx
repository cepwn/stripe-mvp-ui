import { FC, ReactElement, useState } from 'react';
import { Box, Button } from '@mui/material';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';
import config from '../../config/default';

const PaymentForm: FC<{
  onSuccess: () => void;
  subscriptionId: string;
}> = ({ onSuccess, subscriptionId }): ReactElement => {
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();

  const formSubmissionHandler = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsFormLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${config.ui.url}/subscription/${subscriptionId}/success`,
      },
      redirect: 'if_required',
    });

    // TODO: handle error
    if (error) {
      console.log('ERROR: ', error);
      setIsFormLoading(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setIsFormLoading(false);
      onSuccess();
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={formSubmissionHandler}
      sx={{ mt: 3 }}
    >
      <Box
        sx={{
          minHeight: 290,
          width: '100%',
        }}
      >
        <PaymentElement />
      </Box>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={isFormLoading}
      >
        Pay Now
      </Button>
      <Button
        sx={{ mt: 3, mb: 2, ml: 3 }}
        component={Link}
        to="/products"
        disabled={isFormLoading}
      >
        Cancel
      </Button>
    </Box>
  );
};

export default PaymentForm;
