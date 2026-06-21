import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const previewParam = searchParams.get("preview");
  const allowPreview = process.env.NEXT_PUBLIC_ALLOW_PREVIEW === "true";

  if (previewParam === "1" && allowPreview) {
    const response = NextResponse.next();
    response.headers.set("x-launch-preview", "1");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
