"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Infinity, TrendingUp, Play } from "lucide-react";

const BenefitsSection = () => {
  const t = useTranslations("Login.Benefits");

  const icons = [Infinity, TrendingUp, Play];
  const benefits = [
    {
      title: t("unlimitedManagementTitle"),
      description: t("unlimitedManagementDescription"),
    },
    {
      title: t("optimizedProcessTitle"),
      description: t("optimizedProcessDescription"),
    },
    {
      title: t("startFreeTitle"),
      description: t("startFreeDescription"),
    },
  ];

  return (
    <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-to-br from-[#0F0F23] via-[#1A1A3A] to-[#2D1B69]">
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(126, 91, 239, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(126, 91, 239, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-[#7E5BEF]/20 to-[#4A90E2]/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-[#4A90E2]/10 rounded-full blur-2xl animate-float-slow" />
        <div className="absolute top-1/3 right-1/2 w-4 h-4 bg-white/40 rounded-full animate-drift" />
        <div className="absolute top-3/4 left-1/6 w-3 h-3 bg-[#7E5BEF]/60 rounded-full animate-bounce-subtle" />
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-white/50 rounded-full animate-glow" />
        <div className="absolute top-1/5 right-1/3 w-6 h-6 border border-white/20 rotate-45 animate-spin-very-slow" />
        <div className="absolute bottom-1/5 left-1/3 w-8 h-1 bg-gradient-to-r from-transparent via-[#7E5BEF]/40 to-transparent animate-shimmer" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between p-12 xl:p-16 animate-fade-in-up">
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-20 animate-slide-in-left-delayed">
            <div className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-sm font-medium mb-6 animate-fade-in-down">
              ✨ {t("welcome")}
            </div>
            <h1 className="text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text">
              {t("title")}
            </h1>
            <p className="text-xl xl:text-2xl text-white/70 leading-relaxed max-w-lg font-light">
              {t("subtitle")}
            </p>
          </div>

          <div className="space-y-8">
            {benefits.map((benefit, index) => {
              const IconComponent = icons[index];
              return (
                <div
                  key={index}
                  className="flex items-start space-x-6 group animate-slide-in-left cursor-pointer"
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-gradient-to-br group-hover:from-[#7E5BEF]/30 group-hover:to-[#4A90E2]/20 transition-all duration-500 group-hover:scale-110 group-hover:rotate-2 shadow-lg border border-white/10 group-hover:border-[#7E5BEF]/30">
                    <IconComponent className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="group-hover:translate-x-2 transition-all duration-300">
                    <h3 className="text-white font-semibold text-2xl mb-3 group-hover:text-[#7E5BEF]/90 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-white/70 text-lg font-light leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: "1200ms" }}>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-6 animate-shimmer" />
          <p className="text-white/60 text-base font-light">{t("footer")}</p>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
