import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en'
});

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // 1. PUBLIC ASSETS & API
  // Skip auth/i18n for api, static, images, favicon
  if (
    path.startsWith('/api') || 
    path.startsWith('/_next') || 
    path.startsWith('/images') || 
    path === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 2. AUTHENTICATION (Fixed Credential)
  // Skip auth for login page itself (consider locale prefix too if needed, but /login is handled specially)
  // We'll allow /login, /en/login, /fr/login
  const isLoginPage = path.includes('/login');
  
  const session = request.cookies.get('phenix_session');
  // Simple check: is value 'true' OR is it the shared password itself?
  // We'll trust the cookie setting logic to put 'true' or a hash.
  const isAuthenticated = session?.value === 'true';

  if (!isAuthenticated && !isLoginPage) {
    // If attempting to access root or other page without auth, redirect to login
    // We redirect to /login (or /en/login) handled by next-intl? 
    // For now, raw /login is easiest, but ideally we match user's locale.
    // We'll just redirect to `/login` and let intlMiddleware handle the locale prefix if we send it there?
    // Actually, simple constraint: Redirect to /login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 3. INTERNATIONALIZATION
  return intlMiddleware(request);
}

export const config = {
  // Matcher ignoring internals
  matcher: ['/((?!api|_next|favicon.ico).*)']
};
