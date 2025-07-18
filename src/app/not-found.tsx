"use client";
import Link from "next/link";

import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("404");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  px-4 text-center overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-200 rounded-full opacity-30 animate-bounce delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-purple-300 rounded-full opacity-25 animate-pulse delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-lg mx-auto">
        {/* Animated 404 SVG */}
        <div className="mb-8 animate-fade-in">
          <svg
            viewBox="0 0 480 200"
            className="w-full h-auto max-w-lg mx-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* First 4 */}
            <g
              className="animate-draw"
              style={{
                strokeDasharray: "350",
                strokeDashoffset: "350",
                animation: "draw 2s ease-in-out forwards",
              }}
            >
              <path
                d="M30 50 L30 120 L70 120 L70 80 L100 80 L100 50 L100 180"
                stroke="#9333ea"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M30 80 L70 80"
                stroke="#9333ea"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>

            {/* 0 */}
            <ellipse
              cx="200"
              cy="115"
              rx="55"
              ry="70"
              stroke="#9333ea"
              strokeWidth="8"
              fill="none"
              className="animate-draw"
              style={{
                strokeDasharray: "450",
                strokeDashoffset: "450",
                animation: "draw 2s ease-in-out 0.5s forwards",
              }}
            />

            {/* Inner circle for 0 */}
            <ellipse
              cx="200"
              cy="115"
              rx="25"
              ry="35"
              stroke="#9333ea"
              strokeWidth="3"
              fill="none"
              className="animate-draw"
              style={{
                strokeDasharray: "220",
                strokeDashoffset: "220",
                animation: "draw 1.5s ease-in-out 1s forwards",
              }}
            />

            {/* Second 4 */}
            <g
              className="animate-draw"
              style={{
                strokeDasharray: "350",
                strokeDashoffset: "350",
                animation: "draw 2s ease-in-out 1.5s forwards",
              }}
            >
              <path
                d="M350 50 L350 120 L390 120 L390 80 L420 80 L420 50 L420 180"
                stroke="#9333ea"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M350 80 L390 80"
                stroke="#9333ea"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>

            {/* Decorative dots */}
            <circle
              cx="130"
              cy="40"
              r="4"
              fill="#9333ea"
              className="animate-float"
            />
            <circle
              cx="270"
              cy="40"
              r="4"
              fill="#9333ea"
              className="animate-float delay-500"
            />
            <circle
              cx="200"
              cy="200"
              r="4"
              fill="#9333ea"
              className="animate-float delay-1000"
            />
            <circle
              cx="80"
              cy="200"
              r="3"
              fill="#a855f7"
              className="animate-float delay-700"
            />
            <circle
              cx="320"
              cy="200"
              r="3"
              fill="#a855f7"
              className="animate-float delay-300"
            />
          </svg>
        </div>

        {/* Title and description */}
        <div className="space-y-4 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-2">
            {t("title")}
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed max-w-md mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 animate-fade-in-up delay-300">
          <Link
            href="/"
            className="group relative px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              {t("backHome")}
            </span>
          </Link>

          <Link
            href="javascript:history.back()"
            className="px-8 py-3 text-slate-700 border-2 border-slate-300 rounded-xl font-semibold hover:border-purple-300 hover:text-purple-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-200"
          >
            {t("previousPage")}
          </Link>
        </div>

        {/* Help text */}
        <div className="mt-12 animate-fade-in-up delay-500">
          <p className="text-slate-500 text-sm">
            {t("needHelp")}{" "}
            <span className="text-purple-600 hover:text-purple-700 cursor-pointer font-medium">
              {t("contactUs")}
            </span>
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up.delay-300 {
          animation-delay: 0.3s;
        }

        .animate-fade-in-up.delay-500 {
          animation-delay: 0.5s;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float.delay-500 {
          animation-delay: 0.5s;
        }

        .animate-float.delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
