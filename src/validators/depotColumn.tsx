import { ColumnDef } from '@tanstack/react-table';
import { ProductSchema } from './zodSchema';

const DepotColumns: ColumnDef<ProductSchema>[] = [
  {
    accessorKey: 'serial',
    header: 'Serial',
  },
  {
    accessorKey: 'product',
    header: 'Product',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
  },
];

export default DepotColumns;
