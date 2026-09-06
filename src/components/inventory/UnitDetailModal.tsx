"use client";

import React, { useState } from "react";
import { Unit, Project, UnitStatus } from "@/types";
import { useCrmStore } from "@/store/useCrmStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Share2,
} from "lucide-react";
import { formatCurrencyINR, getUnitStatusColor } from "@/lib/utils";

interface UnitDetailModalProps {
  unit: Unit | null;
  project: Project;
  open: boolean;
  onClose: () => void;
  onShareWhatsApp: (unit: Unit) => void;
}

export function UnitDetailModal({
  unit,
  project,
  open,
  onClose,
  onShareWhatsApp,
}: UnitDetailModalProps) {
  const { leads, agents, updateUnitStatus, setNotification } = useCrmStore();

  const [activeTab, setActiveTab] = useState<"SPECS" | "FLOOR_PLAN" | "PAYMENT">(
    "SPECS"
  );
  const [selectedLeadId, setSelectedLeadId] = useState(leads[0]?.id || "");
  const [selectedAgentId, setSelectedAgentId] = useState(agents[0]?.id || "");

  if (!open || !unit) return null;

  const statusCol = getUnitStatusColor(unit.status);

  const handleStatusTransition = (newStatus: UnitStatus) => {
    updateUnitStatus(unit.id, newStatus, {
      bookedByAgentId: selectedAgentId,
      bookedByLeadId: selectedLeadId,
      holdExpiresAt:
        newStatus === "HOLD"
          ? new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString()
          : undefined,
    });

    const leadName = leads.find((l) => l.id === selectedLeadId)?.name;
    setNotification(
      `✓ Unit ${unit.unitNumber} status updated to ${newStatus}${
        leadName ? ` for ${leadName}` : ""
      }`
    );
    onClose();
  };

  // Payment Breakdown Calculations
  const basePrice = unit.basePrice;
  const gst = basePrice * 0.05; // 5% GST
  const stampDuty = basePrice * 0.06; // 6% Stamp Duty
  const totalCost = basePrice + gst + stampDuty;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DialogTitle className="text-xl font-bold text-ink">
                Unit {unit.unitNumber}
              </DialogTitle>
              <Badge variant="aubergine" className="text-xs">
                {unit.bhk}
              </Badge>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusCol.border} ${statusCol.bg} ${statusCol.text}`}
              >
                {unit.status}
              </span>
            </div>
          </div>
          <DialogDescription className="text-xs text-ink-mute">
            {project.name} • {unit.towerName} (Floor {unit.floor})
          </DialogDescription>
        </DialogHeader>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-hairline space-x-6 text-xs font-bold text-ink-mute">
          <button
            onClick={() => setActiveTab("SPECS")}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === "SPECS"
                ? "border-aubergine text-aubergine font-extrabold"
                : "border-transparent hover:text-ink"
            }`}
          >
            Unit Specifications
          </button>
          <button
            onClick={() => setActiveTab("FLOOR_PLAN")}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === "FLOOR_PLAN"
                ? "border-aubergine text-aubergine font-extrabold"
                : "border-transparent hover:text-ink"
            }`}
          >
            Floor Plan Blueprint
          </button>
          <button
            onClick={() => setActiveTab("PAYMENT")}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === "PAYMENT"
                ? "border-aubergine text-aubergine font-extrabold"
                : "border-transparent hover:text-ink"
            }`}
          >
            Payment Schedules & Taxes
          </button>
        </div>

        {/* Tab 1: Specifications */}
        {activeTab === "SPECS" && (
          <div className="space-y-4 py-2 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-xl border border-hairline bg-[#fdfbf7]">
              <div>
                <span className="text-[10px] text-ink-mute block">Super Area</span>
                <span className="font-bold text-ink text-sm font-mono">
                  {unit.superBuiltUpArea.toLocaleString()} sq.ft
                </span>
              </div>
              <div>
                <span className="text-[10px] text-ink-mute block">Carpet Area</span>
                <span className="font-bold text-ink text-sm font-mono">
                  {unit.carpetArea.toLocaleString()} sq.ft (
                  {((unit.carpetArea / unit.superBuiltUpArea) * 100).toFixed(0)}% eff.)
                </span>
              </div>
              <div>
                <span className="text-[10px] text-ink-mute block">Base Price</span>
                <span className="font-bold text-aubergine text-sm font-mono">
                  {formatCurrencyINR(unit.basePrice)}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-ink-mute block">Balcony Facing</span>
                <span className="font-semibold text-ink">
                  {unit.facing}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-ink-mute block">Per Sq.Ft Rate</span>
                <span className="font-mono text-ink">
                  ₹{Math.round(unit.basePrice / unit.superBuiltUpArea).toLocaleString()} / sq.ft
                </span>
              </div>
              <div>
                <span className="text-[10px] text-ink-mute block">Tower Location</span>
                <span className="font-semibold text-ink">
                  {unit.towerName}
                </span>
              </div>
            </div>

            {/* Status Change Selector */}
            <div className="p-4 rounded-xl border border-hairline bg-white space-y-3 shadow-sm">
              <h4 className="font-bold text-ink text-xs">
                Inventory Status Management
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-ink-mute font-bold block mb-1">
                    Assign to Prospect (for Hold / Booking)
                  </label>
                  <select
                    value={selectedLeadId}
                    onChange={(e) => setSelectedLeadId(e.target.value)}
                    className="w-full h-9 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
                  >
                    {leads.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.name} ({formatCurrencyINR(l.budgetMax)})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-ink-mute font-bold block mb-1">
                    Booking Sales Agent
                  </label>
                  <select
                    value={selectedAgentId}
                    onChange={(e) => setSelectedAgentId(e.target.value)}
                    className="w-full h-9 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
                  >
                    {agents.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.role.split(" ")[0]})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                {unit.status !== "AVAILABLE" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusTransition("AVAILABLE")}
                    className="text-xs border-[#a7f3d0] text-[#007a5a] hover:bg-[#ecfdf5]"
                  >
                    Release to Available
                  </Button>
                )}

                {unit.status !== "HOLD" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusTransition("HOLD")}
                    className="text-xs border-[#fde68a] text-[#d97706] hover:bg-[#fef3c7]"
                  >
                    Place on 48h Hold
                  </Button>
                )}

                {unit.status !== "BOOKED" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusTransition("BOOKED")}
                    className="text-xs border-[#bfdbfe] text-[#1264a3] hover:bg-[#eff6ff]"
                  >
                    Mark as Booked
                  </Button>
                )}

                {unit.status !== "SOLD" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusTransition("SOLD")}
                    className="text-xs border-[#fecaca] text-[#cc4117] hover:bg-[#fef2f2]"
                  >
                    Mark as Sold
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive Blueprint */}
        {activeTab === "FLOOR_PLAN" && (
          <div className="space-y-4 py-2 text-xs">
            <div className="h-64 rounded-xl border border-hairline bg-[#fdfbf7] p-4 flex flex-col items-center justify-center relative overflow-hidden">
              {/* SVG Blueprint Illustration */}
              <svg
                viewBox="0 0 400 240"
                className="w-full h-full max-h-56 stroke-aubergine fill-[#eedaff]/30"
              >
                {/* Outer Wall */}
                <rect
                  x="20"
                  y="20"
                  width="360"
                  height="200"
                  strokeWidth="3"
                  fill="none"
                />
                {/* Living Room */}
                <rect x="20" y="20" width="220" height="130" strokeWidth="1.5" />
                <text
                  x="70"
                  y="85"
                  fill="#4a154b"
                  fontSize="12"
                  fontWeight="bold"
                  stroke="none"
                >
                  LIVING / DINING (22' x 16')
                </text>
                {/* Balcony */}
                <rect
                  x="240"
                  y="20"
                  width="140"
                  height="70"
                  strokeWidth="1.5"
                  strokeDasharray="4"
                />
                <text
                  x="260"
                  y="60"
                  fill="#1264a3"
                  fontSize="11"
                  stroke="none"
                  fontWeight="bold"
                >
                  DECK BALCONY (Facing {unit.facing.split(" ")[0]})
                </text>
                {/* Master Bedroom */}
                <rect
                  x="240"
                  y="90"
                  width="140"
                  height="130"
                  strokeWidth="1.5"
                />
                <text
                  x="255"
                  y="155"
                  fill="#d97706"
                  fontSize="11"
                  stroke="none"
                  fontWeight="bold"
                >
                  MASTER BED (16' x 14')
                </text>
                {/* Kitchen */}
                <rect x="20" y="150" width="110" height="70" strokeWidth="1.5" />
                <text
                  x="40"
                  y="190"
                  fill="#696969"
                  fontSize="10"
                  stroke="none"
                >
                  KITCHEN (11' x 8')
                </text>
                {/* Bedroom 2 */}
                <rect x="130" y="150" width="110" height="70" strokeWidth="1.5" />
                <text
                  x="145"
                  y="190"
                  fill="#7b2cbf"
                  fontSize="10"
                  stroke="none"
                >
                  GUEST BED (12' x 11')
                </text>
              </svg>

              <div className="absolute bottom-2 right-3 text-[10px] text-ink-mute font-mono">
                Architectural Drawing: {unit.bhk} • {unit.superBuiltUpArea} sq.ft
              </div>
            </div>

            <p className="text-[11px] text-ink-mute italic">
              * Dimensions indicated are approximate and subject to final RERA architectural sanction.
            </p>
          </div>
        )}

        {/* Tab 3: Payment Schedules & Taxes */}
        {activeTab === "PAYMENT" && (
          <div className="space-y-4 py-2 text-xs">
            <div className="p-4 rounded-xl border border-hairline bg-[#fdfbf7] space-y-2">
              <h5 className="font-bold text-ink text-xs">
                All-Inclusive Cost Sheet Breakdown
              </h5>
              <div className="space-y-1.5 pt-1 divide-y divide-hairline font-mono text-[11px]">
                <div className="flex justify-between py-1 text-ink">
                  <span>Base Unit Price</span>
                  <span>{formatCurrencyINR(basePrice)}</span>
                </div>
                <div className="flex justify-between py-1 text-ink-mute">
                  <span>GST (5% under construction)</span>
                  <span>{formatCurrencyINR(gst)}</span>
                </div>
                <div className="flex justify-between py-1 text-ink-mute">
                  <span>Stamp Duty & Registration (6%)</span>
                  <span>{formatCurrencyINR(stampDuty)}</span>
                </div>
                <div className="flex justify-between py-1 font-bold text-aubergine text-xs">
                  <span>Total Estimated Agreement Value</span>
                  <span>{formatCurrencyINR(totalCost)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-ink text-xs">
                Available Payment Plans:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="p-3.5 rounded-xl border border-hairline bg-white space-y-1 shadow-sm">
                  <p className="font-bold text-[#007a5a]">10:90 Subvention Plan</p>
                  <p className="text-ink-mute">
                    Pay 10% on booking token, zero EMIs until possession in Dec 2026.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-hairline bg-white space-y-1 shadow-sm">
                  <p className="font-bold text-[#d97706]">Construction Linked (CLP)</p>
                  <p className="text-ink-mute">
                    Standard 10 milestone schedule tied to floor slab casting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="pt-3 flex sm:justify-between items-center">
          <Button
            type="button"
            variant="default"
            onClick={() => onShareWhatsApp(unit)}
            className="text-xs px-6 gap-1.5 shadow-elevation-1"
          >
            <Share2 className="h-3.5 w-3.5 mr-1" />
            Share via WhatsApp
          </Button>

          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="text-xs px-6"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
