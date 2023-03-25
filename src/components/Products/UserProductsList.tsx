import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import StarIcon from '@mui/icons-material/StarBorder';
import { FC, ReactElement } from 'react';
import { AdminProduct } from './models/adminProduct';

const UserProductsList: FC<{
  adminProducts: AdminProduct[];
  intervalValue: string;
  onIntervalChange: (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    value: string,
  ) => void;
}> = ({ adminProducts, intervalValue, onIntervalChange }): ReactElement => {
  return (
    <>
      <Container disableGutters maxWidth="sm" component="main" sx={{ pb: 8 }}>
        {adminProducts.length === 0 ? (
          <Typography
            variant="body1"
            align="center"
            color="text.primary"
            gutterBottom
          >
            No pricing plans found, ask your admin to add some !
          </Typography>
        ) : (
          <ToggleButtonGroup
            color="primary"
            value={intervalValue}
            exclusive
            onChange={onIntervalChange}
            size="small"
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <ToggleButton value="monthly">Monthly</ToggleButton>
            <ToggleButton value="yearly">Yearly</ToggleButton>
          </ToggleButtonGroup>
        )}
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {adminProducts.length > 0 &&
            adminProducts.map((product) => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={product.name} xs={12} md={4}>
                <Card>
                  <CardHeader
                    title={product.name}
                    subheader={product.mostPopular ? 'Most popular' : null}
                    titleTypographyProps={{ align: 'center' }}
                    action={product.mostPopular ? <StarIcon /> : null}
                    subheaderTypographyProps={{
                      align: 'center',
                    }}
                    sx={{
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                          ? theme.palette.grey[200]
                          : theme.palette.grey[700],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'baseline',
                        mb: 2,
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h3"
                        color="text.primary"
                      >
                        $
                        {intervalValue === 'monthly'
                          ? product.monthlyPriceAmount
                          : product.yearlyPriceAmount}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {intervalValue === 'monthly' ? '/mo' : '/yr'}
                      </Typography>
                    </Box>
                    <ul>
                      {product.features.split('\n').map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant={product.mostPopular ? 'contained' : 'outlined'}
                    >
                      Get Started
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
};

export default UserProductsList;
