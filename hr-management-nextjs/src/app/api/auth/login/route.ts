import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Mock user database
const USERS = [
  {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123', // In a real app, this would be hashed
    name: 'Admin User',
    role: 'admin'
  },
  {
    id: '2',
    email: 'user@example.com',
    password: 'user123', // In a real app, this would be hashed
    name: 'Regular User',
    role: 'user'
  }
];

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    // Find user with matching credentials
    const user = USERS.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // In a real app, you would use a proper JWT with signing
    const token = Buffer.from(JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    })).toString('base64');
    
    // Set auth cookie
    const cookieStore = cookies();
    cookieStore.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'strict'
    });
    
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 