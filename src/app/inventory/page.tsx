"use client";

import React, { useState } from "react";
import { useCrmStore } from "@/store/useCrmStore";
import { Unit } from "@/types";
import { ProjectOverviewCard } from "@/components/inventory/ProjectOverviewCard";
import { UnitMatrix } from "@/components/inventory/UnitMatrix";
import { UnitDetailModal } from "@/components/inventory/UnitDetailModal";
import { BrochureShareModal } from "@/components/inventory/BrochureShareModal";
import { FooterAubergine } from "@/components/layout/FooterAubergine";

export default function InventoryPage() {
  const { projects, units } = useCrmStore();

  const [selectedProjectId, setSelectedProjectId] = useState(
    projects[0]?.id || "proj-godrej-woods"
  );
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [unitDetailOpen, setUnitDetailOpen] = useState(false);
  const [brochureShareOpen, setBrochureShareOpen] = useState(false);
  const [brochureUnit, setBrochureUnit] = useState<Unit | null>(null);

  const currentProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0];

  const handleSelectUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    setUnitDetailOpen(true);
  };

  const handleShareWhatsAppFromModal = (unit: Unit) => {
    setUnitDetailOpen(false);
    setBrochureUnit(unit);
    setBrochureShareOpen(true);
  };

  const handleShareMasterBrochure = () => {
    setBrochureUnit(null);
    setBrochureShareOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Project Overview & Inventory KPIs */}
      <ProjectOverviewCard
        projects={projects}
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        units={units}
        onOpenBrochureShare={handleShareMasterBrochure}
      />

      {/* Interactive Tower & Unit Availability Matrix */}
      <UnitMatrix
        project={currentProject}
        units={units}
        onSelectUnit={handleSelectUnit}
      />

      {/* Signature Aubergine Band */}
      <FooterAubergine />

      {/* Unit Detail Modal */}
      <UnitDetailModal
        unit={selectedUnit}
        project={currentProject}
        open={unitDetailOpen}
        onClose={() => setUnitDetailOpen(false)}
        onShareWhatsApp={handleShareWhatsAppFromModal}
      />

      {/* 1-Click WhatsApp Collateral Dispatch Modal */}
      <BrochureShareModal
        project={currentProject}
        unit={brochureUnit}
        open={brochureShareOpen}
        onClose={() => setBrochureShareOpen(false)}
      />
    </div>
  );
}
