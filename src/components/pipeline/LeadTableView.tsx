"use client";

import React, { useState, useMemo } from "react";
import { Lead } from "@/types";
import { useCrmStore } from "@/store/useCrmStore";
import {
  Search,
  ArrowUpDown,
  Phone,
  MessageSquare,
  Sparkles,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  formatCurrencyINR,
  formatRelativeTime,
  getLeadStageColor,
  getLeadStageLabel,
  getAiScoreBadgeColor,
} from "@/lib/utils";

interface LeadTableViewProps {
  onSelectLead: (lead: Lead) => void;
}

export function LeadTableView({ onSelectLead }: LeadTableViewProps) {
  const { leads, projects, agents, updateLead, addLeadActivity, setNotification } =
    useCrmStore();

  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("ALL");
  const [stageFilter, setStageFilter] = useState("ALL");
  const [sourceFilter, setSourceFilter] = useState("ALL");
  const [agentFilter, setAgentFilter] = useState("ALL");
  const [sortField, setSortField] = useState<"name" | "aiScore" | "budget" | "updatedAt">("updatedAt");
  const [sortAsc, setSortAsc] = useState(false);

  const filteredLeads = useMemo(() => {
    return leads
      .filter((l) => {
        if (projectFilter !== "ALL" && l.preferredProject !== projectFilter)
          return false;
        if (stageFilter !== "ALL" && l.stage !== stageFilter) return false;
        if (sourceFilter !== "ALL" && l.source !== sourceFilter) return false;
        if (agentFilter !== "ALL" && l.assignedAgentId !== agentFilter)
          return false;
        if (search.trim()) {
          const q = search.toLowerCase();
          return (
            l.name.toLowerCase().includes(q) ||
            l.phone.includes(q) ||
            l.email.toLowerCase().includes(q) ||
            (l.preferredProject && l.preferredProject.toLowerCase().includes(q))
          );
        }
        return true;
      })
      .sort((a, b) => {
        let valA: any;
        let valB: any;

        if (sortField === "budget") {
          valA = (a.budgetMin + a.budgetMax) / 2;
          valB = (b.budgetMin + b.budgetMax) / 2;
        } else if (sortField === "updatedAt") {
          valA = new Date(a.updatedAt).getTime();
          valB = new Date(b.updatedAt).getTime();
        } else {
          valA = a[sortField as keyof Lead];
          valB = b[sortField as keyof Lead];
        }

        if (valA < valB) return sortAsc ? -1 : 1;
        if (valA > valB) return sortAsc ? 1 : -1;
        return 0;
      });
  }, [
    leads,
    search,
    projectFilter,
    stageFilter,
    sourceFilter,
    agentFilter,
    sortField,
    sortAsc,
  ]);

  const handleSort = (field: "name" | "aiScore" | "budget" | "updatedAt") => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const handleQuickCall = (lead: Lead) => {
    addLeadActivity(lead.id, {
      type: "CALL",
      description: "Quick call logged from Table View.",
      agentName: "Rajesh Sharma",
    });
    updateLead(lead.id, { isOverdue: false });
    setNotification(`📞 Call logged for ${lead.name}`);
  };

  const handleQuickWhatsApp = (lead: Lead) => {
    addLeadActivity(lead.id, {
      type: "WHATSAPP",
      description: "Quick WhatsApp brochure link dispatched from Table View.",
      agentName: "Rajesh Sharma",
    });
    updateLead(lead.id, { isOverdue: false });
    setNotification(`💬 WhatsApp dispatched to ${lead.name}`);
  };

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 p-4 rounded-2xl border border-hairline bg-white shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-ink-mute" />
          <Input
            placeholder="Search name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className="h-9 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
        >
          <option value="ALL">All Projects</option>
          {projects.map((p) => (
            <option key={p.id} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="h-9 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
        >
          <option value="ALL">All 7 Stages</option>
          <option value="NEW_LEAD">New Inquiries</option>
          <option value="CONTACTED">Contacted</option>
          <option value="INTERESTED">Interested</option>
          <option value="SITE_VISIT_SCHEDULED">Site Visits</option>
          <option value="NEGOTIATION">Negotiation</option>
          <option value="BOOKING">Booking Token</option>
          <option value="CLOSED">Closed Won</option>
        </select>

        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="h-9 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
        >
          <option value="ALL">All Sources</option>
          <option value="META_ADS">Meta Lead Ads</option>
          <option value="MAGICBRICKS">MagicBricks</option>
          <option value="GOOGLE_ADS">Google Ads</option>
          <option value="HOUSING_COM">Housing.com</option>
          <option value="REFERRAL">Referral</option>
          <option value="WALK_IN">Walk-in</option>
        </select>

        <select
          value={agentFilter}
          onChange={(e) => setAgentFilter(e.target.value)}
          className="h-9 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
        >
          <option value="ALL">All Agents</option>
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-hairline bg-white overflow-hidden shadow-elevation-1">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f4ede4] text-ink uppercase text-[10px] tracking-wider border-b border-hairline select-none font-bold">
              <tr>
                <th
                  onClick={() => handleSort("name")}
                  className="py-3.5 px-4 cursor-pointer hover:text-aubergine"
                >
                  <div className="flex items-center gap-1">
                    <span>Lead Name & Contact</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Current Stage</th>
                <th className="py-3.5 px-4">Project & BHK</th>
                <th
                  onClick={() => handleSort("budget")}
                  className="py-3.5 px-4 cursor-pointer hover:text-aubergine"
                >
                  <div className="flex items-center gap-1">
                    <span>Target Budget</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("aiScore")}
                  className="py-3.5 px-4 cursor-pointer hover:text-aubergine"
                >
                  <div className="flex items-center gap-1">
                    <span>AI Lead Score</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Assigned Agent</th>
                <th
                  onClick={() => handleSort("updatedAt")}
                  className="py-3.5 px-4 cursor-pointer hover:text-aubergine"
                >
                  <div className="flex items-center gap-1">
                    <span>Last Activity</span>
                    <ArrowUpDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline font-medium">
              {filteredLeads.map((lead) => {
                const stageColor = getLeadStageColor(lead.stage);
                const aiBadge = getAiScoreBadgeColor(lead.aiScore);
                const agent = agents.find((a) => a.id === lead.assignedAgentId);

                return (
                  <tr
                    key={lead.id}
                    onClick={() => onSelectLead(lead)}
                    className="hover:bg-[#fdfbf7] cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-ink group-hover:text-aubergine">
                        {lead.name}
                      </div>
                      <div className="text-[10px] text-ink-mute font-mono">
                        {lead.phone}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${stageColor.border} ${stageColor.bg} ${stageColor.text}`}
                      >
                        {getLeadStageLabel(lead.stage)}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="text-ink font-semibold">
                        {lead.preferredProject || "Gurugram Prime"}
                      </span>
                      <span className="text-[10px] text-ink-mute block">
                        {lead.preferredBhk}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-aubergine">
                      {formatCurrencyINR(
                        (lead.budgetMin + lead.budgetMax) / 2
                      )}
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

                    <td className="py-3 px-4 text-ink-mute text-[10px] font-mono">
                      <div className="flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        {formatRelativeTime(lead.updatedAt)}
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div
                        className="flex items-center justify-end space-x-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleQuickCall(lead)}
                          className="h-7 w-7 text-[#1264a3] hover:bg-[#eef5fc]"
                          title="Call Lead"
                        >
                          <Phone className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleQuickWhatsApp(lead)}
                          className="h-7 w-7 text-[#007a5a] hover:bg-[#ecfdf5]"
                          title="Send WhatsApp"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
