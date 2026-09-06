"use client";

import React from "react";
import { SEED_FUNNEL_STATS } from "@/data/analyticsData";
import {
  Filter,
  TrendingDown,
  AlertTriangle,
  ArrowDown,
  ShieldCheck,
  CheckCircle2,
  Users,
  Zap,
} from "lucide-react";

export function PipelineFunnelCard() {
  // Aubergine gradient scale for funnel stages
  const funnelColors = [
    "#4a154b", // Deep monotheistic aubergine
    "#611f69", // Lighter aubergine
    "#7c2882", // Vivid aubergine
    "#9b30a5", // Orchid aubergine
    "#007a5a", // Semantic success emerald for final close
  ];

  return (
    <div className="p-6 rounded-2xl border border-hairline bg-white shadow-elevation-1 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-hairline pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-aubergine-50 border border-aubergine-200 flex items-center justify-center text-aubergine">
            <Filter className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-heading font-extrabold text-ink-pure">
              Pipeline Conversion & Funnel Drop-off Analysis
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Stage-by-stage attrition tracking across 1,285 total inquiries.
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-semantic-success bg-semantic-success-light px-3 py-1 rounded-full border border-semantic-success/20 hidden sm:inline-block shadow-sm">
          Blended 3.6% Inquiry-to-Close
        </span>
      </div>

      {/* Visual Funnel Progression */}
      <div className="space-y-4">
        {SEED_FUNNEL_STATS.map((step, idx) => {
          const isLast = idx === SEED_FUNNEL_STATS.length - 1;
          const nextStep = SEED_FUNNEL_STATS[idx + 1];
          const lostVolume = idx > 0 ? SEED_FUNNEL_STATS[idx - 1].count - step.count : 0;
          const barColor = funnelColors[idx] || step.color;

          return (
            <div key={step.stage} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: barColor }}
                  />
                  <span className="font-bold text-ink-pure">
                    {step.stage}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-ink-muted text-[11px]">
                    {step.pct}% of Total
                  </span>
                  <span className="font-black text-ink-pure text-sm">
                    {step.count.toLocaleString()} Leads
                  </span>
                </div>
              </div>

              {/* Progress Funnel Bar */}
              <div className="w-full h-3.5 rounded-full bg-canvas-cream overflow-hidden border border-hairline relative">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${step.pct}%`,
                    backgroundColor: barColor,
                  }}
                />
              </div>

              {/* Drop-off Transition Indicator */}
              {!isLast && (
                <div className="flex items-center justify-between px-3 py-1 text-[11px] text-ink-muted font-mono bg-canvas-cream/50 rounded-lg border border-hairline/60 my-1">
                  <div className="flex items-center gap-1.5">
                    <ArrowDown className="h-3 w-3 text-ink-muted" />
                    <span>Stage Attrition:</span>
                  </div>
                  <span className="text-semantic-error font-bold">
                    -{lostVolume} prospects ({nextStep?.dropPct}% drop-off)
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottleneck Leak Alert Card */}
      <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-rose-800">
          <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>Automated Pipeline Leak Detection</span>
        </div>

        <p className="text-xs text-ink-base leading-relaxed">
          <strong>Primary Bottleneck: Contacted → Site Visit</strong>. 386 verified prospects (44.2%) dropped out before booking an on-site visit due to follow-up delays.
        </p>

        <div className="flex items-start sm:items-center gap-2 pt-1 text-[11px] text-semantic-success font-semibold">
          <Zap className="h-3.5 w-3.5 shrink-0 text-semantic-success" />
          <span>Recommended AI Fix: Trigger automated WhatsApp brochure + chauffeur booking within 8 minutes of qualification to boost visit conversion by +22%.</span>
        </div>
      </div>
    </div>
  );
}
