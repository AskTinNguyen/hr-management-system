import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get('auth-token');
    
    if (!authToken) {
      return NextResponse.json({ user: null });
    }
    
    try {
      // Decode the token
      const tokenData = JSON.parse(Buffer.from(authToken.value, 'base64').toString());
      
      // Check if token is expired
      if (tokenData.exp < Date.now()) {
        return NextResponse.json({ user: null });
      }
      
      // Return user data
      return NextResponse.json({
        user: {
          id: tokenData.id,
          email: tokenData.email,
          name: tokenData.name,
          role: tokenData.role
        }
      });
    } catch (error) {
      console.error('Token decode error:', error);
      return NextResponse.json({ user: null });
    }
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 