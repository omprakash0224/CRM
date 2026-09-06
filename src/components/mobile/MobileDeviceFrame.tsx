"use client";

import React, { useState, useEffect } from "react";
import { Wifi, BatteryMedium, Signal, Sparkles } from "lucide-react";

interface MobileDeviceFrameProps {
  children: React.ReactNode;
  scale?: number; // 0.8, 0.9, 1.0
  activeNotification?: {
    title: string;
    body: string;
    onTap?: () => void;
  } | null;
}

export function MobileDeviceFrame({
  children,
  scale = 1,
  activeNotification,
}: MobileDeviceFrameProps) {
  const [currentTime, setCurrentTime] = useState("9:41");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours % 12 || 12}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="flex justify-center items-center py-4 transition-transform duration-300 select-none"
      style={{ transform: `scale(${scale})` }}
    >
      {/* Outer Titanium Chassis */}
      <div className="relative w-[380px] h-[780px] bg-slate-950 rounded-[52px] p-3.5 shadow-elevation-3 border-[4px] border-slate-700/80 ring-1 ring-slate-600/40 flex flex-col">
        {/* Outer Side Buttons (Physical Notches) */}
        <div className="absolute -left-[7px] top-24 w-[3px] h-8 bg-slate-600 rounded-l-sm" />
        <div className="absolute -left-[7px] top-36 w-[3px] h-12 bg-slate-600 rounded-l-sm" />
        <div className="absolute -left-[7px] top-52 w-[3px] h-12 bg-slate-600 rounded-l-sm" />
        <div className="absolute -right-[7px] top-32 w-[3px] h-16 bg-slate-600 rounded-r-sm" />

        {/* Screen Bezel & Display Screen */}
        <div className="w-full h-full bg-[#fdfbf7] rounded-[44px] overflow-hidden flex flex-col relative border border-hairline shadow-inner">
          {/* iOS Status Bar */}
          <div className="h-11 w-full bg-[#fdfbf7] flex items-center justify-between px-6 shrink-0 z-30 relative select-none border-b border-hairline/40">
            {/* Left: Clock */}
            <span className="font-semibold text-xs text-ink-pure tracking-tight font-mono">
              {currentTime}
            </span>

            {/* Center: Dynamic Island Pill */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-2 h-7 w-28 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-between px-2.5 z-40 transition-all duration-300 shadow-sm">
              <div className="h-2.5 w-2.5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                <span className="h-1 w-1 rounded-full bg-blue-500/60" />
              </div>
              <div className="h-2.5 w-2.5 rounded-full bg-slate-900/80" />
            </div>

            {/* Right: Network & Battery */}
            <div className="flex items-center space-x-1.5 text-ink-pure">
              <Signal className="h-3 w-3 text-ink-muted" />
              <Wifi className="h-3 w-3 text-ink-muted" />
              <div className="flex items-center gap-0.5 text-[10px] font-mono font-bold text-semantic-success">
                <span>100%</span>
                <div className="w-4 h-2 rounded-[2px] border border-ink-muted p-[1px] flex items-center">
                  <div className="w-full h-full bg-semantic-success rounded-[1px]" />
                </div>
              </div>
            </div>
          </div>

          {/* Simulated Slide-down Push Notification Banner */}
          {activeNotification && (
            <div
              onClick={activeNotification.onTap}
              className="absolute top-12 left-3 right-3 z-50 p-3 rounded-2xl bg-white/95 border border-aubergine-200 shadow-elevation-3 backdrop-blur-md cursor-pointer animate-in slide-in-from-top-4 duration-300"
            >
              <div className="flex items-start gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-aubergine flex items-center justify-center text-white font-bold shrink-0 text-xs shadow-sm">
                  PB
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-ink-pure truncate">
                      {activeNotification.title}
                    </span>
                    <span className="text-[9px] text-ink-muted">now</span>
                  </div>
                  <p className="text-[10px] text-ink-base mt-0.5 line-clamp-2 leading-tight">
                    {activeNotification.body}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Inner Scrollable Mobile Screen Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative bg-[#fdfbf7] text-ink-pure flex flex-col">
            {children}
          </div>

          {/* Bottom iOS Home Indicator Bar */}
          <div className="h-6 w-full bg-[#fdfbf7] flex items-center justify-center shrink-0 z-30 select-none">
            <div className="w-32 h-1 rounded-full bg-ink-muted/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
