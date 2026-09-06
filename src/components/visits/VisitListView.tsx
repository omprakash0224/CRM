"use client";

import React, { useState } from "react";
import { SiteVisit } from "@/types";
import { useCrmStore } from "@/store/useCrmStore";
import {
  Clock,
  Navigation,
  FileText,
  Phone,
  Building2,
  ShieldCheck,
  Star,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDateTime } from "@/lib/utils";

interface VisitListViewProps {
  onOpenGpsCheckIn: (visit: SiteVisit) => void;
  onOpenFeedback: (visit: SiteVisit) => void;
}

export function VisitListView({
  onOpenGpsCheckIn,
  onOpenFeedback,
}: VisitListViewProps) {
  const { visits, projects, addLeadActivity, setNotification } =
    useCrmStore();

  const [tabFilter, setTabFilter] = useState<"ALL" | "SCHEDULED" | "COMPLETED">(
    "ALL"
  );
  const [projectFilter, setProjectFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredVisits = visits.filter((v) => {
    if (tabFilter === "SCHEDULED" && v.status !== "SCHEDULED" && v.status !== "IN_PROGRESS")
      return false;
    if (tabFilter === "COMPLETED" && v.status !== "COMPLETED") return false;
    if (projectFilter !== "ALL" && v.projectId !== projectFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        v.leadName.toLowerCase().includes(q) ||
        v.projectName.toLowerCase().includes(q) ||
        v.agentName.toLowerCase().includes(q) ||
        v.leadPhone.includes(q)
      );
    }
    return true;
  });

  const handleCall = (visit: SiteVisit) => {
    addLeadActivity(visit.leadId, {
      type: "CALL",
      description: `Pre-visit coordination call with ${visit.leadName}. Directions confirmed.`,
      agentName: visit.agentName,
    });
    setNotification(`📞 Call logged for ${visit.leadName}`);
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-hairline bg-white shadow-sm">
        {/* Status Tabs */}
        <div className="flex items-center bg-canvas-cream p-1 rounded-full border border-hairline text-xs">
          {(
            [
              { key: "ALL", label: `All (${visits.length})` },
              {
                key: "SCHEDULED",
                label: `Scheduled (${
                  visits.filter(
                    (v) =>
                      v.status === "SCHEDULED" || v.status === "IN_PROGRESS"
                  ).length
                })`,
              },
              {
                key: "COMPLETED",
                label: `GPS Verified (${
                  visits.filter((v) => v.status === "COMPLETED").length
                })`,
              },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setTabFilter(t.key)}
              className={`px-3.5 py-1.5 rounded-full font-bold transition-all ${
                tabFilter === t.key
                  ? "bg-aubergine text-white shadow-sm"
                  : "text-ink-mute hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Project & Search */}
        <div className="flex items-center space-x-2">
          <select
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="h-9 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
          >
            <option value="ALL">All Projects</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>

          <div className="relative w-44">
            <Search className="absolute left-2.5 top-3 h-3 w-3 text-ink-mute" />
            <Input
              placeholder="Search client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-9 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Visits List */}
      <div className="space-y-3">
        {filteredVisits.map((visit) => {
          const isCompleted = visit.status === "COMPLETED";

          return (
            <div
              key={visit.id}
              className={`p-5 rounded-2xl border transition-all duration-200 bg-white hover:shadow-elevation-1 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm ${
                isCompleted
                  ? "border-[#a7f3d0]"
                  : "border-hairline"
              }`}
            >
              {/* Left Column: Lead & Project Context */}
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-bold text-sm text-ink">
                    {visit.leadName}
                  </h4>
                  <span className="text-xs text-ink-mute font-mono">
                    {visit.leadPhone}
                  </span>

                  {isCompleted ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ecfdf5] text-[#007a5a] border border-[#a7f3d0] gap-1">
                      <ShieldCheck className="h-3 w-3 text-[#007a5a]" />
                      GPS Verified ({visit.distanceFromSiteMeters || 38}m)
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-canvas-lavender text-aubergine border border-[#ebd6f7] gap-1">
                      <Navigation className="h-3 w-3 text-aubergine" />
                      Scheduled On-Site Tour
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-ink-mute">
                  <span className="flex items-center gap-1 font-semibold text-ink">
                    <Building2 className="h-3.5 w-3.5 text-aubergine" />
                    {visit.projectName}
                  </span>
                  <span className="text-hairline">•</span>
                  <span className="flex items-center gap-1 font-mono text-ink">
                    <Clock className="h-3.5 w-3.5 text-ink-mute" />
                    {formatDateTime(visit.scheduledAt)}
                  </span>
                  <span className="text-hairline">•</span>
                  <span>Host: {visit.agentName}</span>
                </div>

                {/* Feedback snippet if completed */}
                {visit.clientFeedback && (
                  <div className="p-3 rounded-xl bg-[#fdfbf7] border border-hairline text-xs space-y-1 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-ink flex items-center gap-1">
                        <Star className="h-3 w-3 text-[#d97706] fill-[#d97706]" />
                        Rating: {visit.clientFeedback.rating}/5
                      </span>
                      <span className="text-[10px] font-mono text-[#007a5a] font-bold">
                        {visit.clientFeedback.unitLiked || "3BHK"}
                      </span>
                    </div>
                    <p className="text-[11px] text-ink-mute">
                      Next Step: {visit.clientFeedback.nextAction}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Interactive Actions */}
              <div className="flex items-center space-x-2 shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleCall(visit)}
                  className="h-9 w-9 p-0 text-ink-mute hover:text-ink"
                  title="Call Client"
                >
                  <Phone className="h-3.5 w-3.5" />
                </Button>

                {!isCompleted ? (
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => onOpenGpsCheckIn(visit)}
                    className="h-9 text-xs px-5 gap-1.5 shadow-elevation-1"
                  >
                    <Navigation className="h-3.5 w-3.5" />
                    GPS Check-In Simulator
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onOpenFeedback(visit)}
                    className="h-9 text-xs px-5 gap-1.5"
                  >
                    <FileText className="h-3.5 w-3.5 text-aubergine" />
                    Log / Edit Feedback
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
