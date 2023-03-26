import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { FC, ReactElement, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import useInput from '../../hooks/use-input';
import { ProductFormOnSubmitParams } from './EditProduct';
import { Product } from './models/product';

const ProductForm: FC<{
  product: Product;
  onSubmit: (params: ProductFormOnSubmitParams) => void;
  isLoading: boolean;
}> = ({ product, onSubmit, isLoading }): ReactElement => {
  const {
    name,
    features,
    active,
    mostPopular,
    monthlyPriceAmount,
    yearlyPriceAmount,
  } = product;

  const [activeValue, setActiveValue] = useState<boolean>(active);
  const [mostPopularValue, setMostPopularValue] =
    useState<boolean>(mostPopular);

  const activeChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setActiveValue(event.target.checked);
  };

  const mostPopularChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setMostPopularValue(event.target.checked);
  };

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    keyDownHandler: nameKeyDownHandler,
  } = useInput((value) => value.trim().length > 0, name);

  const {
    value: monthlyPriceAmountValue,
    isValid: monthlyPriceAmountIsValid,
    hasError: monthlyPriceAmountHasError,
    valueChangeHandler: monthlyPriceAmountChangeHandler,
    inputBlurHandler: monthlyPriceAmountBlurHandler,
    keyDownHandler: monthlyPriceAmountKeyDownHandler,
  } = useInput((value) => /^\d+\.\d{2}$/.test(value), monthlyPriceAmount);

  const {
    value: yearlyPriceAmountValue,
    isValid: yearlyPriceAmountIsValid,
    hasError: yearlyPriceAmountHasError,
    valueChangeHandler: yearlyPriceAmountChangeHandler,
    inputBlurHandler: yearlyPriceAmountBlurHandler,
    keyDownHandler: yearlyPriceAmountKeyDownHandler,
  } = useInput((value) => /^\d+\.\d{2}$/.test(value), yearlyPriceAmount);

  const {
    value: featuresValue,
    isValid: featurestIsValid,
    hasError: featuresHasError,
    valueChangeHandler: featuresChangeHandler,
    inputBlurHandler: featuresBlurHandler,
    keyDownHandler: featuresKeyDownHandler,
  } = useInput((value) => value.trim().length > 0, features);

  const formSubmissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      !nameIsValid ||
      !monthlyPriceAmountIsValid ||
      !yearlyPriceAmountIsValid ||
      !featurestIsValid
    ) {
      return;
    }

    onSubmit({
      name: nameValue,
      features: featuresValue,
      active: activeValue,
      mostPopular: mostPopularValue,
      monthlyPriceAmount: monthlyPriceAmountValue,
      yearlyPriceAmount: yearlyPriceAmountValue,
    });
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={formSubmissionHandler}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={nameValue}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                onKeyDown={nameKeyDownHandler}
                error={nameHasError}
                helperText={nameHasError && 'Name is required'}
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="monthlyPriceAmount"
                label="Monthly Price"
                id="monthlyPriceAmount"
                value={monthlyPriceAmountValue}
                onChange={monthlyPriceAmountChangeHandler}
                onBlur={monthlyPriceAmountBlurHandler}
                onKeyDown={monthlyPriceAmountKeyDownHandler}
                error={monthlyPriceAmountHasError}
                helperText={
                  monthlyPriceAmountHasError &&
                  'Monthly must be a number with two decimal places'
                }
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="yearlyPriceAmount"
                label="Yearly Price"
                id="yearlyPriceAmount"
                value={yearlyPriceAmountValue}
                onChange={yearlyPriceAmountChangeHandler}
                onBlur={yearlyPriceAmountBlurHandler}
                onKeyDown={yearlyPriceAmountKeyDownHandler}
                error={yearlyPriceAmountHasError}
                helperText={
                  yearlyPriceAmountHasError &&
                  'Monthly must be a number with two decimal places'
                }
                disabled={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                rows={4}
                required
                fullWidth
                name="features"
                label="Features"
                id="features"
                value={featuresValue}
                onChange={featuresChangeHandler}
                onBlur={featuresBlurHandler}
                onKeyDown={featuresKeyDownHandler}
                error={featuresHasError}
                helperText={featuresHasError && 'Features is required'}
                disabled={isLoading}
                placeholder="Separate features with a new line. Recommended for appearance: same amount of lines accross all plans."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            Save
          </Button>
          <Button
            sx={{ mt: 3, mb: 2, ml: 3 }}
            component={RouterLink}
            to="/admin/products"
            disabled={isLoading}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Typography variant="caption" gutterBottom>
                Settings
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={activeValue}
                    color="primary"
                    onChange={activeChangeHandler}
                    disabled={isLoading}
                  />
                }
                label="Active"
                id="active"
                name="active"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={mostPopularValue}
                    color="primary"
                    onChange={mostPopularChangeHandler}
                    disabled={isLoading}
                  />
                }
                label="Most Popular"
                sx={{ minWidth: 150 }}
                id="mostPopular"
                name="mostPopular"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductForm;
