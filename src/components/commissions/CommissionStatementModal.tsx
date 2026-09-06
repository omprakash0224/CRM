"use client";

import React, { useState } from "react";
import { Deal } from "@/types";
import { useCrmStore } from "@/store/useCrmStore";
import {
  X,
  Printer,
  Share2,
  CheckCircle2,
  Building,
  ShieldCheck,
  FileText,
  Clock,
  Download,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyINR, formatDate } from "@/lib/utils";

interface CommissionStatementModalProps {
  deal: Deal | null;
  open: boolean;
  onClose: () => void;
}

export function CommissionStatementModal({
  deal,
  open,
  onClose,
}: CommissionStatementModalProps) {
  const { setNotification } = useCrmStore();
  const [shared, setShared] = useState(false);

  if (!open || !deal) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    setShared(true);
    setNotification(
      `✓ Official Commission Statement for Deal #${deal.id} dispatched to ${deal.agentName} via WhatsApp!`
    );
    setTimeout(() => setShared(false), 3000);
  };

  const isDisbursed = deal.status === "DISBURSED";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white border border-hairline rounded-2xl shadow-elevation-2 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 text-ink"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-hairline bg-canvas-cream print:hidden">
          <div className="flex items-center gap-2 text-xs font-semibold text-ink">
            <FileText className="h-4 w-4 text-aubergine" />
            <span>Tax Commission Invoice Voucher</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handlePrint}
              className="h-8 text-xs border-hairline bg-white hover:bg-canvas-cream text-ink gap-1.5 rounded-full"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / PDF</span>
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleShareWhatsApp}
              className="h-8 text-xs bg-semantic-success hover:bg-semantic-success/90 text-white font-semibold gap-1.5 rounded-full shadow-sm"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>{shared ? "Shared!" : "WhatsApp Slip"}</span>
            </Button>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-ink-mute hover:text-ink hover:bg-canvas-lavender transition-colors ml-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Branded Statement Sheet Content */}
        <div className="p-8 overflow-y-auto space-y-6 text-xs bg-[#fdfbf7] font-sans print:p-0 print:bg-white print:text-black">
          {/* Company Branding & Tax Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-hairline pb-5">
            <div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-aubergine flex items-center justify-center font-bold text-white text-sm">
                  PB
                </div>
                <h1 className="text-base font-bold tracking-tight text-ink uppercase">
                  PropertyBeast Capital Advisors Pvt. Ltd.
                </h1>
              </div>
              <p className="text-[11px] text-ink-mute mt-1">
                One Horizon Center, Level 14, Golf Course Road, Gurugram, Haryana - 122002
              </p>
              <div className="flex flex-wrap gap-3 text-[10px] text-ink-mute font-mono mt-1">
                <span>RERA: HRERA-PKL-GGM-1204-2024</span>
                <span>•</span>
                <span>GSTIN: 06AAECP9821L1ZM</span>
                <span>•</span>
                <span>PAN: AAECP9821L</span>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-1">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-canvas-cream text-aubergine border border-hairline block sm:inline-block">
                VOUCHER #{deal.id.toUpperCase()}
              </span>
              <div className="text-[11px] text-ink-mute">
                Date: <strong className="text-ink">{formatDate(deal.createdAt)}</strong>
              </div>
              <div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isDisbursed
                      ? "bg-canvas-cream text-semantic-success border border-hairline"
                      : deal.status === "APPROVED"
                      ? "bg-canvas-lavender text-aubergine border border-hairline"
                      : "bg-canvas-cream text-amber-700 border border-hairline"
                  }`}
                >
                  {deal.status === "DISBURSED"
                    ? "✓ DISBURSED VIA RTGS"
                    : deal.status === "APPROVED"
                    ? "APPROVED FOR WIRE"
                    : "PENDING BUILDER CLEARANCE"}
                </span>
              </div>
            </div>
          </div>

          {/* Beneficiary Agent & Settlement Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl border border-hairline bg-white shadow-elevation-1">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-ink-mute block">
                Beneficiary Channel Partner / Agent
              </span>
              <p className="text-sm font-bold text-ink">{deal.agentName}</p>
              <p className="text-xs text-ink-mute">Senior Real Estate Advisor</p>
              <p className="text-[11px] text-ink-mute font-mono">PAN: BKZPS8812K</p>
            </div>

            <div className="space-y-1 text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-ink-mute block">
                Banking Remittance Details
              </span>
              <p className="text-xs font-semibold text-ink">HDFC Bank Ltd.</p>
              <p className="text-[11px] text-ink-mute font-mono">A/C: •••• •••• 4092 (IFSC: HDFC0000240)</p>
              <p className="text-[11px] font-mono text-aubergine font-bold">
                UTR: {deal.utrReference || "Pending Banking Submission"}
              </p>
            </div>
          </div>

          {/* Deal & Accounting Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
              Deal Transaction Breakdown
            </h3>
            <div className="rounded-2xl border border-hairline overflow-hidden bg-white shadow-elevation-1">
              <table className="w-full text-left text-xs">
                <thead className="bg-canvas-cream text-ink-mute font-semibold border-b border-hairline">
                  <tr>
                    <th className="p-3">Description</th>
                    <th className="p-3 text-right">Agreement Value</th>
                    <th className="p-3 text-right">Brokerage Rate</th>
                    <th className="p-3 text-right">Total Brokerage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline bg-white">
                  <tr>
                    <td className="p-3">
                      <span className="font-bold text-ink block">
                        {deal.projectName} — Unit {deal.unitNumber} ({deal.unitType})
                      </span>
                      <span className="text-[11px] text-ink-mute">
                        Client Allottee: {deal.clientName} ({deal.clientPhone})
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-ink">
                      {formatCurrencyINR(deal.agreementValue)}
                    </td>
                    <td className="p-3 text-right font-mono text-ink-mute">
                      {deal.commissionRate}%
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-aubergine">
                      {formatCurrencyINR(deal.totalCommission)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Itemized Payout & Tax Ledger */}
          <div className="space-y-2 pt-1">
            <div className="rounded-2xl border border-hairline p-5 bg-white space-y-2.5 shadow-elevation-1">
              <div className="flex justify-between text-ink-mute">
                <span>Total Developer Brokerage Invoiced:</span>
                <span className="font-mono font-bold text-ink">
                  {formatCurrencyINR(deal.totalCommission)}
                </span>
              </div>

              <div className="flex justify-between text-ink-mute text-[11px]">
                <span>Agency Retained Margin (Brokerage Infrastructure):</span>
                <span className="font-mono text-ink">
                  -{formatCurrencyINR(deal.agencyShare)}
                </span>
              </div>

              <div className="flex justify-between text-ink pt-1.5 border-t border-hairline font-semibold">
                <span>Agent Gross Performance Brokerage:</span>
                <span className="font-mono text-ink">
                  {formatCurrencyINR(deal.agentShare)}
                </span>
              </div>

              <div className="flex justify-between text-semantic-error text-[11px]">
                <span>Less: TDS Deducted under Section 194H (5%):</span>
                <span className="font-mono font-semibold">
                  -{formatCurrencyINR(deal.tdsAmount)}
                </span>
              </div>

              <div className="pt-2 border-t border-hairline flex justify-between text-base font-bold bg-canvas-cream p-3.5 rounded-xl border border-hairline text-aubergine">
                <span>Total Net Remittance:</span>
                <span className="font-mono font-extrabold">
                  {formatCurrencyINR(deal.netPayoutToAgent)}
                </span>
              </div>
            </div>
          </div>

          {/* Official Stamp & Authorization Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-hairline">
            <div className="flex items-center gap-3">
              <div className="h-16 w-16 rounded-full border-2 border-dashed border-aubergine flex flex-col items-center justify-center text-center p-1 text-[8px] font-bold text-aubergine leading-tight">
                <span>PROPERTYBEAST</span>
                <span>★ SEAL ★</span>
                <span>AUTHORIZED</span>
              </div>
              <div className="text-[10px] text-ink-mute">
                <span className="font-bold text-ink block">Digitally Verified & Locked</span>
                <span>Compliant with Indian Tax Code (Sec 194H)</span>
              </div>
            </div>

            <div className="text-center sm:text-right space-y-1">
              <div className="font-serif italic text-sm text-ink font-semibold">Vivek Singhania</div>
              <div className="h-0.5 w-36 bg-hairline sm:ml-auto" />
              <span className="text-[10px] text-ink-mute block uppercase tracking-wider font-semibold">
                Authorized Signatory • Finance & Accounts
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

