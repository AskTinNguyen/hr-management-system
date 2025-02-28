// Mock data for HR Management System

// Departments
export const departments = [
  { id: '1', name: 'Engineering' },
  { id: '2', name: 'Marketing' },
  { id: '3', name: 'Human Resources' },
  { id: '4', name: 'Finance' },
  { id: '5', name: 'Operations' },
];

// Positions
export const positions = [
  { id: '1', title: 'Software Engineer' },
  { id: '2', title: 'Marketing Specialist' },
  { id: '3', title: 'HR Manager' },
  { id: '4', title: 'Financial Analyst' },
  { id: '5', title: 'Operations Manager' },
  { id: '6', title: 'Senior Developer' },
  { id: '7', title: 'Product Manager' },
];

// Employees
export const employees = [
  {
    id: '1',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-123-4567',
    hire_date: '2022-01-15',
    departments: departments[0],
    positions: positions[0],
  },
  {
    id: '2',
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane.smith@example.com',
    phone: '555-987-6543',
    hire_date: '2022-02-20',
    departments: departments[1],
    positions: positions[1],
  },
  {
    id: '3',
    first_name: 'Michael',
    last_name: 'Johnson',
    email: 'michael.johnson@example.com',
    phone: '555-456-7890',
    hire_date: '2022-03-10',
    departments: departments[2],
    positions: positions[2],
  },
  {
    id: '4',
    first_name: 'Emily',
    last_name: 'Williams',
    email: 'emily.williams@example.com',
    phone: '555-789-0123',
    hire_date: '2022-04-05',
    departments: departments[3],
    positions: positions[3],
  },
  {
    id: '5',
    first_name: 'David',
    last_name: 'Brown',
    email: 'david.brown@example.com',
    phone: '555-234-5678',
    hire_date: '2022-05-12',
    departments: departments[4],
    positions: positions[4],
  },
  {
    id: '6',
    first_name: 'Sarah',
    last_name: 'Miller',
    email: 'sarah.miller@example.com',
    phone: '555-345-6789',
    hire_date: '2022-06-18',
    departments: departments[0],
    positions: positions[5],
  },
  {
    id: '7',
    first_name: 'Robert',
    last_name: 'Wilson',
    email: 'robert.wilson@example.com',
    phone: '555-567-8901',
    hire_date: '2022-07-22',
    departments: departments[0],
    positions: positions[6],
  },
];

// Attendance Records
export const attendanceRecords = [
  {
    id: '1',
    employee_id: '1',
    date: '2024-02-25',
    check_in: '09:00:00',
    check_out: '17:00:00',
    status: 'present' as const,
    notes: null,
    employees: {
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
    },
  },
  {
    id: '2',
    employee_id: '2',
    date: '2024-02-25',
    check_in: '09:15:00',
    check_out: '17:30:00',
    status: 'late' as const,
    notes: 'Traffic delay',
    employees: {
      id: '2',
      first_name: 'Jane',
      last_name: 'Smith',
    },
  },
  {
    id: '3',
    employee_id: '3',
    date: '2024-02-25',
    check_in: null,
    check_out: null,
    status: 'absent' as const,
    notes: 'Sick leave',
    employees: {
      id: '3',
      first_name: 'Michael',
      last_name: 'Johnson',
    },
  },
  {
    id: '4',
    employee_id: '4',
    date: '2024-02-25',
    check_in: '09:00:00',
    check_out: '13:00:00',
    status: 'half_day' as const,
    notes: 'Doctor appointment',
    employees: {
      id: '4',
      first_name: 'Emily',
      last_name: 'Williams',
    },
  },
  {
    id: '5',
    employee_id: '5',
    date: '2024-02-25',
    check_in: '08:45:00',
    check_out: '17:15:00',
    status: 'present' as const,
    notes: null,
    employees: {
      id: '5',
      first_name: 'David',
      last_name: 'Brown',
    },
  },
  {
    id: '6',
    employee_id: '1',
    date: '2024-02-26',
    check_in: '09:00:00',
    check_out: '17:00:00',
    status: 'present' as const,
    notes: null,
    employees: {
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
    },
  },
  {
    id: '7',
    employee_id: '2',
    date: '2024-02-26',
    check_in: '09:00:00',
    check_out: '17:00:00',
    status: 'present' as const,
    notes: null,
    employees: {
      id: '2',
      first_name: 'Jane',
      last_name: 'Smith',
    },
  },
];

// Leave Requests
export const leaveRequests = [
  {
    id: '1',
    employee_id: '1',
    start_date: '2024-03-10',
    end_date: '2024-03-15',
    leave_type: 'annual' as const,
    reason: 'Family vacation',
    status: 'pending' as const,
    employees: {
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
    },
  },
  {
    id: '2',
    employee_id: '3',
    start_date: '2024-02-25',
    end_date: '2024-02-26',
    leave_type: 'sick' as const,
    reason: 'Flu',
    status: 'approved' as const,
    employees: {
      id: '3',
      first_name: 'Michael',
      last_name: 'Johnson',
    },
  },
  {
    id: '3',
    employee_id: '4',
    start_date: '2024-03-20',
    end_date: '2024-03-20',
    leave_type: 'personal' as const,
    reason: 'Personal matters',
    status: 'pending' as const,
    employees: {
      id: '4',
      first_name: 'Emily',
      last_name: 'Williams',
    },
  },
  {
    id: '4',
    employee_id: '6',
    start_date: '2024-04-05',
    end_date: '2024-04-09',
    leave_type: 'annual' as const,
    reason: 'Travel plans',
    status: 'pending' as const,
    employees: {
      id: '6',
      first_name: 'Sarah',
      last_name: 'Miller',
    },
  },
  {
    id: '5',
    employee_id: '2',
    start_date: '2024-03-01',
    end_date: '2024-03-01',
    leave_type: 'personal' as const,
    reason: 'Doctor appointment',
    status: 'rejected' as const,
    employees: {
      id: '2',
      first_name: 'Jane',
      last_name: 'Smith',
    },
  },
];

// Dashboard Stats
export const dashboardStats = {
  employeeCount: employees.length,
  departmentCount: departments.length,
  positionCount: positions.length,
}; 