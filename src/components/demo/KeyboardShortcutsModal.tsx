"use client";

import React from "react";
import { X, Command, Keyboard, Zap, Compass } from "lucide-react";

interface KeyboardShortcutsModalProps {
  open: boolean;
  onClose: () => void;
}

const SHORTCUTS = [
  { key: "D", description: "Jump to Command Center Dashboard", route: "/dashboard" },
  { key: "P", description: "Jump to Lead Pipeline (Kanban & Table)", route: "/pipeline" },
  { key: "I", description: "Jump to Property Inventory Matrix", route: "/inventory" },
  { key: "V", description: "Jump to Site Visits & GPS Schedule", route: "/visits" },
  { key: "W", description: "Jump to WhatsApp CRM & Broadcast", route: "/whatsapp" },
  { key: "A", description: "Jump to AI Sales Assistant & Copilot", route: "/ai-assistant" },
  { key: "C", description: "Jump to Commission & Payouts Engine", route: "/commissions" },
  { key: "B", description: "Jump to Business Intelligence & Analytics", route: "/analytics" },
  { key: "M", description: "Jump to Mobile Field Agent Simulator", route: "/mobile" },
  { key: "S", description: "⚡ Instant Inbound Lead Simulation (with Chime)", route: "Action" },
  { key: "G", description: "🎯 Open 12-Minute Client Demo Script", route: "Modal" },
  { key: "?", description: "Show Keyboard Shortcuts Cheat Sheet", route: "Modal" },
];

export function KeyboardShortcutsModal({
  open,
  onClose,
}: KeyboardShortcutsModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-pure/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white border border-hairline rounded-3xl shadow-elevation-3 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 text-ink-pure"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-hairline bg-canvas-cream/80">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-aubergine-50 text-aubergine border border-aubergine-200 flex items-center justify-center shadow-sm">
              <Keyboard className="h-4 w-4" />
            </div>
            <h3 className="text-sm font-heading font-extrabold text-ink-pure">
              Presenter Keyboard Hotkeys
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-ink-muted hover:text-ink-pure hover:bg-canvas-cream transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-4 space-y-2 text-xs max-h-[70vh] overflow-y-auto bg-white">
          {SHORTCUTS.map((sc) => (
            <div
              key={sc.key}
              className="flex items-center justify-between p-2.5 rounded-xl bg-canvas-cream/50 border border-hairline hover:bg-canvas-cream transition-colors"
            >
              <span className="text-ink-base font-medium">
                {sc.description}
              </span>
              <kbd className="h-6 w-6 rounded-md bg-white border border-hairline font-mono font-bold text-aubergine text-xs flex items-center justify-center shadow-sm">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="p-3.5 border-t border-hairline bg-canvas-cream/60 text-center text-[11px] text-ink-muted font-medium">
          Press any hotkey during live client presentations for instant switching.
        </div>
      </div>
    </div>
  );
}
