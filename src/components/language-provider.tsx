"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { languageOptions, translations, type Language } from "@/config/translations";

const LanguageContext = createContext({ language: "en" as Language, setLanguage: (_value: Language) => {}, t: translations.en });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("business-card-language");
      if (saved === "en" || saved === "th" || saved === "zh") setLanguage(saved);
    } catch { /* Language switching still works when storage is unavailable. */ }
  }, []);
  useEffect(() => {
    document.documentElement.lang = languageOptions.find(option => option.value === language)!.htmlLang;
  }, [language]);
  function chooseLanguage(value: Language) {
    setLanguage(value);
    try { localStorage.setItem("business-card-language", value); } catch { /* Preference storage is optional. */ }
  }
  return <LanguageContext.Provider value={{ language, setLanguage: chooseLanguage, t: translations[language] }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  return <nav className="language-selector" aria-label="Language / ภาษา / 语言">
    {languageOptions.map(option => <button key={option.value} type="button" lang={option.htmlLang} aria-pressed={language === option.value} onClick={() => setLanguage(option.value)}>{option.label}</button>)}
  </nav>;
}
