import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { balanceSchema } from '../validators/zodSchema';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

import { Input } from '../components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Button } from '../components/ui/button';
import {
  CUSTOMER_PROMPT,
  DEPOT_PROMPT,
  DATE_PROMPT,
  TRANSACTIONID_PROMPT,
  TRANSACTIONTYPE_PROMPT,
  AMOUNT_PROMPT,
  PARTICULAR_PROMPT,
} from '../assets/language/en/common';

type BalanceInput = z.infer<typeof balanceSchema>;
function Balance() {
  const form = useForm<BalanceInput>({
    resolver: zodResolver(balanceSchema),
    defaultValues: {
      customer: '',
      depot: '',
      date: '',
      particular: '',
      transactionId: '',
      transactionType: '',
      amount: '',
    },
  });
  // console.log(form.watch());

  function onSubmit(data: BalanceInput) {
    console.log(data);
  }
  const [invoices, setInvoices] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/sale/balance/')
      .then((res) => res.json())
      .then((data) => setInvoices(data.results));
  }, []);
  // console.log(invoices);
  // const invoices = [
  //   {
  //     invoice: 'INV001',
  //     paymentStatus: 'Paid',
  //     totalAmount: '$250.00',
  //     paymentMethod: 'Credit Card',
  //     type: 'Credit',
  //   },
  //   {
  //     invoice: 'INV002',
  //     paymentStatus: 'Pending',
  //     totalAmount: '$150.00',
  //     paymentMethod: 'PayPal',
  //     type: 'Credit',
  //   },
  //   {
  //     invoice: 'INV003',
  //     paymentStatus: 'Unpaid',
  //     totalAmount: '$350.00',
  //     paymentMethod: 'Bank Transfer',
  //     type: 'Debit',
  //   },
  //   {
  //     invoice: 'INV004',
  //     paymentStatus: 'Paid',
  //     totalAmount: '$450.00',
  //     paymentMethod: 'Credit Card',
  //     type: 'Credit',
  //   },
  //   {
  //     invoice: 'INV007',
  //     paymentStatus: 'Unpaid',
  //     totalAmount: '$300.00',
  //     paymentMethod: 'Credit Card',
  //     type: 'Credit',
  //   },
  // ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-slate-800 p-10 gap-3">
      <div className="mt-3">
        <div>
          <div>
            <Card className="border-slate-400 bg-gradient-to-r from-cyan-600 to-slate-600 login-box">
              <CardHeader>
                <CardTitle className=" text-purple-500 text-center font-bold text-4xl mb-2">
                  Operation
                </CardTitle>
                <CardDescription className="text-center font-semibold text-gray-200">
                  Please fill the form
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="customer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-bold text-white">
                            Customer
                          </FormLabel>
                          <FormControl>
                            <Input placeholder={CUSTOMER_PROMPT} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="depot"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-bold text-white">
                            Depot
                          </FormLabel>
                          <FormControl>
                            <Input placeholder={DEPOT_PROMPT} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-bold text-white">
                            Date
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={DATE_PROMPT}
                              {...field}
                              type="date"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="particular"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-bold text-white">
                            Particular
                          </FormLabel>
                          <FormControl>
                            <Input placeholder={PARTICULAR_PROMPT} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="transactionId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-bold text-white">
                            Transaction ID
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={TRANSACTIONID_PROMPT}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="transactionType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-bold text-white">
                            Transaction Type
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl className="bg-white">
                              <SelectTrigger>
                                <SelectValue
                                  placeholder={TRANSACTIONTYPE_PROMPT}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="debit">Debit</SelectItem>
                              <SelectItem value="credit">Credit</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-slate-300">
                            Select Your Transaction type
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-bold text-white">
                            Amount
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={AMOUNT_PROMPT}
                              {...field}
                              type="number"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className=" w-full bg-purple-500 text-white text-xl"
                    >
                      Submit
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mt-3 gap-10 bg-gradient-to-r from-cyan-600 to-slate-600 rounded-lg">
        <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
          <Input type="search" placeholder="search" />
          <Button
            type="submit"
            className="bg-purple-500 text-white text-sm w-1/4"
          >
            Search
          </Button>
        </div>
        <div className="border-slate-500 border-2 w-[600px] p-3">
          <Table>
            <TableCaption className=" text-white font-semibold">
              A list of your recent invoices
              <div className="flex gap-2 items-center justify-center">
                <button className="bg-slate-600 p-2 rounded-md">Prev</button>
                <button className="bg-slate-600 p-2 rounded-md">Next</button>
              </div>
            </TableCaption>
            <TableHeader className="w-full">
              <TableRow>
                <TableHead className="text-white font-bold text-base">
                  Depot
                </TableHead>
                <TableHead className="text-white font-bold text-base">
                  Customer
                </TableHead>
                <TableHead className="text-white font-bold text-base">
                  Transaction ID
                </TableHead>
                <TableHead className="text-white font-bold text-base">
                  Type
                </TableHead>
                <TableHead className="text-white font-bold text-base">
                  Amount
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.customer.code}
                  </TableCell>
                  <TableCell>{invoice.customer.name}</TableCell>
                  <TableCell>{invoice.transaction_id}</TableCell>
                  <TableCell>{invoice.category}</TableCell>
                  <TableCell className="text-right">{invoice.amount}</TableCell>
                </TableRow>
              ))}
              {/* {invoices.map((invoice) => (
                <div key={invoice.results.id}></div>
              ))} */}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-around gap-4">
          <Button
            type="submit"
            className="bg-purple-500 text-white text-sm w-56"
          >
            Edit
          </Button>
          <Button
            type="submit"
            className=" bg-purple-500 text-white text-sm w-56"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Balance;
