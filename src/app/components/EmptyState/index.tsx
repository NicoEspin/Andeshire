"use client";

import React from "react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <svg
        width="160"
        height="160"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-bounce-slow"
      >
        {/* Sombra suave */}
        <defs>
          <radialGradient id="shadow" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#FBBF24" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sweat" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Vidrio */}
        <circle
          cx="90"
          cy="90"
          r="50"
          fill="url(#shadow)"
          stroke="#FACC15"
          strokeWidth="6"
        />

        {/* Reflejo */}
        <ellipse
          cx="70"
          cy="70"
          rx="12"
          ry="6"
          fill="#ffffff"
          fillOpacity="0.4"
        />
        <ellipse
          cx="100"
          cy="60"
          rx="5"
          ry="3"
          fill="#ffffff"
          fillOpacity="0.2"
        />

        {/* Carita triste */}
        <circle cx="75" cy="85" r="4" fill="#1F2937" />
        <circle cx="105" cy="85" r="4" fill="#1F2937" />
        {/* Cejas inclinadas */}
        <path
          d="M70 75 Q75 70 80 75"
          stroke="#1F2937"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M100 75 Q105 70 110 75"
          stroke="#1F2937"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Boca triste */}
        <path
          d="M75 105 Q90 95 105 105"
          stroke="#1F2937"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Mango */}
        <rect
          x="125"
          y="125"
          width="60"
          height="12"
          rx="6"
          transform="rotate(45 125 125)"
          fill="#FACC15"
          stroke="#FBBF24"
          strokeWidth="2"
        />

        {/* Detalle líneas */}
        <line
          x1="50"
          y1="130"
          x2="60"
          y2="140"
          stroke="#FACC15"
          strokeWidth="2"
          opacity="0.3"
        />
        <line
          x1="40"
          y1="120"
          x2="50"
          y2="130"
          stroke="#FACC15"
          strokeWidth="2"
          opacity="0.3"
        />
      </svg>

      <p className="mt-6 text-gray-500 text-center text-lg">
        There are no records to display at the moment.
      </p>

      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 2.5s infinite;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
