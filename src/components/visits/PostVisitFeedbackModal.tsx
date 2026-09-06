"use client";

import React, { useState } from "react";
import { SiteVisit, Unit } from "@/types";
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
  Star,
  FileCheck,
  Building2,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
} from "lucide-react";

interface PostVisitFeedbackModalProps {
  visit: SiteVisit | null;
  open: boolean;
  onClose: () => void;
}

const OBJECTION_PILLS = [
  "Asking for 2% festive waiver on floor rise",
  "Entrance non-compliant with North-East Vaastu",
  "Possession date 6 months later than preferred",
  "Clubhouse & parking charges higher than expected",
  "Prefers top floor penthouse with terrace",
  "Need bank loan eligibility confirmation",
];

export function PostVisitFeedbackModal({
  visit,
  open,
  onClose,
}: PostVisitFeedbackModalProps) {
  const {
    units,
    submitVisitFeedback,
    updateLeadStage,
    addLeadActivity,
    setNotification,
  } = useCrmStore();

  const [rating, setRating] = useState<number>(5);
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [budgetStatus, setBudgetStatus] = useState<
    "WITHIN_BUDGET" | "STRETCHED" | "OUT_OF_BUDGET"
  >("WITHIN_BUDGET");
  const [selectedObjections, setSelectedObjections] = useState<string[]>([
    OBJECTION_PILLS[0],
  ]);
  const [nextAction, setNextAction] = useState(
    "Book final price negotiation meeting with Sales Director"
  );
  const [advanceToNegotiation, setAdvanceToNegotiation] = useState(true);

  if (!open || !visit) return null;

  const projectUnits = units.filter((u) => u.projectId === visit.projectId);

  const toggleObjection = (pill: string) => {
    setSelectedObjections((prev) =>
      prev.includes(pill) ? prev.filter((p) => p !== pill) : [...prev, pill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const unitObj = projectUnits.find((u) => u.id === selectedUnitId);

    submitVisitFeedback(visit.id, {
      rating,
      unitLiked: unitObj
        ? `Unit ${unitObj.unitNumber} (${unitObj.bhk})`
        : "Master 3BHK Mockup",
      budgetStatus,
      objections: selectedObjections,
      nextAction,
    });

    addLeadActivity(visit.leadId, {
      type: "SITE_VISIT",
      description: `Post-Visit Feedback: Client rated visit ${rating}/5 stars. Budget: ${budgetStatus.replace(/_/g, " ")}. Next Step: ${nextAction}.`,
      agentName: visit.agentName,
    });

    if (advanceToNegotiation) {
      updateLeadStage(visit.leadId, "NEGOTIATION");
    }

    setNotification(
      `✓ Post-visit feedback recorded for ${visit.leadName}.${
        advanceToNegotiation ? " Lead advanced to Negotiation stage!" : ""
      }`
    );

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto bg-white border border-hairline rounded-2xl p-6 shadow-elevation-2">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-full bg-canvas-cream text-aubergine">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold text-ink">
                Post-Visit Structured Feedback
              </DialogTitle>
              <DialogDescription className="text-xs text-ink-mute">
                Log client impressions immediately after the site visit tour
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2 text-xs">
          {/* Header Summary */}
          <div className="p-3.5 rounded-xl border border-hairline bg-canvas-cream flex items-center justify-between">
            <div>
              <span className="font-bold text-ink text-xs block">
                {visit.leadName}
              </span>
              <span className="text-[11px] text-ink-mute">
                {visit.projectName} • Host: {visit.agentName}
              </span>
            </div>
            <Badge variant="secondary" className="text-[10px] bg-canvas-lavender text-aubergine font-semibold">
              GPS Verified Visit
            </Badge>
          </div>

          {/* 1. Star Rating */}
          <div className="space-y-1.5">
            <label className="font-semibold text-ink block">
              Client Overall Interest Rating *
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= rating
                        ? "text-amber-500 fill-amber-500"
                        : "text-hairline"
                    }`}
                  />
                </button>
              ))}
              <span className="text-xs font-bold text-amber-600 ml-2">
                {rating === 5
                  ? "5/5 — Extremely Hot Buyer"
                  : rating === 4
                  ? "4/5 — High Intent"
                  : `${rating}/5 Stars`}
              </span>
            </div>
          </div>

          {/* 2. Unit Liked */}
          <div className="space-y-1.5">
            <label className="font-semibold text-ink block">
              Specific Unit / Format Liked *
            </label>
            <select
              value={selectedUnitId}
              onChange={(e) => setSelectedUnitId(e.target.value)}
              className="w-full h-10 rounded-xl border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
            >
              <option value="">Sample Flat / Experience Centre</option>
              {projectUnits.map((u) => (
                <option key={u.id} value={u.id}>
                  Unit {u.unitNumber} ({u.bhk} • {u.superBuiltUpArea} sq.ft • {u.facing})
                </option>
              ))}
            </select>
          </div>

          {/* 3. Budget Confirmation */}
          <div className="space-y-1.5">
            <label className="font-semibold text-ink block">
              Budget Alignment
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "WITHIN_BUDGET", label: "🟢 Within Budget" },
                { id: "STRETCHED", label: "🟡 Stretched" },
                { id: "OUT_OF_BUDGET", label: "🔴 Out of Budget" },
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setBudgetStatus(b.id as any)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    budgetStatus === b.id
                      ? "bg-aubergine text-white border-aubergine shadow-sm"
                      : "border-hairline bg-white text-ink-mute hover:text-ink hover:border-aubergine/40"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Client Objections Multi-select */}
          <div className="space-y-1.5">
            <label className="font-semibold text-ink block">
              Key Objections / Concerns Raised:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {OBJECTION_PILLS.map((pill) => {
                const isSelected = selectedObjections.includes(pill);
                return (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => toggleObjection(pill)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-medium border transition-colors ${
                      isSelected
                        ? "bg-aubergine text-white border-aubergine"
                        : "bg-canvas-cream border-hairline text-ink-mute hover:text-ink"
                    }`}
                  >
                    {isSelected ? "✓ " : "+ "} {pill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5. Next Action */}
          <div className="space-y-1.5">
            <label className="font-semibold text-ink block">
              Agreed Next Action Step *
            </label>
            <select
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
              className="w-full h-10 rounded-xl border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
            >
              <option value="Book final price negotiation meeting with Sales Director">
                Book price negotiation meeting with Sales Director
              </option>
              <option value="Send revised cost sheet with festive payment plan">
                Send revised cost sheet with festive payment plan
              </option>
              <option value="Schedule 2nd sample flat viewing with family">
                Schedule 2nd sample flat viewing with family
              </option>
              <option value="Arrange Zoom call with bank home loan advisor">
                Arrange Zoom call with bank home loan advisor
              </option>
              <option value="Client cold / drop inquiry">
                Client cold / drop inquiry
              </option>
            </select>
          </div>

          {/* 6. Advance Stage Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-hairline bg-canvas-cream">
            <div className="space-y-0.5">
              <span className="font-bold text-ink text-xs block">
                Advance Pipeline Stage to "Negotiation"
              </span>
              <span className="text-[10px] text-ink-mute">
                Moves lead automatically to Stage 5 in the Kanban pipeline
              </span>
            </div>
            <input
              type="checkbox"
              checked={advanceToNegotiation}
              onChange={(e) => setAdvanceToNegotiation(e.target.checked)}
              className="h-4 w-4 rounded border-hairline text-aubergine focus:ring-aubergine"
            />
          </div>

          <DialogFooter className="pt-2 flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-xs h-9"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-aubergine hover:bg-aubergine-press text-white font-semibold text-xs h-9 gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="h-4 w-4" />
              Save Visit Feedback
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
