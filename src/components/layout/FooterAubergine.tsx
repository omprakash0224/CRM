"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Flame, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FooterAubergine() {
  return (
    <footer className="mt-12 space-y-6">
      {/* 1. Closing Aubergine Band Card from DESIGN.md */}
      <div className="card-aubergine-band p-8 md:p-12 relative overflow-hidden shadow-elevation-2">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#611f69] text-[#eedaff] text-[11px] font-bold uppercase tracking-[0.96px]">
            <Flame className="h-3.5 w-3.5 fill-current" />
            <span>PropertyBeast CRM Platform</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Supercharge Your Real Estate Sales Pipeline
          </h2>

          <p className="text-sm text-[#d9bdde] leading-relaxed max-w-2xl">
            Streamline high-ticket buyer journeys, automate WhatsApp campaigns with instant AI scoring, and verify field site visits in real time.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link href="/pipeline">
              <Button
                variant="secondary"
                size="lg"
                className="gap-2 shadow-sm"
              >
                <span>Explore Live Pipeline</span>
                <ArrowRight className="h-4 w-4 text-aubergine" />
              </Button>
            </Link>

            <Link href="/ai-assistant">
              <Button
                variant="outlineAubergine"
                size="lg"
                className="gap-2"
              >
                <span>Launch AI Sales Copilot</span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative subtle ambient pattern */}
        <div className="absolute right-0 bottom-0 top-0 w-1/2 bg-gradient-to-l from-[#611f69]/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 2. Aubergine Footer Band with Mauve Link Columns */}
      <div className="bg-[#421343] rounded-2xl p-6 md:p-8 text-xs text-[#d9bdde] border border-[#592466]/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center text-[#4a154b] font-extrabold shadow-sm">
            <Flame className="h-4 w-4 text-[#4a154b] fill-current" />
          </div>
          <div>
            <span className="text-white font-bold text-sm">
              PropertyBeast CRM
            </span>
            <span className="text-[#d9bdde] text-[11px] block">
              Luxury PropTech Sales & Operations Engine
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-semibold">
          <Link href="/dashboard" className="text-[#eedaff] hover:text-white transition-colors">
            Command Center
          </Link>
          <Link href="/pipeline" className="text-[#eedaff] hover:text-white transition-colors">
            Pipeline
          </Link>
          <Link href="/inventory" className="text-[#eedaff] hover:text-white transition-colors">
            Inventory
          </Link>
          <Link href="/visits" className="text-[#eedaff] hover:text-white transition-colors">
            Site Visits
          </Link>
          <Link href="/ai-assistant" className="text-[#eedaff] hover:text-white transition-colors">
            AI Assistant
          </Link>
        </div>

        <div className="text-[11px] text-[#d9bdde]">
          © {new Date().getFullYear()} PropertyBeast Inc. Built with Slacc Design Language.
        </div>
      </div>
    </footer>
  );
}
