"use client";

import React, { useState, useEffect } from "react";
import TemplatesViewHeader from "./Templates/TemplatesViewHeader";
import TemplatesViewContentRender from "./Templates/TemplatesViewContentRender";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import CreateTemplateSidebar from "./Templates/CreateTemplate/CreateTemplateSidebar";

const TemplatesView = () => {
  // 🔑 Estado global de búsqueda
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // 🚩 Hook para leer el subtab actual de la URL
  const searchParams = useSearchParams();
  const subtab = searchParams.get("subtab") || "WhatsApp";

  // 🚩 Efecto: cuando cambia el subtab, resetea la búsqueda
  useEffect(() => {
    setSearchQuery("");
  }, [subtab]);

  return (
    <Card>
      <TemplatesViewHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCreate={() => setIsCreateOpen(true)}
      />

      <TemplatesViewContentRender searchQuery={searchQuery} />
      <CreateTemplateSidebar
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </Card>
  );
};

export default TemplatesView;
