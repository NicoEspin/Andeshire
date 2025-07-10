"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WorkflowItem } from "@/app/Types/Workflow/WorkflowListTypes";
import { useTranslations } from "next-intl";

type StageDetailsProps = {
  workflow: WorkflowItem | null;
  open: boolean;
  onClose: () => void;
};

export default function StageDetails({
  workflow,
  open,
  onClose,
}: StageDetailsProps) {
  const t = useTranslations("Workflows.StageDetails");

  if (!workflow) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {t("title", { name: workflow.name })}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[60vh] w-full pr-4">
          <div className="space-y-6">
            {workflow.stages.map((stage, index) => (
              <div key={stage.id} className="border rounded-md p-4">
                <h3 className="text-lg font-semibold">
                  {index + 1}. {stage.name}
                </h3>
                <p className="text-muted-foreground">{stage.description}</p>
                <div className="mt-2">
                  <h4 className="font-medium">{t("nextStagesTitle")}</h4>
                  {stage.next_possible_stages?.length ? (
                    <ul className="list-disc pl-5">
                      {stage.next_possible_stages.map((nextStage) => (
                        <li key={nextStage.id}>{nextStage.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">
                      {t("noNextStages")}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
