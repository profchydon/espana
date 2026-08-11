import { SignJWT, jwtVerify } from "jose";
import type { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { env } from "@/lib/env";

export const SESSION_COOKIE = "espanafonica_session";

const secret = new TextEncoder().encode(env.authSecret);
const sessionMaxAgeSeconds = env.sessionMaxAgeDays * 60 * 60 * 24;

export type SessionPayload = {
  userId: string;
};

export const sessionCookieOptions = {
  httpOnly: true,
  secure: env.sessionCookieSecure,
  sameSite: "lax" as const,
  path: "/",
  maxAge: sessionMaxAgeSeconds,
};

export async function createSessionToken(userId: string) {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${env.sessionMaxAgeDays}d`)
    .sign(secret);
}

export async function attachSessionCookie(response: NextResponse, userId: string) {
  const token = await createSessionToken(userId);
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
  return response;
}

export async function createSession(userId: string) {
  const cookieStore = await cookies();
  const token = await createSessionToken(userId);
  cookieStore.set(SESSION_COOKIE, token, sessionCookieOptions);
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId;
    if (typeof userId !== "string") return null;
    return { userId };
  } catch {
    return null;
  }
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.delete(SESSION_COOKIE);
  return response;
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    const userId = payload.userId;
    if (typeof userId !== "string") return null;
    return { userId };
  } catch {
    return null;
  }
}
