import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
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
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored === "ar" || stored === "en") ? stored : "en";
  });

  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  };

  const tFn = (key: TranslationKey) => translate(lang, key);

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
    <LanguageContext.Provider value={{ lang, dir, setLang, t: tFn }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
