import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import DashboardClient from "./DashboardClient";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-for-local";

async function getRoleFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("elena_auth_token")?.value;
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    return payload.role || null;
  } catch {
    return null;
  }
}

export default async function AdminDashboardPage() {
  const role = await getRoleFromToken();
  if (role !== "admin") {
    redirect("/");
  }
  return <DashboardClient />;
}
