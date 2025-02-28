'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
}

interface AttendanceFormProps {
  employees: Employee[];
}

const attendanceFormSchema = z.object({
  employee_id: z.string({
    required_error: 'Please select an employee',
  }),
  date: z.string({
    required_error: 'Please select a date',
  }),
  check_in: z.string().optional(),
  check_out: z.string().optional(),
  status: z.enum(['present', 'absent', 'late', 'half_day'], {
    required_error: 'Please select a status',
  }),
  notes: z.string().optional(),
});

type AttendanceFormValues = z.infer<typeof attendanceFormSchema>;

export default function AttendanceForm({ employees }: AttendanceFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClientComponentClient();

  const defaultValues: Partial<AttendanceFormValues> = {
    date: format(new Date(), 'yyyy-MM-dd'),
    status: 'present',
  };

  const form = useForm<AttendanceFormValues>({
    resolver: zodResolver(attendanceFormSchema),
    defaultValues,
  });

  async function onSubmit(data: AttendanceFormValues) {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('attendance')
        .insert({
          employee_id: data.employee_id,
          date: data.date,
          check_in: data.check_in || null,
          check_out: data.check_out || null,
          status: data.status,
          notes: data.notes || null,
        });
      
      if (error) {
        console.error('Error recording attendance:', error);
        return;
      }
      
      router.push('/attendance');
      router.refresh();
    } catch (error) {
      console.error('Error recording attendance:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="employee_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an employee" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.first_name} {employee.last_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="check_in"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check In Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormDescription>
                  Leave empty for absent employees
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="check_out"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check Out Time</FormLabel>
                <FormControl>
                  <Input type="time" {...field} />
                </FormControl>
                <FormDescription>
                  Can be filled later
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="half_day">Half Day</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any additional notes here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Attendance Record'}
        </Button>
      </form>
    </Form>
  );
} 