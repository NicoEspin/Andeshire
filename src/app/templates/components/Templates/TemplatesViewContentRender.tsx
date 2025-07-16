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



const TABS: {
  [key: string]: React.FC<{ searchQuery: string }>;
} = {
  WhatsApp: (props) => <WhatsappTable {...props} />,
  Email: (props) => <EmailsTable {...props} />,
  WhatsappAgents: (props) => <WhatsappAgentTable {...props} />,
  CallAgents: (props) => <CallAgentsTable {...props} />,
  EmailAgents: (props) => <EmailAgentsTable {...props} />,
  LinkedinAgents: (props) => <LinkedinAgentsTable {...props} />,
  HTTP: (props) => <HttpAgentsTable {...props} />,
};


const TemplatesViewContentRender = ({ searchQuery }: { searchQuery: string }) => {
  const searchParams = useSearchParams();
  const subtab = searchParams.get("subtab") || "WhatsApp";

  const Component = TABS[subtab];

  return (
    <div className="p-4">
      {Component && <Component searchQuery={searchQuery} />}
    </div>
  );
};

export default TemplatesViewContentRender;
