"use client";
import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { translations, Lang } from "@/app/i18n";

// Infer lang: prefers from navigator, falls back to "en"
function detectLang(): Lang {
  if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("es")) return "es";
  return "en";
}

interface LangContextValue {
  lang: Lang;
  t: (typeof translations)[Lang];
}

const LangContext = createContext<LangContextValue>({
  lang: "en",
  t: translations.en
});

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = detectLang();
  const value = useMemo(() => ({
    lang,
    t: translations[lang]
  }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  return ctx.lang;
}

export function useTranslations() {
  return useContext(LangContext).t;
}
