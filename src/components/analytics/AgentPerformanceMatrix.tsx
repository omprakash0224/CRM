"use client";

import React from "react";
import { useCrmStore } from "@/store/useCrmStore";
import {
  Trophy,
  Award,
  Users,
  Target,
  CheckCircle2,
  Phone,
  Calendar,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import { formatCurrencyINR } from "@/lib/utils";

export function AgentPerformanceMatrix() {
  const { agents, visits, deals, leads } = useCrmStore();

  // Sort agents by revenue descending
  const sortedAgents = [...agents].sort(
    (a, b) => b.currentRevenueMonth - a.currentRevenueMonth
  );

  const getRankBadge = (idx: number) => {
    switch (idx) {
      case 0:
        return <span className="text-base" title="1st Place">🥇</span>;
      case 1:
        return <span className="text-base" title="2nd Place">🥈</span>;
      case 2:
        return <span className="text-base" title="3rd Place">🥉</span>;
      default:
        return (
          <span className="h-6 w-6 rounded-full bg-canvas-cream text-ink-muted font-mono text-[10px] font-bold flex items-center justify-center border border-hairline">
            {idx + 1}
          </span>
        );
    }
  };

  return (
    <div className="p-6 rounded-2xl border border-hairline bg-white shadow-elevation-1 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-hairline pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-aubergine-50 border border-aubergine-200 flex items-center justify-center text-aubergine">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-heading font-extrabold text-ink-pure">
              Sales Team Productivity & Quota Achievement
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Live leaderboard ranking by closed deal revenue, site visits, and quota pace.
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-aubergine bg-aubergine-50 px-3 py-1 rounded-full border border-aubergine-200 shadow-sm self-start sm:self-auto">
          Q2 Quota Pace: 104% Team Avg
        </span>
      </div>

      {/* Performance Matrix Table */}
      <div className="rounded-xl border border-hairline overflow-x-auto shadow-sm bg-white">
        <table className="w-full text-left text-xs">
          <thead className="bg-canvas-cream text-ink-muted font-bold text-[11px] uppercase tracking-wider border-b border-hairline">
            <tr>
              <th className="p-3.5 text-center w-12">Rank</th>
              <th className="p-3.5">Sales Executive</th>
              <th className="p-3.5 text-right">Active Leads</th>
              <th className="p-3.5 text-right">Site Visits</th>
              <th className="p-3.5 text-right">Deals Closed</th>
              <th className="p-3.5 text-right">Revenue Booked</th>
              <th className="p-3.5 w-44">Target Achievement</th>
              <th className="p-3.5 text-right">Conversion %</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-hairline bg-white">
            {sortedAgents.map((agent, idx) => {
              const agentVisits = visits.filter((v) => v.agentId === agent.id);
              const agentLeads = leads.filter((l) => l.assignedAgentId === agent.id);
              const pctOfTarget = Math.min(
                150,
                Math.round((agent.currentRevenueMonth / agent.targetMonthlyRevenue) * 100)
              );
              const isOverTarget = pctOfTarget >= 100;

              return (
                <tr
                  key={agent.id}
                  className="hover:bg-canvas-cream/50 transition-colors"
                >
                  {/* Rank */}
                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center">
                      {getRankBadge(idx)}
                    </div>
                  </td>

                  {/* Agent Details */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="h-8 w-8 rounded-full object-cover ring-1 ring-hairline"
                      />
                      <div>
                        <span className="font-bold text-ink-pure block text-xs">
                          {agent.name}
                        </span>
                        <span className="text-[11px] text-ink-muted">
                          {agent.role}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Active Leads */}
                  <td className="p-3.5 text-right font-mono text-ink-base font-medium">
                    {agentLeads.length || agent.activeLeadsCount}
                  </td>

                  {/* Site Visits */}
                  <td className="p-3.5 text-right font-mono">
                    <span className="text-ink-pure font-bold block">
                      {agentVisits.length} Visits
                    </span>
                    <span className="text-[11px] text-semantic-success font-semibold">
                      {agentVisits.filter((v) => v.gpsVerified).length} GPS Verified
                    </span>
                  </td>

                  {/* Deals Closed */}
                  <td className="p-3.5 text-right font-mono font-bold text-ink-pure">
                    {agent.closedDealsMonth} Units
                  </td>

                  {/* Revenue Booked */}
                  <td className="p-3.5 text-right font-mono">
                    <span className="font-black text-aubergine block text-sm">
                      {formatCurrencyINR(agent.currentRevenueMonth)}
                    </span>
                    <span className="text-[10px] text-ink-muted">
                      Target: {formatCurrencyINR(agent.targetMonthlyRevenue)}
                    </span>
                  </td>

                  {/* Target Achievement Progress */}
                  <td className="p-3.5">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span
                          className={
                            isOverTarget
                              ? "text-semantic-success font-bold"
                              : "text-ink-base font-semibold"
                          }
                        >
                          {pctOfTarget}% Achieved
                        </span>
                        {isOverTarget && (
                          <span className="text-[10px] text-semantic-success font-bold">
                            +{(pctOfTarget - 100)}% Surplus
                          </span>
                        )}
                      </div>

                      <div className="w-full h-2 rounded-full bg-canvas-cream overflow-hidden border border-hairline">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            isOverTarget ? "bg-semantic-success" : "bg-aubergine"
                          }`}
                          style={{ width: `${Math.min(100, pctOfTarget)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Conversion Rate */}
                  <td className="p-3.5 text-right font-mono">
                    <span className="font-extrabold text-aubergine-600 block">
                      {agent.conversionRate}%
                    </span>
                    <span className="text-[10px] text-ink-muted">
                      Inquiry-to-Close
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
