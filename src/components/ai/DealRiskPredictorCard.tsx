"use client";

import React from "react";
import { Lead } from "@/types";
import { useCrmStore } from "@/store/useCrmStore";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Target,
  ArrowRight,
  TrendingDown,
  Building,
  CheckCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DealRiskPredictorCardProps {
  lead: Lead;
  onApplyMitigation?: (action: string) => void;
}

export function DealRiskPredictorCard({
  lead,
  onApplyMitigation,
}: DealRiskPredictorCardProps) {
  const { setNotification, addLeadActivity } = useCrmStore();

  // Fallback if lead doesn't have an explicit aiInsight
  const insight = lead.aiInsight || {
    closingProbability: Math.min(95, Math.max(30, lead.aiScore - 5)),
    riskLevel: lead.aiScore >= 85 ? "LOW" : lead.aiScore >= 65 ? "MEDIUM" : "HIGH",
    riskFactor:
      lead.aiScore >= 85
        ? "Minor delay awaiting family weekend joint review."
        : "Evaluation of 2 competing projects in the same micromarket.",
    mitigationStrategy:
      "Offer structured 20:80 payment milestone plan and schedule sample flat walkthrough with family.",
    recommendedAction: "Dispatch value-comparison sheet and site visit invitation.",
    competitorInvolved: lead.preferredLocation.includes("Gurugram")
      ? "M3M Golfestate"
      : "Rustomjee Seasons",
  };

  const isHighRisk = insight.riskLevel === "HIGH";
  const isMediumRisk = insight.riskLevel === "MEDIUM";

  const getRiskTheme = () => {
    if (isHighRisk) {
      return {
        badge: "HIGH DROP-OFF RISK",
        badgeBg: "bg-canvas-cream text-semantic-error border border-hairline",
        border: "border-semantic-error/40",
        progressColor: "bg-semantic-error",
        icon: ShieldAlert,
      };
    }
    if (isMediumRisk) {
      return {
        badge: "MODERATE FRICTION",
        badgeBg: "bg-canvas-cream text-amber-700 border border-hairline",
        border: "border-amber-500/40",
        progressColor: "bg-amber-500",
        icon: AlertTriangle,
      };
    }
    return {
      badge: "OPTIMAL CLOSING MOMENTUM",
      badgeBg: "bg-canvas-cream text-semantic-success border border-hairline",
      border: "border-semantic-success/40",
      progressColor: "bg-semantic-success",
      icon: ShieldCheck,
    };
  };

  const theme = getRiskTheme();
  const Icon = theme.icon;

  const handleApplyStrategy = () => {
    addLeadActivity(lead.id, {
      type: "NOTE",
      description: `AI Risk Mitigation Playbook Applied: ${insight.recommendedAction}`,
      agentName: "AI Copilot System",
    });

    setNotification(`✓ Win strategy applied: ${insight.recommendedAction}`);

    if (onApplyMitigation) {
      onApplyMitigation(insight.recommendedAction);
    }
  };

  return (
    <div
      className={`p-6 rounded-2xl border ${theme.border} bg-white space-y-4 shadow-elevation-1 relative overflow-hidden`}
    >
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-aubergine" />
          <h4 className="text-xs font-bold text-ink uppercase tracking-wider">
            Deal Conversion & Risk Radar
          </h4>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-[10px] font-extrabold ${theme.badgeBg}`}
        >
          {theme.badge}
        </span>
      </div>

      {/* Closing Probability Meter */}
      <div className="space-y-2 p-4 rounded-xl bg-canvas-cream border border-hairline">
        <div className="flex items-center justify-between text-xs">
          <span className="text-ink font-medium">
            Predicted Probability to Close:
          </span>
          <span className="font-bold text-aubergine text-sm">
            {insight.closingProbability}%
          </span>
        </div>

        <div className="w-full h-2.5 rounded-full bg-white overflow-hidden border border-hairline">
          <div
            className={`h-full rounded-full transition-all duration-700 ${theme.progressColor}`}
            style={{ width: `${insight.closingProbability}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-ink-mute font-mono pt-0.5">
          <span>0% Drop-off</span>
          <span>50% Threshold</span>
          <span>100% Token Paid</span>
        </div>
      </div>

      {/* Identified Bottleneck & Competitor Threat */}
      <div className="space-y-2.5">
        <div className="p-3.5 rounded-xl bg-canvas-cream border border-hairline space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-ink-mute block flex items-center gap-1.5">
            <TrendingDown className="h-3.5 w-3.5 text-semantic-error" />
            <span>Identified Friction Point</span>
          </span>
          <p className="text-xs text-ink leading-relaxed">
            {insight.riskFactor}
          </p>
        </div>

        {insight.competitorInvolved && (
          <div className="flex items-center justify-between p-3 rounded-xl bg-canvas-cream border border-hairline text-xs">
            <span className="text-ink-mute flex items-center gap-1.5 font-medium">
              <Building className="h-3.5 w-3.5 text-aubergine" />
              <span>Competitor Comparison Flag:</span>
            </span>
            <span className="font-semibold text-aubergine px-2.5 py-0.5 rounded-full bg-white border border-hairline text-[11px]">
              {insight.competitorInvolved}
            </span>
          </div>
        )}
      </div>

      {/* AI Recommended Win Mitigation */}
      <div className="p-4 rounded-2xl bg-canvas-cream border border-hairline space-y-2.5 shadow-sm">
        <div className="flex items-center gap-1.5 text-xs font-bold text-aubergine">
          <Zap className="h-3.5 w-3.5" />
          <span>Recommended Counter-Strategy & Win Playbook</span>
        </div>

        <p className="text-xs text-ink leading-relaxed font-medium">
          {insight.mitigationStrategy}
        </p>

        <div className="pt-1">
          <Button
            type="button"
            size="sm"
            onClick={handleApplyStrategy}
            className="w-full h-9 text-xs bg-aubergine hover:bg-aubergine-press text-white font-semibold gap-1.5 shadow-sm rounded-full"
          >
            <CheckCircle className="h-3.5 w-3.5" />
            <span>Apply Playbook to Active Lead</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

