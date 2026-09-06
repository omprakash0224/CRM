"use client";

import React from "react";
import { SiteVisit } from "@/types";
import { useCrmStore } from "@/store/useCrmStore";
import {
  Calendar as CalendarIcon,
  Clock,
  ShieldCheck,
  Navigation,
  Building2,
} from "lucide-react";

interface VisitCalendarViewProps {
  onOpenGpsCheckIn: (visit: SiteVisit) => void;
  onOpenFeedback: (visit: SiteVisit) => void;
}

export function VisitCalendarView({
  onOpenGpsCheckIn,
  onOpenFeedback,
}: VisitCalendarViewProps) {
  const { visits } = useCrmStore();

  const days = [
    { name: "Wednesday", date: "03 Sep", isPast: true },
    { name: "Thursday", date: "04 Sep", isPast: true },
    { name: "Friday", date: "05 Sep", isPast: true },
    { name: "Saturday (Today)", date: "06 Sep", isToday: true },
    { name: "Sunday", date: "07 Sep", isFuture: true },
    { name: "Monday", date: "08 Sep", isFuture: true },
    { name: "Tuesday", date: "09 Sep", isFuture: true },
  ];

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-2xl border border-hairline bg-white flex items-center justify-between text-xs shadow-elevation-1">
        <div className="flex items-center space-x-2 text-ink font-semibold">
          <CalendarIcon className="h-4 w-4 text-aubergine" />
          <span>Weekly Site Visit Schedule (03 Sep – 09 Sep 2026)</span>
        </div>
        <span className="text-ink-mute font-mono">
          {visits.length} Visits Tracked
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        {days.map((day) => {
          // Filter visits for this day
          const dayVisits = visits.filter((v) => {
            const visitDay = new Date(v.scheduledAt).getDate();
            const slotDay = parseInt(day.date.split(" ")[0]);
            return visitDay === slotDay;
          });

          return (
            <div
              key={day.name}
              className={`p-3.5 rounded-2xl border flex flex-col justify-between min-h-[260px] transition-shadow ${
                day.isToday
                  ? "border-aubergine bg-canvas-cream shadow-elevation-1"
                  : "border-hairline bg-white shadow-elevation-1"
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-hairline">
                  <span
                    className={`font-bold text-xs ${
                      day.isToday ? "text-aubergine" : "text-ink"
                    }`}
                  >
                    {day.name}
                  </span>
                  <span className="text-[10px] text-ink-mute font-mono">
                    {day.date}
                  </span>
                </div>

                <div className="space-y-2 mt-2.5">
                  {dayVisits.length === 0 ? (
                    <p className="text-[11px] text-ink-mute text-center py-6">
                      No visits scheduled
                    </p>
                  ) : (
                    dayVisits.map((visit) => {
                      const isCompleted = visit.status === "COMPLETED";

                      return (
                        <div
                          key={visit.id}
                          onClick={() =>
                            isCompleted
                              ? onOpenFeedback(visit)
                              : onOpenGpsCheckIn(visit)
                          }
                          className={`p-2.5 rounded-xl border cursor-pointer transition-all hover:shadow-md text-xs space-y-1 ${
                            isCompleted
                              ? "bg-canvas-cream border-hairline hover:border-aubergine/40"
                              : "bg-canvas-lavender border-aubergine-mute/40 hover:border-aubergine"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-ink text-[11px] truncate">
                              {visit.leadName}
                            </span>
                            {isCompleted ? (
                              <ShieldCheck className="h-3.5 w-3.5 text-semantic-success shrink-0" />
                            ) : (
                              <Navigation className="h-3.5 w-3.5 text-aubergine shrink-0" />
                            )}
                          </div>

                          <p className="text-[10px] text-ink-mute truncate">
                            {visit.projectName}
                          </p>

                          <div className="flex items-center justify-between text-[9px] text-ink-mute font-mono pt-1 border-t border-hairline">
                            <span>
                              {new Date(visit.scheduledAt).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" }
                              )}
                            </span>
                            <span>{visit.agentName.split(" ")[0]}</span>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {day.isToday && (
                <div className="pt-2 border-t border-aubergine/20 text-[10px] text-aubergine font-semibold text-center">
                  Today's Agenda
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

