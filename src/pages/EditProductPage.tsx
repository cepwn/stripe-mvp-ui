import { Typography } from '@mui/material';
import { FC, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../components/Products/ProductForm';

const EditProductPage: FC = (): ReactElement => {
  const params = useParams<{ productId: string }>();

  const { productId } = params;

  return (
    <>
      <Typography variant="h4">Editing productId: {productId}</Typography>
      <ProductForm />;
    </>
  );
};

export default EditProductPage;
