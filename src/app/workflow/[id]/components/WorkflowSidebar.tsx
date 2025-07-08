"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";

type WorkflowSidebarProps = {
  templateSet: {
    id: string;
    name: string;
    recruiter_id: string;
    consulting_firm_id: string;
  };
};

export default function WorkflowSidebar({ templateSet }: WorkflowSidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="m-4">
          Abrir Detalle
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-4">
        <SheetHeader>
          <SheetTitle>{templateSet.name}</SheetTitle>
        </SheetHeader>

        <hr className="my-4" />

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">ID:</span> {templateSet.id}
          </p>
          <p>
            <span className="font-medium">Recruiter ID:</span>{" "}
            {templateSet.recruiter_id}
          </p>
          <p>
            <span className="font-medium">Consulting Firm ID:</span>{" "}
            {templateSet.consulting_firm_id}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
