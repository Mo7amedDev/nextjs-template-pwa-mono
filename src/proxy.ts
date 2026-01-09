import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { getToken } from 'next-auth/jwt';

import { routing, supportedLanguages } from './i18n/routing';
import { protectedApi, protectedPages, publicRoutes } from './middleware/protected';
 

const intlMiddleware = createMiddleware(routing);

function stripLocale(
  pathname: string,
  locales: readonly string[]
) {
  const localePattern = new RegExp(
    `^/(${locales.join('|')})(/|$)`
  );

  return pathname.replace(localePattern, '/');
}
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const normalizedPath = stripLocale(pathname,supportedLanguages);
   
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isPublic = publicRoutes.some((route) =>
    normalizedPath.startsWith(route)
  );

  const isProtectedPage = protectedPages.some((route) =>
    normalizedPath.startsWith(route)
  );

  const isProtectedApi = protectedApi.some((route) =>
    normalizedPath.startsWith(route)
  );
  if(normalizedPath.endsWith('dashboard')){
    console.log({ token,supportedLanguages }, 'middleware');

  }

  /* ---------------- API ---------------- */
  if (isProtectedApi && !token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  /* ---------------- PAGES -------------- */
  if (isProtectedPage && !token && !isPublic) {
    const loginUrl = new URL('/auth/signin', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // pages only (localized)
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
  ],
};