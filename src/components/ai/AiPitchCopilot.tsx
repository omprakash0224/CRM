"use client";

import React, { useState, useEffect, useRef } from "react";
import { Lead, PitchGoal, PitchTone } from "@/types";
import { useCrmStore } from "@/store/useCrmStore";
import {
  Sparkles,
  Send,
  Copy,
  Check,
  RotateCcw,
  MessageSquare,
  Flame,
  Crown,
  Smile,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrencyINR } from "@/lib/utils";

interface AiPitchCopilotProps {
  lead: Lead;
  compactMode?: boolean;
  onPitchSent?: () => void;
}

interface GoalConfig {
  id: PitchGoal;
  label: string;
  icon: string;
  description: string;
}

const GOALS: GoalConfig[] = [
  {
    id: "LOCK_TOKEN",
    label: "Lock Booking Token",
    icon: "🔒",
    description: "Create high urgency to secure allotment token today",
  },
  {
    id: "FESTIVE_DISCOUNT",
    label: "Festive Waiver Offer",
    icon: "🎁",
    description: "Floor rise waiver or stamp duty rebate incentive",
  },
  {
    id: "PUSH_SITE_VISIT",
    label: "Push for Site Visit",
    icon: "🚗",
    description: "Chauffeur pickup & VIP sample flat tour",
  },
  {
    id: "OVERCOME_BUDGET",
    label: "Overcome Price Resistance",
    icon: "🛡️",
    description: "Flexible 10:90 subvention payment schedule",
  },
  {
    id: "INVESTOR_ROI",
    label: "Investor Yield & ROI",
    icon: "📈",
    description: "Capital appreciation & 7.2% rental yields",
  },
  {
    id: "RE_ENGAGE",
    label: "Re-engage Cold Lead",
    icon: "🔄",
    description: "Gentle non-intrusive value follow-up",
  },
];

interface ToneConfig {
  id: PitchTone;
  label: string;
  badge: string;
}

const TONES: ToneConfig[] = [
  { id: "URGENT_SCARCITY", label: "Urgent & Scarcity", badge: "🔥 Scarcity" },
  { id: "PRESTIGE_LUXURY", label: "Ultra-Luxury & Elite", badge: "💎 Prestige" },
  { id: "CONSULTATIVE", label: "Consultative & Warm", badge: "🤝 Advisory" },
  { id: "INVESTOR_ROI", label: "Financial & ROI", badge: "📊 Numbers" },
];

