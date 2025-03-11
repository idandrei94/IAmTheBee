import { auth } from '@/auth/auth';
import { NextRequest, NextResponse } from 'next/server';
import { isAdmin } from './lib/actions/user.actions';
import { prisma } from './db/prisma';
/*import { NextRequest } from 'next/server';*/

// putting protected routes here
const protectedRoutes: string[] = [
  '/following',
];

// same as protected routes, but specifically for admins
const adminRoutes: string[] = [
  '/admin'
];

export default async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;
  const routeIsProtected = protectedRoutes.some(route => pathname.startsWith(route));
  const routeIsAdmin = adminRoutes.some(route => pathname.startsWith(route));

  if (!session && (routeIsProtected || routeIsAdmin)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // i'd use a properly shaped token
  // for ease i'd have just queried the db, but prisma has some issues with this currently
  // so hackathon solution, querying itself for db access
  if (routeIsAdmin) {
    const isAdmin = await fetch(`http://localhost:3000/api/auth/admin/check`, {
      headers: req.headers
    }).then(r => r.text()) === 'true';
    if (!isAdmin) {
      return NextResponse.redirect(new URL('/', req.url));
    }
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