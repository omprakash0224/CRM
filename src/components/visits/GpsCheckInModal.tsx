"use client";

import React, { useState, useEffect } from "react";
import { SiteVisit, Project } from "@/types";
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
import { Badge } from "@/components/ui/badge";
import {
  Navigation,
  CheckCircle2,
  MapPin,
  Compass,
  Radio,
  Clock,
  ShieldCheck,
  Building2,
  User,
} from "lucide-react";

interface GpsCheckInModalProps {
  visit: SiteVisit | null;
  open: boolean;
  onClose: () => void;
  onCheckInCompleted: (visit: SiteVisit) => void;
}

export function GpsCheckInModal({
  visit,
  open,
  onClose,
  onCheckInCompleted,
}: GpsCheckInModalProps) {
  const { projects, completeGpsCheckIn, addLeadActivity, setNotification } =
    useCrmStore();

  const [simStep, setSimStep] = useState<"IDLE" | "SCANNING" | "LOCATED" | "VERIFIED">(
    "IDLE"
  );
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({
    lat: 28.4595,
    lng: 77.0866,
  });
  const [distanceMeters, setDistanceMeters] = useState(38);

  const project =
    projects.find((p) => p.id === visit?.projectId) || projects[0];

  useEffect(() => {
    if (open) {
      setSimStep("IDLE");
    }
  }, [open]);

  if (!open || !visit) return null;

  const handleStartScan = () => {
    setSimStep("SCANNING");
    setTimeout(() => {
      setCoords({
        lat: project.coordinates.lat + 0.0003,
        lng: project.coordinates.lng + 0.0002,
      });
      setDistanceMeters(Math.floor(32 + Math.random() * 25)); // 32m to 57m away (well within 200m)
      setSimStep("LOCATED");
    }, 1200);

    setTimeout(() => {
      setSimStep("VERIFIED");
    }, 2400);
  };

  const handleConfirmCheckIn = () => {
    completeGpsCheckIn(visit.id, coords, distanceMeters);

    addLeadActivity(visit.leadId, {
      type: "SITE_VISIT",
      description: `✓ GPS Verified Check-In: Agent arrived at ${visit.projectName} (${distanceMeters}m from site sales pavilion).`,
      agentName: visit.agentName,
    });

    setNotification(
      `✓ GPS Check-in verified for ${visit.leadName} at ${visit.projectName}!`
    );

    onCheckInCompleted(visit);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white border border-hairline rounded-2xl p-6 shadow-elevation-2">
        <DialogHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-full bg-canvas-lavender text-aubergine">
              <Navigation className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold text-ink">
                GPS Geo-Check-In Simulator
              </DialogTitle>
              <DialogDescription className="text-xs text-ink-mute">
                Tamper-proof field agent verification with 200m geofence radius
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs">
          {/* Visit Context Banner */}
          <div className="p-3.5 rounded-xl border border-hairline bg-canvas-cream space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink text-xs">
                {visit.leadName}
              </span>
              <Badge variant="outline" className="text-[10px] bg-white border-hairline">
                {visit.leadPhone}
              </Badge>
            </div>
            <p className="text-[11px] text-ink-mute flex items-center gap-1.5">
              <Building2 className="h-3.5 w-3.5 text-aubergine" />
              <span className="font-medium text-ink">{visit.projectName}</span>
              <span className="text-hairline">•</span>
              <span>Host: {visit.agentName}</span>
            </p>
          </div>

          {/* Simulated Radar Screen */}
          <div className="relative h-56 rounded-2xl border border-hairline bg-[#160b1e] overflow-hidden flex flex-col items-center justify-center p-4 shadow-inner">
            {/* Radar Circular Grid */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="h-44 w-44 rounded-full border border-aubergine-mute/30 flex items-center justify-center">
                <div className="h-32 w-32 rounded-full border border-aubergine-mute/40 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full border border-aubergine-mute/50" />
                </div>
              </div>
              <div className="absolute h-full w-[1px] bg-aubergine-mute/20" />
              <div className="absolute w-full h-[1px] bg-aubergine-mute/20" />
            </div>

            {/* Spinning Radar Sweep */}
            {simStep === "SCANNING" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-spin duration-1000">
                <div className="h-44 w-44 rounded-full bg-gradient-to-tr from-transparent via-aubergine-tint/30 to-emerald-400/50" />
              </div>
            )}

            {/* Center Blip: Property Site Pavilion */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="h-4 w-4 rounded-full bg-emerald-500 ring-4 ring-emerald-500/30 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
              </div>
              <span className="text-[9px] font-mono font-bold text-emerald-300 mt-1 bg-black/60 px-2 py-0.5 rounded-full border border-emerald-500/40">
                Site Pavilion
              </span>
            </div>

            {/* Agent Device Blip (Appears when located) */}
            {(simStep === "LOCATED" || simStep === "VERIFIED") && (
              <div className="absolute top-16 right-20 z-10 flex flex-col items-center animate-in fade-in zoom-in">
                <div className="h-3.5 w-3.5 rounded-full bg-cyan-400 ring-4 ring-cyan-400/40 animate-pulse" />
                <span className="text-[9px] font-mono text-cyan-200 mt-1 bg-black/60 px-2 py-0.5 rounded-full border border-cyan-500/40">
                  Agent Device ({distanceMeters}m)
                </span>
              </div>
            )}

            {/* Radar Top Left / Bottom Right telemetry */}
            <div className="absolute top-2.5 left-3 text-[10px] font-mono text-emerald-400">
              GEOFENCE: {project.geofenceRadiusMeters}M RADIUS
            </div>
            <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-aubergine-mute">
              GPS: {project.coordinates.lat}° N, {project.coordinates.lng}° E
            </div>
          </div>

          {/* Telemetry Status Box */}
          <div className="p-3.5 rounded-xl border border-hairline bg-canvas-cream text-xs space-y-2">
            {simStep === "IDLE" && (
              <p className="text-ink-mute text-center py-1 font-medium">
                Ready to verify field agent coordinates on site.
              </p>
            )}

            {simStep === "SCANNING" && (
              <div className="flex items-center justify-center space-x-2 text-aubergine py-1 font-mono font-medium">
                <Radio className="h-4 w-4 animate-spin" />
                <span>Acquiring satellite constellation telemetry...</span>
              </div>
            )}

            {(simStep === "LOCATED" || simStep === "VERIFIED") && (
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-ink-mute">
                  <span>Device Coordinates:</span>
                  <span className="text-ink font-bold">
                    {coords.lat.toFixed(4)}° N, {coords.lng.toFixed(4)}° E
                  </span>
                </div>
                <div className="flex justify-between text-ink-mute">
                  <span>Distance to Site Center:</span>
                  <span className="text-semantic-success font-bold">
                    {distanceMeters} meters
                  </span>
                </div>
                <div className="flex justify-between text-ink-mute pt-1.5 border-t border-hairline">
                  <span>Geofence Status:</span>
                  <span className="text-semantic-success font-bold flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-semantic-success" />
                    WITHIN 200M PERIMETER
                  </span>
                </div>
              </div>
            )}
          </div>
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

          {simStep === "IDLE" && (
            <Button
              type="button"
              onClick={handleStartScan}
              className="bg-aubergine hover:bg-aubergine-press text-white font-semibold text-xs h-9 gap-1.5 shadow-sm"
            >
              <Navigation className="h-3.5 w-3.5" />
              Acquire GPS Location
            </Button>
          )}

          {(simStep === "LOCATED" || simStep === "VERIFIED") && (
            <Button
              type="button"
              onClick={handleConfirmCheckIn}
              className="bg-semantic-success hover:bg-semantic-success/90 text-white font-semibold text-xs h-9 gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="h-4 w-4" />
              Confirm GPS Check-In
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

