import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { type Lang, t as translate, type TranslationKey } from "@/lib/translations";

interface LanguageContextValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  dir: "ltr",
  setLang: () => {},
  t: (key) => key,
});

const STORAGE_KEY = "bodylogic-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return (stored === "ar" || stored === "en") ? stored : "en";
    } catch {
      return "en";
    }
  });

  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    try { localStorage.setItem(STORAGE_KEY, newLang); } catch {}
  }, []);

  const tFn = useCallback((key: TranslationKey) => translate(lang, key), [lang]);
  const value = useMemo(() => ({ lang, dir, setLang, t: tFn }), [lang, dir, setLang, tFn]);

  // Apply dir + lang to the <html> element for global effect
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    // Arabic font class
    if (lang === "ar") {
      document.documentElement.classList.add("font-arabic");
    } else {
      document.documentElement.classList.remove("font-arabic");
    }
  }, [lang, dir]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
