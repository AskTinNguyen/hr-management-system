import EmployeeForm from '@/components/employees/employee-form';

export const metadata = {
  title: 'Add Employee | HR Management System',
  description: 'Add a new employee to the system',
};

export default function AddEmployeePage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Add New Employee</h1>
      <EmployeeForm mode="add" />
    </div>
  );
} 