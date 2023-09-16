import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../components/ui/input'; // Import Shadcn UI components
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Button } from '../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../components/ui/form';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AutoComplete } from '@/components/ui/AutoComplete';

const datas = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

function Sale() {
  const form = useForm({
    defaultValues: {
      customerName: '',
      customerCode: '',
      depotCode: '',
      memoNo: '',
      transactionOption: 'new_sale',
      date: new Date(),
      product: '',
      productId: '',
      category: '',
      size: '',
      quantity: 0,
      stock: 0,
    },
  });

  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  const getTableFields = (data) => {
    return {
      serial: tableData.length + 1,
      id: data.productId,
      product: data.product,
      category: data.category,
      size: data.size,
      quantity: data.quantity,
    };
  };

  const onSubmit = (data) => {
    // Clear the form fields after submission
    // console.log(formData.getValues());
    setTableData((current) => [...current, getTableFields(data)]);
    console.log(tableData);
  };

  function logout() {
    navigate('/login');
  }

  function openAdminInNewTab() {
    window.open(ADMIN_URL, '_blank', 'noreferrer');
  }

  return (
    <div className="h-full">
      <div className="fixed w-full">
        <div className="grid grid-cols-6 gap-4 bg-gradient-to-r h-12 from-cyan-500 to-slate-800 p-4 content-center">
          <div className="col-start-1 col-span-2 text-center justify-self-start">
            <Button
              variant="ghost"
              className="text-white border-solid"
              onClick={() => navigate('/')}
            >
              PCL Home
            </Button>
          </div>
          <div className="col-end-7 col-span-2 justify-self-end">
            <Button
              variant="ghost"
              className="text-white border-solid"
              onClick={() => openAdminInNewTab()}
            >
              Admin
            </Button>
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => logout()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="h-screen overflow-auto flex bg-slate-200">
        {/* Left Section - Form */}
        <div className="w-full lg:w-1/2 p-4 mt-12 space-y-2">
          <h2 className="text-xl font-bold text-center mb-4">Sale</h2>
          <Form {...form}>
            <form className="" onSubmit={form.handleSubmit(onsubmit)}>
              <div className="border-2 p-4 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <div>
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-xs">Customer</FormLabel>
                          <FormControl>
                            <AutoComplete
                              data={datas}
                              onSelect={(selected) =>
                                console.log('Object selected', selected)
                              }
                            />
                          </FormControl>
                        </FormItem>
                      </div>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="depotCode"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Depot</FormLabel>
                        <FormControl>
                          <AutoComplete
                            data={datas}
                            onSelect={(selected) =>
                              console.log('Object selected', selected)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="transactionOption"
                    render={({ field }) => (
                      <FormItem className="flex-col">
                        <FormLabel>Transaction Option</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="new_sale">New Sale</SelectItem>
                            <SelectItem value="sales_return">
                              Sales return
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover className="align-bottom">
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  'w-[200px] pl-3 h-8 text-xs text-left font-normal',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="memoNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Memo no</FormLabel>
                      <FormControl>
                        <Input
                          className="w-[200px]"
                          placeholder="Memo"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="border-2 p-4 mt-4 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="product"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Product</FormLabel>
                        <FormControl>
                          <AutoComplete
                            data={datas}
                            onSelect={(selected) =>
                              console.log('Object selected', selected)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <AutoComplete
                            data={datas}
                            onSelect={(selected) =>
                              console.log('Object selected', selected)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center justify-between space-x-4">
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Size</FormLabel>
                        <FormControl>
                          <AutoComplete
                            className=""
                            data={datas}
                            onSelect={(selected) =>
                              console.log('Object selected', selected)
                            }
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <p className="w-[200px] rounded-md p-1 pl-2 bg-slate-300 border-black">
                            {field.value}
                          </p>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-end justify-between">
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex space-between space-x-4">
                    <FormItem>
                      <Button className="bg-gray-600 text-white rounded-md hover:bg-gray-700">
                        Add or Update
                      </Button>
                    </FormItem>
                    <FormItem>
                      <Button className="bg-red-500 text-white rounded-md hover:bg-red-600">
                        Delete Item
                      </Button>
                    </FormItem>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <FormItem>
                  <Button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 m-4 rounded-md hover:bg-blue-600"
                  >
                    Submit
                  </Button>
                </FormItem>
              </div>
            </form>
          </Form>
        </div>

        {/* Right Section - Table */}
        <div className="w-1/2 p-4 mt-12">
          <h2 className="text-xl font-bold text-center mb-4">Summary</h2>
          <div className="bg-gray-100">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sale;
