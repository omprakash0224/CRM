"use client";

import React, { useState } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import {
  Users,
  Building2,
  TrendingUp,
  CalendarCheck,
  AlertTriangle,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  MapPin,
  UserPlus,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  formatCurrencyINR,
  getLeadStageColor,
  getLeadStageLabel,
  getAiScoreBadgeColor,
} from "@/lib/utils";
import { LeadSourceChart } from "@/components/dashboard/LeadSourceChart";
import { MiniFunnelChart } from "@/components/dashboard/MiniFunnelChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { AgentLeaderboardMini } from "@/components/dashboard/AgentLeaderboardMini";
import { OverdueReviewModal } from "@/components/dashboard/OverdueReviewModal";
import { AddLeadModal } from "@/components/dashboard/AddLeadModal";
import { ScheduleVisitModal } from "@/components/dashboard/ScheduleVisitModal";
import { FooterAubergine } from "@/components/layout/FooterAubergine";
import Link from "next/link";

export default function DashboardPage() {
  const {
    currentPersonaId,
    personas,
    leads,
    projects,
    units,
    visits,
    agents,
    simulateInboundLead,
  } = useCrmStore();

  const [overdueModalOpen, setOverdueModalOpen] = useState(false);
  const [addLeadOpen, setAddLeadOpen] = useState(false);
  const [scheduleVisitOpen, setScheduleVisitOpen] = useState(false);

  const currentPersona =
    personas.find((p) => p.id === currentPersonaId) || personas[0];

  // Dynamic calculations from store
  const totalLeads = leads.length;
  const overdueLeads = leads.filter((l) => l.isOverdue);
  const scheduledVisits = visits.filter(
    (v) => v.status === "SCHEDULED" || v.status === "IN_PROGRESS"
  );
  const completedVisits = visits.filter((v) => v.status === "COMPLETED");

  // Leads in Negotiation & Booking
  const activeNegotiations = leads.filter(
    (l) => l.stage === "NEGOTIATION" || l.stage === "BOOKING"
  );
  const pipelineValue = activeNegotiations.reduce(
    (sum, lead) => sum + (lead.budgetMin + lead.budgetMax) / 2,
    0
  );

  // Stage distribution
  const stageCounts = {
    NEW_LEAD: leads.filter((l) => l.stage === "NEW_LEAD").length,
    CONTACTED: leads.filter((l) => l.stage === "CONTACTED").length,
    INTERESTED: leads.filter((l) => l.stage === "INTERESTED").length,
    SITE_VISIT_SCHEDULED: leads.filter(
      (l) => l.stage === "SITE_VISIT_SCHEDULED"
    ).length,
    NEGOTIATION: leads.filter((l) => l.stage === "NEGOTIATION").length,
    BOOKING: leads.filter((l) => l.stage === "BOOKING").length,
    CLOSED: leads.filter((l) => l.stage === "CLOSED").length,
  };

  // Unit distribution
  const availableUnits = units.filter((u) => u.status === "AVAILABLE").length;
  const holdUnits = units.filter((u) => u.status === "HOLD").length;
  const bookedUnits = units.filter((u) => u.status === "BOOKED").length;
  const soldUnits = units.filter((u) => u.status === "SOLD").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Command Center Hero Header with Pastel-Mesh Atmospheric Backdrop */}
      <div className="relative overflow-hidden rounded-2xl border border-hairline p-8 md:p-10 shadow-elevation-1 bg-white">
        {/* Pastel mesh gradient wash backdrop */}
        <div
          className="absolute inset-0 pointer-events-none opacity-80"
          style={{
            background:
              "radial-gradient(ellipse at 10% 15%, #fff0e6 0%, transparent 55%), radial-gradient(ellipse at 90% 20%, #e9d8ff 0%, transparent 55%), radial-gradient(ellipse at 50% 90%, #e2f0d9 0%, transparent 60%)",
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="eyebrow-pill">
                Executive Command Center • Real-Time Engine
              </span>
              <span className="text-xs text-ink-mute font-medium">
                Active: <span className="font-bold text-ink">{currentPersona.name}</span> ({currentPersona.title})
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              Real Estate Sales Operations Command Center
            </h1>

            <p className="text-sm text-ink-mute max-w-2xl leading-relaxed">
              {currentPersona.role === "DIRECTOR" &&
                "Consolidated visibility across ₹64.8 Cr active pipeline, 3 luxury projects, agent closing velocities, and inbound marketing ROI."}
              {currentPersona.role === "SALES_MANAGER" &&
                "Live tracking of agent call response times, site visit completion rates, and round-robin lead allocation."}
              {currentPersona.role === "SALES_EXECUTIVE" &&
                "Direct view of your assigned buyer inquiries, scheduled site visits, and daily follow-up commitments."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Secondary Lavender Pill */}
            <Button
              variant="secondary"
              onClick={() => setAddLeadOpen(true)}
              className="gap-1.5 text-xs shadow-sm"
            >
              <UserPlus className="h-3.5 w-3.5 text-aubergine" />
              <span>+ Add Lead</span>
            </Button>

            {/* Outline Aubergine Pill */}
            <Button
              variant="outline"
              onClick={() => setScheduleVisitOpen(true)}
              className="gap-1.5 text-xs shadow-sm"
            >
              <CalendarCheck className="h-3.5 w-3.5 text-aubergine" />
              <span>+ Schedule Visit</span>
            </Button>

            {/* Dominant Aubergine Primary Pill */}
            <Button
              variant="default"
              onClick={() => simulateInboundLead("META_ADS")}
              className="gap-1.5 text-xs shadow-elevation-1"
            >
              <Zap className="h-3.5 w-3.5 fill-current" />
              <span>⚡ Simulate Inbound Lead</span>
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Overdue Follow-ups Alert Banner */}
      {overdueLeads.length > 0 && (
        <div className="rounded-2xl border border-[#fecaca] bg-[#fef2f2] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start space-x-3.5">
            <div className="p-2 rounded-full bg-white border border-[#fecaca] text-[#cc4117] shrink-0 shadow-sm">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-bold text-[#cc4117]">
                  SLA Warning: {overdueLeads.length} High-Intent Inquiries Overdue (&gt;2 Hours)
                </h4>
                <Badge variant="destructive" className="text-[10px] uppercase font-bold">
                  Action Required
                </Badge>
              </div>
              <p className="text-xs text-ink-mute mt-1">
                Leads including{" "}
                <span className="font-bold text-ink">
                  {overdueLeads.slice(0, 3).map((l) => l.name).join(", ")}
                </span>{" "}
                are pending follow-up. Delayed follow-ups decrease closing chance by 71%.
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 shrink-0">
            <span className="text-xs text-ink-mute font-mono hidden md:inline">
              Avg SLA Delay: 1h 45m
            </span>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setOverdueModalOpen(true)}
              className="text-xs px-5 shadow-sm"
            >
              Review Now ({overdueLeads.length})
            </Button>
          </div>
        </div>
      )}

      {/* 3. Hero KPI Metric Cards: Massive 50px Aubergine Numerals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Total Active Leads */}
        <Card className="hover:border-aubergine/40 transition-all group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-ink-mute uppercase tracking-wider">
              Total Active Leads
            </CardTitle>
            <div className="h-9 w-9 rounded-full bg-canvas-lavender text-aubergine flex items-center justify-center border border-hairline group-hover:scale-105 transition-transform shadow-sm">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <div className="stat-numeral">
              {totalLeads}
            </div>
            <div className="flex items-center text-xs text-[#007a5a] font-bold">
              <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
              <span>+14.2% MoM</span>
              <span className="text-ink-mute ml-1.5 font-normal">
                ({stageCounts.NEW_LEAD} inquiries today)
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 2: Pipeline Deal Value */}
        <Card className="hover:border-aubergine/40 transition-all group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-ink-mute uppercase tracking-wider">
              Active Pipeline Value
            </CardTitle>
            <div className="h-9 w-9 rounded-full bg-[#fef3c7] text-[#d97706] flex items-center justify-center border border-hairline group-hover:scale-105 transition-transform shadow-sm">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <div className="stat-numeral">
              {formatCurrencyINR(pipelineValue)}
            </div>
            <div className="flex items-center text-xs text-[#d97706] font-bold">
              <span>{activeNegotiations.length} Active Deals</span>
              <span className="text-ink-mute ml-1.5 font-normal">
                in Negotiation & Booking
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 3: Site Visits */}
        <Card className="hover:border-aubergine/40 transition-all group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-ink-mute uppercase tracking-wider">
              Site Visits Today
            </CardTitle>
            <div className="h-9 w-9 rounded-full bg-canvas-lavender text-aubergine flex items-center justify-center border border-hairline group-hover:scale-105 transition-transform shadow-sm">
              <CalendarCheck className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <div className="stat-numeral">
              {scheduledVisits.length}
            </div>
            <div className="flex items-center text-xs text-ink-mute">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#007a5a] mr-1" />
              <span className="text-[#007a5a] font-bold">
                {completedVisits.length} GPS Verified
              </span>
              <span className="text-ink-mute ml-1.5">check-ins</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 4: Inventory Units */}
        <Card className="hover:border-aubergine/40 transition-all group">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold text-ink-mute uppercase tracking-wider">
              Live Inventory Units
            </CardTitle>
            <div className="h-9 w-9 rounded-full bg-[#ecfdf5] text-[#007a5a] flex items-center justify-center border border-hairline group-hover:scale-105 transition-transform shadow-sm">
              <Building2 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-1.5">
            <div className="stat-numeral">
              {availableUnits}{" "}
              <span className="text-lg font-normal text-ink-mute">
                / {units.length} Free
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[11px] text-ink-mute font-medium">
              <span className="text-[#d97706] font-bold">{holdUnits} Hold</span>
              <span>•</span>
              <span className="text-[#1264a3] font-bold">{bookedUnits} Booked</span>
              <span>•</span>
              <span className="text-[#cc4117] font-bold">{soldUnits} Sold</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. Analytics Row: Recharts Lead Source Donut & Pipeline Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadSourceChart />
        <MiniFunnelChart />
      </div>

      {/* 5. Operational Operations Row: Real-time Activity Feed & Agent Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActivityFeed />
        <AgentLeaderboardMini />
      </div>

      {/* 6. 7-Stage Pipeline Visual Breakdown */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-ink flex items-center gap-2">
              <span>7-Stage Pipeline Distribution</span>
              <Badge variant="outline" className="text-xs font-normal">
                {totalLeads} Total Prospects
              </Badge>
            </CardTitle>
            <p className="text-xs text-ink-mute mt-1">
              End-to-end sales workflow from first ad click to registered deed.
            </p>
          </div>
          <Link
            href="/pipeline"
            className="text-xs text-[#1264a3] hover:text-[#3860be] flex items-center gap-1 font-bold underline-offset-4 hover:underline"
          >
            Open Interactive Kanban <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {[
              { stage: "NEW_LEAD", label: "1. New Leads", count: stageCounts.NEW_LEAD },
              { stage: "CONTACTED", label: "2. Contacted", count: stageCounts.CONTACTED },
              { stage: "INTERESTED", label: "3. Interested", count: stageCounts.INTERESTED },
              { stage: "SITE_VISIT_SCHEDULED", label: "4. Visits", count: stageCounts.SITE_VISIT_SCHEDULED },
              { stage: "NEGOTIATION", label: "5. Negotiation", count: stageCounts.NEGOTIATION },
              { stage: "BOOKING", label: "6. Booking", count: stageCounts.BOOKING },
              { stage: "CLOSED", label: "7. Closed Won", count: stageCounts.CLOSED },
            ].map((item) => {
              const color = getLeadStageColor(item.stage);
              return (
                <div
                  key={item.stage}
                  className={`p-4 rounded-xl border ${color.border} ${color.bg} transition-all hover:scale-[1.02] shadow-sm`}
                >
                  <p className="text-[11px] font-bold text-ink truncate">
                    {item.label}
                  </p>
                  <p className="text-2xl font-extrabold text-aubergine mt-1">
                    {item.count}
                  </p>
                  <p className="text-[10px] text-ink-mute mt-0.5">
                    {((item.count / totalLeads) * 100).toFixed(0)}% of pipeline
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 7. Active Luxury Projects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-ink">
              Luxury Project Portfolios
            </h3>
            <p className="text-xs text-ink-mute">
              Live inventory across Gurugram and Mumbai premium developments
            </p>
          </div>
          <Link
            href="/inventory"
            className="text-xs text-[#1264a3] hover:text-[#3860be] flex items-center gap-1 font-bold underline-offset-4 hover:underline"
          >
            View Unit Matrix <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-hairline bg-white overflow-hidden group hover:shadow-elevation-2 transition-all shadow-elevation-1 flex flex-col justify-between"
            >
              <div>
                <div className="h-44 w-full relative overflow-hidden bg-canvas-cream">
                  <img
                    src={project.bannerImage}
                    alt={project.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <Badge variant="aubergine" className="text-[10px] font-bold">
                      {project.city}
                    </Badge>
                    <span className="text-xs font-bold text-white drop-shadow">
                      {project.availableUnits} of {project.totalUnits} Units Free
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h4 className="font-bold text-base text-ink">
                      {project.name}
                    </h4>
                    <p className="text-xs text-ink-mute flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 text-ink-mute shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </p>
                  </div>

                  <p className="text-base font-extrabold text-aubergine font-mono">
                    {project.priceRange}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.unitTypes.map((type) => (
                      <span
                        key={type}
                        className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-canvas-cream text-ink border border-hairline"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-3 border-t border-hairline flex items-center justify-between text-xs text-ink-mute">
                <span>{project.towers.length} Residential Towers</span>
                <span className="text-[#007a5a] text-[11px] font-bold flex items-center gap-1">
                  Radar: {project.geofenceRadiusMeters}m
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Recent Leads Inspection Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-ink">
              Recent Inbound Prospects & Lead Scores
            </CardTitle>
            <p className="text-xs text-ink-mute mt-1">
              Real-time capture status with AI intent badges and assigned consultant.
            </p>
          </div>
          <Link
            href="/pipeline"
            className="text-xs text-[#1264a3] hover:text-[#3860be] font-bold underline-offset-4 hover:underline"
          >
            View All ({totalLeads}) →
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f4ede4] text-ink uppercase text-[10px] tracking-wider border-b border-hairline">
                <tr>
                  <th className="py-3 px-4 font-bold">Lead Name</th>
                  <th className="py-3 px-4 font-bold">Stage</th>
                  <th className="py-3 px-4 font-bold">Project & Configuration</th>
                  <th className="py-3 px-4 font-bold">Target Budget</th>
                  <th className="py-3 px-4 font-bold">AI Lead Score</th>
                  <th className="py-3 px-4 font-bold">Assigned Agent</th>
                  <th className="py-3 px-4 font-bold">Acquisition Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline font-medium">
                {leads.slice(0, 7).map((lead) => {
                  const stageCol = getLeadStageColor(lead.stage);
                  const aiBadge = getAiScoreBadgeColor(lead.aiScore);
                  const agent = agents.find((a) => a.id === lead.assignedAgentId);

                  return (
                    <tr
                      key={lead.id}
                      className="hover:bg-[#fdfbf7] transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-ink">
                          {lead.name}
                        </div>
                        <div className="text-[10px] text-ink-mute font-mono">
                          {lead.phone}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${stageCol.border} ${stageCol.bg} ${stageCol.text}`}
                        >
                          {getLeadStageLabel(lead.stage)}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-ink font-medium">
                          {lead.preferredProject || "Gurugram Prime"}
                        </span>
                        <span className="text-[10px] text-ink-mute block">
                          {lead.preferredBhk}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-aubergine font-bold font-mono">
                        {formatCurrencyINR((lead.budgetMin + lead.budgetMax) / 2)}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${aiBadge.bg}`}
                        >
                          <Sparkles className="h-2.5 w-2.5 mr-1" />
                          {lead.aiScore}/100
                        </span>
                      </td>

                      <td className="py-3 px-4 text-ink">
                        {agent?.name || "Rajesh Sharma"}
                      </td>

                      <td className="py-3 px-4">
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#f4ede4] text-ink border border-hairline font-semibold">
                          {lead.source}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 9. Signature Aubergine Band & Footer */}
      <FooterAubergine />

      {/* Overdue Review Modal */}
      <OverdueReviewModal
        open={overdueModalOpen}
        onOpenChange={setOverdueModalOpen}
      />
      <AddLeadModal open={addLeadOpen} onOpenChange={setAddLeadOpen} />
      <ScheduleVisitModal
        open={scheduleVisitOpen}
        onOpenChange={setScheduleVisitOpen}
      />
    </div>
  );
}
