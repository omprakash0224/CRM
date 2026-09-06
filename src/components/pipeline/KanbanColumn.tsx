"use client";

import React, { useState } from "react";
import { Lead, LeadStage } from "@/types";
import { KanbanCard } from "./KanbanCard";
import { getLeadStageColor, formatCurrencyINR } from "@/lib/utils";

interface KanbanColumnProps {
  stage: LeadStage;
  title: string;
  stepNumber: number;
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onDropLead: (leadId: string, targetStage: LeadStage) => void;
}

export function KanbanColumn({
  stage,
  title,
  stepNumber,
  leads,
  onSelectLead,
  onDropLead,
}: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const stageColor = getLeadStageColor(stage);

  // Calculate sum of active budgets in this column
  const totalStageValue = leads.reduce(
    (sum, l) => sum + (l.budgetMin + l.budgetMax) / 2,
    0
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const leadId = e.dataTransfer.getData("text/plain");
    if (leadId) {
      onDropLead(leadId, stage);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col rounded-2xl border transition-all duration-200 min-w-[280px] max-w-[320px] flex-1 bg-[#f4ede4]/40 ${
        isDragOver
          ? "border-aubergine bg-canvas-lavender/50 shadow-elevation-2 ring-2 ring-aubergine/30"
          : "border-hairline hover:border-[#d0c5b8]"
      }`}
    >
      {/* Column Header */}
      <div className="p-3.5 border-b border-hairline space-y-2 bg-white/70 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                stage === "NEW_LEAD"
                  ? "bg-[#1264a3]"
                  : stage === "CONTACTED"
                  ? "bg-[#4a154b]"
                  : stage === "INTERESTED"
                  ? "bg-[#d97706]"
                  : stage === "SITE_VISIT_SCHEDULED"
                  ? "bg-[#7b2cbf]"
                  : stage === "NEGOTIATION"
                  ? "bg-[#b45309]"
                  : stage === "BOOKING"
                  ? "bg-aubergine"
                  : "bg-[#007a5a]"
              }`}
            />
            <h3 className="font-bold text-xs text-ink">
              {stepNumber}. {title}
            </h3>
          </div>

          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${stageColor.border} ${stageColor.bg} ${stageColor.text}`}
          >
            {leads.length}
          </span>
        </div>

        <div className="flex items-center justify-between text-[10px] text-ink-mute font-mono">
          <span>Stage Deal Value:</span>
          <span className="font-bold text-aubergine">
            {formatCurrencyINR(totalStageValue)}
          </span>
        </div>
      </div>

      {/* Cards Scroll Container */}
      <div className="flex-1 p-2.5 space-y-2.5 overflow-y-auto max-h-[calc(100vh-270px)] min-h-[300px]">
        {leads.length === 0 ? (
          <div className="h-32 border-2 border-dashed border-[#dcd2c5] rounded-xl flex flex-col items-center justify-center text-ink-mute text-xs p-4 text-center">
            <span className="font-medium">Drop leads here</span>
            <span className="text-[10px] text-ink-mute mt-1">
              Drag prospect card into {title}
            </span>
          </div>
        ) : (
          leads.map((lead) => (
            <KanbanCard key={lead.id} lead={lead} onSelect={onSelectLead} />
          ))
        )}
      </div>
    </div>
  );
}
