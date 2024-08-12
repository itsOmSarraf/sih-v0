import { auth } from '@/lib/auth';

const protectedRoutes = ['/dashboard', '/collection'];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isProtectedRoute = protectedRoutes.includes(req.nextUrl.pathname);

  if (isProtectedRoute && !isLoggedIn) {
    return Response.redirect(new URL('/api/auth/signin', req.url));
  }
});

export const config = {
  matcher: [
    ...protectedRoutes,
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};
