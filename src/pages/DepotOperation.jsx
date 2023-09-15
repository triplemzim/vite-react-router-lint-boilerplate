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

function DepotOperation() {
  const form = useForm({
    defaultValues: {
      depotCode: '',
      depotFrom: '',
      transactionOption: '',
      date: new Date(),
      product: '',
      productId: '',
      category: '',
      size: '',
      quantity: 0,
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

  function logout() {
    navigate('/login');
  }

  function openAdminInNewTab() {
    window.open(ADMIN_URL, '_blank', 'noreferrer');
  }

  const onSubmit = (data) => {
    // Clear the form fields after submission
    // console.log(formData.getValues());
    setTableData((current) => [...current, getTableFields(data)]);
    console.log(tableData);
  };

  return (
    <div className="flex bg-slate-200">
      <div className="fixed w-full">
        <div className="grid grid-cols-6 gap-4 bg-gradient-to-r h-12 from-cyan-500 to-slate-800 p-4 content-center">
          <div className='col-start-1 col-span-2 text-center justify-self-start'>
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
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 p-4 max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Depot Operation</h2>
        <Form {...form}>
          <form className="" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="border-2 p-8 bg-white">
              <FormField
                control={form.control}
                name="depotCode"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Depot Code</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="depotCode"
                render={({ field }) => (
                  <FormItem className="mb-4 h-full">
                    <FormLabel>Depot From</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="transactionOption"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Transaction Option</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="new_arrival">New Arrival</SelectItem>
                        <SelectItem value="other_depot">
                          Received from Other Depot
                        </SelectItem>
                        <SelectItem value="factory_return">
                          Factory Return
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
                    <FormLabel>Transaction Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
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
            <div className="border-2 p-8 mt-4 bg-white">
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Product</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Size</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex">
              <FormItem>
                <Button className="bg-gray-600 text-white px-4 py-2 m-4 rounded-md hover:bg-gray-700">
                  Add Product
                </Button>
              </FormItem>
              <FormItem>
                <Button className="bg-red-500 text-white px-4 py-2 m-4 rounded-md hover:bg-red-600">
                  Delete Item
                </Button>
              </FormItem>
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
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-bold text-center mb-4">Summary</h2>
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
          </Table>
        </div>
      </div>
    </div>
  );
}

export default DepotOperation;
