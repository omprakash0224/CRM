"use client";

import React, { useState } from "react";
import { Project, Unit } from "@/types";
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
import {
  MessageSquare,
  FileText,
  Send,
} from "lucide-react";
import { formatCurrencyINR } from "@/lib/utils";

interface BrochureShareModalProps {
  project: Project;
  unit?: Unit | null;
  open: boolean;
  onClose: () => void;
}

export function BrochureShareModal({
  project,
  unit,
  open,
  onClose,
}: BrochureShareModalProps) {
  const { leads, addLeadActivity, setNotification } = useCrmStore();

  const [selectedLeadId, setSelectedLeadId] = useState(leads[0]?.id || "");
  const selectedLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  const defaultMessage = unit
    ? `Namaste ${selectedLead?.name || "Client"},\n\nSharing exclusive unit specifications for *${project.name} - Unit ${unit.unitNumber}* (${unit.bhk}, ${unit.superBuiltUpArea} sq.ft) with facing towards ${unit.facing}.\n\nPrice: *${formatCurrencyINR(unit.basePrice)}*\n\nPlease find the attached official digital brochure and layout blueprint. Let me know if you would like to schedule a private sample flat tour.\n\nWarm regards,\nPropertyBeast Luxury Advisory`
    : `Namaste ${selectedLead?.name || "Client"},\n\nThank you for connecting regarding *${project.name}* at ${project.location}.\n\nPlease find attached our master project brochure with comprehensive tower layouts, club amenities, and current festive payment plans.\n\nWarm regards,\nPropertyBeast Luxury Advisory`;

  const [customText, setCustomText] = useState(defaultMessage);

  if (!open) return null;

  const handleSend = () => {
    if (!selectedLead) return;

    addLeadActivity(selectedLead.id, {
      type: "BROCHURE_SENT",
      description: unit
        ? `Dispatched WhatsApp Collateral for Unit ${unit.unitNumber} (${unit.bhk}) at ${project.name}`
        : `Dispatched Master Project Brochure via WhatsApp for ${project.name}`,
      agentName: "Rajesh Sharma",
    });

    setNotification(
      `✓ WhatsApp brochure & cost sheet dispatched to ${selectedLead.name}!`
    );
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg text-ink">
            <div className="h-8 w-8 rounded-full bg-canvas-lavender text-aubergine flex items-center justify-center">
              <MessageSquare className="h-4 w-4" />
            </div>
            <span>1-Click WhatsApp Collateral Dispatch</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-ink-mute">
            Directly send high-res brochures, cost sheets, and floor plans to buyer WhatsApp accounts with zero manual contact saving.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs">
          {/* Recipient Lead Dropdown */}
          <div className="space-y-1.5">
            <label className="font-bold text-ink">
              Select Client / Lead *
            </label>
            <select
              value={selectedLeadId}
              onChange={(e) => setSelectedLeadId(e.target.value)}
              className="w-full h-10 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
            >
              {leads.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name} ({l.phone} • Budget: {formatCurrencyINR(l.budgetMax)})
                </option>
              ))}
            </select>
          </div>

          {/* WhatsApp Preview Screen */}
          <div className="p-4 rounded-xl border border-hairline bg-[#fdfbf7] space-y-3">
            <div className="flex items-center space-x-2 pb-2 border-b border-hairline text-xs text-[#007a5a] font-bold">
              <span className="h-2 w-2 rounded-full bg-[#007a5a] animate-pulse" />
              <span>Verified WhatsApp Business Account</span>
              <span className="text-[10px] text-ink-mute ml-auto">
                Meta Cloud API
              </span>
            </div>

            {/* Attached PDF Card Preview */}
            <div className="p-3.5 rounded-xl border border-hairline bg-white flex items-center space-x-3 shadow-sm">
              <div className="p-2 rounded-lg bg-[#fef2f2] text-[#cc4117] shrink-0">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-ink text-xs truncate">
                  {unit
                    ? `${project.name}_Unit_${unit.unitNumber}_Brochure.pdf`
                    : `${project.name}_Master_Brochure.pdf`}
                </p>
                <p className="text-[10px] text-ink-mute">
                  4.8 MB • High-Res Floor Plans & Cost Sheet
                </p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-canvas-cream text-ink font-mono font-bold">
                PDF
              </span>
            </div>

            {/* Message Body Input */}
            <div className="space-y-1">
              <label className="text-[10px] text-ink-mute block font-bold">
                Message Body:
              </label>
              <textarea
                rows={5}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="w-full rounded border border-hairline bg-white p-3 text-xs text-ink placeholder:text-ink-mute focus:outline-none focus:ring-2 focus:ring-aubergine font-sans leading-relaxed"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="pt-2 flex sm:justify-between items-center">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="text-xs px-6"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="default"
            onClick={handleSend}
            className="text-xs px-7 shadow-elevation-1 gap-1.5"
          >
            <Send className="h-3.5 w-3.5 mr-1" />
            Dispatch via WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
