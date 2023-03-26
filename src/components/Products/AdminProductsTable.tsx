import { Delete, Edit } from '@mui/icons-material';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Product } from './models/product';

const AdminProductsTable: FC<{
  products: Product[];
  onDeleteProduct: (productId: string) => void;
}> = ({ products, onDeleteProduct }): ReactElement => {
  return (
    <>
      {products.length === 0 ? (
        <Typography variant="body1">
          No pricing plans, try adding some !
        </Typography>
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Monthly Price</TableCell>
              <TableCell>Yearly Price</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Most Popular</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.monthlyPriceAmount}</TableCell>
                <TableCell>${product.yearlyPriceAmount}</TableCell>
                <TableCell>{product.active ? 'Yes' : 'No'}</TableCell>
                <TableCell>{product.mostPopular ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    component={Link}
                    to={`/admin/products/${product.id}/edit`}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => onDeleteProduct(product.id)}
                  >
                    <Delete />
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

export default AdminProductsTable;
