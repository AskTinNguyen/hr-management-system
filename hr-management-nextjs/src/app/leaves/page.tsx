import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LeaveTable from '@/components/leaves/leave-table';
import { leaveRequests } from '@/lib/mock-data';

export const metadata = {
  title: 'Leave Management | HR Management System',
  description: 'Manage employee leave requests',
};

export default function LeavesPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Leave Management</h1>
        <Link href="/leaves/request">
          <Button>Request Leave</Button>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>
            Manage employee leave requests. Approve or reject leave applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LeaveTable leaveRequests={leaveRequests} />
        </CardContent>
      </Card>
    </div>
  );
} 