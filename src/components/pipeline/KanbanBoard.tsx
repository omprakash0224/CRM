"use client";

import React from "react";
import { Lead, LeadStage } from "@/types";
import { useCrmStore } from "@/store/useCrmStore";
import { KanbanColumn } from "./KanbanColumn";

interface KanbanBoardProps {
  filteredLeads: Lead[];
  onSelectLead: (lead: Lead) => void;
}

const STAGES_CONFIG: { stage: LeadStage; title: string; stepNumber: number }[] =
  [
    { stage: "NEW_LEAD", title: "New Inquiries", stepNumber: 1 },
    { stage: "CONTACTED", title: "Contacted", stepNumber: 2 },
    { stage: "INTERESTED", title: "Interested", stepNumber: 3 },
    {
      stage: "SITE_VISIT_SCHEDULED",
      title: "Site Visits",
      stepNumber: 4,
    },
    { stage: "NEGOTIATION", title: "Negotiation", stepNumber: 5 },
    { stage: "BOOKING", title: "Booking Token", stepNumber: 6 },
    { stage: "CLOSED", title: "Closed / Won", stepNumber: 7 },
  ];

export function KanbanBoard({ filteredLeads, onSelectLead }: KanbanBoardProps) {
  const { updateLeadStage, setNotification } = useCrmStore();

  const handleDropLead = (leadId: string, targetStage: LeadStage) => {
    const lead = filteredLeads.find((l) => l.id === leadId);
    if (lead && lead.stage !== targetStage) {
      updateLeadStage(leadId, targetStage);
      setNotification(
        `✓ Moved ${lead.name} to ${targetStage.replace(/_/g, " ")}`
      );
    }
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-1 select-none">
      {STAGES_CONFIG.map(({ stage, title, stepNumber }) => {
        const columnLeads = filteredLeads.filter((l) => l.stage === stage);
        return (
          <KanbanColumn
            key={stage}
            stage={stage}
            title={title}
            stepNumber={stepNumber}
            leads={columnLeads}
            onSelectLead={onSelectLead}
            onDropLead={handleDropLead}
          />
        );
      })}
    </div>
  );
}
