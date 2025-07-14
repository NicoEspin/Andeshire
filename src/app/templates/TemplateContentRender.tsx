"use client";

import TemplatesView from "./components/TemplatesView";
import CallAgentsView from "./components/CallAgentsView";
import TextAgentsView from "./components/TextAgentsView";

interface TemplateContentRenderProps {
  activeTab: string;
}

export default function TemplateContentRender({
  activeTab,
}: TemplateContentRenderProps) {
  switch (activeTab) {
    case "templates":
      return <TemplatesView />;
    case "call-agents":
      return <CallAgentsView />;
    case "text-agents":
      return <TextAgentsView />;
    default:
      return null;
  }
}
