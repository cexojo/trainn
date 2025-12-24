import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { translations, Lang, type Translations } from "../../i18n";
import AdminRestricted from "../../components/AdminRestricted";
import UserTable from "./UserTable";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-for-local";

export default async function ManageUsersPage() {
  // Language default: Spanish
  const cookieStore = await cookies();
  let lang: Lang = "es";
  let role = null;
  try {
    const token = cookieStore.get("token")?.value;
    if (token) {
      const payload = jwt.verify(token, JWT_SECRET) as any;
      role = payload?.role;
      if (payload?.isocode && (payload.isocode === "en" || payload.isocode === "es")) {
        lang = payload.isocode;
      }
    }
  } catch (e) {}

  if (role !== "admin") {
    return <AdminRestricted lang={lang} />;
  }

  // Render the client component for table and modal handling
  return (
    <UserTable lang={lang} />
  );
}
