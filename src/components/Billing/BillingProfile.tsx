import { Box, Skeleton, Typography } from '@mui/material';
import axios from 'axios';
import { FC, ReactElement, useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/auth-context';
import config from '../../config/default';
import LoaderContext from '../../store/loader-context';
import { Subscription } from './subscription.model';
import SubscriptionsTable from './SubscriptionsTable';

const BillingProfile: FC = (): ReactElement => {
  const authCtx = useContext(AuthContext);
  const loaderCtx = useContext(LoaderContext);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  // TODO: add error handling
  const cancelSubscriptionHandler = async (subscriptionId: string) => {
    loaderCtx.setIsLoading(true);
    try {
      await axios.delete(
        `${config.api.url}/billing/subscriptions/${subscriptionId}`,
        {
          headers: {
            Authorization: `Bearer ${authCtx.token}`,
          },
        },
      );
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.filter(
          (subscription) => subscription.id !== subscriptionId,
        ),
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
      try {
        loaderCtx.setIsLoading(true);
        const getSubsResponse = await axios.get<Subscription[]>(
          `${config.api.url}/billing/subscriptions`,
          {
            headers: {
              Authorization: `Bearer ${authCtx.token}`,
            },
          },
        );
        setSubscriptions(getSubsResponse.data);
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
        Current Subscriptions
      </Typography>
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
        <SubscriptionsTable
          subscriptions={subscriptions}
          onCancelSubscription={cancelSubscriptionHandler}
        />
      )}
    </Box>
  );
};

export default BillingProfile;
