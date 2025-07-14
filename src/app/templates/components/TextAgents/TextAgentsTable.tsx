"use client";

import EmptyState from "@/app/components/EmptyState";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import clsx from "clsx";
import agentsData from "./data/textAgents.json";
import PromtDetail from "./PromtDetail";
import { useState } from "react";
import TextAgentSidebar from "./TextAgentSidebar";

interface Agent {
  id: string;
  chat_id: string;
  client_id: string;
  prompt: string;
  task: string;
  first_message: string;
  direction: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const truncate = (text: string, maxLength: number) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

const TextAgentsTable = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const agents: Agent[] = agentsData.agents || [];

  const hasData = agents.length > 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Text Agents</CardTitle>
        <CardDescription className="text-muted-foreground">
          Manage your automated messaging agents
        </CardDescription>
      </CardHeader>

      <CardContent>
        {hasData ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Chat ID</TableHead>
                <TableHead>Client ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Direction</TableHead>
                <TableHead>First Message</TableHead>
                <TableHead>Prompt</TableHead>
                <TableHead>Detalles</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id} onClick={() => setOpenSidebar(true)} className="cursor-pointer">
                  <TableCell>{agent.id}</TableCell>
                  <TableCell>{agent.chat_id}</TableCell>
                  <TableCell>{agent.client_id}</TableCell>
                  <TableCell>
                    <span
                      className={clsx(
                        "px-3 py-1 text-xs rounded-full font-medium",
                        agent.status === "in_progress" &&
                          "bg-blue-100 text-blue-800",
                        agent.status === "completed" &&
                          "bg-green-100 text-green-800",
                        agent.status === "outbound" &&
                          "bg-purple-100 text-purple-800"
                      )}
                    >
                      {agent.status}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span
                      className={clsx(
                        "px-3 py-1 text-xs rounded-full font-medium",
                        agent.direction === "outbound" &&
                          "bg-purple-100 text-purple-800",
                        agent.direction === "inbound" &&
                          "bg-blue-100 text-blue-800"
                      )}
                    >
                      {agent.direction}
                    </span>
                  </TableCell>
                  <TableCell>{truncate(agent.first_message, 40)}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <span>{truncate(agent.prompt, 30)}</span>
                  </TableCell>
                  <TableCell
                    onClick={(e) => {
                      e.stopPropagation(); // Detiene la propagación para que NO abra el sidebar
                    }}
                  >
                    <PromtDetail
                      agentId={agent.id}
                      chatId={agent.chat_id}
                      prompt={agent.prompt}
                      task={agent.task}
                      firstMessage={agent.first_message}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(agent.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(agent.updated_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="py-12">
            <EmptyState />
          </div>
        )}
      </CardContent>

      <CardFooter>
        {hasData && (
          <div className="w-full flex justify-between items-center text-sm text-muted-foreground">
            Showing {agents.length} results
            {/* 👉 Aquí va el paginador */}
          </div>
        )}
      </CardFooter>

      <TextAgentSidebar open={openSidebar} onOpenChange={setOpenSidebar} />
    </Card>
  );
};

export default TextAgentsTable;
