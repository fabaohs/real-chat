import { NextResponse } from "next/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export function redirectToAuth() {
  return NextResponse.redirect(new URL("/auth", baseUrl).toString());
}

export function redirectToHome() {
  return NextResponse.redirect(new URL("/home", baseUrl).toString());
}
