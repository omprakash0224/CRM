"use client";

import React, { useState } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Building2,
  Users,
  Filter,
  FileText,
  DollarSign,
  Sparkles,
  PieChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LeadSourceRoiCard } from "@/components/analytics/LeadSourceRoiCard";
import { PipelineFunnelCard } from "@/components/analytics/PipelineFunnelCard";
import { MonthlyRevenueChart } from "@/components/analytics/MonthlyRevenueChart";
import { AgentPerformanceMatrix } from "@/components/analytics/AgentPerformanceMatrix";
import { ExecutiveReportModal } from "@/components/analytics/ExecutiveReportModal";
import { FooterAubergine } from "@/components/layout/FooterAubergine";
import { formatCurrencyINR } from "@/lib/utils";

type TimeframeOption = "MTD" | "Q2" | "FY26";

export default function AnalyticsPage() {
  const { projects, agents } = useCrmStore();

  const [timeframe, setTimeframe] = useState<TimeframeOption>("Q2");
  const [selectedProject, setSelectedProject] = useState<string>("ALL");
  const [selectedAgent, setSelectedAgent] = useState<string>("ALL");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Executive Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-canvas-lavender flex items-center justify-center text-aubergine font-bold shadow-sm">
              <BarChart3 className="h-5 w-5 text-aubergine" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ink tracking-tight">
                Business Intelligence & Executive Reporting
              </h1>
              <p className="text-xs text-ink-mute mt-0.5">
                Real-time marketing channel ROAS, pipeline funnel drop-off analytics, and board executive summaries.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            className="h-10 px-6 text-xs bg-aubergine hover:bg-aubergine-press text-white font-semibold gap-2 shadow-sm rounded-full"
          >
            <FileText className="h-4 w-4" />
            <span>Export Executive Board Report</span>
          </Button>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="p-4 rounded-2xl border border-hairline bg-white shadow-elevation-1 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Timeframe selector */}
        <div className="flex items-center gap-1 bg-canvas-cream p-1 rounded-full border border-hairline">
          <button
            type="button"
            onClick={() => setTimeframe("MTD")}
            className={`px-3.5 py-1.5 rounded-full transition-all text-xs font-semibold ${
              timeframe === "MTD"
                ? "bg-aubergine text-white shadow-sm"
                : "text-ink-mute hover:text-ink"
            }`}
          >
            This Month (MTD)
          </button>
          <button
            type="button"
            onClick={() => setTimeframe("Q2")}
            className={`px-3.5 py-1.5 rounded-full transition-all text-xs font-semibold ${
              timeframe === "Q2"
                ? "bg-aubergine text-white shadow-sm"
                : "text-ink-mute hover:text-ink"
            }`}
          >
            Last Quarter (Q2 FY26)
          </button>
          <button
            type="button"
            onClick={() => setTimeframe("FY26")}
            className={`px-3.5 py-1.5 rounded-full transition-all text-xs font-semibold ${
              timeframe === "FY26"
                ? "bg-aubergine text-white shadow-sm"
                : "text-ink-mute hover:text-ink"
            }`}
          >
            Full Year FY 2026-27
          </button>
        </div>

        {/* Project & Agent Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-ink-mute" />
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="h-9 rounded-xl border border-hairline bg-canvas-cream px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
            >
              <option value="ALL">All Development Projects</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-ink-mute" />
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="h-9 rounded-xl border border-hairline bg-canvas-cream px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
            >
              <option value="ALL">Entire Sales Team</option>
              {agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Row 1: Marketing Channel ROI & Pipeline Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <LeadSourceRoiCard />
        <PipelineFunnelCard />
      </div>

      {/* Row 2: Monthly Revenue Area Chart & Agent Productivity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <MonthlyRevenueChart />
        </div>
        <div className="lg:col-span-5">
          <AgentPerformanceMatrix />
        </div>
      </div>

      {/* 1-Click Executive Board Report Export Modal */}
      <ExecutiveReportModal
        open={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Signature Site-wide Aubergine Footer */}
      <FooterAubergine />
    </div>
  );
}

