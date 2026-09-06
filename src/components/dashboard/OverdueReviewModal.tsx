"use client";

import React from "react";
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
import { useCrmStore } from "@/store/useCrmStore";
import {
  AlertTriangle,
  Phone,
  MessageSquare,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { formatCurrencyINR } from "@/lib/utils";

interface OverdueReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OverdueReviewModal({
  open,
  onOpenChange,
}: OverdueReviewModalProps) {
  const { leads, agents, updateLead, addLeadActivity, setNotification } =
    useCrmStore();

  const overdueLeads = leads.filter((l) => l.isOverdue);

  const handleCall = (leadId: string, leadName: string) => {
    addLeadActivity(leadId, {
      type: "CALL",
      description: "Priority follow-up call initiated by agent. Client engaged.",
      agentName: "Rajesh Sharma",
    });
    updateLead(leadId, { isOverdue: false });
    setNotification(`📞 Call logged for ${leadName}. SLA cleared.`);
  };

  const handleWhatsApp = (leadId: string, leadName: string) => {
    addLeadActivity(leadId, {
      type: "WHATSAPP",
      description: "Dispatched urgent reminder message with digital project brochure.",
      agentName: "Rajesh Sharma",
    });
    updateLead(leadId, { isOverdue: false });
    setNotification(`💬 WhatsApp follow-up dispatched to ${leadName}.`);
  };

  const handleClearAll = () => {
    overdueLeads.forEach((lead) => {
      updateLead(lead.id, { isOverdue: false });
    });
    setNotification("✓ All overdue follow-ups marked as addressed.");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg text-[#cc4117]">
            <AlertTriangle className="h-5 w-5 text-[#cc4117]" />
            <span>High-Priority Overdue Follow-ups ({overdueLeads.length})</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-ink-mute">
            Leads exceeding company response SLA (&gt;2 hours past scheduled time). Unanswered leads lose 71% closing probability.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {overdueLeads.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <CheckCircle2 className="h-10 w-10 text-[#007a5a] mx-auto" />
              <p className="text-sm font-bold text-ink">All Follow-ups Up to Date</p>
              <p className="text-xs text-ink-mute">
                Zero overdue inquiries! The sales team is responding within the 15-minute SLA.
              </p>
            </div>
          ) : (
            overdueLeads.map((lead) => {
              const agent = agents.find((a) => a.id === lead.assignedAgentId);
              return (
                <div
                  key={lead.id}
                  className="p-4 rounded-xl border border-[#fecaca] bg-[#fef2f2]/60 hover:bg-[#fef2f2] transition-all space-y-3 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-ink">
                          {lead.name}
                        </span>
                        <Badge
                          variant="destructive"
                          className="text-[9px] py-0 px-2 font-bold"
                        >
                          Overdue &gt; 2h
                        </Badge>
                        <span className="text-xs text-ink-mute">
                          {lead.preferredProject} • {lead.preferredBhk}
                        </span>
                      </div>
                      <p className="text-xs text-ink-mute mt-0.5">
                        Assigned:{" "}
                        <span className="text-ink font-semibold">
                          {agent?.name || "Rajesh Sharma"}
                        </span>{" "}
                        • Phone:{" "}
                        <span className="text-ink font-mono">
                          {lead.phone}
                        </span>
                      </p>
                    </div>

                    <div className="text-right sm:shrink-0">
                      <span className="text-xs font-mono font-bold text-aubergine block">
                        {formatCurrencyINR((lead.budgetMin + lead.budgetMax) / 2)}
                      </span>
                      <span className="text-[10px] text-[#d97706] font-bold flex items-center justify-end gap-1">
                        <Sparkles className="h-2.5 w-2.5" />
                        AI Score: {lead.aiScore}/100
                      </span>
                    </div>
                  </div>

                  {lead.notes && (
                    <p className="text-xs bg-white p-2.5 rounded-lg text-ink border border-hairline italic">
                      "{lead.notes}"
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-end space-x-2 pt-1 border-t border-[#fecaca]">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCall(lead.id, lead.name)}
                      className="h-8 text-xs gap-1 border-[#1264a3] text-[#1264a3] hover:bg-[#eef5fc]"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#1264a3]" />
                      Call Client Now
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleWhatsApp(lead.id, lead.name)}
                      className="h-8 text-xs gap-1 border border-[#a7f3d0] text-[#007a5a] bg-[#ecfdf5] hover:bg-[#d1fae5]"
                    >
                      <MessageSquare className="h-3.5 w-3.5 text-[#007a5a]" />
                      Send WhatsApp
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <DialogFooter className="pt-2">
          {overdueLeads.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="text-xs h-9 mr-auto text-ink-mute hover:text-ink"
            >
              Mark All Handled
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            className="text-xs h-9 px-6"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
