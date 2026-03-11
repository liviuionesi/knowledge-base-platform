import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import {NextRequest, NextResponse} from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Handle "Load Welcome Page by Default"
  if (pathname === '/') {
     return NextResponse.redirect(new URL(`/${routing.defaultLocale}/docs/introduction`, request.url));
  }
  
  const isLocaleRoot = routing.locales.some(locale => pathname === `/${locale}`);
  if (isLocaleRoot) {
     return NextResponse.redirect(new URL(`${pathname}/docs/introduction`, request.url));
  }

  // 2. Authentication Logic
  const isAuthenticated = request.cookies.has('phenix_session');
  
  // Identify if we are on the login page
  const isLoginPage = routing.locales.some(
    (locale) => pathname === `/${locale}/login`
  );

  // Identify Protected Pages
  // Spec: "Authenticated page... is the alliance report and the rules page"
  // Rules = daily-guide
  // Alliance Report = alliance-duel
  const isRulesPage = pathname.includes('/docs/daily-guide');
  const isReportPage = pathname.includes('/alliance-duel') && !pathname.includes('/day-');
  const isProtectedPage = isRulesPage || isReportPage;

  // Logic: 
  // If not authenticated AND trying to access a protected page
  // Redirect to login
  if (!isAuthenticated && !isLoginPage && isProtectedPage) {
    // Extract locale to preserve it in the redirect
    const segments = pathname.split('/');
    const locale = segments[1];
    
    // Safety check
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
