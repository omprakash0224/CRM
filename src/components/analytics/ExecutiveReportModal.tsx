"use client";

import React, { useState } from "react";
import {
  X,
  Printer,
  Share2,
  CheckCircle2,
  Building,
  TrendingUp,
  Award,
  Sparkles,
  DollarSign,
  Briefcase,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEED_BOARD_SUMMARY, SEED_LEAD_SOURCE_STATS } from "@/data/analyticsData";
import { formatCurrencyINR } from "@/lib/utils";
import { useCrmStore } from "@/store/useCrmStore";

interface ExecutiveReportModalProps {
  open: boolean;
  onClose: () => void;
}

export function ExecutiveReportModal({ open, onClose }: ExecutiveReportModalProps) {
  const { setNotification } = useCrmStore();
  const [shared, setShared] = useState(false);

  if (!open) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    setShared(true);
    setNotification(
      "✓ Executive Board Brief dispatched to Managing Director & Investors via confidential link."
    );
    setTimeout(() => setShared(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-pure/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl bg-white border border-hairline rounded-3xl shadow-elevation-3 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 text-ink-pure"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-hairline bg-canvas-cream/80 print:hidden">
          <div className="flex items-center gap-2 text-xs font-bold text-ink-pure">
            <FileText className="h-4 w-4 text-aubergine" />
            <span>Executive Board of Directors Briefing</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handlePrint}
              className="h-8 px-4 rounded-full text-xs border border-hairline bg-white hover:bg-canvas-cream text-ink-pure font-bold gap-1.5 shadow-sm"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / PDF</span>
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleShare}
              className="h-8 px-4 rounded-full text-xs bg-aubergine hover:bg-aubergine-dark text-white font-bold gap-1.5 shadow-sm"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>{shared ? "Dispatched!" : "Share Link"}</span>
            </Button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-ink-muted hover:text-ink-pure hover:bg-canvas-cream transition-colors ml-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="p-8 overflow-y-auto space-y-6 text-xs bg-[#fdfbf7] font-sans print:p-0 print:bg-white print:text-black">
          {/* Board Header */}
          <div className="border-b border-hairline pb-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-aubergine flex items-center justify-center font-heading font-black text-white text-sm shadow-sm">
                  PB
                </div>
                <div>
                  <h1 className="text-lg font-heading font-black tracking-tight text-ink-pure uppercase">
                    PropertyBeast Capital Advisors
                  </h1>
                  <p className="text-[11px] text-ink-muted">
                    PropTech CRM & Enterprise Advisory Solutions
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-canvas-cream text-ink-pure border border-hairline">
                  STRICTLY CONFIDENTIAL
                </span>
                <p className="text-[10px] text-ink-muted mt-1 font-mono">
                  Period: {SEED_BOARD_SUMMARY.fiscalQuarter}
                </p>
              </div>
            </div>

            <div className="pt-2">
              <h2 className="text-xs font-heading font-bold text-aubergine uppercase tracking-wider">
                Executive Sales Performance & Channel ROI Brief
              </h2>
              <p className="text-[11px] text-ink-muted font-mono mt-0.5">
                Presented to the Board of Directors • September 2026
              </p>
            </div>
          </div>

          {/* CEO Commentary Card */}
          <div className="p-5 rounded-2xl border border-aubergine-200 bg-aubergine-50/60 space-y-2 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-aubergine flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Managing Director & CEO Commentary</span>
            </span>
            <p className="text-xs text-ink-base leading-relaxed italic">
              &ldquo;{SEED_BOARD_SUMMARY.ceoCommentary}&rdquo;
            </p>
            <div className="text-right text-[11px] text-ink-muted pt-1">
              — <strong className="text-ink-pure">Vivek Singhania</strong>, Managing Director & Founder
            </div>
          </div>

          {/* Core Financial KPI Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl border border-hairline bg-white space-y-1 shadow-sm">
              <span className="text-[10px] text-ink-muted uppercase font-mono block">
                Active Pipeline Value
              </span>
              <span className="text-lg font-heading font-black text-ink-pure block">
                {formatCurrencyINR(SEED_BOARD_SUMMARY.grossPipelineValue)}
              </span>
              <span className="text-[10px] text-semantic-success font-semibold">30 Active Leads</span>
            </div>

            <div className="p-4 rounded-2xl border border-hairline bg-white space-y-1 shadow-sm">
              <span className="text-[10px] text-ink-muted uppercase font-mono block">
                Closed Deal Revenue
              </span>
              <span className="text-lg font-heading font-black text-aubergine block">
                {formatCurrencyINR(SEED_BOARD_SUMMARY.grossRevenueBooked)}
              </span>
              <span className="text-[10px] text-ink-muted">46 Units Sold</span>
            </div>

            <div className="p-4 rounded-2xl border border-hairline bg-white space-y-1 shadow-sm">
              <span className="text-[10px] text-ink-muted uppercase font-mono block">
                Blended ROAS Multiple
              </span>
              <span className="text-lg font-heading font-black text-aubergine-600 block">
                {SEED_BOARD_SUMMARY.overallBlendedRoas}
              </span>
              <span className="text-[10px] text-ink-muted">
                On ₹12.3L Ad Spend
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-hairline bg-white space-y-1 shadow-sm">
              <span className="text-[10px] text-ink-muted uppercase font-mono block">
                Average Unit Price
              </span>
              <span className="text-lg font-heading font-black text-link block">
                {formatCurrencyINR(SEED_BOARD_SUMMARY.averageTicketSize)}
              </span>
              <span className="text-[10px] text-ink-muted">Tier-1 Luxury Segment</span>
            </div>
          </div>

          {/* Marketing Channel ROAS Breakdown Table */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-heading font-extrabold uppercase tracking-wider text-ink-muted">
              Channel Contribution & Customer Acquisition Cost (CAC)
            </h3>
            <div className="rounded-2xl border border-hairline overflow-hidden bg-white shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-canvas-cream text-ink-muted font-bold text-[11px] uppercase tracking-wider border-b border-hairline">
                  <tr>
                    <th className="p-3">Marketing Channel</th>
                    <th className="p-3 text-right">Ad Spend</th>
                    <th className="p-3 text-right">Inquiries</th>
                    <th className="p-3 text-right">CPL</th>
                    <th className="p-3 text-right">Closed Deals</th>
                    <th className="p-3 text-right">Closed Revenue</th>
                    <th className="p-3 text-right">ROAS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline bg-white font-mono">
                  {SEED_LEAD_SOURCE_STATS.map((ch) => (
                    <tr key={ch.sourceKey} className="hover:bg-canvas-cream/50 transition-colors">
                      <td className="p-3 font-sans font-bold text-ink-pure">
                        {ch.source}
                      </td>
                      <td className="p-3 text-right text-link font-medium">
                        {formatCurrencyINR(ch.spend)}
                      </td>
                      <td className="p-3 text-right text-ink-base">{ch.leads}</td>
                      <td className="p-3 text-right text-ink-muted">
                        {ch.cpl ? `₹${ch.cpl}` : "—"}
                      </td>
                      <td className="p-3 text-right text-ink-pure font-bold">
                        {ch.closedDeals}
                      </td>
                      <td className="p-3 text-right text-aubergine font-bold">
                        {formatCurrencyINR(ch.revenue)}
                      </td>
                      <td className="p-3 text-right text-semantic-success font-bold">
                        {ch.roas === 999 ? "∞" : `${ch.roas}x`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategic Highlights Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl border border-hairline bg-white space-y-1 shadow-sm">
              <span className="text-[10px] text-ink-muted uppercase font-mono block">
                Top Performing Development Asset
              </span>
              <span className="font-bold text-ink-pure text-xs block">
                {SEED_BOARD_SUMMARY.topPerformingProject}
              </span>
              <p className="text-[11px] text-ink-muted">
                Generated ₹125 Cr pipeline volume with zero price resistance
              </p>
            </div>

            <div className="p-4 rounded-2xl border border-hairline bg-white space-y-1 shadow-sm">
              <span className="text-[10px] text-ink-muted uppercase font-mono block">
                Top Producer of the Quarter
              </span>
              <span className="font-bold text-aubergine text-xs block">
                {SEED_BOARD_SUMMARY.topPerformingAgent}
              </span>
              <p className="text-[11px] text-ink-muted">
                100% GPS-verified site visit check-in audit compliance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
