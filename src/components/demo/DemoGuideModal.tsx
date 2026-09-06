"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  X,
  Compass,
  Play,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  MessageSquare,
  Building2,
  MapPin,
  Coins,
  BarChart3,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoGuideModalProps {
  open: boolean;
  onClose: () => void;
}

interface DemoStep {
  step: number;
  title: string;
  timing: string;
  route: string;
  icon: any;
  talkingPoints: string;
  actionGuidance: string;
  clientImpact: string;
}

const DEMO_STEPS: DemoStep[] = [
  {
    step: 1,
    title: "Command Center & The Lead Leakage Problem",
    timing: "0:00 – 1:30",
    route: "/dashboard",
    icon: BarChart3,
    talkingPoints:
      "Most real estate brokerages lose 70% of high-intent buyers because follow-ups are delayed and leads sit unassigned in Excel spreadsheets. PropertyBeast eliminates this by giving Directors real-time sales visibility within 5 seconds of opening the app.",
    actionGuidance:
      "Point out the live ₹64.8 Cr active pipeline deal value and the Overdue Follow-up alert banner. Click 'Review Now' to show immediate triage.",
    clientImpact:
      "The client immediately sees their daily operational chaos converted into crystal-clear executive visibility.",
  },
  {
    step: 2,
    title: "Zero Lead Leakage & Instant Round-Robin",
    timing: "1:30 – 3:30",
    route: "/pipeline",
    icon: Flame,
    talkingPoints:
      "Watch what happens the moment a buyer clicks on your Facebook, Instagram, or MagicBricks ad right now. There is zero manual export or delay.",
    actionGuidance:
      "Click '⚡ Simulate Meta Lead'. Watch the instant toast fire, observe the lead card appear at the top of the 'New' column, and point out automatic round-robin assignment to Rajesh Sharma.",
    clientImpact:
      "Client realizes human delay in lead assignment is completely eliminated—response time drops from 4 hours to 4 minutes.",
  },
  {
    step: 3,
    title: "Verified WhatsApp CRM & AI Pitch Copilot",
    timing: "3:30 – 5:30",
    route: "/ai-assistant",
    icon: Sparkles,
    talkingPoints:
      "Agents don't need to save client phone numbers to personal devices or draft clumsy messages. Our native AI Sales Copilot synthesizes personalized conversion pitches directly into verified WhatsApp threads.",
    actionGuidance:
      "Select Rajiv Sethi. Select Goal: 'Lock Booking Token' and Tone: 'Urgent & Scarcity'. Click 'Generate AI Pitch' and watch the streaming text. Click 'Send via WhatsApp (✓✓)'.",
    clientImpact:
      "High emotional WOW factor. Connects generative AI directly to tangible real estate sales velocity.",
  },
  {
    step: 4,
    title: "Property Inventory Matrix & WhatsApp Collateral",
    timing: "5:30 – 7:00",
    route: "/inventory",
    icon: Building2,
    talkingPoints:
      "Eliminate inventory double-booking chaos. Our live tower grid shows unit availability in real time with 1-click collateral dispatch.",
    actionGuidance:
      "Navigate to Godrej Woods. Click on Unit T1-1402 (3BHK+S). Review price sheet and CLP payment plan. Click 'Share Brochure via WhatsApp' to dispatch to a lead.",
    clientImpact:
      "Solves the broker's worst nightmare: an agent selling a unit that was already put on hold or booked by someone else.",
  },
  {
    step: 5,
    title: "Site Visit Tracking & GPS Check-In Radar",
    timing: "7:00 – 9:00",
    route: "/visits",
    icon: MapPin,
    talkingPoints:
      "The #1 complaint of agency owners is fake site visit reports by field agents. PropertyBeast enforces hardware-level GPS verification within a 200-meter site geofence.",
    actionGuidance:
      "Click 'Agent GPS Check-In Simulator' on an active site visit. Watch the animated radar locate coordinates ('38m from site — GPS Verified!'). Fill out the 30-second post-visit feedback form.",
    clientImpact:
      "Agency owners and developers are blown away. Complete elimination of fraudulent visit logging.",
  },
  {
    step: 6,
    title: "Closing the Deal, Payouts & Board Analytics",
    timing: "9:00 – 12:00",
    route: "/commissions",
    icon: Coins,
    talkingPoints:
      "The final frontier: automated commission accounting. When a deal closes, our engine calculates developer brokerage, agency splits, and Section 194H TDS with 1-click RTGS approval.",
    actionGuidance:
      "Click '+ Log Closed Deal'. Select Rajiv Sethi and Tiered 3.0% slab. Show the live ledger. Click 'Confirm Deal' and then click 'Statement' to show the branded corporate tax voucher.",
    clientImpact:
      "CFOs and founders see how PropertyBeast saves 3 days of accounting per month and prevents payment disputes.",
  },
];

