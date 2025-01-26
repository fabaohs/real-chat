import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirectToAuth } from "@/lib/middlewatre-utils";

export function middleware(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_ACTIVE_MIDDLEWARE === "false") {
    return NextResponse.next();
  }

  const { pathname } = req.nextUrl;
  const cookie = cookies().get("jwt");

  if (!cookie && pathname !== "/auth") {
    return redirectToAuth();
  }

  if (!cookie) {
    return redirectToAuth();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
