"use client";

import React, { useState, useMemo } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import { Lead } from "@/types";
import {
  Sparkles,
  Flame,
  ShieldAlert,
  TrendingUp,
  Zap,
  Search,
  Building2,
  Phone,
  User,
  CheckCircle2,
  SlidersHorizontal,
  Bot,
  Layers,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiLeadScoringGauge } from "@/components/ai/AiLeadScoringGauge";
import { AiPitchCopilot } from "@/components/ai/AiPitchCopilot";
import { DealRiskPredictorCard } from "@/components/ai/DealRiskPredictorCard";
import { FooterAubergine } from "@/components/layout/FooterAubergine";
import {
  formatCurrencyINR,
  getAiScoreBadgeColor,
  getLeadStageColor,
  getLeadStageLabel,
} from "@/lib/utils";

type FilterTab = "ALL" | "HOT" | "RISK" | "COLD";
type StudioTab = "PITCH" | "GAUGE" | "RISK";

export default function AiAssistantPage() {
  const { leads, agents } = useCrmStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<FilterTab>("ALL");
  const [studioTab, setStudioTab] = useState<StudioTab>("PITCH");
  const [selectedLeadId, setSelectedLeadId] = useState<string>(
    leads.find((l) => l.stage === "NEGOTIATION")?.id || leads[0]?.id || ""
  );

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery) ||
        (lead.preferredProject &&
          lead.preferredProject.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (filterTab === "HOT") return lead.aiScore >= 80;
      if (filterTab === "RISK")
        return (
          lead.aiInsight?.riskLevel === "HIGH" ||
          lead.aiInsight?.riskLevel === "MEDIUM" ||
          (lead.stage === "NEGOTIATION" && lead.aiScore < 90)
        );
      if (filterTab === "COLD") return lead.aiScore < 60;

      return true;
    });
  }, [leads, searchQuery, filterTab]);

  const selectedLead = useMemo(() => {
    return leads.find((l) => l.id === selectedLeadId) || filteredLeads[0] || leads[0];
  }, [leads, selectedLeadId, filteredLeads]);

  // Aggregate Metrics
  const averageAiScore = useMemo(() => {
    if (!leads.length) return "0";
    const sum = leads.reduce((acc, l) => acc + (l.aiScore || 0), 0);
    return (sum / leads.length).toFixed(1);
  }, [leads]);

  const hotLeadsCount = useMemo(() => {
    return leads.filter((l) => l.aiScore >= 80).length;
  }, [leads]);

  const atRiskCount = useMemo(() => {
    return leads.filter(
      (l) =>
        l.aiInsight?.riskLevel === "HIGH" ||
        l.aiInsight?.riskLevel === "MEDIUM" ||
        (l.stage === "NEGOTIATION" && l.aiScore < 90)
    ).length;
  }, [leads]);

  const selectedAgent = agents.find((a) => a.id === selectedLead?.assignedAgentId);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Page Title & Status */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-canvas-lavender flex items-center justify-center text-aubergine font-bold shadow-sm">
              <Bot className="h-5 w-5 text-aubergine" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ink tracking-tight">
                AI Sales Assistant & Smart Copilot
              </h1>
              <p className="text-xs text-ink-mute mt-0.5">
                Predictive buyer intent scoring (0–100), deal drop-off radar, and streaming LLM sales pitch generator.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-canvas-cream border border-hairline text-aubergine">
            <span className="h-2 w-2 rounded-full bg-semantic-success animate-pulse" />
            <span>PropTech Neural Engine 2.4 Active</span>
          </span>
        </div>
      </div>

      {/* KPI Cards Row with Massive 50px Aubergine Stat Numerals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <Card className="border border-hairline bg-white rounded-2xl shadow-elevation-1 hover:shadow-elevation-2 transition-all p-5">
          <div className="flex items-center justify-between pb-2">
            <span className="eyebrow-pill">Avg Pipeline Intent</span>
            <Sparkles className="h-4 w-4 text-aubergine" />
          </div>
          <div>
            <div className="stat-numeral">
              {averageAiScore}
              <span className="text-lg text-ink-mute font-normal ml-1">/100</span>
            </div>
            <p className="text-[11px] text-semantic-success mt-1 flex items-center gap-1 font-semibold">
              <TrendingUp className="h-3 w-3" />
              <span>+5.2 pts vs last month (84% conf.)</span>
            </p>
          </div>
        </Card>

        {/* KPI 2 */}
        <Card className="border border-hairline bg-white rounded-2xl shadow-elevation-1 hover:shadow-elevation-2 transition-all p-5">
          <div className="flex items-center justify-between pb-2">
            <span className="eyebrow-pill">Hot Leads</span>
            <Flame className="h-4 w-4 text-aubergine" />
          </div>
          <div>
            <div className="stat-numeral">
              {hotLeadsCount}
              <span className="text-lg text-semantic-success font-normal ml-2">₹26.5 Cr</span>
            </div>
            <p className="text-[11px] text-ink-mute mt-1">
              High-probability closing window (7–14 days)
            </p>
          </div>
        </Card>

        {/* KPI 3 */}
        <Card className="border border-hairline bg-white rounded-2xl shadow-elevation-1 hover:shadow-elevation-2 transition-all p-5">
          <div className="flex items-center justify-between pb-2">
            <span className="eyebrow-pill">Drop-off Risk Radar</span>
            <ShieldAlert className="h-4 w-4 text-semantic-error" />
          </div>
          <div>
            <div className="stat-numeral text-semantic-error">
              {atRiskCount}
              <span className="text-xs text-ink-mute font-normal font-sans ml-2">Flagged</span>
            </div>
            <p className="text-[11px] text-semantic-error mt-1">
              Competitor inquiry / price resistance detected
            </p>
          </div>
        </Card>

        {/* KPI 4 */}
        <Card className="border border-hairline bg-white rounded-2xl shadow-elevation-1 hover:shadow-elevation-2 transition-all p-5">
          <div className="flex items-center justify-between pb-2">
            <span className="eyebrow-pill">AI Conversion Lift</span>
            <Zap className="h-4 w-4 text-aubergine" />
          </div>
          <div>
            <div className="stat-numeral">
              +34.2%
            </div>
            <p className="text-[11px] text-ink-mute mt-1">
              When AI Pitch Copilot is used on first contact
            </p>
          </div>
        </Card>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Lead Directory & Filters (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl border border-hairline bg-white shadow-elevation-1 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
                <Layers className="h-4 w-4 text-aubergine" />
                <span>Buyer Intent Directory ({filteredLeads.length})</span>
              </h3>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-ink-mute" />
              <Input
                type="text"
                placeholder="Search prospect, project, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 pl-10 text-xs bg-canvas-cream border-hairline rounded-xl focus:ring-2 focus:ring-aubergine"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setFilterTab("ALL")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filterTab === "ALL"
                    ? "bg-aubergine text-white shadow-sm"
                    : "bg-canvas-cream text-ink-mute hover:text-ink border border-hairline"
                }`}
              >
                All ({leads.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterTab("HOT")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  filterTab === "HOT"
                    ? "bg-aubergine text-white shadow-sm"
                    : "bg-canvas-cream text-ink-mute hover:text-ink border border-hairline"
                }`}
              >
                <Flame className="h-3.5 w-3.5 text-amber-500" />
                <span>Hot 80+ ({hotLeadsCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterTab("RISK")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  filterTab === "RISK"
                    ? "bg-semantic-error text-white shadow-sm"
                    : "bg-canvas-cream text-ink-mute hover:text-ink border border-hairline"
                }`}
              >
                <ShieldAlert className="h-3.5 w-3.5 text-semantic-error" />
                <span>At Risk ({atRiskCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setFilterTab("COLD")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filterTab === "COLD"
                    ? "bg-aubergine text-white shadow-sm"
                    : "bg-canvas-cream text-ink-mute hover:text-ink border border-hairline"
                }`}
              >
                Needs Nurture
              </button>
            </div>

            {/* Scrollable Lead List */}
            <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
              {filteredLeads.map((lead) => {
                const isSelected = selectedLead?.id === lead.id;
                const scoreBadge = getAiScoreBadgeColor(lead.aiScore);
                const stageColor = getLeadStageColor(lead.stage);

                return (
                  <div
                    key={lead.id}
                    onClick={() => setSelectedLeadId(lead.id)}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? "bg-canvas-cream border-aubergine ring-1 ring-aubergine shadow-sm"
                        : "bg-white border-hairline hover:border-aubergine/40 hover:bg-canvas-cream/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-ink flex items-center gap-1.5">
                          <span>{lead.name}</span>
                          {lead.tags?.includes("Hot") && (
                            <span className="text-[10px]">🔥</span>
                          )}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] text-ink-mute mt-0.5">
                          <span>{lead.preferredProject || "Luxury"}</span>
                          <span>•</span>
                          <span>{lead.preferredBhk}</span>
                        </div>
                      </div>

                      {/* AI Score Badge */}
                      <span
                        className={`font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full ${scoreBadge.bg} shrink-0`}
                      >
                        {lead.aiScore}/100
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-hairline text-[10px]">
                      <span
                        className={`px-2 py-0.5 rounded-full font-semibold border ${stageColor.border} ${stageColor.bg} ${stageColor.text}`}
                      >
                        {getLeadStageLabel(lead.stage)}
                      </span>
                      <span className="font-mono text-aubergine font-bold">
                        {formatCurrencyINR(lead.budgetMax)}
                      </span>
                    </div>
                  </div>
                );
              })}

              {filteredLeads.length === 0 && (
                <div className="text-center py-10 text-xs text-ink-mute">
                  No prospects found matching your filters.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Active Lead Intelligence Studio (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {selectedLead ? (
            <div className="p-6 rounded-2xl border border-hairline bg-white shadow-elevation-1 space-y-5">
              {/* Active Lead Header */}
              <div className="p-4 rounded-xl border border-hairline bg-canvas-cream flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-ink">
                      {selectedLead.name}
                    </h2>
                    <span className="text-xs text-ink-mute font-mono">
                      {selectedLead.phone}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-ink-mute">
                    <span className="flex items-center gap-1 text-ink font-medium">
                      <Building2 className="h-3.5 w-3.5 text-aubergine" />
                      <span>{selectedLead.preferredProject || "Luxury Gurugram"}</span>
                    </span>
                    <span>•</span>
                    <span>{selectedLead.preferredBhk}</span>
                    <span>•</span>
                    <span className="font-mono text-aubergine font-bold">
                      {formatCurrencyINR(selectedLead.budgetMin)} - {formatCurrencyINR(selectedLead.budgetMax)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right text-[11px] hidden sm:block">
                    <span className="text-ink-mute block text-[10px] uppercase">
                      Assigned Agent
                    </span>
                    <span className="font-semibold text-ink">
                      {selectedAgent?.name || "Rajesh Sharma"}
                    </span>
                  </div>
                  <span
                    className={`px-3 py-1.5 rounded-full text-xs font-extrabold ${
                      getAiScoreBadgeColor(selectedLead.aiScore).bg
                    }`}
                  >
                    {selectedLead.aiScore} / 100 Score
                  </span>
                </div>
              </div>

              {/* Studio Navigation Tabs as Pill Container */}
              <div className="flex p-1 bg-canvas-cream border border-hairline rounded-full gap-1 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setStudioTab("PITCH")}
                  className={`flex-1 py-2 px-3 rounded-full transition-all flex items-center justify-center gap-1.5 ${
                    studioTab === "PITCH"
                      ? "bg-aubergine text-white shadow-sm"
                      : "text-ink-mute hover:text-ink"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>AI Pitch Copilot</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStudioTab("GAUGE")}
                  className={`flex-1 py-2 px-3 rounded-full transition-all flex items-center justify-center gap-1.5 ${
                    studioTab === "GAUGE"
                      ? "bg-aubergine text-white shadow-sm"
                      : "text-ink-mute hover:text-ink"
                  }`}
                >
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>Intent Gauge & Signals</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStudioTab("RISK")}
                  className={`flex-1 py-2 px-3 rounded-full transition-all flex items-center justify-center gap-1.5 ${
                    studioTab === "RISK"
                      ? "bg-aubergine text-white shadow-sm"
                      : "text-ink-mute hover:text-ink"
                  }`}
                >
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>Deal Drop-off Radar</span>
                </button>
              </div>

              {/* Studio Content */}
              <div className="pt-2 animate-in fade-in duration-200">
                {studioTab === "PITCH" && (
                  <AiPitchCopilot lead={selectedLead} />
                )}

                {studioTab === "GAUGE" && (
                  <AiLeadScoringGauge lead={selectedLead} />
                )}

                {studioTab === "RISK" && (
                  <div className="space-y-4">
                    <DealRiskPredictorCard
                      lead={selectedLead}
                      onApplyMitigation={() => setStudioTab("PITCH")}
                    />
                    <AiLeadScoringGauge lead={selectedLead} />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-2xl border border-hairline bg-white text-center text-ink-mute">
              Select a lead from the directory to launch the AI intelligence studio.
            </div>
          )}
        </div>
      </div>

      {/* Signature Site-wide Aubergine Footer */}
      <FooterAubergine />
    </div>
  );
}

