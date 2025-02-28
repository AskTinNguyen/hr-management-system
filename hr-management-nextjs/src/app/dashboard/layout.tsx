'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: '📊' },
  { name: 'Employees', href: '/employees', icon: '👥' },
  { name: 'Departments', href: '/departments', icon: '🏢' },
  { name: 'Positions', href: '/positions', icon: '📋' },
  { name: 'Attendance', href: '/attendance', icon: '📅' },
  { name: 'Leave', href: '/leaves', icon: '🏖️' },
  { name: 'Payroll', href: '/payroll', icon: '💰' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b dark:border-gray-700">
          <Link href="/dashboard" className="text-xl font-bold">
            HR Management
          </Link>
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="mt-5 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow md:shadow-none">
          <div className="flex justify-between h-16 px-4 md:px-8">
            <div className="flex items-center md:hidden">
              <button
                className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                onClick={() => setSidebarOpen(true)}
              >
                ☰
              </button>
            </div>
            <div className="flex items-center">
              <Button variant="ghost">
                Profile
              </Button>
              <Button variant="ghost">
                Logout
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
} 