"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Users,
  Building2,
  KanbanSquare,
  Sparkles,
  Navigation,
  MessageSquare,
  Coins,
  BarChart3,
  X,
  ArrowRight,
  Phone,
} from "lucide-react";
import { useCrmStore } from "@/store/useCrmStore";
import { Badge } from "@/components/ui/badge";
import { getLeadStageColor, getLeadStageLabel, formatCurrencyINR } from "@/lib/utils";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const { leads, projects } = useCrmStore();
  const [query, setQuery] = useState("");

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      } else if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  // Filter leads
  const filteredLeads = query.trim()
    ? leads
        .filter(
          (l) =>
            l.name.toLowerCase().includes(query.toLowerCase()) ||
            l.phone.includes(query) ||
            (l.preferredProject &&
              l.preferredProject.toLowerCase().includes(query.toLowerCase())) ||
            l.source.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : leads.slice(0, 4);

  // Filter projects
  const filteredProjects = query.trim()
    ? projects.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.city.toLowerCase().includes(query.toLowerCase()) ||
          p.developer.toLowerCase().includes(query.toLowerCase())
      )
    : projects;

  const quickNav = [
    { title: "Lead Pipeline (Kanban)", href: "/pipeline", icon: KanbanSquare },
    { title: "Property Inventory Matrix", href: "/inventory", icon: Building2 },
    { title: "Site Visits & GPS Check-In", href: "/visits", icon: Navigation },
    { title: "WhatsApp CRM Messenger", href: "/whatsapp", icon: MessageSquare },
    { title: "AI Pitch Copilot", href: "/ai-assistant", icon: Sparkles },
    { title: "Commission Statements", href: "/commissions", icon: Coins },
    { title: "Executive BI Analytics", href: "/analytics", icon: BarChart3 },
  ];

  const handleNavigate = (href: string) => {
    router.push(href);
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl rounded-2xl border border-hairline bg-white shadow-elevation-2 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="relative flex items-center border-b border-hairline px-4 py-3 bg-[#fdfbf7]">
          <Search className="h-5 w-5 text-aubergine shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Type to search leads, projects, towers, phone numbers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-mute focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-ink-mute hover:text-ink mr-2"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <kbd className="px-2 py-0.5 text-[10px] font-mono text-ink bg-canvas-cream rounded border border-hairline font-bold">
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Section 1: Matching Leads */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-ink-mute uppercase tracking-wider px-2 mb-2">
              <span className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-aubergine" /> Leads & Inquiries
              </span>
              <span>{filteredLeads.length} results</span>
            </div>

            <div className="space-y-1.5">
              {filteredLeads.map((lead) => {
                const stageColor = getLeadStageColor(lead.stage);
                return (
                  <div
                    key={lead.id}
                    onClick={() => handleNavigate("/pipeline")}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#f4ede4]/60 cursor-pointer border border-transparent hover:border-hairline transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-canvas-lavender text-aubergine flex items-center justify-center font-bold text-xs group-hover:bg-aubergine group-hover:text-white transition-colors">
                        {lead.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-ink group-hover:text-aubergine">
                            {lead.name}
                          </span>
                          <span
                            className={`text-[9px] px-2 py-0.5 rounded-full font-bold border ${stageColor.border} ${stageColor.bg} ${stageColor.text}`}
                          >
                            {getLeadStageLabel(lead.stage)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-[11px] text-ink-mute mt-0.5">
                          <span className="flex items-center gap-1">
                            <Phone className="h-2.5 w-2.5 text-ink-mute" />
                            {lead.phone}
                          </span>
                          <span>•</span>
                          <span>{lead.preferredProject || "Gurugram Prime"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-aubergine block">
                        {formatCurrencyINR(
                          (lead.budgetMin + lead.budgetMax) / 2
                        )}
                      </span>
                      <span className="text-[10px] text-ink-mute">
                        AI Score: {lead.aiScore}/100
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Projects */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-ink-mute uppercase tracking-wider px-2 mb-2">
              <span className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-aubergine" /> Projects & Inventory
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => handleNavigate("/inventory")}
                  className="p-3 rounded-xl border border-hairline bg-[#fdfbf7] hover:border-aubergine hover:bg-white cursor-pointer transition-all group shadow-sm"
                >
                  <p className="text-xs font-bold text-ink group-hover:text-aubergine truncate">
                    {project.name}
                  </p>
                  <p className="text-[10px] text-ink-mute truncate mt-0.5">
                    {project.city} • {project.availableUnits} units free
                  </p>
                  <p className="text-[11px] font-bold text-aubergine mt-1 font-mono">
                    {project.priceRange}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Quick Navigation Shortcuts */}
          <div>
            <div className="text-[11px] font-bold text-ink-mute uppercase tracking-wider px-2 mb-2">
              Quick Module Jumps
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickNav.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.href}
                    onClick={() => handleNavigate(item.href)}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-hairline bg-[#fdfbf7] hover:bg-white hover:border-aubergine cursor-pointer transition-all group shadow-sm"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Icon className="h-4 w-4 text-ink-mute group-hover:text-aubergine transition-colors" />
                      <span className="text-xs font-semibold text-ink group-hover:text-aubergine">
                        {item.title}
                      </span>
                    </div>
                    <ArrowRight className="h-3 w-3 text-ink-mute group-hover:text-aubergine" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-hairline px-4 py-2.5 bg-[#f4ede4] flex items-center justify-between text-[11px] text-ink-mute font-medium">
          <span>Navigate with mouse or keyboard</span>
          <span>PropertyBeast Global Index</span>
        </div>
      </div>
    </div>
  );
}
