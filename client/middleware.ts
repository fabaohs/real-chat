import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { redirectToAuth } from "@/lib/middlewatre-utils";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookie = cookies().get("jwt");

  if (!cookie && pathname !== "/auth") {
    return redirectToAuth();
  }
}

export const config = {
  matcher: ["/", "/auth"],
};
