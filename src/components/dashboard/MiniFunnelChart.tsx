"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCrmStore } from "@/store/useCrmStore";

export function MiniFunnelChart() {
  const { leads } = useCrmStore();

  const stageCounts = {
    inbound: leads.length,
    contacted: leads.filter((l) => l.stage !== "NEW_LEAD").length,
    visits: leads.filter(
      (l) =>
        l.stage === "SITE_VISIT_SCHEDULED" ||
        l.stage === "NEGOTIATION" ||
        l.stage === "BOOKING" ||
        l.stage === "CLOSED"
    ).length,
    negotiation: leads.filter(
      (l) =>
        l.stage === "NEGOTIATION" ||
        l.stage === "BOOKING" ||
        l.stage === "CLOSED"
    ).length,
    closed: leads.filter(
      (l) => l.stage === "BOOKING" || l.stage === "CLOSED"
    ).length,
  };

  const funnelData = [
    {
      stage: "1. Inbound",
      label: "Inbound Leads",
      count: stageCounts.inbound,
      pct: 100,
      color: "#4a154b", // Brand Aubergine
    },
    {
      stage: "2. Contacted",
      label: "Qualified & Contacted",
      count: stageCounts.contacted,
      pct: Math.round((stageCounts.contacted / (stageCounts.inbound || 1)) * 100),
      color: "#1264a3", // Link Blue
    },
    {
      stage: "3. Site Visits",
      label: "Site Visits Scheduled",
      count: stageCounts.visits,
      pct: Math.round((stageCounts.visits / (stageCounts.inbound || 1)) * 100),
      color: "#7b2cbf", // Lavender/Violet
    },
    {
      stage: "4. Negotiation",
      label: "Price Negotiation",
      count: stageCounts.negotiation,
      pct: Math.round(
        (stageCounts.negotiation / (stageCounts.inbound || 1)) * 100
      ),
      color: "#d97706", // Amber
    },
    {
      stage: "5. Closed Won",
      label: "Booking & Closures",
      count: stageCounts.closed,
      pct: Math.round((stageCounts.closed / (stageCounts.inbound || 1)) * 100),
      color: "#007a5a", // Semantic Success
    },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-xl border border-hairline bg-white p-3 shadow-elevation-2 text-xs space-y-1">
          <p className="font-bold text-ink flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: data.color }}
            />
            {data.label}
          </p>
          <p className="text-ink">
            Pipeline Volume:{" "}
            <span className="font-bold text-aubergine">{data.count} Leads</span>
          </p>
          <p className="text-[#007a5a] font-bold">
            Conversion Rate: {data.pct}% of Inbound
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="flex flex-col shadow-elevation-1">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-sm font-bold text-ink">
            Pipeline Conversion Funnel
          </CardTitle>
          <p className="text-xs text-ink-mute mt-0.5">
            Drop-off velocity across buyer qualification milestones
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between pt-2">
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={funnelData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
            >
              <XAxis type="number" hide domain={[0, 100]} />
              <YAxis
                type="category"
                dataKey="stage"
                tick={{ fill: "#696969", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={85}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="pct"
                radius={[0, 90, 90, 0]}
                barSize={16}
                background={{ fill: "#f4ede4" }}
              >
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Funnel Metrics Row */}
        <div className="grid grid-cols-5 gap-1 pt-3 border-t border-hairline mt-2 text-center">
          {funnelData.map((stage) => (
            <div key={stage.stage} className="p-1 rounded">
              <p className="text-[10px] text-ink-mute truncate font-medium">{stage.stage}</p>
              <p className="text-xs font-bold text-ink font-mono mt-0.5">
                {stage.pct}%
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
