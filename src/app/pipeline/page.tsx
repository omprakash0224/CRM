"use client";

import React, { useState } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import { Lead } from "@/types";
import {
  KanbanSquare,
  Table as TableIcon,
  Zap,
  UserPlus,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { KanbanBoard } from "@/components/pipeline/KanbanBoard";
import { LeadTableView } from "@/components/pipeline/LeadTableView";
import { LeadDetailDrawer } from "@/components/pipeline/LeadDetailDrawer";
import { AddLeadModal } from "@/components/dashboard/AddLeadModal";
import { FooterAubergine } from "@/components/layout/FooterAubergine";

export default function PipelinePage() {
  const { leads, projects, simulateInboundLead } = useCrmStore();

  const [viewMode, setViewMode] = useState<"KANBAN" | "TABLE">("KANBAN");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addLeadOpen, setAddLeadOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
    setDrawerOpen(true);
  };

  // Filter leads for the Kanban Board
  const filteredLeads = leads.filter((lead) => {
    if (projectFilter !== "ALL" && lead.preferredProject !== projectFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        (lead.preferredProject &&
          lead.preferredProject.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Pipeline Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-extrabold text-ink tracking-tight">
              Sales Pipeline & Lead Management
            </h1>
            <Badge variant="aubergine" className="text-xs font-bold">
              7 Active Stages
            </Badge>
          </div>
          <p className="text-xs text-ink-mute mt-1">
            Drag and drop buyer cards to progress leads from first ad touchpoint to closed deal.
          </p>
        </div>

        {/* View Switcher & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-canvas-cream p-1 rounded-full border border-hairline text-xs">
            <button
              onClick={() => setViewMode("KANBAN")}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-bold transition-all ${
                viewMode === "KANBAN"
                  ? "bg-aubergine text-white shadow-sm"
                  : "text-ink-mute hover:text-ink"
              }`}
            >
              <KanbanSquare className="h-3.5 w-3.5 text-white" />
              <span>Kanban Board</span>
            </button>
            <button
              onClick={() => setViewMode("TABLE")}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-bold transition-all ${
                viewMode === "TABLE"
                  ? "bg-aubergine text-white shadow-sm"
                  : "text-ink-mute hover:text-ink"
              }`}
            >
              <TableIcon className="h-3.5 w-3.5 text-white" />
              <span>Table View</span>
            </button>
          </div>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => setAddLeadOpen(true)}
            className="text-xs gap-1.5 shadow-sm"
          >
            <UserPlus className="h-3.5 w-3.5 text-aubergine" />
            + Add Lead
          </Button>

          {/* Showstopper Simulators */}
          <Button
            size="sm"
            variant="default"
            onClick={() => simulateInboundLead("META_ADS")}
            className="text-xs gap-1 shadow-elevation-1"
          >
            <Zap className="h-3.5 w-3.5 fill-current" />
            ⚡ Simulate Meta Lead
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={() => simulateInboundLead("MAGICBRICKS")}
            className="text-xs gap-1 text-[#cc4117] border border-[#fecaca] bg-[#fef2f2] hover:bg-[#fee2e2]"
          >
            <Zap className="h-3.5 w-3.5 fill-current" />
            ⚡ MagicBricks Lead
          </Button>
        </div>
      </div>

      {/* Filter and Metrics Sub-Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl border border-hairline bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {/* Project filter pills */}
          <button
            onClick={() => setProjectFilter("ALL")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              projectFilter === "ALL"
                ? "bg-aubergine text-white shadow-sm"
                : "bg-canvas-cream text-ink-mute hover:text-ink border border-hairline"
            }`}
          >
            All Projects ({leads.length})
          </button>

          {projects.map((proj) => {
            const count = leads.filter(
              (l) => l.preferredProject === proj.name
            ).length;
            const isSelected = projectFilter === proj.name;

            return (
              <button
                key={proj.id}
                onClick={() => setProjectFilter(proj.name)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-aubergine text-white shadow-sm"
                    : "bg-canvas-cream text-ink-mute hover:text-ink border border-hairline"
                }`}
              >
                <span>{proj.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-[#611f69] text-white" : "bg-white text-ink-mute"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-ink-mute" />
          <Input
            placeholder="Filter by name, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>
      </div>

      {/* Main View: Kanban vs Table */}
      {viewMode === "KANBAN" ? (
        <KanbanBoard
          filteredLeads={filteredLeads}
          onSelectLead={handleSelectLead}
        />
      ) : (
        <LeadTableView onSelectLead={handleSelectLead} />
      )}

      {/* Signature Aubergine Band */}
      <FooterAubergine />

      {/* 360° Lead Detail Drawer */}
      <LeadDetailDrawer
        lead={selectedLead}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      {/* Add Lead Modal */}
      <AddLeadModal open={addLeadOpen} onOpenChange={setAddLeadOpen} />
    </div>
  );
}
