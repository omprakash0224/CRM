"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { SEED_LEAD_SOURCE_STATS, LeadSourceStat } from "@/data/analyticsData";
import {
  TrendingUp,
  BarChart3,
  Table,
  Target,
  DollarSign,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { formatCurrencyINR } from "@/lib/utils";

export function LeadSourceRoiCard() {
  const [viewMode, setViewMode] = useState<"CHART" | "TABLE">("CHART");

  // Format data for Recharts (Spend in Lakhs, Revenue in Crores)
  const chartData = SEED_LEAD_SOURCE_STATS.map((item) => ({
    name: item.source.split(" ")[0],
    fullName: item.source,
    spendLakhs: Number((item.spend / 100000).toFixed(1)),
    revenueCrores: Number((item.revenue / 10000000).toFixed(1)),
    deals: item.closedDeals,
    roas: item.roas,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3.5 rounded-2xl bg-white border border-hairline shadow-elevation-2 text-xs space-y-1.5">
          <p className="font-bold text-ink border-b border-hairline pb-1">
            {data.fullName}
          </p>
          <p className="text-link font-mono">
            Ad Spend: ₹{data.spendLakhs} Lakhs
          </p>
          <p className="text-aubergine font-mono font-bold">
            Closed Revenue: ₹{data.revenueCrores} Cr
          </p>
          <p className="text-ink-mute font-mono">
            Closed Deals: {data.deals} Units
          </p>
          <p className="text-aubergine font-mono font-bold">
            Realized ROAS: {data.roas === 999 ? "∞ (Zero Paid Spend)" : `${data.roas}x`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 rounded-2xl border border-hairline bg-white space-y-4 shadow-elevation-1">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-canvas-cream flex items-center justify-center text-aubergine">
            <Target className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ink">
              Lead Source ROI & Ad Spend Efficiency
            </h3>
            <p className="text-[11px] text-ink-mute">
              Comparative analysis of CAC, CPL, and closed revenue by channel.
            </p>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-canvas-cream p-1 rounded-full border border-hairline self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("CHART")}
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === "CHART"
                ? "bg-aubergine text-white shadow-sm"
                : "text-ink-mute hover:text-ink"
            }`}
          >
            <BarChart3 className="h-3 w-3" />
            <span>Chart View</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("TABLE")}
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === "TABLE"
                ? "bg-aubergine text-white shadow-sm"
                : "text-ink-mute hover:text-ink"
            }`}
          >
            <Table className="h-3 w-3" />
            <span>Matrix Table</span>
          </button>
        </div>
      </div>

      {/* Main Display: Chart vs Table */}
      {viewMode === "CHART" ? (
        <div className="space-y-4">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0e8e4" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#696969", fontSize: 11 }}
                  axisLine={{ stroke: "#e6e6e6" }}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tick={{ fill: "#696969", fontSize: 11 }}
                  axisLine={{ stroke: "#e6e6e6" }}
                  unit=" Cr"
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: "#696969", fontSize: 11 }}
                  axisLine={{ stroke: "#e6e6e6" }}
                  unit="L"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 11, paddingTop: 10 }}
                  formatter={(value) => (
                    <span className="text-ink font-medium">
                      {value === "revenueCrores"
                        ? "Closed Revenue (₹ Cr)"
                        : "Ad Spend (₹ Lakhs)"}
                    </span>
                  )}
                />
                <Bar
                  yAxisId="left"
                  dataKey="revenueCrores"
                  fill="#4a154b"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar
                  yAxisId="right"
                  dataKey="spendLakhs"
                  fill="#1264a3"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Channel Summary Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2 text-xs">
            {SEED_LEAD_SOURCE_STATS.map((ch) => (
              <div
                key={ch.sourceKey}
                className="p-3 rounded-2xl border border-hairline bg-canvas-cream space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-ink text-[11px] truncate">
                    {ch.source.split(" ")[0]}
                  </span>
                  <span className="font-mono text-[10px] text-aubergine font-extrabold">
                    {ch.roas === 999 ? "∞ ROI" : `${ch.roas}x`}
                  </span>
                </div>
                <div className="text-[10px] text-ink-mute space-y-0.5">
                  <div className="flex justify-between">
                    <span>CPL:</span>
                    <span className="text-ink font-mono font-medium">
                      {ch.cpl ? `₹${ch.cpl}` : "₹0"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Deals:</span>
                    <span className="text-aubergine font-mono font-bold">
                      {ch.closedDeals}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Matrix Data Table View */
        <div className="rounded-2xl border border-hairline overflow-x-auto bg-white shadow-elevation-1">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas-cream text-ink-mute font-semibold border-b border-hairline">
              <tr>
                <th className="p-3.5">Channel Source</th>
                <th className="p-3.5 text-right">Leads</th>
                <th className="p-3.5 text-right">Ad Spend</th>
                <th className="p-3.5 text-right">Cost Per Lead (CPL)</th>
                <th className="p-3.5 text-right">Deals Closed</th>
                <th className="p-3.5 text-right">Cost Per Acq (CAC)</th>
                <th className="p-3.5 text-right">Closed Revenue</th>
                <th className="p-3.5 text-right">ROAS Multiple</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline bg-white font-mono">
              {SEED_LEAD_SOURCE_STATS.map((ch) => (
                <tr key={ch.sourceKey} className="hover:bg-canvas-cream/50 transition-colors">
                  <td className="p-3.5 font-sans font-bold text-ink">
                    {ch.source}
                  </td>
                  <td className="p-3.5 text-right text-ink">{ch.leads}</td>
                  <td className="p-3.5 text-right text-link font-medium">
                    {formatCurrencyINR(ch.spend)}
                  </td>
                  <td className="p-3.5 text-right text-ink-mute">
                    {ch.cpl ? `₹${ch.cpl}` : "—"}
                  </td>
                  <td className="p-3.5 text-right text-ink font-bold">
                    {ch.closedDeals}
                  </td>
                  <td className="p-3.5 text-right text-ink-mute">
                    {ch.cac ? formatCurrencyINR(ch.cac) : "—"}
                  </td>
                  <td className="p-3.5 text-right text-aubergine font-bold">
                    {formatCurrencyINR(ch.revenue)}
                  </td>
                  <td className="p-3.5 text-right font-black text-aubergine">
                    {ch.roas === 999 ? "∞ (Organic)" : `${ch.roas}x`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

