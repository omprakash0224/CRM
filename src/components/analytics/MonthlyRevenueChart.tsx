"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { SEED_MONTHLY_REVENUE } from "@/data/analyticsData";
import {
  TrendingUp,
  Calendar,
  DollarSign,
  Award,
  Sparkles,
} from "lucide-react";

export function MonthlyRevenueChart() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-3.5 rounded-2xl bg-white border border-hairline shadow-elevation-2 text-xs space-y-1.5">
          <p className="font-bold text-ink border-b border-hairline pb-1">
            {label}
          </p>
          <p className="text-aubergine font-mono font-bold">
            Actual Sales: ₹{payload[0].value} Crores
          </p>
          <p className="text-link font-mono">
            Target Target: ₹{payload[1]?.value || 0} Crores
          </p>
          {payload[0].payload.deals && (
            <p className="text-ink-mute font-mono">
              Deals Closed: {payload[0].payload.deals} Units
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const totalBooked = SEED_MONTHLY_REVENUE.reduce((acc, m) => acc + m.actual, 0).toFixed(1);
  const totalTarget = SEED_MONTHLY_REVENUE.reduce((acc, m) => acc + m.target, 0).toFixed(1);
  const achievementRate = ((Number(totalBooked) / Number(totalTarget)) * 100).toFixed(1);

  return (
    <div className="p-6 rounded-2xl border border-hairline bg-white space-y-4 shadow-elevation-1">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-hairline pb-3">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-canvas-lavender flex items-center justify-center text-aubergine">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ink">
              Monthly Revenue & Booking Velocity
            </h3>
            <p className="text-[11px] text-ink-mute">
              6-Month trajectory comparing monthly sales target vs actual closed bookings (₹ Crores).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-ink-mute">
            Target: <strong className="text-ink">₹{totalTarget} Cr</strong>
          </span>
          <span>•</span>
          <span className="text-aubergine font-bold">
            Actual: ₹{totalBooked} Cr ({achievementRate}%)
          </span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={SEED_MONTHLY_REVENUE}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4a154b" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#4a154b" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#1264a3" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#1264a3" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0e8e4" />
            <XAxis
              dataKey="month"
              tick={{ fill: "#696969", fontSize: 11 }}
              axisLine={{ stroke: "#e6e6e6" }}
            />
            <YAxis
              tick={{ fill: "#696969", fontSize: 11 }}
              axisLine={{ stroke: "#e6e6e6" }}
              unit=" Cr"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 11, paddingTop: 10 }}
              formatter={(value) => (
                <span className="text-ink font-medium">
                  {value === "actual"
                    ? "Actual Closed Sales (₹ Cr)"
                    : "Monthly Target (₹ Cr)"}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="#4a154b"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#actualGradient)"
            />
            <Area
              type="monotone"
              dataKey="target"
              stroke="#1264a3"
              strokeWidth={2}
              strokeDasharray="4 4"
              fillOpacity={1}
              fill="url(#targetGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* KPI Highlights Bottom Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
        <div className="p-3.5 rounded-2xl border border-hairline bg-canvas-cream">
          <span className="text-[10px] text-ink-mute uppercase font-mono block">
            Peak Sales Velocity
          </span>
          <span className="font-bold text-ink text-sm">
            August 2026 (₹64.8 Cr)
          </span>
          <p className="text-[10px] text-aubergine font-medium mt-0.5">
            Godrej Woods launch phase drove 14 bookings
          </p>
        </div>

        <div className="p-3.5 rounded-2xl border border-hairline bg-canvas-cream">
          <span className="text-[10px] text-ink-mute uppercase font-mono block">
            Target Realization Rate
          </span>
          <span className="font-bold text-semantic-success text-sm">
            {achievementRate}% Cumulative
          </span>
          <p className="text-[10px] text-ink-mute mt-0.5">
            +₹32.3 Cr surplus over board targets
          </p>
        </div>

        <div className="p-3.5 rounded-2xl border border-hairline bg-canvas-cream">
          <span className="text-[10px] text-ink-mute uppercase font-mono block">
            Average Unit Ticket Size
          </span>
          <span className="font-bold text-aubergine text-sm">
            ₹3.12 Cr / Unit
          </span>
          <p className="text-[10px] text-ink-mute mt-0.5">
            Driven by 4BHK and Penthouse allotments
          </p>
        </div>
      </div>
    </div>
  );
}

