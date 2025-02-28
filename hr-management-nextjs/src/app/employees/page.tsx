import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EmployeeTable from '@/components/employees/employee-table';
import { employees } from '@/lib/mock-data';

export const metadata = {
  title: 'Employees | HR Management System',
  description: 'Manage your employees',
};

export default function EmployeesPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employees</h1>
        <Link href="/employees/add">
          <Button>Add Employee</Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Employee Directory</CardTitle>
          <CardDescription>
            Manage your organization's employees. View, edit, or remove employee records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmployeeTable employees={employees} />
        </CardContent>
      </Card>
    </div>
  );
} 