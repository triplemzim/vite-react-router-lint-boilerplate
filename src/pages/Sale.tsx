import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { ProductSchema, saleSchema } from '../validators/zodSchema';
import { Input } from '../components/ui/input'; // Import Shadcn UI components
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
import { DataTable } from '@/components/ui/data-table';
import DepotColumns from '@/validators/depotColumn';

type SaleSchema = z.infer<typeof saleSchema>;

function Sale() {
  const formData = useForm<SaleSchema>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      customerName: '',
      customerCode: '',
      depotCode: '',
      memoNo: '',
      transactionOption: '',
      date: new Date(),
      product: '',
      productId: '',
      category: '',
      size: '',
      quantity: 0,
    },
  });

  const [tableData, setTableData] = useState<ProductSchema[]>([]);

  const getTableFields = (data: SaleSchema): ProductSchema => {
    return {
      serial: tableData.length + 1,
      id: data.productId,
      product: data.product,
      category: data.category,
      size: data.size,
      quantity: data.quantity,
    };
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Clear the form fields after submission
    // console.log(formData.getValues());
    setTableData((current) => [
      ...current,
      getTableFields(formData.getValues()),
    ]);
    console.log(tableData);
  };

  return (
    <div className="flex bg-slate-200">
      {/* Left Section - Form */}
      <div className="w-full lg:w-1/2 p-4 max-h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-4">Depot Operation</h2>
        <Form {...formData}>
          <form className="" onSubmit={handleFormSubmit}>
            <div className="border-2 p-8 bg-white">
              <FormField
                control={formData.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Customer</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={formData.control}
                name="depotCode"
                render={({ field }) => (
                  <FormItem className="mb-4 h-full">
                    <FormLabel>Depot</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={formData.control}
                name="memoNo"
                render={({ field }) => (
                  <FormItem className="mb-4 h-full">
                    <FormLabel>Memo No</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex items-center ">
                <FormField
                  control={formData.control}
                  name="transactionOption"
                  render={({ field }) => (
                    <FormItem className="mr-4">
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
                          <SelectItem value="new_arrival">
                            New Arrival
                          </SelectItem>
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
                  control={formData.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
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
            </div>
            <div className="border-2 p-8 mt-4 bg-white">
              <FormField
                control={formData.control}
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
                control={formData.control}
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
                control={formData.control}
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
                control={formData.control}
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
          <DataTable data={tableData} columns={DepotColumns} />
        </div>
      </div>
    </div>
  );
}

export default Sale;
