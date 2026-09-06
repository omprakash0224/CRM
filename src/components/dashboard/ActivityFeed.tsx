"use client";

import React, { useState } from "react";
import {
  PhoneCall,
  MessageSquare,
  Navigation,
  CheckCircle,
  Zap,
  Clock,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCrmStore } from "@/store/useCrmStore";
import { formatRelativeTime } from "@/lib/utils";

export function ActivityFeed() {
  const { leads } = useCrmStore();
  const [filter, setFilter] = useState<"ALL" | "CALLS" | "VISITS" | "CLOSURES">(
    "ALL"
  );

  // Flatten all activities across leads
  const allActivities = leads.flatMap((lead) =>
    (lead.interactionHistory || []).map((act) => ({
      ...act,
      leadId: lead.id,
      leadName: lead.name,
      leadPhone: lead.phone,
      project: lead.preferredProject,
    }))
  );

  // Sort descending by timestamp
  allActivities.sort(
    (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  // Filter activities
  const filteredActivities = allActivities.filter((act) => {
    if (filter === "CALLS") return act.type === "CALL" || act.type === "WHATSAPP";
    if (filter === "VISITS") return act.type === "SITE_VISIT";
    if (filter === "CLOSURES")
      return (
        act.type === "STAGE_CHANGE" &&
        (act.description.toLowerCase().includes("booked") ||
          act.description.toLowerCase().includes("closed") ||
          act.description.toLowerCase().includes("booking"))
      );
    return true;
  });

  const getActivityIcon = (type: string, description: string) => {
    if (type === "CALL") return <PhoneCall className="h-3.5 w-3.5 text-[#1264a3]" />;
    if (type === "WHATSAPP")
      return <MessageSquare className="h-3.5 w-3.5 text-[#007a5a]" />;
    if (type === "SITE_VISIT")
      return <Navigation className="h-3.5 w-3.5 text-aubergine" />;
    if (type === "INBOUND_LEAD")
      return <Zap className="h-3.5 w-3.5 text-[#d97706] fill-current" />;
    if (
      description.toLowerCase().includes("booked") ||
      description.toLowerCase().includes("closed")
    ) {
      return <CheckCircle className="h-3.5 w-3.5 text-[#007a5a]" />;
    }
    return <FileText className="h-3.5 w-3.5 text-ink-mute" />;
  };

  return (
    <Card className="flex flex-col shadow-elevation-1">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007a5a] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#007a5a]"></span>
          </span>
          <div>
            <CardTitle className="text-sm font-bold text-ink">
              Real-Time Sales Activity Feed
            </CardTitle>
            <p className="text-xs text-ink-mute mt-0.5">
              Live operational event stream across all sales agents
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center bg-canvas-cream p-1 rounded-full border border-hairline text-[10px]">
          {(
            [
              { key: "ALL", label: "All" },
              { key: "CALLS", label: "Calls & WA" },
              { key: "VISITS", label: "Visits" },
              { key: "CLOSURES", label: "Deals" },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`px-3 py-1 rounded-full font-bold transition-all ${
                filter === t.key
                  ? "bg-aubergine text-white shadow-sm"
                  : "text-ink-mute hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto max-h-[380px] space-y-2.5 pr-2">
        {filteredActivities.slice(0, 10).map((act) => (
          <div
            key={act.id}
            className="p-3.5 rounded-xl border border-hairline bg-[#fdfbf7] hover:bg-white hover:border-[#4a154b]/30 transition-all flex items-start space-x-3 group shadow-sm"
          >
            <div className="p-2 rounded-full bg-white border border-hairline shrink-0 mt-0.5 group-hover:border-aubergine/40 shadow-sm">
              {getActivityIcon(act.type, act.description)}
            </div>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-ink truncate">
                  {act.leadName}
                </span>
                <span className="text-[10px] text-ink-mute shrink-0 font-mono flex items-center gap-1">
                  <Clock className="h-2.5 w-2.5 text-ink-mute" />
                  {formatRelativeTime(act.timestamp)}
                </span>
              </div>

              <p className="text-xs text-ink leading-snug">
                {act.description}
              </p>

              <div className="flex items-center space-x-2 text-[10px] text-ink-mute pt-0.5 font-medium">
                <span>by {act.agentName}</span>
                {act.project && (
                  <>
                    <span>•</span>
                    <span className="text-aubergine font-bold">{act.project}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
