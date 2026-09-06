"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCrmStore } from "@/store/useCrmStore";

const SOURCE_CONFIG: Record<
  string,
  { label: string; color: string; spend: string }
> = {
  META_ADS: {
    label: "Meta Ads (FB/IG)",
    color: "#4a154b", // Brand Aubergine
    spend: "₹4.2 L spend",
  },
  MAGICBRICKS: {
    label: "MagicBricks",
    color: "#cc4117", // Semantic Error/Ruby
    spend: "₹2.8 L spend",
  },
  GOOGLE_ADS: {
    label: "Google Search Ads",
    color: "#007a5a", // Semantic Success
    spend: "₹3.4 L spend",
  },
  HOUSING_COM: {
    label: "Housing.com",
    color: "#d97706", // Amber
    spend: "₹1.9 L spend",
  },
  NINETY_NINE_ACRES: {
    label: "99acres",
    color: "#1264a3", // Link Blue
    spend: "₹1.5 L spend",
  },
  REFERRAL: {
    label: "HNI Referral",
    color: "#7b2cbf", // Deep Purple
    spend: "Zero ad cost",
  },
  WALK_IN: {
    label: "Branch Walk-in",
    color: "#ea580c", // Peach/Orange
    spend: "Organic",
  },
};

export function LeadSourceChart() {
  const { leads } = useCrmStore();

  // Aggregate leads by source
  const sourceCountMap: Record<string, number> = {};
  leads.forEach((l) => {
    sourceCountMap[l.source] = (sourceCountMap[l.source] || 0) + 1;
  });

  const chartData = Object.entries(sourceCountMap).map(([sourceKey, count]) => {
    const config = SOURCE_CONFIG[sourceKey] || {
      label: sourceKey,
      color: "#696969",
      spend: "-",
    };
    return {
      name: config.label,
      sourceKey,
      value: count,
      color: config.color,
      spend: config.spend,
    };
  });

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
            {data.name}
          </p>
          <p className="text-ink">
            Active Leads:{" "}
            <span className="font-bold text-aubergine">{data.value}</span> (
            {((data.value / leads.length) * 100).toFixed(1)}%)
          </p>
          <p className="text-ink-mute text-[10px]">{data.spend}</p>
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
            Lead Source Acquisition & ROI
          </CardTitle>
          <p className="text-xs text-ink-mute mt-0.5">
            Channel distribution across {leads.length} active prospects
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between pt-2">
        {/* Chart Area */}
        <div className="h-48 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Info */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-extrabold text-aubergine font-heading">
              {leads.length}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-ink-mute font-bold">
              Total Leads
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-hairline mt-2">
          {chartData.slice(0, 4).map((item) => (
            <div key={item.name} className="flex items-center space-x-2 text-xs">
              <span
                className="h-2.5 w-2.5 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-ink font-medium truncate text-[11px]">
                {item.name}
              </span>
              <span className="font-mono text-ink-mute ml-auto text-[10px]">
                {item.value} ({((item.value / leads.length) * 100).toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
