"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useTranslations } from "next-intl";

type ActionModalProps = {
  open: boolean;
  status: "loading" | "success" | "error";
  message: string;
  onClose: () => void;
};

export default function ActionModal({
  open,
  status,
  message,
  onClose,
}: ActionModalProps) {
  const t = useTranslations("ActionModal");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl p-6 shadow-xl border-none">
        <DialogHeader className="items-center">
          <VisuallyHidden>
            <DialogTitle>{t("Title")}</DialogTitle>
          </VisuallyHidden>

          <div className="flex flex-col items-center gap-3 text-center">
            {status === "loading" && (
              <>
                <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{t("Loading")}</p>
              </>
            )}

            {status === "success" && (
              <>
                <CheckCircle2 className="w-10 h-10 text-green-500" />
                <p className="text-base text-foreground">{message}</p>
              </>
            )}

            {status === "error" && (
              <>
                <XCircle className="w-10 h-10 text-red-500" />
                <p className="text-base text-destructive">{message}</p>
              </>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
