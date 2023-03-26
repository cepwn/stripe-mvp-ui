import { Cancel } from '@mui/icons-material';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import { FC, ReactElement } from 'react';
import { PriceInterval, Subscription } from './subscription.model';

const SubscriptionsTable: FC<{
  subscriptions: Subscription[];
  onCancelSubscription: (subscriptionId: string) => void;
}> = ({ subscriptions, onCancelSubscription }): ReactElement => {
  return (
    <>
      {subscriptions.length === 0 ? (
        <Typography variant="body1">
          Not currently signed up for any plans, go subscribe !
        </Typography>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Plan</TableCell>
              <TableCell>Recurring Price</TableCell>
              <TableCell>Period Start</TableCell>
              <TableCell>Period End</TableCell>
              <TableCell>Card Type</TableCell>
              <TableCell>Card Last4</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptions.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>{sub.productName}</TableCell>
                <TableCell>
                  ${sub.priceAmount}
                  {sub.priceInterval === PriceInterval.Month ? '/mo' : '/yr'}
                </TableCell>
                <TableCell>
                  {format(new Date(sub.currentPeriodStart), 'P')}
                </TableCell>
                <TableCell>
                  {format(new Date(sub.currentPeriodEnd), 'P')}
                </TableCell>
                <TableCell>
                  {sub.cardName.charAt(0).toUpperCase() + sub.cardName.slice(1)}
                </TableCell>
                <TableCell>{sub.cardLast4}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={() => onCancelSubscription(sub.id)}
                  >
                    <Cancel />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default SubscriptionsTable;
