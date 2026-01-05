import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextRequest, NextResponse} from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check authentication
  const isAuthenticated = request.cookies.has('phenix_session');
  
  // Identify if we are on the login page
  // The matcher ensures we are typically on / or /:locale/...
  const isLoginPage = routing.locales.some(
    (locale) => pathname === `/${locale}/login`
  );

  // Allow access if:
  // 1. User is authenticated
  // 2. User is ensuring explicit access to Login page
  // 3. User is on Root '/' (Let i18n handle redirect to locale, then we catch it)
  // 4. It's a public assets request (though matcher likely excludes this, explicit safety is good)
  if (!isAuthenticated && !isLoginPage && pathname !== '/') {
    // Extract locale to preserve it in the redirect
    // Pathname matches /(en|fr)/... so split[1] is the locale
    const segments = pathname.split('/');
    const locale = segments[1];
    
    // Safety check: if for some reason locale is not in our list (shouldn't happen due to matcher), default to en
    const targetLocale = (routing.locales as readonly string[]).includes(locale) 
      ? locale 
      : routing.defaultLocale;

    return NextResponse.redirect(new URL(`/${targetLocale}/login`, request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  // - extensions with a dot (e.g. .png, .jpg, .css, .js)
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)']
};
