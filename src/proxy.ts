import { NextRequest, NextResponse } from 'next/server';
import { normalizeLocale, routing } from '@/i18n/routing';

// The copied template's demo account surfaces are not part of the public atlas.
const templateRoutes = [
  '/login',
  '/admin',
  '/home',
  '/workspace',
  '/settings',
  '/culture',
];
const within = (pathname: string, root: string) =>
  pathname === root || pathname.startsWith(root + '/');

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (within(pathname, '/api/auth')) {
    return NextResponse.json(
      { message: 'Seyri Cihan does not provide account endpoints.' },
      { status: 404 },
    );
  }
  if (templateRoutes.some((route) => within(pathname, route))) {
    return NextResponse.redirect(new URL('/atlas', request.url));
  }
  const headers = new Headers(request.headers);
  headers.set(
    'X-NEXT-INTL-LOCALE',
    normalizeLocale(request.cookies.get('NEXT_LOCALE')?.value) ??
      routing.defaultLocale,
  );
  const response = NextResponse.next({ request: { headers } });
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
