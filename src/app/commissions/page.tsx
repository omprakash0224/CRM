"use client";

import React, { useState } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import { Deal } from "@/types";
import {
  Coins,
  Plus,
  ShieldCheck,
  UserCheck,
  Building2,
  FileCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CommissionStatsRow } from "@/components/commissions/CommissionStatsRow";
import { PayoutStatusTable } from "@/components/commissions/PayoutStatusTable";
import { DealClosureModal } from "@/components/commissions/DealClosureModal";
import { CommissionStatementModal } from "@/components/commissions/CommissionStatementModal";
import { FooterAubergine } from "@/components/layout/FooterAubergine";

export default function CommissionsPage() {
  const { personas, currentPersonaId } = useCrmStore();

  const [isDealModalOpen, setIsDealModalOpen] = useState(false);
  const [statementDeal, setStatementDeal] = useState<Deal | null>(null);

  const currentPersona =
    personas.find((p) => p.id === currentPersonaId) || personas[0];
  const isDirector = currentPersona.permissions.canApprovePayouts;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Executive Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-canvas-lavender flex items-center justify-center text-aubergine font-bold shadow-sm">
              <Coins className="h-5 w-5 text-aubergine" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-ink tracking-tight">
                Broker Commission & Payouts Engine
              </h1>
              <p className="text-xs text-ink-mute mt-0.5">
                Automated slab accounting (Flat 2.5%, Tiered 3.0%), Section 194H TDS compliance, and RTGS approval pipeline.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isDirector ? (
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-canvas-cream border border-hairline text-aubergine">
              <ShieldCheck className="h-4 w-4 text-aubergine" />
              <span>Director Mode: Full Payout Approval Privilege</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-hairline text-ink-mute">
              <UserCheck className="h-4 w-4 text-link" />
              <span>Agent Mode: Personal Payout Tracking</span>
            </span>
          )}

          <Button
            type="button"
            onClick={() => setIsDealModalOpen(true)}
            className="h-10 px-6 text-xs bg-aubergine hover:bg-aubergine-press text-white font-semibold gap-2 shadow-sm rounded-full"
          >
            <Plus className="h-4 w-4" />
            <span>Log Closed Deal</span>
          </Button>
        </div>
      </div>

      {/* KPI Financial Metric Cards */}
      <CommissionStatsRow />

      {/* Main Deals & Payout Status Pipeline */}
      <PayoutStatusTable
        onOpenStatement={(deal) => setStatementDeal(deal)}
        onOpenDealModal={() => setIsDealModalOpen(true)}
      />

      {/* Deal Closure Dialog Wizard */}
      <DealClosureModal
        open={isDealModalOpen}
        onClose={() => setIsDealModalOpen(false)}
      />

      {/* Branded Commission Statement Modal */}
      <CommissionStatementModal
        deal={statementDeal}
        open={!!statementDeal}
        onClose={() => setStatementDeal(null)}
      />

      {/* Signature Site-wide Aubergine Footer */}
      <FooterAubergine />
    </div>
  );
}

