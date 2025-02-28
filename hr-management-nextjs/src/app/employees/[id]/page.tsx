import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'Employee Details | HR Management System',
  description: 'View employee details',
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
    .select(`
      *,
      departments:department_id(id, name),
      positions:position_id(id, title)
    `)
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching employee:', error);
    return null;
  }
  
  return employee;
}

export default async function EmployeeDetailPage({ params }: PageProps) {
  const employee = await getEmployee(params.id);
  
  if (!employee) {
    notFound();
  }
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employee Details</h1>
        <div className="space-x-2">
          <Link href={`/employees/${employee.id}/edit`}>
            <Button variant="outline">Edit</Button>
          </Link>
          <Link href="/employees">
            <Button variant="ghost">Back to List</Button>
          </Link>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>{employee.first_name} {employee.last_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Personal Information</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Email:</span> {employee.email}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {employee.phone || 'N/A'}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Employment Information</h3>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Department:</span> {employee.departments?.name || 'N/A'}
                </div>
                <div>
                  <span className="font-medium">Position:</span> {employee.positions?.title || 'N/A'}
                </div>
                <div>
                  <span className="font-medium">Hire Date:</span> {new Date(employee.hire_date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="destructive"
            onClick={() => {
              // Delete functionality will be implemented later
              console.log('Delete employee:', employee.id);
            }}
          >
            Delete Employee
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 