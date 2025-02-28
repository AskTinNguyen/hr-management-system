import { createClient } from '@/lib/supabase/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import LeaveRequestForm from '@/components/leaves/leave-request-form';

export const metadata = {
  title: 'Request Leave | HR Management System',
  description: 'Submit a leave request',
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

export default async function RequestLeavePage() {
  const employees = await getEmployees();
  
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Request Leave</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Leave Request Form</CardTitle>
          <CardDescription>
            Submit a leave request for approval. Please provide all required information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LeaveRequestForm employees={employees} />
        </CardContent>
      </Card>
    </div>
  );
} 