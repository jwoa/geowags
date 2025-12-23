import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "geowags-admin-2024";
const SESSION_COOKIE_NAME = "geowags_admin_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "geowags-secret-key-change-in-production";

/**
 * Simple hash function for session token
 * In production, use a proper crypto library
 */
function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2);
  return Buffer.from(`${timestamp}:${random}:${SESSION_SECRET}`).toString("base64");
}

/**
 * Validate a session token
 */
function isValidSessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const parts = decoded.split(":");
    if (parts.length !== 3) return false;

    const timestamp = parseInt(parts[0], 10);
    const secret = parts[2];

    // Check if secret matches
    if (secret !== SESSION_SECRET) return false;

    // Check if session is less than 24 hours old
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    if (Date.now() - timestamp > maxAge) return false;

    return true;
  } catch {
    return false;
  }
}

/**
 * Verify admin password
 */
export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

/**
 * Create a new admin session
 */
export async function createSession(): Promise<void> {
  const token = createSessionToken();
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });
}

/**
 * Destroy the admin session
 */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  if (!sessionCookie?.value) {
    return false;
  }

  return isValidSessionToken(sessionCookie.value);
}

/**
 * Require authentication - redirects to login if not authenticated
 */
export async function requireAuth(): Promise<void> {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }
}

