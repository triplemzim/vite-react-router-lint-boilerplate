import { z } from 'zod';

export const depotSchema = z.object({
  depotCode: z.string(),
  transactionOption: z.string(),
  date: z.date(),
  product: z.string(),
  productId: z.string(),
  category: z.string(),
  size: z.string(),
  quantity: z.number(),
});

export type ProductSchema = {
  serial: number;
  id: string;
  product: string;
  category: string;
  size: string;
  quantity: number;
};
