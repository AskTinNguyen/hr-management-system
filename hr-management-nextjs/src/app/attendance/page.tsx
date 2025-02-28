import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AttendanceTable from '@/components/attendance/attendance-table';
import { attendanceRecords } from '@/lib/mock-data';

export const metadata = {
  title: 'Attendance | HR Management System',
  description: 'Track employee attendance',
};

export default function AttendancePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Attendance Management</h1>
        <Link href="/attendance/record">
          <Button>Record Attendance</Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
          <CardDescription>
            Track and manage employee attendance records. View check-in and check-out times.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AttendanceTable attendanceRecords={attendanceRecords} />
        </CardContent>
      </Card>
    </div>
  );
} 