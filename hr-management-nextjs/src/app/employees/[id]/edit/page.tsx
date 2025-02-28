import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import EmployeeForm from '@/components/employees/employee-form';

export const metadata = {
  title: 'Edit Employee | HR Management System',
  description: 'Edit employee details',
};

interface PageProps {
  params: {
    id: string;
  };
}

async function getEmployee(id: string) {
  const supabase = createClient();
  
  const { data: employee, error } = await supabase
    .from('employees')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching employee:', error);
    return null;
  }
  
  return employee;
}

export default async function EditEmployeePage({ params }: PageProps) {
  const employee = await getEmployee(params.id);
  
  if (!employee) {
    notFound();
  }
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Edit Employee</h1>
      <EmployeeForm mode="edit" employee={employee} />
    </div>
  );
} 