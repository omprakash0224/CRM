"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Bell,
  Zap,
  Clock,
  CalendarCheck,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCrmStore } from "@/store/useCrmStore";
import { CommandPalette } from "@/components/dashboard/CommandPalette";
import { AddLeadModal } from "@/components/dashboard/AddLeadModal";
import { ScheduleVisitModal } from "@/components/dashboard/ScheduleVisitModal";

export function Topbar() {
  const { simulateInboundLead, leads } = useCrmStore();

  const [currentTime, setCurrentTime] = useState<string>("");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [addLeadOpen, setAddLeadOpen] = useState(false);
  const [scheduleVisitOpen, setScheduleVisitOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  const overdueLeadsCount = leads.filter((l) => l.isOverdue).length;

  return (
    <>
      <header className="h-16 bg-white/90 border-b border-hairline px-6 flex items-center justify-between gap-4 sticky top-[41px] z-30 backdrop-blur-md shadow-sm">
        {/* Global Quick Search - Opens Command Palette */}
        <div className="flex items-center flex-1 max-w-md">
          <button
            type="button"
            onClick={() => setCommandPaletteOpen(true)}
            className="w-full flex items-center justify-between pl-4 pr-3 py-2 rounded-full bg-[#fdfbf7] border border-hairline text-ink-mute hover:border-[#4a154b]/40 hover:text-ink transition-all text-xs group shadow-sm"
          >
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-ink-mute group-hover:text-aubergine transition-colors" />
              <span>Search leads, projects, inventory...</span>
            </div>
            <kbd className="px-2 py-0.5 text-[10px] font-mono text-ink-mute bg-[#f4ede4] rounded-full border border-hairline font-bold">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Center / Right Info & Actions */}
        <div className="flex items-center space-x-3">
          {/* Live IST Clock */}
          <div className="hidden xl:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#f4ede4] border border-hairline text-ink text-xs font-mono font-medium">
            <Clock className="h-3.5 w-3.5 text-aubergine" />
            <span>{currentTime || "11:42 AM IST"}</span>
            <span className="text-[10px] text-ink-mute uppercase font-bold">IST</span>
          </div>

          {/* Overdue alert pill */}
          {overdueLeadsCount > 0 && (
            <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#fef2f2] border border-[#fecaca] text-[#cc4117] text-xs font-bold">
              <span className="h-2 w-2 rounded-full bg-[#cc4117] animate-ping"></span>
              <span>{overdueLeadsCount} Overdue Inquiries</span>
            </div>
          )}

          {/* Quick Action: Add Lead - Secondary Lavender Pill */}
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setAddLeadOpen(true)}
            className="gap-1.5 text-xs shadow-sm"
          >
            <UserPlus className="h-3.5 w-3.5 text-aubergine" />
            <span className="hidden sm:inline">+ Add Lead</span>
          </Button>

          {/* Quick Action: Schedule Visit - Outline Pill */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setScheduleVisitOpen(true)}
            className="gap-1.5 text-xs shadow-sm"
          >
            <CalendarCheck className="h-3.5 w-3.5 text-aubergine" />
            <span className="hidden md:inline">+ Schedule Visit</span>
          </Button>

          {/* Live Simulator Trigger - Dominant Aubergine Primary Pill */}
          <Button
            size="sm"
            variant="default"
            onClick={() => simulateInboundLead("META_ADS")}
            className="text-xs px-5 gap-1.5 shadow-elevation-1"
          >
            <Zap className="h-3.5 w-3.5 fill-current" />
            <span className="hidden sm:inline">⚡ Simulate Lead</span>
            <span className="sm:hidden">⚡ Lead</span>
          </Button>

          {/* Notifications bell */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="relative p-2 rounded-full bg-white border border-hairline text-ink-mute hover:text-ink hover:bg-[#f4ede4] transition-colors shadow-sm"
            title="Search & Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#cc4117] ring-2 ring-white"></span>
          </button>
        </div>
      </header>

      {/* Global Modals */}
      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
      />
      <AddLeadModal open={addLeadOpen} onOpenChange={setAddLeadOpen} />
      <ScheduleVisitModal
        open={scheduleVisitOpen}
        onOpenChange={setScheduleVisitOpen}
      />
    </>
  );
}
