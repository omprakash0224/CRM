"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCrmStore } from "@/store/useCrmStore";
import {
  RotateCcw,
  ShieldCheck,
  UserCheck,
  Users,
  Zap,
  Smartphone,
  Monitor,
  Compass,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sound } from "@/lib/soundEffects";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { DemoGuideModal } from "@/components/demo/DemoGuideModal";
import { KeyboardShortcutsModal } from "@/components/demo/KeyboardShortcutsModal";

export function PersonaBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [soundOn, setSoundOn] = useState(sound.isEnabled());

  const {
    isShortcutsOpen,
    setIsShortcutsOpen,
    isPitchGuideOpen,
    setIsPitchGuideOpen,
  } = useKeyboardShortcuts();
  const {
    currentPersonaId,
    personas,
    setPersona,
    resetDemoData,
    simulateInboundLead,
    notificationMessage,
    setNotification,
  } = useCrmStore();

  const currentPersona =
    personas.find((p) => p.id === currentPersonaId) || personas[0];

  return (
    <div className="bg-[#f4ede4] border-b border-hairline text-xs py-2 px-4 select-none sticky top-0 z-40">
      <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Persona Switcher */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-ink-mute font-bold">
            <span className="h-2 w-2 rounded-full bg-[#007a5a] animate-pulse"></span>
            <span className="uppercase tracking-[0.96px] text-[10px] text-ink font-bold">
              Demo Persona:
            </span>
          </div>

          <div className="flex items-center bg-white/70 p-0.5 rounded-full border border-hairline space-x-1">
            {personas.map((persona) => {
              const isActive = persona.id === currentPersonaId;
              return (
                <button
                  key={persona.id}
                  onClick={() => setPersona(persona.id)}
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-all duration-150 ${
                    isActive
                      ? "bg-white text-ink font-bold border border-hairline shadow-sm"
                      : "text-ink-mute hover:text-ink hover:bg-white/50"
                  }`}
                >
                  <Avatar className="h-5 w-5 ring-1 ring-aubergine/20">
                    <AvatarImage src={persona.avatar} alt={persona.name} />
                    <AvatarFallback>{persona.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-left hidden sm:block">
                    <span className="leading-tight block font-bold text-[11px]">
                      {persona.name}
                    </span>
                    <span className="text-[9px] text-ink-mute leading-none font-medium">
                      {persona.role === "DIRECTOR"
                        ? "Director"
                        : persona.role === "SALES_MANAGER"
                        ? "Sales Manager"
                        : "Sales Exec"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: Persona Capability Tag */}
        <div className="hidden lg:flex items-center space-x-2 text-ink-mute">
          <span className="text-ink-mute text-xs">Role Scope:</span>
          {currentPersona.role === "DIRECTOR" && (
            <Badge variant="amber" className="text-[10px] py-0.5 px-3 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Full Company BI & All Portfolios
            </Badge>
          )}
          {currentPersona.role === "SALES_MANAGER" && (
            <Badge variant="blue" className="text-[10px] py-0.5 px-3 flex items-center gap-1">
              <Users className="h-3 w-3" /> Team Reassignment & Pipeline Oversight
            </Badge>
          )}
          {currentPersona.role === "SALES_EXECUTIVE" && (
            <Badge variant="emerald" className="text-[10px] py-0.5 px-3 flex items-center gap-1">
              <UserCheck className="h-3 w-3" /> Personal Follow-ups & Deals Only
            </Badge>
          )}
        </div>

        {/* Right: Quick Inbound Simulation & Reset Controls */}
        <div className="flex items-center space-x-2 ml-auto">
          {/* Sound Effect Toggle */}
          <button
            type="button"
            onClick={() => setSoundOn(sound.toggle())}
            className="p-1.5 rounded-full text-ink-mute hover:text-ink hover:bg-white transition-colors"
            title={soundOn ? "Sound Chimes Active (Click to Mute)" : "Sound Chimes Muted (Click to Enable)"}
          >
            {soundOn ? (
              <Volume2 className="h-3.5 w-3.5 text-aubergine" />
            ) : (
              <VolumeX className="h-3.5 w-3.5 text-ink-mute" />
            )}
          </button>

          {/* Mobile vs Desktop View Toggle */}
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              router.push(pathname === "/mobile" ? "/dashboard" : "/mobile")
            }
            className="h-8 text-xs gap-1 px-4 shadow-sm"
          >
            {pathname === "/mobile" ? (
              <>
                <Monitor className="h-3 w-3 text-[#1264a3]" />
                <span className="hidden sm:inline">Desktop</span>
              </>
            ) : (
              <>
                <Smartphone className="h-3 w-3 text-aubergine" />
                <span className="hidden sm:inline">Mobile</span>
              </>
            )}
          </Button>

          {/* 12-Min Pitch Guide Trigger */}
          <Button
            size="sm"
            variant="amber"
            onClick={() => setIsPitchGuideOpen(true)}
            className="h-8 text-xs gap-1 font-bold shadow-sm px-4"
          >
            <Compass className="h-3 w-3 text-[#b25e00]" />
            <span className="hidden sm:inline">Pitch</span> Guide
          </Button>

          {/* Inbound Lead Simulation */}
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              simulateInboundLead("META_ADS");
              sound.playLeadChime();
            }}
            className="h-8 text-xs px-4 text-aubergine font-bold"
          >
            <Zap className="h-3 w-3 mr-1 text-aubergine" />
            <span className="hidden sm:inline">Simulate</span> Meta Lead
          </Button>

          {/* Shortcuts Trigger */}
          <button
            type="button"
            onClick={() => setIsShortcutsOpen(true)}
            className="h-7 w-7 rounded-full bg-white text-ink hover:text-aubergine border border-hairline font-mono font-bold text-[10px] flex items-center justify-center shadow-sm"
            title="Keyboard Shortcuts [?]"
          >
            ?
          </button>

          {/* Reset Demo */}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              if (
                confirm(
                  "Reset all CRM leads, units, and visits to pristine demo seed state?"
                )
              ) {
                resetDemoData();
                sound.playSuccessChime();
              }
            }}
            className="h-8 text-xs text-ink-mute hover:text-[#cc4117] hover:bg-[#fef2f2] px-3"
            title="Reset to fresh demo dataset"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
        </div>
      </div>

      {/* Demo Guide Modal */}
      <DemoGuideModal
        open={isPitchGuideOpen}
        onClose={() => setIsPitchGuideOpen(false)}
      />

      {/* Keyboard Shortcuts Cheat Sheet */}
      <KeyboardShortcutsModal
        open={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* Real-time Toast/Notification Banner */}
      {notificationMessage && (
        <div className="mt-2 bg-white border border-aubergine/40 text-aubergine px-4 py-2 rounded-full flex items-center justify-between text-xs shadow-elevation-1 animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center space-x-2">
            <span className="h-2 w-2 rounded-full bg-[#007a5a] animate-ping"></span>
            <span className="font-semibold">{notificationMessage}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-aubergine hover:text-black font-bold ml-2 px-1"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
