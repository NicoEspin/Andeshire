"use client";

import React from "react";
import { useTranslations } from "next-intl";

import LanguageSelector from "./LanguageSelector";

const LoginSection = () => {
  const t = useTranslations("Login");

  const handleGoogleLogin = () => {
    console.log("Iniciando sesión con Google...");
  };

  return (
    <div className="flex-1 bg-white flex flex-col min-h-screen">
      <div className="p-6 lg:p-8">
        <div className="flex justify-end">
          <LanguageSelector />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-sm">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
              {t("welcome")}
            </h2>
            <p className="text-gray-500 text-lg">{t("subtitle")}</p>
          </div>

          <div className="space-y-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center space-x-3 px-6 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:scale-110"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-gray-700 font-medium">
                {t("googleButton")}
              </span>
            </button>
          </div>

          <div className="mt-8">
            <p className="text-xs text-gray-400 text-center leading-relaxed">
              {t("termsText")}{" "}
              <a
                href="#"
                className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
              >
                {t("termsLink")}
              </a>{" "}
              y la{" "}
              <a
                href="#"
                className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
              >
                {t("privacyLink")}
              </a>{" "}
              de Andeshire.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSection;
