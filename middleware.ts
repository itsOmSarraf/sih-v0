export { auth as middleware } from '@/lib/auth';
export { default } from 'next-auth/middleware';
// Don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