export function AiPitchCopilot({
  lead,
  compactMode = false,
  onPitchSent,
}: AiPitchCopilotProps) {
  const { sendWhatsAppMessage, setNotification } = useCrmStore();

  const [selectedGoal, setSelectedGoal] = useState<PitchGoal>("LOCK_TOKEN");
  const [selectedTone, setSelectedTone] = useState<PitchTone>("URGENT_SCARCITY");
  const [customAngle, setCustomAngle] = useState("");
  const [generatedPitch, setGeneratedPitch] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate realistic tailored real estate sales pitches
  const createPitchContent = (goal: PitchGoal, tone: PitchTone, angle: string): string => {
    const firstName = lead.name.split(" ")[0];
    const project = lead.preferredProject || "our flagship luxury project";
    const bhk = lead.preferredBhk || "3BHK";
    const budgetStr = formatCurrencyINR(lead.budgetMax);

    let opening = "";
    let body = "";
    let callToAction = "";

    switch (goal) {
      case "LOCK_TOKEN":
        if (tone === "URGENT_SCARCITY") {
          opening = `Dear ${firstName}, hope you're having a productive day. Quick confidential update regarding ${project}.`;
          body = `The developer management has just informed us that only 2 inventory units are remaining on the coveted 14th–18th higher floors for the ${bhk} layout. We already have 3 simultaneous inquiries from NRI buyers queued up for the same view.`;
          callToAction = `I have temporarily held Unit 1402 under your name for 24 hours. If we transfer the refundable ₹5 Lakh token deposit today, we can guarantee the launch rate of ${budgetStr} before the announced ₹400/sq.ft price escalation on Monday. Can I send over the developer escrow bank details?`;
        } else if (tone === "PRESTIGE_LUXURY") {
          opening = `Warm greetings ${firstName}. It was truly a pleasure discussing your vision for a residence at ${project}.`;
          body = `The bespoke ${bhk} sanctuary you inspected represents the absolute pinnacle of architecture in this sector, featuring unhindered panoramic greens and double-height living spaces.`;
          callToAction = `To ensure you secure this specific private view before executive allotments close, our Managing Director has authorized a pre-token priority slot. May I prepare your formal expression of interest?`;
        } else {
          opening = `Hello ${firstName}, hope you are doing well!`;
          body = `Following our discussion on the ${bhk} at ${project}, we've received special clearance to lock your preferred inventory unit with zero price escalation risk.`;
          callToAction = `Would you like me to reserve the token allotment for you today so you don't miss out on this prime floor?`;
        }
        break;

      case "FESTIVE_DISCOUNT":
        opening = `Namaste ${firstName}! Exclusive festive launch greetings from PropertyBeast.`;
        body = `For our distinguished buyers evaluating ${project} this week, the developer has rolled out an exclusive Pre-Festive Privilege Package: 100% Waiver on Floor Rise Charges + Complimentary Club Membership (combined direct savings of ₹6,50,000 on the ${bhk} inventory).`;
        callToAction = `This special scheme is capped at the first 5 bookings this month. Would you like me to share the revised cost sheet showing your net savings?`;
        break;

      case "PUSH_SITE_VISIT":
        opening = `Hello ${firstName}, good morning!`;
        body = `The mock-up sample flat and exclusive experiential zone for ${project} are officially ready for preview. Pictures don't do justice to the 11-ft ceiling heights and 7-acre botanical landscape.`;
        callToAction = `I would love to host you and your family for a private tour this Saturday or Sunday. We can arrange a complimentary chauffeur pickup from your residence at your convenience. Which day works best for you?`;
        break;

      case "OVERCOME_BUDGET":
        opening = `Hi ${firstName}, thank you for your candid feedback regarding the ${project} pricing structure.`;
        body = `I took your budget requirements (${budgetStr}) to our sales director this morning. We've structured a customized 10:90 Subvention Scheme with zero pre-EMIs until possession, meaning your upfront commitment is only 10%, keeping your cash flow completely liquid.`;
        callToAction = `Would a 10-minute quick walkthrough over coffee or a brief call be helpful to review this revised cashflow plan?`;
        break;

      case "INVESTOR_ROI":
        opening = `Dear ${firstName}, analyzing the Q3 macro data for the micro-market around ${project}.`;
        body = `With the upcoming metro extension and corporate headquarters shifting to this corridor, Grade-A luxury units (${bhk}) are commanding a verified 7.2% gross rental yield and 14.8% annualized capital appreciation.`;
        callToAction = `I have compiled an institutional investor ROI sheet and 3-year exit strategy deck for this project. Shall I send the PDF over WhatsApp?`;
        break;

      case "RE_ENGAGE":
      default:
        opening = `Hi ${firstName}, hope all is well with you!`;
        body = `Just circling back on your luxury home search for ${bhk} in ${lead.preferredLocation}. Construction at ${project} has reached the 14th slab, ahead of schedule.`;
        callToAction = `No rush at all—just wanted to share a 30-second drone progress video of the tower. Let me know if you'd like me to send it across!`;
        break;
    }

    if (angle.trim()) {
      body += ` (Note: ${angle.trim()})`;
    }

    return `${opening}\n\n${body}\n\n${callToAction}`;
  };

  const handleGeneratePitch = () => {
    if (isStreaming) return;
    setIsStreaming(true);
    setHasGenerated(false);
    setGeneratedPitch("");

    const fullPitch = createPitchContent(selectedGoal, selectedTone, customAngle);
    const words = fullPitch.split(" ");
    let currentIndex = 0;

    if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);

    streamIntervalRef.current = setInterval(() => {
      if (currentIndex < words.length) {
        setGeneratedPitch((prev) => (prev ? `${prev} ${words[currentIndex]}` : words[currentIndex]));
        currentIndex++;
      } else {
        if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
        setIsStreaming(false);
        setHasGenerated(true);
      }
    }, 35);
  };

  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
    };
  }, []);

  const handleCopy = () => {
    if (!generatedPitch) return;
    navigator.clipboard.writeText(generatedPitch);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    setNotification("✓ Pitch copied to clipboard");
  };

  const handleSendViaWhatsApp = () => {
    if (!generatedPitch) return;
    sendWhatsAppMessage(lead.id, generatedPitch, false);
    setNotification(`✓ AI Pitch dispatched to ${lead.name} via WhatsApp!`);
    if (onPitchSent) onPitchSent();
  };

  return (
    <div className="space-y-4">
      {/* Header & Status */}
      <div className="flex items-center justify-between p-4 rounded-2xl border border-hairline bg-canvas-cream">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-canvas-lavender border border-hairline flex items-center justify-center text-aubergine">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <span>AI Sales Pitch Copilot</span>
              <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-canvas-lavender text-aubergine uppercase">
                v2.4
              </span>
            </h3>
            <p className="text-[11px] text-ink-mute">
              Personalized conversion pitch for{" "}
              <strong className="text-ink font-semibold">{lead.name}</strong> ({lead.preferredProject || "Luxury"})
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-aubergine font-medium bg-white px-3 py-1 rounded-full border border-hairline">
          <span className="h-2 w-2 rounded-full bg-semantic-success animate-pulse" />
          <span>LLM Engine Active</span>
        </div>
      </div>

      {/* Goal Selector */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-ink-mute block">
          1. Select Strategic Conversion Goal
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {GOALS.map((g) => {
            const isSelected = selectedGoal === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setSelectedGoal(g.id)}
                className={`p-3 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? "bg-canvas-cream border-aubergine ring-1 ring-aubergine shadow-sm"
                    : "bg-white border-hairline hover:border-aubergine/40 hover:bg-canvas-cream/40"
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                  <span>{g.icon}</span>
                  <span className={isSelected ? "text-aubergine font-bold" : "text-ink"}>
                    {g.label}
                  </span>
                </div>
                <p className="text-[10px] text-ink-mute mt-1 line-clamp-1 leading-tight">
                  {g.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tone Selector */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold uppercase tracking-wider text-ink-mute block">
          2. Select Persuasion Tone
        </label>
        <div className="flex flex-wrap gap-2">
          {TONES.map((t) => {
            const isSelected = selectedTone === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTone(t.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  isSelected
                    ? "bg-aubergine text-white border-aubergine shadow-sm"
                    : "bg-white text-ink-mute border-hairline hover:text-ink hover:border-aubergine/40"
                }`}
              >
                {t.badge}
              </button>
            );
          })}
        </div>
      </div>

      {/* Optional Custom Angle Input */}
      {!compactMode && (
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-ink-mute block">
            3. Optional Deal Context / Special Angle
          </label>
          <input
            type="text"
            value={customAngle}
            onChange={(e) => setCustomAngle(e.target.value)}
            placeholder="e.g., Client wants unit on 12th floor or above; mention club facing"
            className="w-full h-10 rounded-xl border border-hairline bg-canvas-cream px-3.5 text-xs text-ink placeholder:text-ink-mute focus:outline-none focus:ring-2 focus:ring-aubergine"
          />
        </div>
      )}

      {/* Generate Action Button */}
      <div>
        <Button
          type="button"
          onClick={handleGeneratePitch}
          disabled={isStreaming}
          className="w-full h-11 bg-aubergine hover:bg-aubergine-press text-white font-semibold text-xs gap-2 shadow-sm rounded-full"
        >
          {isStreaming ? (
            <>
              <Sparkles className="h-4 w-4 animate-spin text-white" />
              <span>Synthesizing Tailored Sales Pitch...</span>
            </>
          ) : hasGenerated ? (
            <>
              <RotateCcw className="h-4 w-4 text-white" />
              <span>Regenerate Alternate Pitch</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 text-white" />
              <span>⚡ Generate AI Pitch</span>
            </>
          )}
        </Button>
      </div>

      {/* Output Stream Box */}
      {(isStreaming || hasGenerated || generatedPitch) && (
        <div className="p-4 rounded-2xl border border-hairline bg-canvas-cream space-y-3 relative shadow-elevation-1 animate-in fade-in duration-300">
          <div className="flex items-center justify-between text-xs border-b border-hairline pb-2.5">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-aubergine" />
              <span className="font-mono text-[11px] font-bold text-ink">
                WhatsApp Formatted Output
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-[11px] text-ink-mute hover:text-ink transition-colors px-3 py-1 rounded-full bg-white border border-hairline"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-semantic-success" />
                    <span className="text-semantic-success font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Text Stream */}
          <div className="font-sans text-xs text-ink whitespace-pre-wrap leading-relaxed min-h-[100px] p-4 rounded-xl bg-white border border-hairline">
            {generatedPitch}
            {isStreaming && (
              <span className="inline-block w-1.5 h-3.5 bg-aubergine ml-1 animate-pulse align-middle" />
            )}
          </div>

          {/* Action Trigger */}
          {hasGenerated && (
            <div className="flex items-center justify-between pt-1 gap-2">
              <span className="text-[10px] text-ink-mute">
                Direct WhatsApp Cloud API Dispatch
              </span>
              <Button
                type="button"
                onClick={handleSendViaWhatsApp}
                className="h-9 px-5 text-xs bg-semantic-success hover:bg-semantic-success/90 text-white font-semibold gap-1.5 shadow-sm rounded-full"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send via WhatsApp (✓✓)</span>
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
