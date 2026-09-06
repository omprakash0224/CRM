import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format Indian currency into Crores (Cr) or Lakhs (L)
 * e.g., 25000000 -> "₹2.50 Cr", 8500000 -> "₹85.0 L"
 */
export function formatCurrencyINR(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    const l = amount / 100000;
    return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(1)} L`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumberINR(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}

export function formatDate(date: string | Date): string {
  return dayjs(date).format("DD MMM YYYY");
}

export function formatDateTime(date: string | Date): string {
  return dayjs(date).format("DD MMM, hh:mm A");
}

export function formatRelativeTime(date: string | Date): string {
  return dayjs(date).fromNow();
}

export function getLeadStageLabel(stage: string): string {
  switch (stage) {
    case "NEW_LEAD":
      return "New Lead";
    case "CONTACTED":
      return "Contacted";
    case "INTERESTED":
      return "Interested";
    case "SITE_VISIT_SCHEDULED":
      return "Site Visit Scheduled";
    case "NEGOTIATION":
      return "Negotiation";
    case "BOOKING":
      return "Booking";
    case "CLOSED":
      return "Closed Won";
    default:
      return stage;
  }
}

export function getLeadStageColor(stage: string): { bg: string; text: string; border: string } {
  switch (stage) {
    case "NEW_LEAD":
      return { bg: "bg-[#eef5fc]", text: "text-[#1264a3]", border: "border-[#d0e3f8]" };
    case "CONTACTED":
      return { bg: "bg-[#f9f0ff]", text: "text-[#4a154b]", border: "border-[#ebd6f7]" };
    case "INTERESTED":
      return { bg: "bg-[#fff0e6]", text: "text-[#b25e00]", border: "border-[#fed7aa]" };
    case "SITE_VISIT_SCHEDULED":
      return { bg: "bg-[#f3e8ff]", text: "text-[#6b21a8]", border: "border-[#e9d5ff]" };
    case "NEGOTIATION":
      return { bg: "bg-[#fef3c7]", text: "text-[#92400e]", border: "border-[#fde68a]" };
    case "BOOKING":
      return { bg: "bg-[#4a154b]", text: "text-[#ffffff]", border: "border-[#4a154b]" };
    case "CLOSED":
      return { bg: "bg-[#ecfdf5]", text: "text-[#007a5a]", border: "border-[#a7f3d0]" };
    default:
      return { bg: "bg-[#f4ede4]", text: "text-[#1d1d1d]", border: "border-[#e6e6e6]" };
  }
}

export function getUnitStatusColor(status: string): { bg: string; text: string; border: string } {
  switch (status) {
    case "AVAILABLE":
      return { bg: "bg-[#ecfdf5]", text: "text-[#007a5a]", border: "border-[#a7f3d0]" };
    case "HOLD":
      return { bg: "bg-[#fef3c7]", text: "text-[#b45309]", border: "border-[#fde68a]" };
    case "BOOKED":
      return { bg: "bg-[#eff6ff]", text: "text-[#1264a3]", border: "border-[#bfdbfe]" };
    case "SOLD":
      return { bg: "bg-[#fef2f2]", text: "text-[#cc4117]", border: "border-[#fecaca]" };
    default:
      return { bg: "bg-[#f4ede4]", text: "text-[#1d1d1d]", border: "border-[#e6e6e6]" };
  }
}

export function getAiScoreBadgeColor(score: number): { bg: string; text: string; label: string } {
  if (score >= 80) {
    return { bg: "bg-[#ecfdf5] text-[#007a5a] border border-[#a7f3d0]", text: "text-[#007a5a]", label: "Hot Lead" };
  }
  if (score >= 60) {
    return { bg: "bg-[#fff0e6] text-[#b25e00] border border-[#fed7aa]", text: "text-[#b25e00]", label: "Warm" };
  }
  return { bg: "bg-[#fef2f2] text-[#cc4117] border border-[#fecaca]", text: "text-[#cc4117]", label: "Cold" };
}
