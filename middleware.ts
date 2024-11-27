import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')
 
  // If the user is not logged in and trying to access a protected route
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/sign-up', request.url))
  }
 
  // If the user is logged in and trying to access auth pages
  if (session && (
    request.nextUrl.pathname.startsWith('/sign-up')
  )) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
 
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/sign-up']
}
