
import React from "react";

// For now just EN/AR/HE placeholder, can be expanded via i18n
const langs = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "he", label: "עברית" },
  { code: "ru", label: "Русский" },
  { code: "uk", label: "Українська" },
  { code: "fa", label: "فارسی" },
  { code: "tr", label: "Türkçe" }
];

const LanguageSelector = () => {
  // No real language switching yet, only UI, ready for i18n lib
  const [lang, setLang] = React.useState("en");

  return (
    <select
      value={lang}
      onChange={e => setLang(e.target.value)}
      className="border px-2 py-1 rounded text-sm bg-background"
      aria-label="Select language"
    >
      {langs.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
