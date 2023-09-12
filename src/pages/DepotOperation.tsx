import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { ProductSchema, depotSchema } from '../validators/depot';
import { Input } from '../components/ui/input'; // Import Shadcn UI components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Button } from '../components/ui/button';
// import { Table } from '../components/ui/table';
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

type DepotSchema = z.infer<typeof depotSchema>;

function DepotOperation() {
  const formData = useForm<DepotSchema>({
    resolver: zodResolver(depotSchema),
    defaultValues: {
      depotCode: '',
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

  const getTableFields = (data: DepotSchema): ProductSchema => {
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
    <div className="flex">
      {/* Left Section - Form */}
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">Form</h2>
        <Form {...formData}>
          <form onSubmit={handleFormSubmit}>
            <FormField
              control={formData.control}
              name="depotCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Depot Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={formData.control}
              name="transactionOption"
              render={({ field }) => (
                <FormItem>
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
              control={formData.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
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
            <FormField
              control={formData.control}
              name="product"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
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
                <FormItem>
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
            <FormItem>
              <Button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </Button>
            </FormItem>
          </form>
        </Form>
      </div>

      {/* Right Section - Table */}
      <div className="w-1/2 p-4">
        <h2 className="text-2xl font-bold mb-4">Table</h2>
        <DataTable data={tableData} columns={DepotColumns} />
      </div>
    </div>
  );
}

export default DepotOperation;
