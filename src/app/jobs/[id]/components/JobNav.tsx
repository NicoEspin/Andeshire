"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FileText, Users, Shield, UserCheck, Sliders } from "lucide-react";
import { useTranslations } from "next-intl";

interface JobNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}





const tabColors = {
  indigo: {
    text: "text-indigo-600",
    hoverBg: "hover:bg-indigo-100",
    icon: "text-indigo-600",
    activeBg: "bg-gradient-to-r from-indigo-500 to-indigo-600",
  },
  purple: {
    text: "text-purple-600",
    hoverBg: "hover:bg-purple-100",
    icon: "text-purple-600",
    activeBg: "bg-gradient-to-r from-purple-500 to-purple-600",
  },
  rose: {
    text: "text-rose-600",
    hoverBg: "hover:bg-rose-100",
    icon: "text-rose-600",
    activeBg: "bg-gradient-to-r from-rose-500 to-rose-600",
  },
  cyan: {
    text: "text-cyan-600",
    hoverBg: "hover:bg-cyan-100",
    icon: "text-cyan-600",
    activeBg: "bg-gradient-to-r from-cyan-500 to-cyan-600",
  },
  emerald: {
    text: "text-emerald-600",
    hoverBg: "hover:bg-emerald-100",
    icon: "text-emerald-600",
    activeBg: "bg-gradient-to-r from-emerald-500 to-emerald-600",
  },
  amber: {
    text: "text-amber-600",
    hoverBg: "hover:bg-amber-100",
    icon: "text-amber-600",
    activeBg: "bg-gradient-to-r from-amber-500 to-amber-600",
  },
};

export default function JobNav({ activeTab, onTabChange }: JobNavProps) {
  const t = useTranslations("JobId");
  
const tabs = [
  {
    label: t("tabs.detalles"),
    value: "detalles",
    icon: FileText,
    color: "indigo",
  },
  {
    label: t("tabs.descripcion"),
    value: "descripcion",
    icon: FileText,
    color: "purple",
  },
  {
    label: t("tabs.candidatos"),
    value: "candidatos",
    icon: Users,
    color: "rose",
  },
  { label: t("tabs.heimdall"), value: "heimdall", icon: Shield, color: "cyan" },
  {
    label: t("tabs.aplicantes"),
    value: "aplicantes",
    icon: UserCheck,
    color: "emerald",
  },
  {
    label: t("tabs.personalizados"),
    value: "personalizados",
    icon: Sliders,
    color: "amber",
  },
];
  return (
    <nav className="flex gap-4 px-4 sm:px-6 md:px-8 py-3 border-b bg-white dark:bg-gray-900 rounded-md">
      {tabs.map(({ label, value, icon: Icon, color }) => {
        const isActive = activeTab === value;
        const colors = tabColors[color as keyof typeof tabColors];

        return (
          <motion.button
            key={value}
            onClick={() => onTabChange(value)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
              "relative flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200",
              isActive
                ? `text-white ${colors.activeBg} shadow-md`
                : `${colors.text} ${colors.hoverBg}`
            )}
          >
            <motion.div whileHover={{ scale: 1.1 }}>
              <Icon
                className={cn(
                  "w-4 h-4 transition-colors duration-200",
                  isActive ? "text-white" : colors.icon
                )}
              />
            </motion.div>

            {label}
          </motion.button>
        );
      })}
    </nav>
  );
}
