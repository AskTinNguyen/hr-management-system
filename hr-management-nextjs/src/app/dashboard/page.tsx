import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardStats } from '@/lib/mock-data';

export const metadata = {
  title: 'Dashboard | HR Management System',
  description: 'HR Management System Dashboard',
};

export default function DashboardPage() {
  const { employeeCount, departmentCount, positionCount } = dashboardStats;
  
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{employeeCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Departments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{departmentCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{positionCount}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No recent activity to display.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No upcoming events to display.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 