"use client";

import React, { useState, useEffect } from "react";
import TemplatesViewHeader from "./Templates/TemplatesViewHeader";
import TemplatesViewContentRender from "./Templates/TemplatesViewContentRender";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

const TemplatesView = () => {
  // 🔑 Estado global de búsqueda
  const [searchQuery, setSearchQuery] = useState("");

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
      />

      <TemplatesViewContentRender searchQuery={searchQuery} />
    </Card>
  );
};

export default TemplatesView;
