"use client";

import React from "react";
import { Lead } from "@/types";
import { useCrmStore } from "@/store/useCrmStore";
import {
  Sparkles,
  Phone,
  Clock,
  Building2,
} from "lucide-react";
import {
  formatCurrencyINR,
  formatRelativeTime,
  getAiScoreBadgeColor,
} from "@/lib/utils";

interface KanbanCardProps {
  lead: Lead;
  onSelect: (lead: Lead) => void;
}

export function KanbanCard({ lead, onSelect }: KanbanCardProps) {
  const { agents } = useCrmStore();
  const agent = agents.find((a) => a.id === lead.assignedAgentId);

  const aiBadge = getAiScoreBadgeColor(lead.aiScore);

  // Check if lead was created in last 10 minutes (simulated or fresh)
  const isFresh =
    Date.now() - new Date(lead.createdAt).getTime() < 10 * 60 * 1000;

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", lead.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "Hot":
        return "bg-[#fef2f2] text-[#cc4117] border-[#fecaca]";
      case "NRI":
        return "bg-[#eff6ff] text-[#1264a3] border-[#bfdbfe]";
      case "Investor":
        return "bg-[#fef3c7] text-[#92400e] border-[#fde68a]";
      case "High Intent":
        return "bg-[#ecfdf5] text-[#007a5a] border-[#a7f3d0]";
      default:
        return "bg-[#f4ede4] text-ink border-hairline";
    }
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onClick={() => onSelect(lead)}
      className={`group relative rounded-xl border p-3.5 cursor-grab active:cursor-grabbing transition-all duration-200 select-none shadow-sm ${
        isFresh
          ? "border-aubergine bg-canvas-lavender/40 shadow-elevation-1 animate-pulse"
          : "border-hairline bg-white hover:border-aubergine/50 hover:shadow-elevation-1"
      }`}
    >
      {/* Top row: Name & AI Score */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center space-x-1.5">
            <h4 className="text-xs font-bold text-ink group-hover:text-aubergine transition-colors">
              {lead.name}
            </h4>
            {lead.isOverdue && (
              <span
                className="h-2 w-2 rounded-full bg-[#cc4117] animate-ping"
                title="Follow-up overdue >2h"
              />
            )}
          </div>
          <p className="text-[11px] text-ink-mute font-mono mt-0.5 flex items-center gap-1">
            <Phone className="h-2.5 w-2.5 text-ink-mute" />
            {lead.phone}
          </p>
        </div>

        <span
          className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${aiBadge.bg}`}
          title={`AI Score: ${lead.aiScore}/100 - ${lead.aiIntent}`}
        >
          <Sparkles className="h-2.5 w-2.5 mr-0.5" />
          {lead.aiScore}
        </span>
      </div>

      {/* Middle row: Project & Budget */}
      <div className="mt-2.5 pt-2 border-t border-hairline flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1 text-ink truncate">
          <Building2 className="h-3 w-3 text-aubergine shrink-0" />
          <span className="truncate font-semibold text-[11px]">
            {lead.preferredProject || "Gurugram Prime"}
          </span>
          <span className="text-ink-mute">•</span>
          <span className="text-ink-mute text-[10px]">
            {lead.preferredBhk}
          </span>
        </div>

        <span className="font-mono font-bold text-aubergine text-xs shrink-0 ml-1">
          {formatCurrencyINR((lead.budgetMin + lead.budgetMax) / 2)}
        </span>
      </div>

      {/* Tags row */}
      {lead.tags && lead.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {lead.tags.map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.2 rounded-full text-[9px] font-bold border ${getTagColor(
                tag
              )}`}
            >
              {tag}
            </span>
          ))}
          <span className="px-2 py-0.2 rounded-full text-[9px] bg-canvas-cream text-ink-mute border border-hairline font-medium">
            {lead.source.replace("_", " ")}
          </span>
        </div>
      )}

      {/* Footer row: Agent avatar & Last activity */}
      <div className="mt-3 pt-2 border-t border-hairline flex items-center justify-between text-[10px] text-ink-mute">
        <div className="flex items-center space-x-1.5">
          <img
            src={
              agent?.avatar ||
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
            }
            alt={agent?.name || "Agent"}
            className="h-4 w-4 rounded-full object-cover ring-1 ring-hairline"
          />
          <span className="truncate text-ink font-semibold max-w-[100px]">
            {agent?.name.split(" ")[0] || "Rajesh"}
          </span>
        </div>

        <span className="flex items-center gap-1 text-ink-mute font-mono text-[9px]">
          <Clock className="h-2.5 w-2.5" />
          {formatRelativeTime(lead.updatedAt)}
        </span>
      </div>
    </div>
  );
}
