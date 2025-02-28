import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AttendanceForm from '@/components/attendance/attendance-form';

export const metadata = {
  title: 'Record Attendance | HR Management System',
  description: 'Record employee attendance',
};

async function getEmployees() {
  const supabase = createClient();
  
  const { data: employees, error } = await supabase
    .from('employees')
    .select('id, first_name, last_name')
    .order('last_name', { ascending: true });
  
  if (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
  
  return employees;
}

export default async function RecordAttendancePage() {
  const employees = await getEmployees();
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Record Attendance</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Attendance Form</CardTitle>
          <CardDescription>
            Record employee attendance including check-in and check-out times.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AttendanceForm employees={employees} />
        </CardContent>
      </Card>
    </div>
  );
} 