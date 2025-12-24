import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { translations, Lang } from "../i18n";
import AdminRestricted from "../components/AdminRestricted";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-for-local";

// Server component — only visible to admins.
export default async function AdminMenuPage() {
  let role = null;
  let lang: Lang = "es";

  // Try to decode the JWT from cookies (SSR safe)
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (token) {
      const payload = jwt.verify(token, JWT_SECRET) as any;
      role = payload?.role;
      if (payload?.isocode && (payload.isocode === "es" || payload.isocode === "en")) {
        lang = payload.isocode;
      }
    }
  } catch (e) {
    // ignore invalid token, fall through to role null
  }

  if (role !== "admin") {
    return <AdminRestricted lang={lang} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-100 dark:bg-zinc-900">
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-10 flex flex-col gap-6 items-center min-w-[330px]">
        <h1 className="text-2xl font-bold mb-2 text-zinc-700 dark:text-white">{translations[lang].adminMenu}</h1>
        <Link
          href="/menu/users"
          className="rounded bg-blue-600 text-white px-6 py-3 font-semibold shadow hover:bg-blue-700"
        >
          {translations[lang].manageUsers}
        </Link>
        <Link
          href="#"
          className="rounded bg-blue-600 text-white px-6 py-3 font-semibold shadow hover:bg-blue-700 opacity-70 cursor-not-allowed"
          tabIndex={-1}
          aria-disabled="true"
          title="Not implemented yet"
        >
          {translations[lang].manageExercises}
        </Link>
        <Link
          href="/wizard"
          className="rounded bg-green-600 text-white px-6 py-3 font-semibold shadow hover:bg-green-700"
        >
          {translations[lang].createTrainingBlocks}
        </Link>
      </div>
    </div>
  );
}
