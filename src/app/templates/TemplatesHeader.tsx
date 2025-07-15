"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function TemplatesHeader() {
  const t = useTranslations("Templates.Header");

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-2xl">{t("title")}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {t("description")}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
