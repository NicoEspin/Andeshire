"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setLocale } from "@/state";
import React from "react";

const LanguageSelector = () => {
  const dispatch = useAppDispatch();
  const currentLocale = useAppSelector((state) => state.global.locale);

  const languages: { code: "en" | "es"; flag: string }[] = [
    { code: "es", flag: "arg" },
    { code: "en", flag: "🇺🇸" },
  ];

  const handleChangeLanguage = (newLocale: "en" | "es") => {
    if (newLocale === currentLocale) return;

    dispatch(setLocale(newLocale));
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`;

    const url = new URL(window.location.href);
    url.searchParams.set("locale", newLocale);
    window.history.replaceState({}, "", url.toString());

    location.reload();
  };

  return (
    <div className="flex items-center space-x-1 bg-gray-800/90 backdrop-blur-sm rounded-xl p-1 border border-gray-600/50 shadow-lg">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChangeLanguage(lang.code)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
            currentLocale === lang.code
              ? "bg-blue-600 text-white shadow-md border border-blue-500"
              : "text-gray-300 hover:text-white hover:bg-gray-700/70 border border-transparent"
          }`}
        >
          <span className="text-base">{lang.flag}</span>
          <span className="text-sm uppercase">{lang.code}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
