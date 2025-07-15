"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";

interface TemplatesNavProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export default function TemplatesNav({
  activeTab,
  setActiveTab,
}: TemplatesNavProps) {
  const t = useTranslations("Templates.Nav");

  const tabs = [
    { value: "templates", label: t("templates") },
    { value: "call-agents", label: t("callAgents") },
    { value: "text-agents", label: t("textAgents") },
  ];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="bg-muted p-1">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`data-[state=active]:bg-purple-600 data-[state=active]:text-white 
              transition-colors px-4 py-2 rounded-md cursor-pointer`}
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
