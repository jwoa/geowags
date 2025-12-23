"use server";

import { redirect } from "next/navigation";
import { verifyPassword, createSession, destroySession } from "@/lib/auth";

export type LoginResult = {
  success: boolean;
  error?: string;
};

export async function loginAction(password: string): Promise<LoginResult> {
  if (!password) {
    return { success: false, error: "Password is required" };
  }

  if (!verifyPassword(password)) {
    return { success: false, error: "Invalid password" };
  }

  await createSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

