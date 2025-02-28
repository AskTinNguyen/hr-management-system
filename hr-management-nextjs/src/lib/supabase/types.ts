export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      employees: {
        Row: {
          id: number
          name: string
          normalized_name: string | null
          email: string
          password: string
          national_id: string
          phone: string | null
          address: string | null
          birth_date: string | null
          gender: string | null
          department_id: number | null
          branch_id: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          normalized_name?: string | null
          email: string
          password: string
          national_id: string
          phone?: string | null
          address?: string | null
          birth_date?: string | null
          gender?: string | null
          department_id?: number | null
          branch_id?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          normalized_name?: string | null
          email?: string
          password?: string
          national_id?: string
          phone?: string | null
          address?: string | null
          birth_date?: string | null
          gender?: string | null
          department_id?: number | null
          branch_id?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      departments: {
        Row: {
          id: number
          name: string
          normalized_name: string | null
          branch_id: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          normalized_name?: string | null
          branch_id: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          normalized_name?: string | null
          branch_id?: number
          created_at?: string
          updated_at?: string
        }
      }
      branches: {
        Row: {
          id: number
          name: string
          normalized_name: string | null
          address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          normalized_name?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          normalized_name?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      positions: {
        Row: {
          id: number
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      employee_positions: {
        Row: {
          id: number
          employee_id: number
          position_id: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          employee_id: number
          position_id: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          employee_id?: number
          position_id?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      employee_salaries: {
        Row: {
          id: number
          employee_id: number
          amount: number
          currency: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          employee_id: number
          amount: number
          currency: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          employee_id?: number
          amount?: number
          currency?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      shifts: {
        Row: {
          id: number
          name: string
          start_time: string
          end_time: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          start_time: string
          end_time: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          start_time?: string
          end_time?: string
          created_at?: string
          updated_at?: string
        }
      }
      employee_shifts: {
        Row: {
          id: number
          employee_id: number
          shift_id: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          employee_id: number
          shift_id: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          employee_id?: number
          shift_id?: number
          created_at?: string
          updated_at?: string
        }
      }
      attendances: {
        Row: {
          id: number
          employee_id: number
          date: string
          check_in: string | null
          check_out: string | null
          status: string
          ip_address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          employee_id: number
          date: string
          check_in?: string | null
          check_out?: string | null
          status: string
          ip_address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          employee_id?: number
          date?: string
          check_in?: string | null
          check_out?: string | null
          status?: string
          ip_address?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payrolls: {
        Row: {
          id: number
          employee_id: number
          month: number
          year: number
          base_salary: number
          total_additions: number
          total_deductions: number
          net_salary: number
          currency: string
          status: string
          is_sent: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          employee_id: number
          month: number
          year: number
          base_salary: number
          total_additions: number
          total_deductions: number
          net_salary: number
          currency: string
          status: string
          is_sent?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          employee_id?: number
          month?: number
          year?: number
          base_salary?: number
          total_additions?: number
          total_deductions?: number
          net_salary?: number
          currency?: string
          status?: string
          is_sent?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      additions: {
        Row: {
          id: number
          payroll_id: number
          name: string
          amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          payroll_id: number
          name: string
          amount: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          payroll_id?: number
          name?: string
          amount?: number
          created_at?: string
          updated_at?: string
        }
      }
      deductions: {
        Row: {
          id: number
          payroll_id: number
          name: string
          amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          payroll_id: number
          name: string
          amount: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          payroll_id?: number
          name?: string
          amount?: number
          created_at?: string
          updated_at?: string
        }
      }
      metrics: {
        Row: {
          id: number
          name: string
          weight: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          weight: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          weight?: number
          created_at?: string
          updated_at?: string
        }
      }
      employee_evaluations: {
        Row: {
          id: number
          employee_id: number
          payroll_id: number
          metric_id: number
          score: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          employee_id: number
          payroll_id: number
          metric_id: number
          score: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          employee_id?: number
          payroll_id?: number
          metric_id?: number
          score?: number
          created_at?: string
          updated_at?: string
        }
      }
      requests: {
        Row: {
          id: number
          employee_id: number
          type: string
          title: string
          description: string
          status: string
          response: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          employee_id: number
          type: string
          title: string
          description: string
          status: string
          response?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          employee_id?: number
          type?: string
          title?: string
          description?: string
          status?: string
          response?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      calendars: {
        Row: {
          id: number
          title: string
          description: string | null
          start_date: string
          end_date: string
          type: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          description?: string | null
          start_date: string
          end_date: string
          type: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string | null
          start_date?: string
          end_date?: string
          type?: string
          created_at?: string
          updated_at?: string
        }
      }
      globals: {
        Row: {
          id: number
          organization_name: string
          organization_address: string | null
          organization_phone: string | null
          organization_email: string | null
          organization_website: string | null
          organization_logo: string | null
          default_currency: string
          ip_based_attendance: boolean
          allowed_ips: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          organization_name: string
          organization_address?: string | null
          organization_phone?: string | null
          organization_email?: string | null
          organization_website?: string | null
          organization_logo?: string | null
          default_currency: string
          ip_based_attendance?: boolean
          allowed_ips?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          organization_name?: string
          organization_address?: string | null
          organization_phone?: string | null
          organization_email?: string | null
          organization_website?: string | null
          organization_logo?: string | null
          default_currency?: string
          ip_based_attendance?: boolean
          allowed_ips?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      roles: {
        Row: {
          id: number
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      employee_roles: {
        Row: {
          id: number
          employee_id: number
          role_id: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          employee_id: number
          role_id: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          employee_id?: number
          role_id?: number
          created_at?: string
          updated_at?: string
        }
      }
      archived_employees: {
        Row: {
          id: number
          name: string
          email: string
          national_id: string
          phone: string | null
          address: string | null
          birth_date: string | null
          gender: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          email: string
          national_id: string
          phone?: string | null
          address?: string | null
          birth_date?: string | null
          gender?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          email?: string
          national_id?: string
          phone?: string | null
          address?: string | null
          birth_date?: string | null
          gender?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Insertable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Updatable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'] 