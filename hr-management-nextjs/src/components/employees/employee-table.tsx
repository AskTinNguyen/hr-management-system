'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface Department {
  id: string;
  name: string;
}

interface Position {
  id: string;
  title: string;
}

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  hire_date: string;
  departments: Department;
  positions: Position;
}

interface EmployeeTableProps {
  employees: Employee[];
}

export default function EmployeeTable({ employees }: EmployeeTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.first_name} ${employee.last_name}`.toLowerCase();
    const email = employee.email.toLowerCase();
    const department = employee.departments?.name?.toLowerCase() || '';
    const position = employee.positions?.title?.toLowerCase() || '';
    const search = searchTerm.toLowerCase();
    
    return (
      fullName.includes(search) ||
      email.includes(search) ||
      department.includes(search) ||
      position.includes(search)
    );
  });
  
  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search employees..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Department</th>
              <th className="p-2 text-left">Position</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-t hover:bg-gray-50">
                  <td className="p-2">
                    {employee.first_name} {employee.last_name}
                  </td>
                  <td className="p-2">{employee.email}</td>
                  <td className="p-2">{employee.departments?.name || 'N/A'}</td>
                  <td className="p-2">{employee.positions?.title || 'N/A'}</td>
                  <td className="p-2 space-x-2">
                    <Link href={`/employees/${employee.id}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                    <Link href={`/employees/${employee.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this employee?')) {
                          // Delete functionality will be implemented later
                          console.log('Delete employee:', employee.id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center">
                  {searchTerm ? 'No employees found matching your search.' : 'No employees found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 