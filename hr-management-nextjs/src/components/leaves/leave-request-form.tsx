'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
// import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
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
import { addDays, format, differenceInBusinessDays } from 'date-fns';

// Mock client for local development
const mockLeaveRequests = [];

const createMockClient = () => {
  return {
    from: (table: string) => {
      return {
        insert: (data: any) => {
          if (table === 'leave_requests') {
            // Add the new leave request to our mock data
            const newLeaveRequest = {
              id: (mockLeaveRequests.length + 1).toString(),
              ...data,
              created_at: new Date().toISOString()
            };
            mockLeaveRequests.push(newLeaveRequest);
            console.log('Leave request submitted:', newLeaveRequest);
            
            return Promise.resolve({
              data: newLeaveRequest,
              error: null
            });
          }
          
          return Promise.resolve({
            data: null,
            error: null
          });
        }
      };
    }
  };
};

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
}

interface LeaveRequestFormProps {
  employees: Employee[];
}

const leaveRequestSchema = z.object({
  employee_id: z.string({
    required_error: 'Please select an employee',
  }),
  start_date: z.string({
    required_error: 'Please select a start date',
  }),
  end_date: z.string({
    required_error: 'Please select an end date',
  }),
  leave_type: z.enum(['annual', 'sick', 'personal', 'maternity', 'paternity', 'unpaid'], {
    required_error: 'Please select a leave type',
  }),
  reason: z.string().min(5, {
    message: 'Reason must be at least 5 characters',
  }),
})
.refine(
  (data) => {
    const start = new Date(data.start_date);
    const end = new Date(data.end_date);
    return start <= end;
  },
  {
    message: 'End date must be after start date',
    path: ['end_date'],
  }
);

type LeaveRequestFormValues = z.infer<typeof leaveRequestSchema>;

export default function LeaveRequestForm({ employees }: LeaveRequestFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [duration, setDuration] = useState(0);
  // const supabase = createClientComponentClient();
  const supabase = createMockClient();

  const defaultValues: Partial<LeaveRequestFormValues> = {
    start_date: format(new Date(), 'yyyy-MM-dd'),
    end_date: format(new Date(), 'yyyy-MM-dd'),
    leave_type: 'annual',
  };

  const form = useForm<LeaveRequestFormValues>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues,
  });

  const calculateDuration = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) return 0;
    
    // Add 1 to include both start and end dates
    return differenceInBusinessDays(addDays(end, 1), start);
  };

  const updateDuration = () => {
    const startDate = form.watch('start_date');
    const endDate = form.watch('end_date');
    
    if (startDate && endDate) {
      const days = calculateDuration(startDate, endDate);
      setDuration(days);
    }
  };

  async function onSubmit(data: LeaveRequestFormValues) {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('leave_requests')
        .insert({
          employee_id: data.employee_id,
          start_date: data.start_date,
          end_date: data.end_date,
          leave_type: data.leave_type,
          reason: data.reason,
          status: 'pending',
        });
      
      if (error) {
        console.error('Error submitting leave request:', error);
        return;
      }
      
      router.push('/leaves');
      router.refresh();
    } catch (error) {
      console.error('Error submitting leave request:', error);
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e);
                      updateDuration();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e);
                      updateDuration();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-sm font-medium">
            Duration: <span className="font-bold">{duration} working day(s)</span>
          </p>
        </div>
        
        <FormField
          control={form.control}
          name="leave_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leave Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a leave type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="annual">Annual Leave</SelectItem>
                  <SelectItem value="sick">Sick Leave</SelectItem>
                  <SelectItem value="personal">Personal Leave</SelectItem>
                  <SelectItem value="maternity">Maternity Leave</SelectItem>
                  <SelectItem value="paternity">Paternity Leave</SelectItem>
                  <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Please provide a reason for your leave request"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Leave Request'}
        </Button>
      </form>
    </Form>
  );
} 