"use client";

import React, { useState, useMemo } from "react";
import { Project, Unit } from "@/types";
import {
  Building2,
  Search,
  Compass,
  Maximize2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatCurrencyINR, getUnitStatusColor } from "@/lib/utils";

interface UnitMatrixProps {
  project: Project;
  units: Unit[];
  onSelectUnit: (unit: Unit) => void;
}

export function UnitMatrix({
  project,
  units,
  onSelectUnit,
}: UnitMatrixProps) {
  const [selectedTowerId, setSelectedTowerId] = useState(
    project.towers[0]?.id || ""
  );
  const [bhkFilter, setBhkFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Keep tower in sync if project changes
  const activeTower =
    project.towers.find((t) => t.id === selectedTowerId) || project.towers[0];

  const filteredUnits = useMemo(() => {
    return units.filter((unit) => {
      if (unit.projectId !== project.id) return false;
      if (activeTower && unit.towerId !== activeTower.id) return false;
      if (bhkFilter !== "ALL" && unit.bhk !== bhkFilter) return false;
      if (statusFilter !== "ALL" && unit.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          unit.unitNumber.toLowerCase().includes(q) ||
          unit.facing.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [
    units,
    project.id,
    activeTower,
    bhkFilter,
    statusFilter,
    searchQuery,
  ]);

  return (
    <div className="space-y-4">
      {/* Tower Selector Tabs & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-2xl border border-hairline bg-white shadow-sm">
        {/* Towers Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
          {project.towers.map((tower) => {
            const isSelected = activeTower?.id === tower.id;
            const towerUnits = units.filter(
              (u) => u.projectId === project.id && u.towerId === tower.id
            );
            const freeCount = towerUnits.filter(
              (u) => u.status === "AVAILABLE"
            ).length;

            return (
              <button
                key={tower.id}
                onClick={() => setSelectedTowerId(tower.id)}
                className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-aubergine text-white shadow-sm"
                    : "bg-canvas-cream text-ink-mute hover:text-ink border border-hairline"
                }`}
              >
                <Building2 className="h-3.5 w-3.5 text-inherit" />
                <span>{tower.name}</span>
                <span
                  className={`text-[10px] px-2 py-0.2 rounded-full font-mono ${
                    isSelected ? "bg-[#611f69] text-white" : "bg-white text-ink-mute"
                  }`}
                >
                  {freeCount}/{towerUnits.length} Free
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* BHK Filter */}
          <select
            value={bhkFilter}
            onChange={(e) => setBhkFilter(e.target.value)}
            className="h-9 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
          >
            <option value="ALL">All BHK Types</option>
            {project.unitTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded border border-hairline bg-white px-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-aubergine"
          >
            <option value="ALL">All Statuses</option>
            <option value="AVAILABLE">🟢 Available</option>
            <option value="HOLD">🟡 On Hold</option>
            <option value="BOOKED">🔵 Booked</option>
            <option value="SOLD">🔴 Sold</option>
          </select>

          {/* Unit search */}
          <div className="relative w-36">
            <Search className="absolute left-2.5 top-3 h-3 w-3 text-ink-mute" />
            <Input
              placeholder="Unit #..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-9 text-xs"
            />
          </div>
        </div>
      </div>

      {/* Interactive Unit Availability Grid */}
      {filteredUnits.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-hairline rounded-2xl bg-white space-y-2">
          <p className="text-sm font-bold text-ink">No Units Found</p>
          <p className="text-xs text-ink-mute">
            Try adjusting your BHK or status filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredUnits.map((unit) => {
            const statusCol = getUnitStatusColor(unit.status);

            return (
              <div
                key={unit.id}
                onClick={() => onSelectUnit(unit)}
                className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer group bg-white hover:shadow-elevation-2 flex flex-col justify-between space-y-3 shadow-elevation-1 ${
                  unit.status === "AVAILABLE"
                    ? "border-hairline hover:border-aubergine/40"
                    : unit.status === "HOLD"
                    ? "border-[#fde68a] bg-[#fef3c7]/20 hover:border-[#d97706]"
                    : unit.status === "BOOKED"
                    ? "border-[#bfdbfe] bg-[#eff6ff]/30 hover:border-[#1264a3]"
                    : "border-hairline opacity-75 hover:opacity-100"
                }`}
              >
                {/* Header: Unit # & Status Pill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold text-base text-ink group-hover:text-aubergine transition-colors">
                      {unit.unitNumber}
                    </span>
                    <span className="text-[10px] text-ink-mute font-medium">
                      (Floor {unit.floor})
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusCol.border} ${statusCol.bg} ${statusCol.text}`}
                  >
                    {unit.status}
                  </span>
                </div>

                {/* Specs: BHK & Area */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-ink font-semibold">
                      {unit.bhk}
                    </span>
                    <span className="text-ink-mute font-mono text-[11px]">
                      {unit.superBuiltUpArea.toLocaleString()} sq.ft
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 text-[11px] text-ink-mute truncate">
                    <Compass className="h-3 w-3 text-ink-mute shrink-0" />
                    <span className="truncate">{unit.facing}</span>
                  </div>
                </div>

                {/* Price and Footer */}
                <div className="pt-2 border-t border-hairline flex items-center justify-between">
                  <span className="font-mono font-bold text-sm text-aubergine">
                    {formatCurrencyINR(unit.basePrice)}
                  </span>
                  <span className="text-[10px] text-ink-mute group-hover:text-aubergine transition-colors flex items-center gap-1 font-semibold">
                    Details <Maximize2 className="h-2.5 w-2.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
