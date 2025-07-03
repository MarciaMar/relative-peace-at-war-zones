
import React, { createContext, useContext, useState } from "react";

const langs = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ar", label: "العربية", flag: "🇵🇸" },
  { code: "he", label: "עברית", flag: "🇮🇱" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "uk", label: "Українська", flag: "🇺🇦" },
  { code: "fa", label: "فارسی", flag: "🇮🇷" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" }
];

// Basic translations for critical content
export const translations = {
  en: {
    appTitle: "Relative Peace",
    appSubtitle: "Your humanitarian toolkit",
    kidsZone: "Kids' Zone (Animal Friends)",
    techniques: "Explore Techniques",
    research: "Self-Assessment & Research",
    breathing: "Breathing",
    journaling: "Journaling", 
    grounding: "Grounding",
    backToHome: "Back to Home",
    start: "Start",
    pause: "Pause",
    reset: "Reset"
  },
  ar: {
    appTitle: "السلام النسبي",
    appSubtitle: "مجموعة أدواتك الإنسانية",
    kidsZone: "منطقة الأطفال (أصدقاء الحيوانات)",
    techniques: "استكشاف التقنيات",
    research: "التقييم الذاتي والبحث",
    breathing: "التنفس",
    journaling: "كتابة اليوميات",
    grounding: "التأريض",
    backToHome: "العودة للرئيسية",
    start: "ابدأ",
    pause: "توقف",
    reset: "إعادة تعيين"
  },
  he: {
    appTitle: "שלום יחסי",
    appSubtitle: "ערכת הכלים ההומניטרית שלך",
    kidsZone: "אזור הילדים (חברים בעלי חיים)",
    techniques: "חקור טכניקות",
    research: "הערכה עצמית ומחקר",
    breathing: "נשימה",
    journaling: "כתיבת יומן",
    grounding: "הארקה",
    backToHome: "חזרה לבית",
    start: "התחל",
    pause: "השהה",
    reset: "איפוס"
  },
  uk: {
    appTitle: "Відносний мир",
    appSubtitle: "Ваш гуманітарний інструментарій",
    kidsZone: "Дитяча зона (Друзі тварини)",
    techniques: "Досліджуйте техніки",
    research: "Самооцінка та дослідження",
    breathing: "Дихання",
    journaling: "Ведення щоденника",
    grounding: "Заземлення",
    backToHome: "Повернутися додому",
    start: "Почати",
    pause: "Пауза",
    reset: "Скинути"
  },
  ru: {
    appTitle: "Относительный мир",
    appSubtitle: "Ваш гуманитарный инструментарий",
    kidsZone: "Детская зона (Друзья животные)",
    techniques: "Изучить техники",
    research: "Самооценка и исследования",
    breathing: "Дыхание",
    journaling: "Ведение дневника",
    grounding: "Заземление",
    backToHome: "Вернуться домой",
    start: "Начать",
    pause: "Пауза",
    reset: "Сбросить"
  }
};

type LanguageContextType = {
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  t: (key: keyof typeof translations.en) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState("en");

  const t = (key: keyof typeof translations.en) => {
    const langTranslations = translations[currentLang as keyof typeof translations] || translations.en;
    return langTranslations[key] || translations.en[key];
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

const LanguageSelector = () => {
  const [lang, setLang] = React.useState("en");

  return (
    <select
      value={lang}
      onChange={e => setLang(e.target.value)}
      className="border px-3 py-2 rounded-lg text-sm bg-background focus:ring-2 focus:ring-primary focus:border-transparent"
      aria-label="Select language"
    >
      {langs.map(({ code, label, flag }) => (
        <option key={code} value={code}>
          {flag} {label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
