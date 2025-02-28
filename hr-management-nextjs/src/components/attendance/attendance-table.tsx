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
import { format } from 'date-fns';
import { Eye, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
}

interface AttendanceRecord {
  id: string;
  employee_id: string;
  date: string;
  check_in: string;
  check_out: string | null;
  status: 'present' | 'absent' | 'late' | 'half_day';
  notes: string | null;
  employees: Employee;
}

interface AttendanceTableProps {
  attendanceRecords: AttendanceRecord[];
}

export default function AttendanceTable({ attendanceRecords }: AttendanceTableProps) {
  const formatTime = (time: string | null) => {
    if (!time) return 'Not recorded';
    return format(new Date(`2000-01-01T${time}`), 'h:mm a');
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    
    switch (status) {
      case 'present':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Present</span>;
      case 'absent':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Absent</span>;
      case 'late':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Late</span>;
      case 'half_day':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Half Day</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
    }
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Check In</TableHead>
            <TableHead>Check Out</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceRecords.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No attendance records found
              </TableCell>
            </TableRow>
          ) : (
            attendanceRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{format(new Date(record.date), 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  {record.employees.first_name} {record.employees.last_name}
                </TableCell>
                <TableCell>{formatTime(record.check_in)}</TableCell>
                <TableCell>{formatTime(record.check_out)}</TableCell>
                <TableCell>{getStatusBadge(record.status)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link href={`/attendance/${record.id}`}>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/attendance/${record.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
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