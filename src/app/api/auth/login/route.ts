import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const password = body.password;
  
  // Check against env var (support both naming conventions we discussed)
  const validPassword = process.env.WIKI_PASSWORD || process.env.NEXT_PUBLIC_AUTH_PASSWORD;

  if (password === validPassword) {
    const response = NextResponse.json({ success: true });
    // Set cookie valid for 30 days
    response.cookies.set('phenix_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30
    });
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
