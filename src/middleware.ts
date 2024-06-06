import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

export const locales = ["en", "th", ""] as const;

const intlMiddleware = createMiddleware({
  locales: locales,
  defaultLocale: "",
  localeDetection: false,
});


export default async function middleware(req: any) {

  const excludePattern = "^(/(" + locales.join("|") + "))?/main/?.*?$";
  const publicPathnameRegex = RegExp(excludePattern, "i");
  const isPublicPage = !publicPathnameRegex.test(req.nextUrl.pathname);
  const absoluteURL = new URL(`/${req.cookies.get("NEXT_LOCALE")?.value || "en"}/signIn`, req.nextUrl.origin);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return !!req.cookies.get("nx-access-token")?.value ? intlMiddleware(req) : NextResponse.redirect(absoluteURL.toString());
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

