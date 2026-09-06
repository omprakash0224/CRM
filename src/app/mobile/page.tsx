"use client";

import React, { useState } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import {
  Smartphone,
  Bell,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileDeviceFrame } from "@/components/mobile/MobileDeviceFrame";
import { MobileFieldApp } from "@/components/mobile/MobileFieldApp";
import { FooterAubergine } from "@/components/layout/FooterAubergine";
import { sound } from "@/lib/soundEffects";

export default function MobilePage() {
  const { simulateInboundLead, setNotification } = useCrmStore();

  const [scale, setScale] = useState<number>(1);
  const [activeNotification, setActiveNotification] = useState<{
    title: string;
    body: string;
    onTap?: () => void;
  } | null>(null);

  const handleSimulatePushNotification = () => {
    sound.playLeadChime();
    setActiveNotification({
      title: "🔔 New Lead Assigned",
      body: "Vikram Seth • Budget ₹3.2 Cr • Interested in Godrej Woods 3BHK",
      onTap: () => {
        setActiveNotification(null);
        setNotification("Opened lead Vikram Seth from push notification");
      },
    });

    // Auto dismiss after 6 seconds
    setTimeout(() => {
      setActiveNotification(null);
    }, 6000);
  };

  const handleSimulateInbound = () => {
    simulateInboundLead("META_ADS");
    sound.playLeadChime();
    handleSimulatePushNotification();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Executive Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-aubergine flex items-center justify-center text-white font-bold shadow-sm">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-heading font-black text-ink-pure tracking-tight">
                Mobile Field Agent Simulator
              </h1>
              <p className="text-xs text-ink-muted mt-1 max-w-2xl">
                Native smartphone frame demonstrating on-site agent workflows: 1-tap dialer, WhatsApp, GPS check-in, and voice memos.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Zoom scale pills */}
          <div className="flex items-center bg-white p-1 rounded-full border border-hairline text-xs shadow-sm">
            <button
              type="button"
              onClick={() => setScale(0.85)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                scale === 0.85 ? "bg-aubergine text-white shadow-sm" : "text-ink-muted hover:text-ink-pure"
              }`}
            >
              85%
            </button>
            <button
              type="button"
              onClick={() => setScale(0.95)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                scale === 0.95 ? "bg-aubergine text-white shadow-sm" : "text-ink-muted hover:text-ink-pure"
              }`}
            >
              95%
            </button>
            <button
              type="button"
              onClick={() => setScale(1)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                scale === 1 ? "bg-aubergine text-white shadow-sm" : "text-ink-muted hover:text-ink-pure"
              }`}
            >
              100%
            </button>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={handleSimulatePushNotification}
            className="rounded-full h-9 px-4 text-xs border border-aubergine-200 bg-aubergine-50 hover:bg-aubergine-100 text-aubergine font-bold gap-1.5 shadow-sm"
          >
            <Bell className="h-3.5 w-3.5" />
            <span>Simulate Push Alert</span>
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleSimulateInbound}
            className="rounded-full h-9 px-5 text-xs bg-aubergine hover:bg-aubergine-dark text-white font-bold gap-1.5 shadow-sm"
          >
            <Zap className="h-3.5 w-3.5" />
            <span>Simulate Meta Inbound</span>
          </Button>
        </div>
      </div>

      {/* Simulator Presentation Workspace */}
      <div className="p-8 sm:p-12 rounded-3xl border border-hairline bg-gradient-to-b from-canvas-cream/40 via-white to-canvas-cream/30 flex flex-col items-center justify-center min-h-[820px] shadow-elevation-1 relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-aubergine/5 rounded-full blur-3xl pointer-events-none" />

        {/* Center Smartphone Frame */}
        <MobileDeviceFrame
          scale={scale}
          activeNotification={activeNotification}
        >
          <MobileFieldApp />
        </MobileDeviceFrame>
      </div>

      {/* Signature Monotheistic Aubergine Footer */}
      <FooterAubergine />
    </div>
  );
}