export function DemoGuideModal({ open, onClose }: DemoGuideModalProps) {
  const router = useRouter();
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  if (!open) return null;

  const currentStep = DEMO_STEPS[activeStepIdx];
  const StepIcon = currentStep.icon;

  const handleJumpToScreen = () => {
    router.push(currentStep.route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-pure/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-white border border-hairline rounded-3xl shadow-elevation-3 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 text-ink-pure"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-hairline bg-canvas-cream/80">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-aubergine flex items-center justify-center text-white font-bold shadow-sm">
              <Compass className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-heading font-extrabold text-ink-pure">
                12-Minute Client Demo Presentation Script
              </h2>
              <p className="text-[11px] text-ink-muted">
                Step-by-step pitch storyboard designed to demo and close real estate clients.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-ink-muted hover:text-ink-pure hover:bg-canvas-cream transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step Progress Chips */}
        <div className="flex border-b border-hairline bg-canvas-cream/40 px-4 py-2.5 overflow-x-auto text-xs gap-2 shrink-0">
          {DEMO_STEPS.map((s, idx) => {
            const isCurrent = idx === activeStepIdx;
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStepIdx(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shadow-sm ${
                  isCurrent
                    ? "bg-aubergine text-white border border-aubergine font-bold"
                    : "text-ink-muted hover:text-ink-pure bg-white border border-hairline"
                }`}
              >
                <span>Step {s.step}</span>
                <span className="text-[10px] opacity-80">({s.timing})</span>
              </button>
            );
          })}
        </div>

        {/* Step Detail Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs flex-1 bg-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-aubergine-50 text-aubergine border border-aubergine-200">
                  Step {currentStep.step} of 6 • {currentStep.timing}
                </span>
                <span className="font-mono text-ink-muted text-[11px]">
                  Target: <strong className="text-ink-pure">{currentStep.route}</strong>
                </span>
              </div>
              <h3 className="text-base font-heading font-black text-ink-pure mt-1.5">
                {currentStep.title}
              </h3>
            </div>

            <Button
              type="button"
              size="sm"
              onClick={handleJumpToScreen}
              className="rounded-full bg-aubergine hover:bg-aubergine-dark text-white font-bold text-xs gap-1.5 shrink-0 shadow-sm px-4 h-9"
            >
              <span>🚀 Jump to Screen</span>
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>

          {/* Section 1: What to Say */}
          <div className="p-4 rounded-2xl border border-aubergine-200 bg-aubergine-50/60 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-aubergine block">
              🗣️ What to Say to the Client (The Pitch):
            </span>
            <p className="text-ink-base leading-relaxed italic text-xs">
              &ldquo;{currentStep.talkingPoints}&rdquo;
            </p>
          </div>

          {/* Section 2: What to Click */}
          <div className="p-4 rounded-2xl border border-hairline bg-canvas-cream/60 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-link block">
              🖱️ Action Guidance (What to Click):
            </span>
            <p className="text-ink-base leading-relaxed text-xs">
              {currentStep.actionGuidance}
            </p>
          </div>

          {/* Section 3: Client Impact */}
          <div className="p-4 rounded-2xl border border-semantic-success/30 bg-semantic-success-light/40 space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-semantic-success block">
              🎯 Why This Closes the Client:
            </span>
            <p className="text-semantic-success font-medium leading-relaxed text-xs">
              {currentStep.clientImpact}
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between p-4 border-t border-hairline bg-canvas-cream/80">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={activeStepIdx === 0}
            onClick={() => setActiveStepIdx((prev) => Math.max(0, prev - 1))}
            className="rounded-full border border-hairline bg-white hover:bg-canvas-cream text-ink-pure text-xs px-4 h-9"
          >
            Previous Step
          </Button>

          <span className="text-[11px] font-mono text-ink-muted">
            Script Progress: {activeStepIdx + 1} / 6
          </span>

          <Button
            type="button"
            size="sm"
            disabled={activeStepIdx === DEMO_STEPS.length - 1}
            onClick={() =>
              setActiveStepIdx((prev) => Math.min(DEMO_STEPS.length - 1, prev + 1))
            }
            className="rounded-full bg-aubergine hover:bg-aubergine-dark text-white font-bold text-xs gap-1.5 px-5 h-9 shadow-sm"
          >
            <span>Next Step</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
