"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  KanbanSquare,
  Building2,
  Navigation,
  MessageSquare,
  Sparkles,
  Coins,
  BarChart3,
  Smartphone,
  Flame,
  ChevronRight,
} from "lucide-react";
import { useCrmStore } from "@/store/useCrmStore";

const NAV_ITEMS = [
  {
    title: "Command Center",
    phase: "Phase 1",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Lead Pipeline",
    phase: "Phase 2",
    href: "/pipeline",
    icon: KanbanSquare,
    badgeCount: true,
  },
  {
    title: "Property Inventory",
    phase: "Phase 3",
    href: "/inventory",
    icon: Building2,
  },
  {
    title: "Site Visits & GPS",
    phase: "Phase 4",
    href: "/visits",
    icon: Navigation,
  },
  {
    title: "WhatsApp CRM",
    phase: "Phase 5",
    href: "/whatsapp",
    icon: MessageSquare,
  },
  {
    title: "AI Sales Assistant",
    phase: "Phase 6",
    href: "/ai-assistant",
    icon: Sparkles,
    highlight: true,
  },
  {
    title: "Commissions & Payouts",
    phase: "Phase 7",
    href: "/commissions",
    icon: Coins,
  },
  {
    title: "Business Intelligence",
    phase: "Phase 8",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Mobile Field View",
    phase: "Phase 9",
    href: "/mobile",
    icon: Smartphone,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { leads, currentPersonaId, personas } = useCrmStore();
  const currentPersona =
    personas.find((p) => p.id === currentPersonaId) || personas[0];

  const totalLeads = leads.length;

  return (
    <aside className="w-64 bg-[#4a154b] border-r border-[#3f0e40] flex flex-col shrink-0 min-h-[calc(100vh-45px)] text-white select-none shadow-elevation-1">
      {/* Brand Section */}
      <div className="p-5 border-b border-[#592466]/60 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-3 group">
          <div className="h-9 w-9 rounded-full bg-white flex items-center justify-center text-[#4a154b] font-extrabold shadow-sm group-hover:scale-105 transition-transform duration-200">
            <Flame className="h-5 w-5 text-[#4a154b] fill-current" />
          </div>
          <div>
            <span className="font-heading text-base font-extrabold tracking-tight text-white flex items-center gap-1">
              Property<span className="text-[#eedaff]">Beast</span>
            </span>
            <span className="text-[10px] tracking-wider uppercase text-[#d9bdde] block font-semibold">
              Slacc Design • v1.0
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Modules */}
      <div className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-3.5 pb-2 text-[10px] font-bold text-[#d9bdde] uppercase tracking-wider">
          Sales & Ops Modules
        </div>

        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href === "/dashboard" && pathname === "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 group ${
                isActive
                  ? "bg-[#611f69] text-white shadow-sm border border-[#592466]"
                  : "text-[#d9bdde] hover:text-white hover:bg-[#611f69]/50 border border-transparent"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`h-4 w-4 transition-colors ${
                    isActive
                      ? "text-white"
                      : item.highlight
                      ? "text-[#eedaff]"
                      : "text-[#d9bdde] group-hover:text-white"
                  }`}
                />
                <span className="text-xs font-semibold tracking-wide">
                  {item.title}
                </span>
              </div>

              <div className="flex items-center space-x-1.5">
                {item.badgeCount && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#3f0e40] text-[#eedaff] border border-[#592466]">
                    {totalLeads}
                  </span>
                )}
                {item.highlight && (
                  <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-[#eedaff] text-[#4a154b]">
                    AI
                  </span>
                )}
                {isActive && (
                  <ChevronRight className="h-3.5 w-3.5 text-[#eedaff]" />
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Footer Profile Box */}
      <div className="p-4 border-t border-[#592466]/60 bg-[#421343]">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={currentPersona.avatar}
              alt={currentPersona.name}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-[#611f69]"
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#007a5a] ring-2 ring-[#4a154b]"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">
              {currentPersona.name}
            </p>
            <p className="text-[10px] text-[#d9bdde] truncate">
              {currentPersona.title}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
