
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // For demo purposes, return mock user data
  // In a real app, you'd check the session/token
  const isAuthenticated = request.cookies.get('auth-token') || 
                          request.headers.get('authorization')

  if (isAuthenticated) {
    return NextResponse.json({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: null
    })
  }

  return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
}
