"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import WhatsappTable from "./Whatsapp/WhatsappTable";
import EmailsTable from "./Emails/EmailsTable";
import WhatsappAgentTable from "./WhatsappAgent/WhatsappAgentTable";
import CallAgentsTable from "./Call/CallAgentsTable";
import EmailAgentsTable from "./EmailAgents/EmailAgentsTable";
import LinkedinAgentsTable from "./LinkedinAgents/LinkedinAgentsTable";
import HttpAgentsTable from "./HttpAgents/HttpAgentsTable";

const TABS: { [key: string]: React.ReactNode } = {
  WhatsApp: <WhatsappTable />,
  Email: <EmailsTable />,
  "Agentes de whatsapp": <WhatsappAgentTable />,
  "Agentes de llamada": <CallAgentsTable />,
  "Agentes de email": <EmailAgentsTable />,
  "Agentes de Linkedin": <LinkedinAgentsTable />,
  "solicitud HTTP": <HttpAgentsTable />,
};

const TemplatesViewContentRender = () => {
  const searchParams = useSearchParams();
  const subtab = searchParams.get("subtab") || "WhatsApp";

  return <div className="p-4">{TABS[subtab]}</div>;
};

export default TemplatesViewContentRender;
