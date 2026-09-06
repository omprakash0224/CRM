"use client";

import React from "react";
import { Trophy, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCrmStore } from "@/store/useCrmStore";
import { formatCurrencyINR } from "@/lib/utils";

export function AgentLeaderboardMini() {
  const { agents } = useCrmStore();

  // Sort by revenue generated descending
  const sortedAgents = [...agents].sort(
    (a, b) => b.currentRevenueMonth - a.currentRevenueMonth
  );

  const getRankMedal = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <Card className="flex flex-col shadow-elevation-1">
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Trophy className="h-4 w-4 text-[#d97706]" />
          <div>
            <CardTitle className="text-sm font-bold text-ink">
              Agent Sales Leaderboard
            </CardTitle>
            <p className="text-xs text-ink-mute mt-0.5">
              Monthly target progress & conversion performance
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3 pt-1">
        {sortedAgents.map((agent, index) => {
          const targetPct = Math.min(
            100,
            Math.round((agent.currentRevenueMonth / agent.targetMonthlyRevenue) * 100)
          );

          return (
            <div
              key={agent.id}
              className="p-3.5 rounded-xl border border-hairline bg-[#fdfbf7] hover:bg-white hover:border-[#4a154b]/30 transition-all space-y-2 group shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <span className="text-sm font-bold w-5 text-center">
                    {getRankMedal(index)}
                  </span>
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="h-8 w-8 rounded-full object-cover ring-1 ring-hairline group-hover:ring-aubergine/40 transition-all"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-ink group-hover:text-aubergine">
                      {agent.name}
                    </h5>
                    <p className="text-[10px] text-ink-mute">{agent.role}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono font-extrabold text-aubergine block">
                    {formatCurrencyINR(agent.currentRevenueMonth)}
                  </span>
                  <span className="text-[10px] text-ink-mute">
                    {agent.closedDealsMonth} Deals ({agent.conversionRate}% conv.)
                  </span>
                </div>
              </div>

              {/* Progress Bar towards Target */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-ink-mute">
                  <span className="flex items-center gap-1 font-medium">
                    <Target className="h-2.5 w-2.5 text-ink-mute" /> Target:{" "}
                    {formatCurrencyINR(agent.targetMonthlyRevenue)}
                  </span>
                  <span
                    className={`font-mono font-bold ${
                      targetPct >= 90 ? "text-[#007a5a]" : "text-[#d97706]"
                    }`}
                  >
                    {targetPct}% achieved
                  </span>
                </div>

                <div className="h-2 w-full rounded-full bg-[#f4ede4] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      targetPct >= 90 ? "bg-aubergine" : "bg-[#d97706]"
                    }`}
                    style={{ width: `${targetPct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
