"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl"; // 👈 Importa el hook

type WorkflowSidebarProps = {
  templateSet: {
    id: string;
    name: string;
    recruiter_id: string;
    consulting_firm_id: string;
  };
};

export default function WorkflowSidebar({ templateSet }: WorkflowSidebarProps) {
  const t = useTranslations("WorkflowDetails.SidebarDetails"); 

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="m-4">
          {t("openDetail")}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-4">
        <SheetHeader>
          <SheetTitle>{templateSet.name}</SheetTitle>
        </SheetHeader>

        <hr className="my-4" />

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">{t("id")}:</span> {templateSet.id}
          </p>
          <p>
            <span className="font-medium">{t("recruiterId")}:</span>{" "}
            {templateSet.recruiter_id}
          </p>
          <p>
            <span className="font-medium">{t("consultingFirmId")}:</span>{" "}
            {templateSet.consulting_firm_id}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
