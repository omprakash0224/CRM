"use client";

import React from "react";
import { Lead } from "@/types";
import {
  Sparkles,
  TrendingUp,
  Clock,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Flame,
  Zap,
} from "lucide-react";
import { getAiScoreBadgeColor, formatCurrencyINR } from "@/lib/utils";

interface AiLeadScoringGaugeProps {
  lead: Lead;
}

export function AiLeadScoringGauge({ lead }: AiLeadScoringGaugeProps) {
  const score = Math.max(0, Math.min(100, lead.aiScore || 50));
  const aiBadge = getAiScoreBadgeColor(score);

  // SVG circular gauge math (radius 48, circumference ~301.6)
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreTheme = (sc: number) => {
    if (sc >= 80) {
      return {
        stroke: "#4a154b", // Aubergine
        glow: "rgba(74, 21, 75, 0.15)",
        label: "HOT PROSPECT",
        sublabel: "Immediate Closing Window (7–14 Days)",
        icon: Flame,
        badgeBg: "bg-canvas-lavender text-aubergine border border-hairline",
      };
    }
    if (sc >= 50) {
      return {
        stroke: "#d97706", // Amber
        glow: "rgba(217, 119, 6, 0.15)",
        label: "WARM LEAD",
        sublabel: "Active Evaluation Phase (15–30 Days)",
        icon: Zap,
        badgeBg: "bg-canvas-cream text-amber-700 border border-hairline",
      };
    }
    return {
      stroke: "#cc4117", // Semantic error
      glow: "rgba(204, 65, 23, 0.15)",
      label: "COLD NURTURE",
      sublabel: "Long-cycle / Price Resistant (>45 Days)",
      icon: Clock,
      badgeBg: "bg-canvas-cream text-semantic-error border border-hairline",
    };
  };

  const theme = getScoreTheme(score);
  const StatusIcon = theme.icon;

  return (
    <div className="space-y-4">
      {/* Top Gauge Card */}
      <div className="p-6 rounded-2xl border border-hairline bg-white relative overflow-hidden shadow-elevation-1">
        <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
          {/* Circular SVG Gauge */}
          <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              {/* Background Track */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-[#f0e8e4]"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Progress Arc */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke={theme.stroke}
                strokeWidth="10"
                strokeLinecap="round"
                fill="transparent"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset,
                  transition: "stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)",
                  filter: `drop-shadow(0 0 8px ${theme.glow})`,
                }}
              />
            </svg>

            {/* Inner Score Label */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-aubergine tracking-tight">
                {score}
              </span>
              <span className="text-[10px] uppercase font-mono font-bold text-ink-mute">
                / 100
              </span>
            </div>
          </div>

          {/* Score Classification & Details */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${theme.badgeBg}`}
              >
                <StatusIcon className="h-3.5 w-3.5" />
                {theme.label}
              </span>
              <span className="text-xs text-ink-mute font-medium">
                AI Intent Engine v2.4
              </span>
            </div>

            <p className="text-sm font-semibold text-ink">
              {theme.sublabel}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs">
              <div className="p-2.5 rounded-xl bg-canvas-cream border border-hairline">
                <span className="text-[10px] text-ink-mute block uppercase font-mono">
                  Budget Fit
                </span>
                <span className="font-bold text-semantic-success">
                  {formatCurrencyINR(lead.budgetMax)} max
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-canvas-cream border border-hairline">
                <span className="text-[10px] text-ink-mute block uppercase font-mono">
                  Velocity
                </span>
                <span className="font-bold text-ink">
                  {score >= 80 ? "Fast (<4m resp)" : "Moderate"}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-canvas-cream border border-hairline col-span-2 sm:col-span-1">
                <span className="text-[10px] text-ink-mute block uppercase font-mono">
                  Project
                </span>
                <span className="font-bold text-aubergine truncate block">
                  {lead.preferredProject || "Luxury Gurugram"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Intent Narrative Quote */}
      <div className="p-4 rounded-2xl border border-hairline bg-canvas-cream space-y-1.5 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-ink">
          <Sparkles className="h-3.5 w-3.5 text-aubergine shrink-0" />
          <span>Synthesized Intent Summary</span>
        </div>
        <p className="text-xs text-ink leading-relaxed italic bg-white p-3.5 rounded-xl border border-hairline">
          &ldquo;{lead.aiIntent}&rdquo;
        </p>
      </div>

      {/* Scoring Signals Breakdown */}
      <div className="p-5 rounded-2xl border border-hairline bg-white space-y-3 shadow-elevation-1">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-aubergine" />
            <span>Predictive Factor Breakdown</span>
          </h4>
          <span className="text-[11px] text-ink-mute">
            {lead.aiBreakdown?.length || 3} verified signals
          </span>
        </div>

        <div className="space-y-2">
          {lead.aiBreakdown && lead.aiBreakdown.length > 0 ? (
            lead.aiBreakdown.map((item, idx) => {
              const isPositive = item.points >= 0;
              return (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-canvas-cream border border-hairline hover:border-aubergine/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    {isPositive ? (
                      <CheckCircle2 className="h-4 w-4 text-semantic-success shrink-0" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-semantic-error shrink-0" />
                    )}
                    <span className="text-xs text-ink font-medium">
                      {item.factor}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                      isPositive
                        ? "bg-canvas-lavender text-aubergine border border-hairline"
                        : "bg-white text-semantic-error border border-hairline"
                    }`}
                  >
                    {isPositive ? `+${item.points}` : item.points} pts
                  </span>
                </div>
              );
            })
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-canvas-cream border border-hairline">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-semantic-success" />
                  <span className="text-xs text-ink">
                    Budget matches inventory unit brackets
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-semantic-success">
                  +35 pts
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-canvas-cream border border-hairline">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-semantic-success" />
                  <span className="text-xs text-ink">
                    Prompt response to initial outreach
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-semantic-success">
                  +25 pts
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

