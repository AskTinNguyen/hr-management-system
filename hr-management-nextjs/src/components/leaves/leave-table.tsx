'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format, differenceInBusinessDays, addDays } from 'date-fns';
import { Eye, Edit, Check, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
}

interface LeaveRequest {
  id: string;
  employee_id: string;
  start_date: string;
  end_date: string;
  leave_type: 'annual' | 'sick' | 'personal' | 'maternity' | 'paternity' | 'unpaid';
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  employees: Employee;
}

interface LeaveTableProps {
  leaveRequests: LeaveRequest[];
}

export default function LeaveTable({ leaveRequests }: LeaveTableProps) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [localLeaveRequests, setLocalLeaveRequests] = useState<LeaveRequest[]>(leaveRequests);

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    // Add 1 to include both start and end dates
    return differenceInBusinessDays(addDays(end, 1), start);
  };

  const getLeaveTypeBadge = (leaveType: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    
    switch (leaveType) {
      case 'annual':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Annual</span>;
      case 'sick':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Sick</span>;
      case 'personal':
        return <span className={`${baseClasses} bg-purple-100 text-purple-800`}>Personal</span>;
      case 'maternity':
        return <span className={`${baseClasses} bg-pink-100 text-pink-800`}>Maternity</span>;
      case 'paternity':
        return <span className={`${baseClasses} bg-indigo-100 text-indigo-800`}>Paternity</span>;
      case 'unpaid':
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Unpaid</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{leaveType}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    
    switch (status) {
      case 'pending':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pending</span>;
      case 'approved':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Approved</span>;
      case 'rejected':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Rejected</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  const updateLeaveStatus = async (id: string, status: 'approved' | 'rejected') => {
    setUpdatingId(id);
    
    try {
      // Update local state instead of calling Supabase
      setLocalLeaveRequests(prevRequests => 
        prevRequests.map(request => 
          request.id === id ? { ...request, status } : request
        )
      );
      
      // Simulate a delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error('Error updating leave request:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Employee</TableHead>
            <TableHead>Leave Type</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {localLeaveRequests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                No leave requests found
              </TableCell>
            </TableRow>
          ) : (
            localLeaveRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  {request.employees.first_name} {request.employees.last_name}
                </TableCell>
                <TableCell>{getLeaveTypeBadge(request.leave_type)}</TableCell>
                <TableCell>{format(new Date(request.start_date), 'MMM dd, yyyy')}</TableCell>
                <TableCell>{format(new Date(request.end_date), 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  {calculateDuration(request.start_date, request.end_date)} day(s)
                </TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/leaves/${request.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    {request.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateLeaveStatus(request.id, 'approved')}
                          disabled={updatingId === request.id}
                        >
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateLeaveStatus(request.id, 'rejected')}
                          disabled={updatingId === request.id}
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
} 