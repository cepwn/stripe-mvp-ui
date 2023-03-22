import { FC, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import ProductForm from '../components/Products/ProductForm';

const EditProductPage: FC = (): ReactElement => {
  const params = useParams<{ productId: string }>();

  const { productId } = params;

  return (
    <>
      <h1>Editing productId: {productId}</h1>
      <ProductForm />;
    </>
  );
};

export default EditProductPage;
