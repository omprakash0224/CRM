"use client";

import React, { useState } from "react";
import { Lead, LeadStage, ActivityType } from "@/types";
import { useCrmStore } from "@/store/useCrmStore";
import {
  X,
  Phone,
  MessageSquare,
  Sparkles,
  Building2,
  Calendar,
  Clock,
  Send,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AiPitchCopilot } from "@/components/ai/AiPitchCopilot";
import { AiLeadScoringGauge } from "@/components/ai/AiLeadScoringGauge";
import { DealRiskPredictorCard } from "@/components/ai/DealRiskPredictorCard";
import {
  formatCurrencyINR,
  formatRelativeTime,
  getLeadStageColor,
  getLeadStageLabel,
  getAiScoreBadgeColor,
} from "@/lib/utils";

interface LeadDetailDrawerProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
}

const QUICK_NOTE_PILLS = [
  "Interested in higher floor (10+)",
  "Discussing budget with spouse",
  "Requested payment plan & cost sheet",
  "Site visit promised for this weekend",
  "Asked for 2% festive waiver on floor rise",
  "Needs SBI home loan pre-approval",
  "NRI - prefers Zoom video walkthrough",
];

const ALL_STAGES: LeadStage[] = [
  "NEW_LEAD",
  "CONTACTED",
  "INTERESTED",
  "SITE_VISIT_SCHEDULED",
  "NEGOTIATION",
  "BOOKING",
  "CLOSED",
];

