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
import { AdminProduct } from './models/adminProduct';

const AdminProductsTable: FC<{
  adminProducts: AdminProduct[];
  onDeleteProduct: (productId: string) => void;
}> = ({ adminProducts, onDeleteProduct }): ReactElement => {
  return (
    <>
      {adminProducts.length === 0 ? (
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
            {adminProducts.map((adminProduct) => (
              <TableRow key={adminProduct.id}>
                <TableCell>{adminProduct.name}</TableCell>
                <TableCell>${adminProduct.monthlyPriceAmount}/mo</TableCell>
                <TableCell>${adminProduct.yearlyPriceAmount}/yr</TableCell>
                <TableCell>{adminProduct.active ? 'Yes' : 'No'}</TableCell>
                <TableCell>{adminProduct.mostPopular ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    component={Link}
                    to={`/admin/products/${adminProduct.id}/edit`}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => onDeleteProduct(adminProduct.id)}
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
