"use client";

import React from "react";
import { BroadcastCampaign } from "@/types";
import { useCrmStore } from "@/store/useCrmStore";
import {
  Radio,
  CheckCircle2,
  Users,
  Eye,
  MessageSquare,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export function CampaignAnalyticsCard() {
  const { campaigns } = useCrmStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-ink flex items-center gap-2">
            <Radio className="h-4 w-4 text-aubergine" />
            <span>Broadcast Campaign History</span>
          </h3>
          <p className="text-xs text-ink-mute mt-0.5">
            Performance analytics across official Meta WhatsApp marketing broadcasts
          </p>
        </div>
        <Badge variant="outline" className="text-xs bg-white border-hairline font-semibold">
          {campaigns.length} Campaigns Launched
        </Badge>
      </div>

      <div className="space-y-3">
        {campaigns.map((camp) => {
          const openRate = Math.round((camp.readCount / camp.recipientCount) * 100);
          const replyRate = Math.round(
            (camp.repliesCount / camp.recipientCount) * 100
          );

          return (
            <div
              key={camp.id}
              className="p-5 rounded-2xl border border-hairline bg-white hover:shadow-elevation-1 transition-all space-y-3 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-sm text-ink">
                      {camp.title}
                    </h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-canvas-cream text-aubergine border border-hairline gap-1">
                      <CheckCircle2 className="h-3 w-3 text-semantic-success" />
                      Completed
                    </span>
                  </div>
                  <p className="text-xs text-ink-mute mt-0.5">
                    Target:{" "}
                    <span className="text-ink font-medium">
                      {camp.targetAudience}
                    </span>{" "}
                    • Template:{" "}
                    <span className="text-aubergine font-mono">
                      {camp.templateTitle}
                    </span>
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs text-ink-mute font-mono flex items-center justify-end gap-1">
                    <Clock className="h-3.5 w-3.5 text-ink-mute" />
                    {formatDate(camp.sentAt)}
                  </span>
                </div>
              </div>

              {/* 4 Performance Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-hairline font-mono text-xs">
                <div className="p-3 rounded-xl bg-canvas-cream border border-hairline">
                  <span className="text-[10px] text-ink-mute block uppercase font-sans">
                    Recipients
                  </span>
                  <span className="font-bold text-ink text-sm">
                    {camp.recipientCount} Prospects
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-canvas-cream border border-hairline">
                  <span className="text-[10px] text-ink-mute block uppercase font-sans">
                    Delivered
                  </span>
                  <span className="font-bold text-ink text-sm">
                    {camp.deliveredCount} (100%)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-canvas-cream border border-hairline">
                  <span className="text-[10px] text-semantic-success block uppercase font-sans">
                    Open Rate
                  </span>
                  <span className="font-bold text-semantic-success text-sm">
                    {camp.readCount} ({openRate}%)
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-canvas-cream border border-hairline">
                  <span className="text-[10px] text-aubergine block uppercase font-sans">
                    Direct Replies
                  </span>
                  <span className="font-bold text-aubergine text-sm">
                    {camp.repliesCount} ({replyRate}%)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

