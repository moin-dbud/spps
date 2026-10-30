import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { mr } from "./mr";
import { en } from "./en";
import { hi } from "./hi";
import type { TranslationKeys } from "./mr";
import { SCHOOL_CONFIG } from "../config/school";

export type Language = "mr" | "en" | "hi";

const translations: Record<Language, TranslationKeys> = { mr, en, hi };

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationKeys;
}

const I18nContext = createContext<I18nContextType | null>(null);

const STORAGE_KEY = "spps_lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && ["mr", "en", "hi"].includes(stored)) return stored;
    return SCHOOL_CONFIG.defaultLanguage;
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}

export const LANG_LABELS: Record<Language, string> = {
  mr: "मराठी",
  hi: "हिंदी",
  en: "English",
};
