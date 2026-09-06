"use client";

import React, { useState, useMemo } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import { Deal, PayoutStatus } from "@/types";
import {
  Search,
  CheckCircle2,
  Clock,
  Send,
  FileText,
  Building,
  User,
  ExternalLink,
  Coins,
  ShieldAlert,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyINR, formatDate } from "@/lib/utils";

interface PayoutStatusTableProps {
  onOpenStatement: (deal: Deal) => void;
  onOpenDealModal: () => void;
}

type TabFilter = "ALL" | "PENDING_BUILDER" | "APPROVED" | "DISBURSED";

export function PayoutStatusTable({
  onOpenStatement,
  onOpenDealModal,
}: PayoutStatusTableProps) {
  const { deals, agents, personas, currentPersonaId, approvePayout, disbursePayout } =
    useCrmStore();

  const [filterTab, setFilterTab] = useState<TabFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const currentPersona =
    personas.find((p) => p.id === currentPersonaId) || personas[0];
  const canApprove = currentPersona.permissions.canApprovePayouts;

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      const matchesSearch =
        deal.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.unitNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.id.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (filterTab === "ALL") return true;
      return deal.status === filterTab;
    });
  }, [deals, searchQuery, filterTab]);

  const pendingCount = deals.filter((d) => d.status === "PENDING_BUILDER").length;
  const approvedCount = deals.filter((d) => d.status === "APPROVED").length;
  const disbursedCount = deals.filter((d) => d.status === "DISBURSED").length;

  const getStatusBadge = (deal: Deal) => {
    switch (deal.status) {
      case "DISBURSED":
        return (
          <div className="space-y-0.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-canvas-cream text-semantic-success border border-hairline">
              <CheckCircle2 className="h-3 w-3" />
              <span>DISBURSED</span>
            </span>
            {deal.utrReference && (
              <span className="font-mono text-[9px] text-ink-mute block">
                {deal.utrReference}
              </span>
            )}
          </div>
        );
      case "APPROVED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-canvas-lavender text-aubergine border border-hairline">
            <Clock className="h-3 w-3" />
            <span>APPROVED FOR RTGS</span>
          </span>
        );
      case "PENDING_BUILDER":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-canvas-cream text-amber-700 border border-hairline">
            <Clock className="h-3 w-3" />
            <span>PENDING BUILDER</span>
          </span>
        );
    }
  };

  return (
    <div className="p-6 rounded-2xl border border-hairline bg-white space-y-4 shadow-elevation-1">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setFilterTab("ALL")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              filterTab === "ALL"
                ? "bg-aubergine text-white shadow-sm"
                : "bg-canvas-cream text-ink-mute hover:text-ink border border-hairline"
            }`}
          >
            All Deals ({deals.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("PENDING_BUILDER")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterTab === "PENDING_BUILDER"
                ? "bg-aubergine text-white shadow-sm"
                : "bg-canvas-cream text-ink-mute hover:text-ink border border-hairline"
            }`}
          >
            <span>⏳ Pending Clearance ({pendingCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("APPROVED")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterTab === "APPROVED"
                ? "bg-aubergine text-white shadow-sm"
                : "bg-canvas-cream text-ink-mute hover:text-ink border border-hairline"
            }`}
          >
            <span>✅ Approved ({approvedCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterTab("DISBURSED")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterTab === "DISBURSED"
                ? "bg-aubergine text-white shadow-sm"
                : "bg-canvas-cream text-ink-mute hover:text-ink border border-hairline"
            }`}
          >
            <span>💸 Disbursed ({disbursedCount})</span>
          </button>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-ink-mute" />
            <Input
              type="text"
              placeholder="Search agent, client, project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-10 text-xs bg-canvas-cream border-hairline rounded-xl focus:ring-2 focus:ring-aubergine"
            />
          </div>

          <Button
            type="button"
            size="sm"
            onClick={onOpenDealModal}
            className="h-10 px-4 text-xs bg-aubergine hover:bg-aubergine-press text-white font-semibold gap-1.5 shrink-0 shadow-sm rounded-full"
          >
            <span>+ Log Deal</span>
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border border-hairline overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-canvas-cream text-ink-mute font-semibold border-b border-hairline">
            <tr>
              <th className="p-3.5">Deal ID & Date</th>
              <th className="p-3.5">Sales Agent</th>
              <th className="p-3.5">Property & Client</th>
              <th className="p-3.5 text-right">Agreement Value</th>
              <th className="p-3.5 text-right">Total Brokerage</th>
              <th className="p-3.5 text-right">Net Agent Payout</th>
              <th className="p-3.5 text-center">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-hairline bg-white">
            {filteredDeals.map((deal) => {
              const agent = agents.find((a) => a.id === deal.agentId);

              return (
                <tr
                  key={deal.id}
                  className="hover:bg-canvas-cream/50 transition-colors"
                >
                  {/* Deal ID & Date */}
                  <td className="p-3.5">
                    <span className="font-mono font-bold text-ink uppercase block">
                      #{deal.id}
                    </span>
                    <span className="text-[10px] text-ink-mute">
                      {formatDate(deal.createdAt)}
                    </span>
                  </td>

                  {/* Sales Agent */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={
                          agent?.avatar ||
                          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
                        }
                        alt={deal.agentName}
                        className="h-7 w-7 rounded-full object-cover ring-1 ring-hairline"
                      />
                      <div>
                        <span className="font-bold text-ink block">
                          {deal.agentName}
                        </span>
                        <span className="text-[10px] text-ink-mute">
                          {deal.slabType === "FLAT_2_5"
                            ? "Flat 2.5%"
                            : deal.slabType === "TIERED_3_0"
                            ? "Tiered 3.0%"
                            : "Split 1.5%+1.5%"}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Property & Client */}
                  <td className="p-3.5">
                    <span className="font-semibold text-ink block">
                      {deal.projectName} — {deal.unitNumber}
                    </span>
                    <span className="text-[11px] text-ink-mute">
                      Client: {deal.clientName}
                    </span>
                  </td>

                  {/* Agreement Value */}
                  <td className="p-3.5 text-right font-mono font-bold text-ink">
                    {formatCurrencyINR(deal.agreementValue)}
                  </td>

                  {/* Total Brokerage */}
                  <td className="p-3.5 text-right font-mono text-ink">
                    <span className="font-bold block">
                      {formatCurrencyINR(deal.totalCommission)}
                    </span>
                    <span className="text-[10px] text-ink-mute">
                      ({deal.commissionRate}%)
                    </span>
                  </td>

                  {/* Net Agent Payout */}
                  <td className="p-3.5 text-right font-mono">
                    <span className="font-bold text-aubergine block">
                      {formatCurrencyINR(deal.netPayoutToAgent)}
                    </span>
                    <span className="text-[10px] text-ink-mute">
                      after 5% TDS
                    </span>
                  </td>

                  {/* Status */}
                  <td className="p-3.5 text-center">
                    {getStatusBadge(deal)}
                  </td>

                  {/* Actions */}
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Persona Director actions */}
                      {canApprove && deal.status === "PENDING_BUILDER" && (
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => approvePayout(deal.id)}
                          className="h-7 px-3 text-[11px] bg-aubergine hover:bg-aubergine-press text-white font-semibold gap-1 rounded-full shadow-sm"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Approve</span>
                        </Button>
                      )}

                      {canApprove && deal.status === "APPROVED" && (
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => disbursePayout(deal.id)}
                          className="h-7 px-3 text-[11px] bg-semantic-success hover:bg-semantic-success/90 text-white font-semibold gap-1 shadow-sm rounded-full"
                        >
                          <Zap className="h-3 w-3" />
                          <span>Disburse</span>
                        </Button>
                      )}

                      {/* Always show View Statement */}
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => onOpenStatement(deal)}
                        className="h-7 px-3 text-[11px] border-hairline bg-white hover:bg-canvas-cream text-ink gap-1 rounded-full"
                      >
                        <FileText className="h-3 w-3 text-aubergine" />
                        <span>Statement</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {filteredDeals.length === 0 && (
              <tr>
                <td colSpan={8} className="p-10 text-center text-ink-mute text-xs">
                  No deal commission records match your current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

