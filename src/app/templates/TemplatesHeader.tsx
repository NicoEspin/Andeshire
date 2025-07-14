"use client";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function TemplatesHeader() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-2xl">Plantillas</CardTitle>
        <CardDescription className="text-muted-foreground">
          Manage your templates and agents efficiently.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
