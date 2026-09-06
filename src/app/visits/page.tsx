"use client";

import React, { useState } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import { SiteVisit } from "@/types";
import {
  CalendarCheck,
  Calendar,
  List,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VisitListView } from "@/components/visits/VisitListView";
import { VisitCalendarView } from "@/components/visits/VisitCalendarView";
import { GpsCheckInModal } from "@/components/visits/GpsCheckInModal";
import { PostVisitFeedbackModal } from "@/components/visits/PostVisitFeedbackModal";
import { ScheduleVisitModal } from "@/components/dashboard/ScheduleVisitModal";
import { FooterAubergine } from "@/components/layout/FooterAubergine";

export default function VisitsPage() {
  const { visits } = useCrmStore();

  const [viewMode, setViewMode] = useState<"LIST" | "CALENDAR">("LIST");
  const [activeVisitForGps, setActiveVisitForGps] = useState<SiteVisit | null>(
    null
  );
  const [gpsModalOpen, setGpsModalOpen] = useState(false);
  const [activeVisitForFeedback, setActiveVisitForFeedback] =
    useState<SiteVisit | null>(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const completedVisits = visits.filter((v) => v.status === "COMPLETED");
  const scheduledVisits = visits.filter(
    (v) => v.status === "SCHEDULED" || v.status === "IN_PROGRESS"
  );
  const gpsVerifiedRate = Math.round(
    (completedVisits.length / (visits.length || 1)) * 100
  );

  const handleOpenGpsCheckIn = (visit: SiteVisit) => {
    setActiveVisitForGps(visit);
    setGpsModalOpen(true);
  };

  const handleCheckInCompleted = (visit: SiteVisit) => {
    setGpsModalOpen(false);
    setActiveVisitForFeedback(visit);
    setFeedbackModalOpen(true);
  };

  const handleOpenFeedback = (visit: SiteVisit) => {
    setActiveVisitForFeedback(visit);
    setFeedbackModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-3xl font-extrabold text-ink tracking-tight">
              Site Visit Management & GPS Radar
            </h1>
            <Badge variant="aubergine" className="text-xs font-bold">
              200m Geofence Validation
            </Badge>
          </div>
          <p className="text-xs text-ink-mute mt-1">
            Eliminate fake agent check-ins with tamper-proof satellite radar tracking and structured feedback.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-canvas-cream p-1 rounded-full border border-hairline text-xs">
            <button
              onClick={() => setViewMode("LIST")}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-bold transition-all ${
                viewMode === "LIST"
                  ? "bg-aubergine text-white shadow-sm"
                  : "text-ink-mute hover:text-ink"
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>List View</span>
            </button>
            <button
              onClick={() => setViewMode("CALENDAR")}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full font-bold transition-all ${
                viewMode === "CALENDAR"
                  ? "bg-aubergine text-white shadow-sm"
                  : "text-ink-mute hover:text-ink"
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              <span>Calendar</span>
            </button>
          </div>

          <Button
            size="sm"
            variant="default"
            onClick={() => setScheduleModalOpen(true)}
            className="text-xs gap-1.5 shadow-elevation-1"
          >
            <CalendarCheck className="h-3.5 w-3.5" />
            + Schedule Site Visit
          </Button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-hairline bg-white shadow-sm space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-ink-mute font-bold">
            Total Visits Scheduled
          </span>
          <div className="text-3xl font-extrabold text-ink">
            {visits.length}
          </div>
          <p className="text-[10px] text-ink-mute font-mono">
            {scheduledVisits.length} upcoming this week
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-hairline bg-white shadow-sm space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-[#007a5a] font-bold flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            GPS Verification Rate
          </span>
          <div className="text-3xl font-extrabold text-aubergine">
            {gpsVerifiedRate}%
          </div>
          <p className="text-[10px] text-[#007a5a] font-mono font-semibold">
            {completedVisits.length} completed on-site
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-hairline bg-white shadow-sm space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-aubergine font-bold">
            Visits Scheduled Today
          </span>
          <div className="text-3xl font-extrabold text-ink">
            2 Today
          </div>
          <p className="text-[10px] text-ink-mute font-mono">
            1 completed • 1 upcoming at 17:30
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-hairline bg-white shadow-sm space-y-1">
          <span className="text-[10px] uppercase tracking-wider text-ink-mute font-bold">
            Avg Geofence Proximity
          </span>
          <div className="text-3xl font-extrabold text-aubergine font-mono">
            38m
          </div>
          <p className="text-[10px] text-ink-mute font-mono">
            Well within 200m site perimeter
          </p>
        </div>
      </div>

      {/* Main View: List vs Calendar */}
      {viewMode === "LIST" ? (
        <VisitListView
          onOpenGpsCheckIn={handleOpenGpsCheckIn}
          onOpenFeedback={handleOpenFeedback}
        />
      ) : (
        <VisitCalendarView
          onOpenGpsCheckIn={handleOpenGpsCheckIn}
          onOpenFeedback={handleOpenFeedback}
        />
      )}

      {/* Signature Aubergine Band */}
      <FooterAubergine />

      {/* GPS Check-In Simulation Modal */}
      <GpsCheckInModal
        visit={activeVisitForGps}
        open={gpsModalOpen}
        onClose={() => setGpsModalOpen(false)}
        onCheckInCompleted={handleCheckInCompleted}
      />

      {/* Post-Visit Feedback Modal */}
      <PostVisitFeedbackModal
        visit={activeVisitForFeedback}
        open={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
      />

      {/* Schedule Visit Modal */}
      <ScheduleVisitModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
      />
    </div>
  );
}
