import { z } from 'zod';

export const depotSchema = z.object({
  depotCode: z.string(),
  depotFrom: z.string(),
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

export const saleSchema = z.object({
  customerName: z.string(),
  customerCode: z.string(),
  depotCode: z.string(),
  transactionOption: z.string(),
  memoNo: z.string(),
  date: z.date(),
  product: z.string(),
  productId: z.string(),
  category: z.string(),
  size: z.string(),
  quantity: z.number(),
});

export const balanceSchema = z.object({
  customer: z
    .string()
    .min(3, { message: 'Please provide Customer name' })
    .max(100),
  depot: z.string().min(3).max(100),
  date: z.string().min(2).max(10),
  particular: z.string().min(3).max(1000),
  transactionId: z.string().min(3).max(100),
  transactionType: z.string().min(3).max(100),
  amount: z.string().min(1).max(100000000),
});
