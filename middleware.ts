import { auth } from '@/auth/auth';
import { NextRequest, NextResponse } from 'next/server';
/*import { NextRequest } from 'next/server';*/

// putting protected routes here (admin etc)
const protectedRoutes: string[] = [];

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;
  const routeIsProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (!session && routeIsProtected) {
    return NextResponse.redirect(new URL('/', req.url));
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