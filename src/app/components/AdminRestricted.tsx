import { translations, Lang } from "../i18n";

export default function AdminRestricted({ lang }: { lang: Lang }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 dark:bg-zinc-900">
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow text-center">
        <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-100">
          {translations[lang].accessDenied}
        </p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          {translations[lang].accessDeniedDesc}
        </p>
      </div>
    </div>
  );
}
