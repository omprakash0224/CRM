"use client";

import React, { useState } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import { Lead, SiteVisit, Deal } from "@/types";
import {
  Phone,
  MessageSquare,
  MapPin,
  Mic,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
  Wallet,
  Coins,
  ShieldCheck,
  Building2,
  ExternalLink,
} from "lucide-react";
import { formatCurrencyINR, formatRelativeTime, formatDate } from "@/lib/utils";
import { sound } from "@/lib/soundEffects";
import { VoiceNoteModal } from "@/components/mobile/VoiceNoteModal";

type MobileTab = "LEADS" | "VISITS" | "PAYOUTS";

export function MobileFieldApp() {
  const {
    leads,
    visits,
    deals,
    agents,
    addLeadActivity,
    completeGpsCheckIn,
    sendWhatsAppMessage,
    setNotification,
  } = useCrmStore();

  const [activeTab, setActiveTab] = useState<MobileTab>("LEADS");
  const [voiceNoteLead, setVoiceNoteLead] = useState<Lead | null>(null);

  // Field agent is Rajesh Sharma
  const currentAgent = agents[0] || {
    name: "Rajesh Sharma",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    role: "Senior Sales Executive",
  };

  // Agent's assigned leads
  const agentLeads = leads.filter(
    (l) => l.assignedAgentId === "agent-1" || l.stage === "NEGOTIATION"
  );

  // Agent's site visits
  const agentVisits = visits.filter(
    (v) => v.agentId === "agent-1" || v.status === "SCHEDULED"
  );

  // Agent's closed deals
  const agentDeals = deals.filter((d) => d.agentId === "agent-1");
  const myEarnings = agentDeals
    .filter((d) => d.status === "DISBURSED")
    .reduce((acc, d) => acc + d.netPayoutToAgent, 0);

  const handleQuickCall = (lead: Lead) => {
    sound.playLeadChime();
    addLeadActivity(lead.id, {
      type: "CALL",
      description: "1-Tap Mobile Outbound Call completed (3m 42s). Client engaged.",
      agentName: "Rajesh Sharma (Mobile)",
    });
    setNotification(`📞 Call logged with ${lead.name}`);
  };

  const handleQuickWhatsApp = (lead: Lead) => {
    sound.playWhatsAppPop();
    sendWhatsAppMessage(
      lead.id,
      `Hello ${lead.name.split(" ")[0]}! Rajesh here from PropertyBeast. Sharing the updated floor plan and brochure for ${lead.preferredProject || "Gurugram Luxury"}. Let me know if you have any questions!`,
      false
    );
    setNotification(`💬 WhatsApp dispatched to ${lead.name}`);
  };

  const handleQuickGps = (visit: SiteVisit) => {
    sound.playGpsPing();
    completeGpsCheckIn(visit.id, { lat: 28.4595, lng: 77.0266 }, 38);
    setNotification(`📍 GPS Verified Check-In logged at ${visit.projectName}!`);
  };

  return (
    <div className="flex-1 flex flex-col justify-between text-xs select-none bg-[#fdfbf7]">
      {/* Scrollable Body */}
      <div className="p-4 space-y-4 flex-1">
        {/* Agent Profile Header */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-hairline shadow-sm">
          <div className="flex items-center gap-2.5">
            <img
              src={currentAgent.avatar}
              alt={currentAgent.name}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-aubergine/30"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-ink-pure text-xs">
                  {currentAgent.name}
                </span>
                <span className="h-2 w-2 rounded-full bg-semantic-success" />
              </div>
              <span className="text-[10px] text-ink-muted block mt-0.5">
                Field Sales Rep • On-Site
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[9px] uppercase font-mono text-ink-muted block">
              My Wallet
            </span>
            <span className="font-heading font-black text-aubergine text-xs">
              {formatCurrencyINR(myEarnings || 586150)}
            </span>
          </div>
        </div>

        {/* 4 Quick Action Pills */}
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => handleQuickCall(agentLeads[0] || leads[0])}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors group shadow-sm"
          >
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <Phone className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-bold text-ink-pure mt-1.5">
              Quick Call
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickWhatsApp(agentLeads[0] || leads[0])}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors group shadow-sm"
          >
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <MessageSquare className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-bold text-ink-pure mt-1.5">
              WhatsApp
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              handleQuickGps(agentVisits[0] || visits[0])
            }
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors group shadow-sm"
          >
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <MapPin className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-bold text-ink-pure mt-1.5">
              GPS Check
            </span>
          </button>

          <button
            type="button"
            onClick={() => setVoiceNoteLead(agentLeads[0] || leads[0])}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-aubergine-50 border border-aubergine-200 hover:bg-aubergine-100 transition-colors group shadow-sm"
          >
            <div className="h-8 w-8 rounded-full bg-aubergine-100 flex items-center justify-center text-aubergine group-hover:scale-110 transition-transform">
              <Mic className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-bold text-ink-pure mt-1.5">
              Voice Note
            </span>
          </button>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex bg-canvas-cream p-1 rounded-full border border-hairline text-[11px] font-bold shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("LEADS")}
            className={`flex-1 py-1.5 rounded-full transition-all text-center ${
              activeTab === "LEADS"
                ? "bg-aubergine text-white font-bold shadow-sm"
                : "text-ink-muted hover:text-ink-pure"
            }`}
          >
            Leads ({agentLeads.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("VISITS")}
            className={`flex-1 py-1.5 rounded-full transition-all text-center ${
              activeTab === "VISITS"
                ? "bg-aubergine text-white font-bold shadow-sm"
                : "text-ink-muted hover:text-ink-pure"
            }`}
          >
            Site Visits ({agentVisits.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("PAYOUTS")}
            className={`flex-1 py-1.5 rounded-full transition-all text-center ${
              activeTab === "PAYOUTS"
                ? "bg-aubergine text-white font-bold shadow-sm"
                : "text-ink-muted hover:text-ink-pure"
            }`}
          >
            Earnings ({agentDeals.length})
          </button>
        </div>

        {/* Tab 1: Active Leads List */}
        {activeTab === "LEADS" && (
          <div className="space-y-2.5 animate-in fade-in duration-200">
            {agentLeads.slice(0, 5).map((lead) => (
              <div
                key={lead.id}
                className="p-3.5 rounded-2xl border border-hairline bg-white shadow-sm space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-ink-pure text-xs block">
                      {lead.name}
                    </span>
                    <span className="text-[10px] text-ink-muted">
                      {lead.preferredProject || "Godrej Woods"} • {lead.preferredBhk}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-aubergine px-2.5 py-0.5 rounded-full bg-aubergine-50 border border-aubergine-200">
                    {formatCurrencyINR(lead.budgetMax)}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-hairline text-[10px]">
                  <span className="text-ink-muted font-mono">
                    Score: <strong className="text-aubergine font-black">{lead.aiScore}/100</strong>
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleQuickCall(lead)}
                      className="p-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-200 transition-colors"
                      title="Direct Call"
                    >
                      <Phone className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickWhatsApp(lead)}
                      className="p-1.5 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-colors"
                      title="WhatsApp Message"
                    >
                      <MessageSquare className="h-3 w-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setVoiceNoteLead(lead)}
                      className="p-1.5 rounded-full bg-aubergine-50 text-aubergine hover:bg-aubergine hover:text-white border border-aubergine-200 transition-colors"
                      title="Voice Note"
                    >
                      <Mic className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Site Visits */}
        {activeTab === "VISITS" && (
          <div className="space-y-2.5 animate-in fade-in duration-200">
            {agentVisits.map((visit) => (
              <div
                key={visit.id}
                className="p-3.5 rounded-2xl border border-hairline bg-white shadow-sm space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-bold text-ink-pure text-xs block">
                      {visit.leadName}
                    </span>
                    <span className="text-[10px] text-ink-muted">
                      {visit.projectName}
                    </span>
                  </div>
                  {visit.gpsVerified ? (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-semantic-success bg-semantic-success-light px-2.5 py-0.5 rounded-full border border-semantic-success/20">
                      <CheckCircle2 className="h-2.5 w-2.5" />
                      <span>GPS Verified</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      <Clock className="h-2.5 w-2.5" />
                      <span>Scheduled</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-hairline text-[10px]">
                  <span className="text-ink-muted font-mono">
                    {formatDate(visit.scheduledAt)}
                  </span>
                  {!visit.gpsVerified && (
                    <button
                      type="button"
                      onClick={() => handleQuickGps(visit)}
                      className="px-3 py-1 rounded-full bg-aubergine hover:bg-aubergine-dark text-white font-bold text-[10px] flex items-center gap-1 shadow-sm"
                    >
                      <MapPin className="h-2.5 w-2.5" />
                      <span>Check In</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Payouts */}
        {activeTab === "PAYOUTS" && (
          <div className="space-y-2.5 animate-in fade-in duration-200">
            {agentDeals.map((deal) => (
              <div
                key={deal.id}
                className="p-3.5 rounded-2xl border border-hairline bg-white shadow-sm space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-bold text-ink-pure text-xs block">
                      {deal.projectName} — {deal.unitNumber}
                    </span>
                    <span className="text-[10px] text-ink-muted">
                      Client: {deal.clientName}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-black text-aubergine">
                    {formatCurrencyINR(deal.netPayoutToAgent)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] pt-1 border-t border-hairline">
                  <span className="text-ink-muted font-mono">
                    Agreement: {formatCurrencyINR(deal.agreementValue)}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      deal.status === "DISBURSED"
                        ? "text-semantic-success bg-semantic-success-light border border-semantic-success/20"
                        : "text-link bg-blue-50 border border-blue-200"
                    }`}
                  >
                    {deal.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Voice Note Modal Trigger */}
      <VoiceNoteModal
        open={!!voiceNoteLead}
        onClose={() => setVoiceNoteLead(null)}
        leadId={voiceNoteLead?.id}
        leadName={voiceNoteLead?.name}
      />
    </div>
  );
}
