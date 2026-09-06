"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import { CommissionSlabType } from "@/types";
import {
  X,
  Building2,
  CheckCircle2,
  User,
  Calculator,
  Percent,
  Receipt,
  FileCheck,
  AlertCircle,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrencyINR } from "@/lib/utils";

interface DealClosureModalProps {
  open: boolean;
  onClose: () => void;
  preSelectedLeadId?: string;
}

export function DealClosureModal({
  open,
  onClose,
  preSelectedLeadId,
}: DealClosureModalProps) {
  const { leads, projects, units, agents, closeDeal } = useCrmStore();

  const [selectedLeadId, setSelectedLeadId] = useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [selectedUnitId, setSelectedUnitId] = useState<string>("");
  const [agreementValue, setAgreementValue] = useState<number>(25000000);
  const [slabType, setSlabType] = useState<CommissionSlabType>("FLAT_2_5");
  const [agentSharePct, setAgentSharePct] = useState<number>(40); // 40% to agent, 60% to agency

  // Initialize or update pre-selected lead
  useEffect(() => {
    if (preSelectedLeadId) {
      setSelectedLeadId(preSelectedLeadId);
      const lead = leads.find((l) => l.id === preSelectedLeadId);
      if (lead?.preferredProject) {
        const proj = projects.find(
          (p) =>
            p.name.toLowerCase().includes(lead.preferredProject!.toLowerCase()) ||
            lead.preferredProject!.toLowerCase().includes(p.name.toLowerCase())
        );
        if (proj) setSelectedProjectId(proj.id);
      }
      if (lead?.budgetMax) {
        setAgreementValue(lead.budgetMax);
      }
    } else if (leads.length && !selectedLeadId) {
      const negotiationLead = leads.find((l) => l.stage === "NEGOTIATION") || leads[0];
      setSelectedLeadId(negotiationLead.id);
      if (negotiationLead.budgetMax) setAgreementValue(negotiationLead.budgetMax);
    }
  }, [preSelectedLeadId, leads, projects]);

  // Set default project if not set
  useEffect(() => {
    if (!selectedProjectId && projects.length) {
      setSelectedProjectId(projects[0].id);
    }
  }, [projects, selectedProjectId]);

  // Available units for chosen project
  const projectUnits = useMemo(() => {
    return units.filter((u) => u.projectId === selectedProjectId);
  }, [units, selectedProjectId]);

  // Auto-select first unit if changed
  useEffect(() => {
    if (projectUnits.length && !selectedUnitId) {
      setSelectedUnitId(projectUnits[0].id);
      setAgreementValue(projectUnits[0].basePrice);
    }
  }, [projectUnits, selectedUnitId]);

  if (!open) return null;

  const currentLead = leads.find((l) => l.id === selectedLeadId);
  const currentProject = projects.find((p) => p.id === selectedProjectId);
  const currentUnit = units.find((u) => u.id === selectedUnitId);
  const assignedAgent = agents.find((a) => a.id === currentLead?.assignedAgentId) || agents[0];

  // Commission calculations
  const commissionRate =
    slabType === "FLAT_2_5" ? 2.5 : slabType === "TIERED_3_0" ? 3.0 : 3.0;

  const totalCommission = Math.round(agreementValue * (commissionRate / 100));
  const gstAmount = Math.round(totalCommission * 0.18);
  const totalInvoicedToDeveloper = totalCommission + gstAmount;

  const agentGross = Math.round(totalCommission * (agentSharePct / 100));
  const agencyGross = totalCommission - agentGross;
  const tdsDeduction = Math.round(agentGross * 0.05); // 5% TDS under Section 194H
  const netAgentPayable = agentGross - tdsDeduction;

  const handleUnitChange = (unitId: string) => {
    setSelectedUnitId(unitId);
    const u = units.find((item) => item.id === unitId);
    if (u) {
      setAgreementValue(u.basePrice);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentLead || !currentProject || !currentUnit) return;

    closeDeal({
      leadId: currentLead.id,
      clientName: currentLead.name,
      clientPhone: currentLead.phone,
      projectId: currentProject.id,
      projectName: currentProject.name,
      unitId: currentUnit.id,
      unitNumber: currentUnit.unitNumber,
      unitType: currentUnit.bhk,
      agreementValue,
      commissionRate,
      slabType,
      totalCommission,
      agencyShare: agencyGross,
      agentShare: agentGross,
      agentId: assignedAgent.id,
      agentName: assignedAgent.name,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-pure/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white border border-hairline rounded-3xl shadow-elevation-3 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-hairline bg-canvas-cream">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-canvas-lavender flex items-center justify-center text-aubergine">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-ink">
                Deal Closure & Commission Calculator
              </h2>
              <p className="text-xs text-ink-mute">
                Log closed deal, auto-calculate developer brokerage, and schedule agent payout.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-ink-mute hover:text-ink hover:bg-canvas-lavender transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
          {/* Step 1: Select Lead & Agent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-ink-mute block mb-1.5">
                Client / Prospect
              </label>
              <select
                value={selectedLeadId}
                onChange={(e) => setSelectedLeadId(e.target.value)}
                className="w-full h-10 rounded-xl border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
              >
                {leads.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} — {l.stage} ({formatCurrencyINR(l.budgetMax)})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-ink-mute block mb-1.5">
                Closing Sales Executive
              </label>
              <div className="h-10 rounded-xl border border-hairline bg-canvas-cream px-3 flex items-center gap-2 text-ink">
                <User className="h-4 w-4 text-aubergine" />
                <span className="font-semibold">{assignedAgent.name}</span>
                <span className="text-[10px] text-ink-mute font-mono ml-auto">
                  {assignedAgent.role.split(" ")[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Step 2: Select Project & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-ink-mute block mb-1.5">
                Development Project
              </label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full h-10 rounded-xl border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.location.split(",")[0]})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-ink-mute block mb-1.5">
                Allotted Inventory Unit
              </label>
              <select
                value={selectedUnitId}
                onChange={(e) => handleUnitChange(e.target.value)}
                className="w-full h-10 rounded-xl border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
              >
                {projectUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    Unit {u.unitNumber} ({u.bhk}, {u.towerName}) — {formatCurrencyINR(u.basePrice)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 3: Agreed Agreement Value */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-ink-mute">
                Agreed Agreement Value (INR)
              </label>
              <span className="font-mono text-xs font-bold text-aubergine">
                {formatCurrencyINR(agreementValue)}
              </span>
            </div>
            <Input
              type="number"
              value={agreementValue}
              onChange={(e) => setAgreementValue(Number(e.target.value))}
              step={100000}
              className="h-10 text-sm font-mono bg-white border-hairline rounded-xl text-ink font-bold focus:ring-2 focus:ring-aubergine"
            />
          </div>

          {/* Step 4: Commission Slab Selector */}
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-wider text-ink-mute block">
              Brokerage Slab Scheme
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setSlabType("FLAT_2_5")}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  slabType === "FLAT_2_5"
                    ? "bg-canvas-cream border-aubergine ring-1 ring-aubergine shadow-sm"
                    : "bg-white border-hairline hover:border-aubergine/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink text-xs">
                    Flat 2.5%
                  </span>
                  <Percent className="h-3.5 w-3.5 text-aubergine" />
                </div>
                <p className="text-[10px] text-ink-mute mt-1">
                  Developer standard base brokerage
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSlabType("TIERED_3_0")}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  slabType === "TIERED_3_0"
                    ? "bg-canvas-cream border-aubergine ring-1 ring-aubergine shadow-sm"
                    : "bg-white border-hairline hover:border-aubergine/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink text-xs">
                    Tiered 3.0%
                  </span>
                  <Coins className="h-3.5 w-3.5 text-aubergine" />
                </div>
                <p className="text-[10px] text-ink-mute mt-1">
                  High-ticket deal volume booster
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSlabType("SPLIT_SOURCING_CLOSING")}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  slabType === "SPLIT_SOURCING_CLOSING"
                    ? "bg-canvas-cream border-aubergine ring-1 ring-aubergine shadow-sm"
                    : "bg-white border-hairline hover:border-aubergine/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-ink text-xs">
                    Split 1.5% + 1.5%
                  </span>
                  <Receipt className="h-3.5 w-3.5 text-aubergine" />
                </div>
                <p className="text-[10px] text-ink-mute mt-1">
                  Sourcing & closing milestone split
                </p>
              </button>
            </div>
          </div>

          {/* Step 5: Agency vs Agent Share Ratio */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-ink-mute">
                Agent Payout Share Ratio
              </label>
              <span className="text-xs font-mono font-bold text-ink">
                {agentSharePct}% Agent / {100 - agentSharePct}% Agency
              </span>
            </div>
            <div className="flex gap-2">
              {[30, 40, 50].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setAgentSharePct(pct)}
                  className={`flex-1 py-2 rounded-full text-xs font-semibold border transition-all ${
                    agentSharePct === pct
                      ? "bg-aubergine text-white border-aubergine shadow-sm"
                      : "bg-canvas-cream text-ink-mute border-hairline hover:text-ink"
                  }`}
                >
                  {pct}% Agent
                </button>
              ))}
            </div>
          </div>

          {/* Live Financial Breakdown Statement Card */}
          <div className="p-4 rounded-2xl border border-hairline bg-canvas-cream space-y-2.5">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-hairline">
              <span className="font-semibold text-ink flex items-center gap-1.5">
                <FileCheck className="h-4 w-4 text-aubergine" />
                <span>Financial Summary & Tax Ledger</span>
              </span>
              <span className="text-[10px] text-ink-mute font-mono">
                RERA / Sec 194H Compliant
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-ink-mute">
                <span>Total Developer Brokerage ({commissionRate}%):</span>
                <span className="font-mono font-bold text-ink">
                  {formatCurrencyINR(totalCommission)}
                </span>
              </div>

              <div className="flex justify-between text-ink-mute text-[11px]">
                <span>+ 18% GST (Invoiced to Developer):</span>
                <span className="font-mono text-ink">
                  +{formatCurrencyINR(gstAmount)}
                </span>
              </div>

              <div className="flex justify-between text-ink-mute text-[11px]">
                <span>Total Developer Invoice:</span>
                <span className="font-mono text-ink">
                  {formatCurrencyINR(totalInvoicedToDeveloper)}
                </span>
              </div>

              <div className="pt-2 border-t border-hairline flex justify-between text-ink font-medium">
                <span>Agent Gross Share ({agentSharePct}%):</span>
                <span className="font-mono text-ink font-bold">
                  {formatCurrencyINR(agentGross)}
                </span>
              </div>

              <div className="flex justify-between text-semantic-error text-[11px]">
                <span>- Less TDS u/s 194H (5%):</span>
                <span className="font-mono font-semibold">
                  -{formatCurrencyINR(tdsDeduction)}
                </span>
              </div>

              <div className="pt-2 border-t border-hairline flex justify-between text-sm font-bold bg-white p-3 rounded-xl border border-hairline">
                <span className="text-aubergine">Net Agent Payable:</span>
                <span className="font-mono text-aubergine text-base font-extrabold">
                  {formatCurrencyINR(netAgentPayable)}
                </span>
              </div>
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-xs h-10 px-6 rounded-full"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-aubergine hover:bg-aubergine-press text-white font-semibold text-xs h-10 px-6 gap-1.5 shadow-sm rounded-full"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Confirm Deal & Generate Invoice</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
