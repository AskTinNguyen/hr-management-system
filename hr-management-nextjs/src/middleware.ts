import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Check for authentication cookie
  const authCookie = request.cookies.get('auth-token')
  const isAuthenticated = !!authCookie?.value
  
  // If the user is not signed in and the route is protected, redirect to login
  if (!isAuthenticated && isProtectedRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If the user is signed in and trying to access login page, redirect to dashboard
  if (isAuthenticated && isAuthRoute(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// Define which routes are protected (require authentication)
function isProtectedRoute(pathname: string): boolean {
  const protectedRoutes = [
    '/dashboard',
    '/employees',
    '/departments',
    '/branches',
    '/positions',
    '/shifts',
    '/attendance',
    '/payroll',
    '/requests',
    '/calendar',
    '/settings',
    '/profile',
  ]
  
  return protectedRoutes.some(route => pathname.startsWith(route))
}

// Define which routes are for authentication (login, register, etc.)
function isAuthRoute(pathname: string): boolean {
  const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password']
  
  return authRoutes.includes(pathname)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 