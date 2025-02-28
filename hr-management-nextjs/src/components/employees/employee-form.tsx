'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Define the form schema with Zod
const employeeFormSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  hire_date: z.string(),
  department_id: z.string().min(1, 'Department is required'),
  position_id: z.string().min(1, 'Position is required'),
});

type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

interface Department {
  id: string;
  name: string;
}

interface Position {
  id: string;
  title: string;
}

interface EmployeeFormProps {
  employee?: EmployeeFormValues & { id: string };
  mode: 'add' | 'edit';
}

export default function EmployeeForm({ employee, mode }: EmployeeFormProps) {
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: employee || {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      hire_date: new Date().toISOString().split('T')[0],
      department_id: '',
      position_id: '',
    },
  });
  
  useEffect(() => {
    async function fetchDepartmentsAndPositions() {
      const supabase = createClient();
      
      // Fetch departments
      const { data: departmentsData, error: departmentsError } = await supabase
        .from('departments')
        .select('id, name')
        .order('name');
      
      if (departmentsError) {
        console.error('Error fetching departments:', departmentsError);
        return;
      }
      
      // Fetch positions
      const { data: positionsData, error: positionsError } = await supabase
        .from('positions')
        .select('id, title')
        .order('title');
      
      if (positionsError) {
        console.error('Error fetching positions:', positionsError);
        return;
      }
      
      setDepartments(departmentsData || []);
      setPositions(positionsData || []);
    }
    
    fetchDepartmentsAndPositions();
  }, []);
  
  async function onSubmit(data: EmployeeFormValues) {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const supabase = createClient();
      
      if (mode === 'add') {
        // Add new employee
        const { error } = await supabase.from('employees').insert(data);
        
        if (error) throw error;
        
        router.push('/employees');
        router.refresh();
      } else if (mode === 'edit' && employee) {
        // Update existing employee
        const { error } = await supabase
          .from('employees')
          .update(data)
          .eq('id', employee.id);
        
        if (error) throw error;
        
        router.push(`/employees/${employee.id}`);
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving the employee');
      console.error('Error saving employee:', err);
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{mode === 'add' ? 'Add New Employee' : 'Edit Employee'}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-500 rounded-md">
            {error}
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="hire_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hire Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="department_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border rounded"
                        {...field}
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="position_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <select
                        className="w-full p-2 border rounded"
                        {...field}
                      >
                        <option value="">Select Position</option>
                        {positions.map((pos) => (
                          <option key={pos.id} value={pos.id}>
                            {pos.title}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : mode === 'add' ? 'Add Employee' : 'Update Employee'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
} 