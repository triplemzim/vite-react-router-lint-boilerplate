import { ColumnDef } from '@tanstack/react-table';
import { ProductSchema } from './depot';

const DepotColumns: ColumnDef<ProductSchema>[] = [
  {
    accessorKey: 'serial',
    header: 'ID',
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
