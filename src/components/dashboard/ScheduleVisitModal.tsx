"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCrmStore } from "@/store/useCrmStore";
import { CalendarCheck, Car } from "lucide-react";

interface ScheduleVisitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScheduleVisitModal({
  open,
  onOpenChange,
}: ScheduleVisitModalProps) {
  const { leads, projects, agents, addSiteVisit, addLeadActivity, setNotification } =
    useCrmStore();

  const [selectedLeadId, setSelectedLeadId] = useState(leads[0]?.id || "");
  const [selectedProjectId, setSelectedProjectId] = useState(
    projects[0]?.id || ""
  );
  const [date, setDate] = useState("2026-09-08");
  const [time, setTime] = useState("11:30");
  const [selectedAgentId, setSelectedAgentId] = useState(
    agents[0]?.id || ""
  );
  const [cabRequired, setCabRequired] = useState(true);

  const selectedLead = leads.find((l) => l.id === selectedLeadId) || leads[0];
  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];
  const selectedAgent =
    agents.find((a) => a.id === selectedAgentId) || agents[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead || !selectedProject || !selectedAgent) return;

    const scheduledAt = `${date}T${time}:00Z`;

    addSiteVisit({
      leadId: selectedLead.id,
      leadName: selectedLead.name,
      leadPhone: selectedLead.phone,
      projectId: selectedProject.id,
      projectName: selectedProject.name,
      agentId: selectedAgent.id,
      agentName: selectedAgent.name,
      scheduledAt,
      status: "SCHEDULED",
      gpsVerified: false,
    });

    addLeadActivity(selectedLead.id, {
      type: "SITE_VISIT",
      description: `Site visit scheduled for ${selectedProject.name} on ${date} at ${time} with ${selectedAgent.name}${
        cabRequired ? " (Executive Cab requested)" : ""
      }`,
      agentName: selectedAgent.name,
    });

    setNotification(
      `✓ Site visit scheduled for ${selectedLead.name} at ${selectedProject.name} on ${date}!`
    );

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg text-ink">
            <div className="h-8 w-8 rounded-full bg-canvas-lavender text-aubergine flex items-center justify-center">
              <CalendarCheck className="h-4 w-4" />
            </div>
            <span>Schedule Project Site Visit</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-ink-mute">
            Book an accompanied on-site tour. Automatically dispatches WhatsApp map coordinates to the client.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2 text-xs">
          {/* Select Lead */}
          <div className="space-y-1.5">
            <label className="font-bold text-ink">Select Client / Lead *</label>
            <select
              value={selectedLeadId}
              onChange={(e) => setSelectedLeadId(e.target.value)}
              className="w-full h-10 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
            >
              {leads.map((lead) => (
                <option key={lead.id} value={lead.id}>
                  {lead.name} ({lead.preferredProject || "General inquiry"} • {lead.phone})
                </option>
              ))}
            </select>
          </div>

          {/* Select Project & Agent */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-ink">Target Project *</label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full h-10 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.city})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-ink">Accompanying Agent *</label>
              <select
                value={selectedAgentId}
                onChange={(e) => setSelectedAgentId(e.target.value)}
                className="w-full h-10 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
              >
                {agents.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.role})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-ink">Visit Date *</label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="text-xs h-10"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-ink">Arrival Time *</label>
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="text-xs h-10"
              />
            </div>
          </div>

          {/* Transport toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-hairline bg-[#fdfbf7]">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-full bg-white border border-hairline text-aubergine">
                <Car className="h-4 w-4 text-aubergine" />
              </div>
              <div>
                <p className="text-xs font-bold text-ink">
                  Arrange Executive Transport
                </p>
                <p className="text-[10px] text-ink-mute">
                  Book company chauffeur sedan for client doorstep pickup
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={cabRequired}
              onChange={(e) => setCabRequired(e.target.checked)}
              className="h-4 w-4 rounded border-hairline text-aubergine focus:ring-aubergine"
            />
          </div>

          <DialogFooter className="pt-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="text-xs px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="text-xs px-7 shadow-elevation-1"
            >
              <CalendarCheck className="h-4 w-4 mr-1.5" />
              Confirm Site Visit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
