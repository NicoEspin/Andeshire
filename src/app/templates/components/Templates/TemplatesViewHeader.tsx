"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const TemplatesViewHeader = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}) => {
  const t = useTranslations("Templates.TemplatesView.Header");
  const router = useRouter();
  const searchParams = useSearchParams();

  const subtab = searchParams.get("subtab") || "WhatsApp";
  const options = [
    "WhatsApp",
    "Email",
    "WhatsappAgents",
    "CallAgents",
    "EmailAgents",
    "LinkedinAgents",
    "HTTP",
  ];

  const handleSubTabChange = (newSubTab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("subtab", newSubTab);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4">
      <Select value={subtab} onValueChange={handleSubTabChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder={t("SelectPlaceholder")} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {t(`Options.${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
         <Input
            placeholder={t("SearchPlaceholder")}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          {t("CreateButton")}
        </Button>
      </div>
    </div>
  );
};

export default TemplatesViewHeader;
