"use client";

import React, { useEffect, useState } from "react";
import TemplatesHeader from "./TemplatesHeader";
import TemplatesNav from "./TemplatesNav";
import TemplateContentRender from "./TemplateContentRender";
import { useSearchParams, useRouter } from "next/navigation";

export default function TemplatesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState("templates");

  useEffect(() => {
    if (tabParam) setActiveTab(tabParam);
  }, [tabParam]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);

    // 🔑 Si NO es la vista `templates`, borramos `subtab`
    if (value !== "templates") {
      params.delete("subtab");
    }

    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="space-y-6 pr-8">
      <TemplatesHeader />
      <TemplatesNav activeTab={activeTab} setActiveTab={handleTabChange} />
      <TemplateContentRender activeTab={activeTab} />
    </div>
  );
}