export function LeadDetailDrawer({
  lead,
  open,
  onClose,
}: LeadDetailDrawerProps) {
  const {
    agents,
    updateLeadStage,
    updateLead,
    addLeadActivity,
    setNotification,
  } = useCrmStore();

  const [activeDrawerTab, setActiveDrawerTab] = useState<
    "OVERVIEW" | "AI_PITCH" | "RISK"
  >("OVERVIEW");

  const [newNote, setNewNote] = useState("");
  const [followUpDate, setFollowUpDate] = useState("2026-09-09");
  const [followUpTime, setFollowUpTime] = useState("16:00");

  if (!open || !lead) return null;

  const currentAgent = agents.find((a) => a.id === lead.assignedAgentId);
  const stageColor = getLeadStageColor(lead.stage);
  const aiBadge = getAiScoreBadgeColor(lead.aiScore);

  const handleStageChange = (newStage: LeadStage) => {
    updateLeadStage(lead.id, newStage);
    setNotification(
      `✓ Lead moved to ${newStage.replace(/_/g, " ")}`
    );
  };

  const handleAgentChange = (newAgentId: string) => {
    updateLead(lead.id, { assignedAgentId: newAgentId });
    addLeadActivity(lead.id, {
      type: "STAGE_CHANGE",
      description: `Reassigned to ${agents.find((a) => a.id === newAgentId)?.name}`,
      agentName: currentAgent?.name || "Manager",
    });
    setNotification(
      `✓ Reassigned to ${agents.find((a) => a.id === newAgentId)?.name}`
    );
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    addLeadActivity(lead.id, {
      type: "NOTE",
      description: newNote,
      agentName: currentAgent?.name || "Agent",
    });

    setNotification("✓ Call note logged into client timeline.");
    setNewNote("");
  };

  const handleAddPill = (pillText: string) => {
    setNewNote((prev) => (prev ? `${prev}. ${pillText}` : pillText));
  };

  const handleSetFollowUp = () => {
    if (!followUpDate) return;
    const combined = `${followUpDate}T${followUpTime}:00Z`;
    updateLead(lead.id, { nextFollowUpAt: combined, isOverdue: false });
    addLeadActivity(lead.id, {
      type: "CALL",
      description: `Follow-up reminder set for ${followUpDate} at ${followUpTime}`,
      agentName: currentAgent?.name || "Agent",
    });
    setNotification(`✓ Follow-up reminder scheduled for ${followUpDate}`);
  };

  const handleSimulateCall = () => {
    addLeadActivity(lead.id, {
      type: "CALL",
      description: "Direct outbound phone call completed: 6m 12s. Client engaged.",
      agentName: currentAgent?.name || "Agent",
    });
    updateLead(lead.id, { isOverdue: false });
    setNotification(`📞 Call logged with ${lead.name}`);
  };

  const handleSimulateWhatsApp = () => {
    addLeadActivity(lead.id, {
      type: "WHATSAPP",
      description: `Dispatched official WhatsApp e-brochure for ${lead.preferredProject || "Gurugram Luxury"}`,
      agentName: currentAgent?.name || "Agent",
    });
    updateLead(lead.id, { isOverdue: false });
    setNotification(`💬 WhatsApp message dispatched to ${lead.name}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white border-l border-hairline shadow-elevation-2 flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-hairline bg-[#fdfbf7] space-y-3 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#f4ede4] text-ink border border-hairline">
                {lead.source}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${stageColor.border} ${stageColor.bg} ${stageColor.text}`}
              >
                {getLeadStageLabel(lead.stage)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-ink-mute hover:text-ink hover:bg-canvas-cream transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-ink">
                {lead.name}
              </h2>
              <div className="flex items-center space-x-3 text-xs text-ink-mute mt-0.5 font-mono">
                <a href={`tel:${lead.phone}`} className="text-[#1264a3] hover:underline font-semibold">
                  {lead.phone}
                </a>
                <span>•</span>
                <a href={`mailto:${lead.email}`} className="text-ink-mute hover:text-ink font-sans">
                  {lead.email}
                </a>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleSimulateCall}
                className="h-8 px-4 text-xs gap-1.5"
              >
                <Phone className="h-3.5 w-3.5 text-aubergine" />
                Call
              </Button>
              <Button
                size="sm"
                variant="default"
                onClick={handleSimulateWhatsApp}
                className="h-8 px-4 text-xs gap-1.5"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Quick Stage and Agent Dropdowns */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-hairline text-xs">
            <div>
              <label className="text-[10px] text-ink-mute uppercase font-bold block mb-1">
                Move Stage
              </label>
              <select
                value={lead.stage}
                onChange={(e) => handleStageChange(e.target.value as LeadStage)}
                className="w-full h-9 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
              >
                {ALL_STAGES.map((st) => (
                  <option key={st} value={st}>
                    {getLeadStageLabel(st)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] text-ink-mute uppercase font-bold block mb-1">
                Assigned Agent
              </label>
              <select
                value={lead.assignedAgentId}
                onChange={(e) => handleAgentChange(e.target.value)}
                className="w-full h-9 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
              >
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.role.split(" ")[0]})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Drawer Tabs */}
        <div className="flex border-b border-hairline bg-[#f4ede4] px-6 text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => setActiveDrawerTab("OVERVIEW")}
            className={`pb-3 pt-3 border-b-2 px-3 transition-colors ${
              activeDrawerTab === "OVERVIEW"
                ? "border-aubergine text-aubergine font-extrabold"
                : "border-transparent text-ink-mute hover:text-ink"
            }`}
          >
            📋 Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveDrawerTab("AI_PITCH")}
            className={`pb-3 pt-3 border-b-2 px-3 transition-colors flex items-center gap-1.5 ${
              activeDrawerTab === "AI_PITCH"
                ? "border-aubergine text-aubergine font-extrabold"
                : "border-transparent text-ink-mute hover:text-ink"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-[#d97706]" />
            <span>AI Pitch Copilot</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveDrawerTab("RISK")}
            className={`pb-3 pt-3 border-b-2 px-3 transition-colors flex items-center gap-1.5 ${
              activeDrawerTab === "RISK"
                ? "border-aubergine text-aubergine font-extrabold"
                : "border-transparent text-ink-mute hover:text-ink"
            }`}
          >
            <span>🛡️ Deal Risk Radar</span>
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs bg-white">
          {activeDrawerTab === "AI_PITCH" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <AiPitchCopilot lead={lead} compactMode={true} />
              <div className="pt-2 border-t border-hairline">
                <AiLeadScoringGauge lead={lead} />
              </div>
            </div>
          )}

          {activeDrawerTab === "RISK" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <DealRiskPredictorCard lead={lead} />
              <div className="pt-2 border-t border-hairline">
                <AiLeadScoringGauge lead={lead} />
              </div>
            </div>
          )}

          {activeDrawerTab === "OVERVIEW" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Section 1: AI Lead Scoring & Intent */}
              <div className="p-4 rounded-xl border border-hairline bg-[#fdfbf7] space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-[#d97706]" />
                    <span className="font-bold text-ink text-xs">
                      AI Lead Scoring & Intent Analysis
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${aiBadge.bg}`}
                  >
                    {lead.aiScore}/100 — {aiBadge.label}
                  </span>
                </div>

                <p className="text-xs text-ink leading-relaxed bg-white p-3 rounded-lg border border-hairline">
                  {lead.aiIntent}
                </p>

                {lead.aiBreakdown && (
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[10px] text-ink-mute uppercase tracking-wider font-bold">
                      Scoring Factors:
                    </p>
                    {lead.aiBreakdown.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-[11px] text-ink font-medium"
                      >
                        <span>{item.factor}</span>
                        <span className="font-mono text-[#007a5a] font-bold">
                          +{item.points} pts
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 2: Buyer Preferences */}
              <div className="p-4 rounded-xl border border-hairline bg-[#fdfbf7] space-y-3 shadow-sm">
                <h4 className="font-bold text-ink text-xs flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-aubergine" />
                  <span>Client Requirements & Budget</span>
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-ink-mute block">Target Project</span>
                    <span className="font-semibold text-ink">
                      {lead.preferredProject || "Gurugram Luxury"}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-ink-mute block">Desired BHK</span>
                    <span className="font-semibold text-ink">
                      {lead.preferredBhk}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-ink-mute block">Budget Range</span>
                    <span className="font-mono font-bold text-aubergine">
                      {formatCurrencyINR(lead.budgetMin)} - {formatCurrencyINR(lead.budgetMax)}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] text-ink-mute block">Location Preference</span>
                    <span className="font-semibold text-ink">
                      {lead.preferredLocation}
                    </span>
                  </div>
                </div>

                {lead.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-hairline">
                    {lead.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#f4ede4] text-ink border border-hairline"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Section 3: Next Follow-Up Reminder */}
              <div className="p-4 rounded-xl border border-hairline bg-[#fdfbf7] space-y-3 shadow-sm">
                <h4 className="font-bold text-ink text-xs flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-aubergine" />
                  <span>Schedule Next Follow-Up</span>
                </h4>

                <div className="flex items-center space-x-2">
                  <Input
                    type="date"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    className="h-9 text-xs"
                  />
                  <Input
                    type="time"
                    value={followUpTime}
                    onChange={(e) => setFollowUpTime(e.target.value)}
                    className="h-9 text-xs"
                  />
                  <Button
                    size="sm"
                    variant="default"
                    onClick={handleSetFollowUp}
                    className="h-9 text-xs px-5 shrink-0"
                  >
                    Set
                  </Button>
                </div>
              </div>

              {/* Section 4: Quick Call Note Logger */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-ink text-xs flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-[#1264a3]" />
                  <span>Log Call Note & Observations</span>
                </h4>

                {/* Quick Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_NOTE_PILLS.map((pill) => (
                    <button
                      key={pill}
                      type="button"
                      onClick={() => handleAddPill(pill)}
                      className="px-2.5 py-1 rounded-full text-[10px] bg-canvas-cream hover:bg-[#ebd9f8] text-ink border border-hairline transition-colors text-left font-medium"
                    >
                      + {pill}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleAddNote} className="space-y-2 pt-1">
                  <textarea
                    rows={3}
                    placeholder="Type note details here or click pills above..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full rounded border border-hairline bg-white p-3 text-xs text-ink placeholder:text-ink-mute focus:outline-none focus:ring-2 focus:ring-aubergine"
                  />
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      size="sm"
                      variant="default"
                      className="text-xs px-6 gap-1"
                    >
                      <Send className="h-3 w-3 mr-1" />
                      Save Note to History
                    </Button>
                  </div>
                </form>
              </div>

              {/* Section 5: Interaction Activity Timeline */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-ink text-xs flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-ink-mute" />
                  <span>Interaction Timeline ({lead.interactionHistory?.length || 0})</span>
                </h4>

                <div className="relative pl-4 space-y-3.5 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-hairline">
                  {(lead.interactionHistory || []).map((act) => (
                    <div key={act.id} className="relative space-y-1">
                      <div className="absolute -left-[17px] top-1 h-2.5 w-2.5 rounded-full bg-aubergine ring-4 ring-white" />
                      <div className="flex items-center justify-between text-[10px] text-ink-mute">
                        <span className="font-bold text-ink">
                          {act.type} • {act.agentName}
                        </span>
                        <span className="font-mono">{formatRelativeTime(act.timestamp)}</span>
                      </div>
                      <p className="text-xs text-ink bg-[#fdfbf7] p-3 rounded-xl border border-hairline leading-relaxed shadow-sm">
                        {act.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
