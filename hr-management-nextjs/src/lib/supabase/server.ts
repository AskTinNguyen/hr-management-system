// Mock implementation for local development
// import { createServerClient } from '@supabase/ssr';
// import { cookies } from 'next/headers';

// Mock data
const mockEmployees = [
  { id: '1', first_name: 'John', last_name: 'Doe' },
  { id: '2', first_name: 'Jane', last_name: 'Smith' },
  { id: '3', first_name: 'Michael', last_name: 'Johnson' },
  { id: '4', first_name: 'Emily', last_name: 'Williams' },
  { id: '5', first_name: 'David', last_name: 'Brown' },
];

const mockLeaveRequests = [];

export function createClient() {
  // Return a mock client with the same interface as Supabase
  return {
    from: (table: string) => {
      return {
        select: (columns: string) => {
          return {
            order: (column: string, { ascending }: { ascending: boolean }) => {
              if (table === 'employees') {
                // Sort employees by last_name if requested
                const sortedEmployees = [...mockEmployees].sort((a, b) => {
                  if (ascending) {
                    return a.last_name.localeCompare(b.last_name);
                  } else {
                    return b.last_name.localeCompare(a.last_name);
                  }
                });
                
                return Promise.resolve({
                  data: sortedEmployees,
                  error: null
                });
              }
              
              return Promise.resolve({
                data: [],
                error: null
              });
            }
          };
        },
        insert: (data: any) => {
          if (table === 'leave_requests') {
            // Add the new leave request to our mock data
            const newLeaveRequest = {
              id: (mockLeaveRequests.length + 1).toString(),
              ...data,
              created_at: new Date().toISOString()
            };
            mockLeaveRequests.push(newLeaveRequest);
            
            return Promise.resolve({
              data: newLeaveRequest,
              error: null
            });
          }
          
          return Promise.resolve({
            data: null,
            error: null
          });
        }
      };
    }
  };
} 