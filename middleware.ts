import { NextRequest, NextResponse } from 'next/server';
import { checkUserCanAccess } from './lib/auth';

// putting protected routes here
const protectedRoutes: string[] = [
  '/following',
];

// same as protected routes, but specifically for admins
const adminRoutes: string[] = [
  '/admin'
];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const routeIsProtected = protectedRoutes.some(route => pathname.startsWith(route));
  const routeIsAdmin = adminRoutes.some(route => pathname.startsWith(route));
  if (routeIsProtected || routeIsAdmin) {

    var authError = await checkUserCanAccess(routeIsAdmin);
    return authError;
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|.*\\.png$|.*\\.jpg$|robots.txt).*)',
  ],
};