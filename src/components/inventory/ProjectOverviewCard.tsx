"use client";

import React from "react";
import { Project, Unit } from "@/types";
import {
  MapPin,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyINR } from "@/lib/utils";

interface ProjectOverviewCardProps {
  projects: Project[];
  selectedProjectId: string;
  onSelectProject: (projectId: string) => void;
  units: Unit[];
  onOpenBrochureShare: () => void;
}

export function ProjectOverviewCard({
  projects,
  selectedProjectId,
  onSelectProject,
  units,
  onOpenBrochureShare,
}: ProjectOverviewCardProps) {
  const currentProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  const projectUnits = units.filter((u) => u.projectId === currentProject.id);
  const totalValue = projectUnits.reduce((sum, u) => sum + u.basePrice, 0);
  const availableUnits = projectUnits.filter((u) => u.status === "AVAILABLE");
  const holdUnits = projectUnits.filter((u) => u.status === "HOLD");
  const bookedUnits = projectUnits.filter((u) => u.status === "BOOKED");
  const soldUnits = projectUnits.filter((u) => u.status === "SOLD");

  return (
    <div className="space-y-4">
      {/* Project Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl border border-hairline bg-white shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {projects.map((proj) => {
            const isSelected = proj.id === currentProject.id;
            const freeCount = units.filter(
              (u) => u.projectId === proj.id && u.status === "AVAILABLE"
            ).length;

            return (
              <button
                key={proj.id}
                onClick={() => onSelectProject(proj.id)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-aubergine text-white shadow-sm"
                    : "bg-canvas-cream text-ink-mute hover:text-ink border border-hairline"
                }`}
              >
                <span>{proj.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected
                      ? "bg-[#611f69] text-white"
                      : "bg-white text-ink-mute"
                  }`}
                >
                  {freeCount} Free
                </span>
              </button>
            );
          })}
        </div>

        <Button
          size="sm"
          variant="secondary"
          onClick={onOpenBrochureShare}
          className="text-xs gap-1.5 shadow-sm ml-auto"
        >
          <Share2 className="h-3.5 w-3.5 text-aubergine" />
          <span>Share Master Brochure</span>
        </Button>
      </div>

      {/* Project Hero Banner & Asset Stats */}
      <div className="relative overflow-hidden rounded-2xl border border-hairline bg-white shadow-elevation-1">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Left 2 Cols: Project Specs */}
          <div className="lg:col-span-2 p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="aubergine" className="text-xs">
                  {currentProject.developer}
                </Badge>
                <span className="text-xs text-ink-mute font-medium">
                  RERA Registered • Tier-1 Luxury Asset
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                {currentProject.name}
              </h1>

              <p className="text-xs text-ink-mute flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-aubergine shrink-0" />
                <span>
                  {currentProject.location}, {currentProject.city}
                </span>
                <span className="text-ink-mute">•</span>
                <span className="text-[#007a5a] font-bold font-mono">
                  GPS Geofence: {currentProject.geofenceRadiusMeters}m
                </span>
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-hairline">
              <div>
                <span className="text-[10px] text-ink-mute uppercase block font-bold">
                  Price Bracket
                </span>
                <span className="font-mono font-bold text-xs text-ink">
                  {currentProject.priceRange}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-ink-mute uppercase block font-bold">
                  Available Formats
                </span>
                <span className="text-xs font-semibold text-ink">
                  {currentProject.unitTypes.join(", ")}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-ink-mute uppercase block font-bold">
                  Total Towers
                </span>
                <span className="text-xs font-semibold text-ink">
                  {currentProject.towers.length} High-Rise Towers
                </span>
              </div>

              <div>
                <span className="text-[10px] text-ink-mute uppercase block font-bold">
                  Asset Valuation
                </span>
                <span className="font-mono font-bold text-xs text-aubergine">
                  {formatCurrencyINR(totalValue)}
                </span>
              </div>
            </div>
          </div>

          {/* Right 1 Col: Banner Image */}
          <div className="relative h-56 lg:h-auto min-h-[180px] overflow-hidden border-t lg:border-t-0 lg:border-l border-hairline bg-canvas-cream">
            <img
              src={currentProject.bannerImage}
              alt={currentProject.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between">
              <span className="text-[11px] font-bold text-white drop-shadow bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                {currentProject.city} Luxury Portfolio
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory KPI Status Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Available Units */}
        <div className="p-5 rounded-2xl border border-hairline bg-white shadow-sm transition-all hover:shadow-elevation-1">
          <div className="flex items-center justify-between text-xs text-[#007a5a] font-bold">
            <span>Available (Free)</span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#007a5a]" />
          </div>
          <div className="text-3xl font-extrabold text-ink mt-2">
            {availableUnits.length}{" "}
            <span className="text-xs font-normal text-ink-mute">
              / {projectUnits.length}
            </span>
          </div>
          <p className="text-[10px] text-ink-mute mt-1">
            {((availableUnits.length / (projectUnits.length || 1)) * 100).toFixed(0)}% ready for booking
          </p>
        </div>

        {/* On Hold */}
        <div className="p-5 rounded-2xl border border-hairline bg-white shadow-sm transition-all hover:shadow-elevation-1">
          <div className="flex items-center justify-between text-xs text-[#d97706] font-bold">
            <span>On Hold (48h Token)</span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#d97706] animate-pulse" />
          </div>
          <div className="text-3xl font-extrabold text-ink mt-2">
            {holdUnits.length}
          </div>
          <p className="text-[10px] text-ink-mute mt-1">
            Pre-approved buyer holds
          </p>
        </div>

        {/* Booked Units */}
        <div className="p-5 rounded-2xl border border-hairline bg-white shadow-sm transition-all hover:shadow-elevation-1">
          <div className="flex items-center justify-between text-xs text-[#1264a3] font-bold">
            <span>Booked (Under BBA)</span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#1264a3]" />
          </div>
          <div className="text-3xl font-extrabold text-ink mt-2">
            {bookedUnits.length}
          </div>
          <p className="text-[10px] text-ink-mute mt-1">
            Booking token cleared
          </p>
        </div>

        {/* Sold Units */}
        <div className="p-5 rounded-2xl border border-hairline bg-white shadow-sm transition-all hover:shadow-elevation-1">
          <div className="flex items-center justify-between text-xs text-[#cc4117] font-bold">
            <span>Sold & Registered</span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#cc4117]" />
          </div>
          <div className="text-3xl font-extrabold text-ink mt-2">
            {soldUnits.length}
          </div>
          <p className="text-[10px] text-ink-mute mt-1">
            Full deed registered
          </p>
        </div>
      </div>
    </div>
  );
}
