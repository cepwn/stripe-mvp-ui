import { FC, ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import EditProduct from '../components/Products/EditProduct';

const EditProductPage: FC = (): ReactElement => {
  const params = useParams<{ productId: string }>();

  const { productId } = params;

  return <EditProduct productId={productId} />;
};

export default EditProductPage;
