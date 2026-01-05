import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import DashboardClient from "./DashboardClient";

export default async function AdminDashboardPage() {
  return <DashboardClient />;
}
