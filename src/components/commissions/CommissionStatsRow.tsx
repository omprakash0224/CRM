"use client";

import React from "react";
import { useCrmStore } from "@/store/useCrmStore";
import { Card } from "@/components/ui/card";
import {
  Coins,
  TrendingUp,
  Clock,
  CheckCircle2,
  Building2,
  Wallet,
  Receipt,
} from "lucide-react";
import { formatCurrencyINR } from "@/lib/utils";

export function CommissionStatsRow() {
  const { deals } = useCrmStore();

  const totalBrokerage = deals.reduce((acc, d) => acc + d.totalCommission, 0);

  const disbursedBrokerage = deals
    .filter((d) => d.status === "DISBURSED")
    .reduce((acc, d) => acc + d.netPayoutToAgent, 0);

  const pendingClearance = deals
    .filter((d) => d.status === "PENDING_BUILDER")
    .reduce((acc, d) => acc + d.totalCommission, 0);

  const pendingDealsCount = deals.filter(
    (d) => d.status === "PENDING_BUILDER"
  ).length;

  const avgRate = deals.length
    ? (
        deals.reduce((acc, d) => acc + d.commissionRate, 0) / deals.length
      ).toFixed(2)
    : "2.50";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* KPI 1 */}
      <Card className="border border-hairline bg-white rounded-2xl shadow-elevation-1 hover:shadow-elevation-2 transition-all p-5">
        <div className="flex items-center justify-between pb-2">
          <span className="eyebrow-pill">Total Brokerage Invoiced</span>
          <div className="h-8 w-8 rounded-full bg-canvas-lavender flex items-center justify-center text-aubergine">
            <Coins className="h-4 w-4" />
          </div>
        </div>
        <div>
          <div className="stat-numeral text-2xl sm:text-3xl">
            {formatCurrencyINR(totalBrokerage)}
          </div>
          <p className="text-[11px] text-semantic-success mt-1 flex items-center gap-1 font-semibold">
            <TrendingUp className="h-3 w-3" />
            <span>+28.4% vs last month ({deals.length} deals)</span>
          </p>
        </div>
      </Card>

      {/* KPI 2 */}
      <Card className="border border-hairline bg-white rounded-2xl shadow-elevation-1 hover:shadow-elevation-2 transition-all p-5">
        <div className="flex items-center justify-between pb-2">
          <span className="eyebrow-pill">Disbursed to Agents</span>
          <div className="h-8 w-8 rounded-full bg-canvas-cream flex items-center justify-center text-aubergine">
            <Wallet className="h-4 w-4" />
          </div>
        </div>
        <div>
          <div className="stat-numeral text-2xl sm:text-3xl">
            {formatCurrencyINR(disbursedBrokerage)}
          </div>
          <p className="text-[11px] text-link mt-1 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="h-3 w-3 text-semantic-success" />
            <span>Net of 5% TDS (RTGS cleared)</span>
          </p>
        </div>
      </Card>

      {/* KPI 3 */}
      <Card className="border border-hairline bg-white rounded-2xl shadow-elevation-1 hover:shadow-elevation-2 transition-all p-5">
        <div className="flex items-center justify-between pb-2">
          <span className="eyebrow-pill">Pending Clearance</span>
          <div className="h-8 w-8 rounded-full bg-canvas-cream flex items-center justify-center text-amber-600">
            <Clock className="h-4 w-4" />
          </div>
        </div>
        <div>
          <div className="stat-numeral text-2xl sm:text-3xl text-amber-700">
            {formatCurrencyINR(pendingClearance)}
          </div>
          <p className="text-[11px] text-ink-mute mt-1 font-medium">
            <span>{pendingDealsCount} developer invoices awaiting credit</span>
          </p>
        </div>
      </Card>

      {/* KPI 4 */}
      <Card className="border border-hairline bg-white rounded-2xl shadow-elevation-1 hover:shadow-elevation-2 transition-all p-5">
        <div className="flex items-center justify-between pb-2">
          <span className="eyebrow-pill">Avg Brokerage Rate</span>
          <div className="h-8 w-8 rounded-full bg-canvas-lavender flex items-center justify-center text-aubergine">
            <Receipt className="h-4 w-4" />
          </div>
        </div>
        <div>
          <div className="stat-numeral">
            {avgRate}%
          </div>
          <p className="text-[11px] text-ink-mute mt-1 flex items-center gap-1">
            <span>Across primary luxury developers</span>
          </p>
        </div>
      </Card>
    </div>
  );
}

