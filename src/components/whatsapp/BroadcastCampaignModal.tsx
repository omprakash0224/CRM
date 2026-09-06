"use client";

import React, { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Radio,
  Send,
  Users,
  CheckCircle2,
  Sparkles,
  FileText,
  Clock,
  ShieldCheck,
} from "lucide-react";

interface BroadcastCampaignModalProps {
  open: boolean;
  onClose: () => void;
}

export function BroadcastCampaignModal({
  open,
  onClose,
}: BroadcastCampaignModalProps) {
  const { leads, launchBroadcastCampaign } = useCrmStore();

  const [title, setTitle] = useState(
    "Diwali Festive Special: Zero Stamp Duty & Free Parking"
  );
  const [segment, setSegment] = useState("LUXURY_3CR");
  const [templateTitle, setTemplateTitle] = useState(
    "Festive Offer / Zero Stamp Duty Absorption"
  );
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedCampaign, setCompletedCampaign] = useState<any>(null);

  if (!open) return null;

  const getSegmentCount = () => {
    switch (segment) {
      case "ALL":
        return leads.length;
      case "LUXURY_3CR":
        return leads.filter((l) => l.budgetMax >= 30000000).length || 12;
      case "SITE_VISITS":
        return (
          leads.filter(
            (l) =>
              l.stage === "SITE_VISIT_SCHEDULED" ||
              l.stage === "NEGOTIATION" ||
              l.stage === "BOOKING"
          ).length || 8
        );
      case "NRI_INVESTOR":
        return (
          leads.filter(
            (l) => l.tags.includes("NRI") || l.tags.includes("Investor")
          ).length || 7
        );
      default:
        return leads.length;
    }
  };

  const recipientCount = getSegmentCount();

  const handleLaunch = () => {
    setIsSending(true);
    setProgress(10);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          const campaign = launchBroadcastCampaign({
            title,
            targetAudience:
              segment === "LUXURY_3CR"
                ? "Luxury Segment (Budget > ₹3 Cr)"
                : segment === "SITE_VISITS"
                ? "Site Visits & Negotiation Leads"
                : segment === "NRI_INVESTOR"
                ? "NRI & High Intent Investors"
                : "All Active Leads",
            recipientCount,
            templateTitle,
            status: "COMPLETED",
          });
          setCompletedCampaign(campaign);
          setIsSending(false);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const handleResetAndClose = () => {
    setIsSending(false);
    setProgress(0);
    setCompletedCampaign(null);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleResetAndClose}>
      <DialogContent className="max-w-lg bg-white border border-hairline rounded-2xl p-6 shadow-elevation-2">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-full bg-canvas-lavender text-aubergine">
              <Radio className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold text-ink">
                Launch WhatsApp Broadcast Campaign
              </DialogTitle>
              <DialogDescription className="text-xs text-ink-mute">
                Bulk dispatch official pre-approved Meta messages to segmented buyer lists
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {completedCampaign ? (
          <div className="py-6 space-y-5 text-center animate-in zoom-in-95 duration-200">
            <div className="h-14 w-14 rounded-full bg-canvas-cream text-aubergine flex items-center justify-center mx-auto ring-4 ring-canvas-lavender">
              <CheckCircle2 className="h-7 w-7 text-semantic-success" />
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-lg text-ink">
                Broadcast Campaign Dispatched!
              </h3>
              <p className="text-xs text-ink-mute">
                "{completedCampaign.title}" has been successfully delivered via Meta Cloud API.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl border border-hairline bg-canvas-cream font-mono text-xs">
              <div>
                <span className="text-[10px] text-ink-mute block uppercase font-sans">Delivered</span>
                <span className="font-bold text-ink text-sm">
                  {completedCampaign.deliveredCount}/{completedCampaign.recipientCount} (100%)
                </span>
              </div>
              <div>
                <span className="text-[10px] text-ink-mute block uppercase font-sans">Est. Opened</span>
                <span className="font-bold text-semantic-success text-sm">
                  {completedCampaign.readCount} (89%)
                </span>
              </div>
              <div>
                <span className="text-[10px] text-ink-mute block uppercase font-sans">Replies</span>
                <span className="font-bold text-aubergine text-sm">
                  {completedCampaign.repliesCount} (28%)
                </span>
              </div>
            </div>

            <Button
              onClick={handleResetAndClose}
              className="bg-aubergine hover:bg-aubergine-press text-white font-semibold text-xs h-9 px-8 shadow-sm"
            >
              Done & Return to CRM
            </Button>
          </div>
        ) : isSending ? (
          <div className="py-8 space-y-4 text-center">
            <Radio className="h-10 w-10 text-aubergine animate-spin mx-auto" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-ink">
                Dispatching Messages via Meta Cloud API...
              </p>
              <p className="text-xs text-ink-mute">
                Sending {progress}% ({Math.round((progress / 100) * recipientCount)} of {recipientCount} delivered)
              </p>
            </div>

            <div className="h-2 w-full rounded-full bg-hairline overflow-hidden">
              <div
                className="h-full bg-aubergine transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLaunch();
            }}
            className="space-y-4 py-2 text-xs"
          >
            {/* 1. Campaign Name */}
            <div className="space-y-1.5">
              <label className="font-semibold text-ink block">
                Campaign Name *
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="text-xs h-10 bg-white border-hairline rounded-xl focus:ring-2 focus:ring-aubergine"
              />
            </div>

            {/* 2. Target Audience Segment */}
            <div className="space-y-1.5">
              <label className="font-semibold text-ink block">
                Target Buyer Segment *
              </label>
              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                className="w-full h-10 rounded-xl border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
              >
                <option value="LUXURY_3CR">
                  Luxury Segment (Budget &gt; ₹3.0 Cr) — {recipientCount} Prospects
                </option>
                <option value="SITE_VISITS">
                  Site Visit Completed & In Negotiation — 8 Prospects
                </option>
                <option value="NRI_INVESTOR">
                  NRI & Investor Tagged Buyers — 7 Prospects
                </option>
                <option value="ALL">
                  All Active Inquiries in CRM — {leads.length} Prospects
                </option>
              </select>
            </div>

            {/* 3. Template Selection */}
            <div className="space-y-1.5">
              <label className="font-semibold text-ink block">
                Meta Pre-Approved Template
              </label>
              <select
                value={templateTitle}
                onChange={(e) => setTemplateTitle(e.target.value)}
                className="w-full h-10 rounded-xl border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
              >
                <option value="Festive Offer / Zero Stamp Duty Absorption">
                  Festive Special: Zero Stamp Duty & Free Modular Kitchen
                </option>
                <option value="Weekend Exclusive Sample Flat Viewing">
                  Weekend Exclusive: Private Sample Flat Preview Invite
                </option>
                <option value="Tower Birch 14th Floor Fresh Inventory Release">
                  Fresh Inventory Release: High-Floor Golf Course View
                </option>
              </select>
            </div>

            {/* 4. Message Preview Box */}
            <div className="p-4 rounded-2xl border border-hairline bg-canvas-cream space-y-2">
              <div className="flex items-center justify-between text-[10px] text-aubergine font-semibold border-b border-hairline pb-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Meta Approved Template Preview
                </span>
                <span className="text-ink-mute">Category: MARKETING</span>
              </div>
              <p className="text-[11px] text-ink font-sans leading-relaxed whitespace-pre-wrap">
                Namaste {"{{LeadName}}"},\n\nExclusive festive announcement for *PropertyBeast Luxury Residences*: Book your dream home this week to receive *Zero Stamp Duty absorption* and a *Complimentary 1-Year Clubhouse Membership*.\n\nReply *YES* to schedule a private viewing this Saturday.
              </p>
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
                <Send className="h-3.5 w-3.5" />
                Launch to {recipientCount} Prospects
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

