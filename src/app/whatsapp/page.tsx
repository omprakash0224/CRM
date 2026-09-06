"use client";

import React, { useState } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import { Lead } from "@/types";
import {
  MessageSquare,
  Radio,
  ShieldCheck,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WhatsAppChatInterface } from "@/components/whatsapp/WhatsAppChatInterface";
import { BroadcastCampaignModal } from "@/components/whatsapp/BroadcastCampaignModal";
import { CampaignAnalyticsCard } from "@/components/whatsapp/CampaignAnalyticsCard";
import { FooterAubergine } from "@/components/layout/FooterAubergine";

export default function WhatsAppPage() {
  const { campaigns, addLeadActivity, setNotification } = useCrmStore();

  const [activeTab, setActiveTab] = useState<"CHAT" | "BROADCAST">("CHAT");
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);

  const handleCallClient = (lead: Lead) => {
    addLeadActivity(lead.id, {
      type: "CALL",
      description: `Direct outbound call from WhatsApp CRM screen with ${lead.name}.`,
      agentName: "Rajesh Sharma",
    });
    setNotification(`📞 Direct call initiated to ${lead.name} (${lead.phone})`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-extrabold text-ink tracking-tight">
              Official WhatsApp CRM & Broadcast Engine
            </h1>
            <Badge variant="aubergine" className="text-xs font-bold">
              Meta Cloud API • Verified
            </Badge>
          </div>
          <p className="text-xs text-ink-mute mt-1">
            Replaces scattered personal WhatsApp chats with official verified business messaging and automated templates.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          {/* View Toggle */}
          <div className="flex items-center bg-canvas-cream p-1 rounded-full border border-hairline text-xs">
            <button
              onClick={() => setActiveTab("CHAT")}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-bold transition-all ${
                activeTab === "CHAT"
                  ? "bg-aubergine text-white shadow-sm"
                  : "text-ink-mute hover:text-ink"
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>In-App Chat</span>
            </button>
            <button
              onClick={() => setActiveTab("BROADCAST")}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-bold transition-all ${
                activeTab === "BROADCAST"
                  ? "bg-aubergine text-white shadow-sm"
                  : "text-ink-mute hover:text-ink"
              }`}
            >
              <Radio className="h-3.5 w-3.5" />
              <span>Broadcasts</span>
            </button>
          </div>

          <Button
            size="sm"
            variant="default"
            onClick={() => setBroadcastModalOpen(true)}
            className="text-xs gap-1.5 shadow-elevation-1"
          >
            <Plus className="h-3.5 w-3.5" />
            + New Broadcast Campaign
          </Button>
        </div>
      </div>

      {/* WhatsApp Cloud KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-hairline bg-white shadow-sm space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-ink-mute font-bold">
            Messages Sent Today
          </span>
          <div className="text-3xl font-extrabold text-ink">
            184
          </div>
          <p className="text-[10px] text-[#007a5a] font-mono font-semibold">
            100% SLA compliant
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-hairline bg-white shadow-sm space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#007a5a] font-bold flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            Meta Delivery Rate
          </span>
          <div className="text-3xl font-extrabold text-aubergine">
            99.4%
          </div>
          <p className="text-[10px] text-[#007a5a] font-mono font-semibold">
            Zero undelivered bounces
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-hairline bg-white shadow-sm space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#1264a3] font-bold">
            Avg Client Response Time
          </span>
          <div className="text-3xl font-extrabold text-ink font-mono">
            4.2m
          </div>
          <p className="text-[10px] text-[#1264a3] font-mono">
            Compared to 3.8 hours on email
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-hairline bg-white shadow-sm space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-ink-mute font-bold">
            Broadcast Campaigns
          </span>
          <div className="text-3xl font-extrabold text-aubergine">
            {campaigns.length}
          </div>
          <p className="text-[10px] text-ink-mute font-mono">
            89% Avg Open Rate
          </p>
        </div>
      </div>

      {/* Main View: In-App Chat vs Broadcast Campaigns */}
      {activeTab === "CHAT" ? (
        <WhatsAppChatInterface onCallClient={handleCallClient} />
      ) : (
        <CampaignAnalyticsCard />
      )}

      {/* Signature Aubergine Band */}
      <FooterAubergine />

      {/* Broadcast Campaign Modal */}
      <BroadcastCampaignModal
        open={broadcastModalOpen}
        onClose={() => setBroadcastModalOpen(false)}
      />
    </div>
  );
}
