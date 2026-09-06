export interface LeadSourceStat {
  source: string;
  sourceKey: string;
  leads: number;
  spend: number; // INR
  closedDeals: number;
  revenue: number; // INR
  cpl: number; // Cost per lead INR
  cac: number; // Customer acquisition cost INR
  roas: number; // Return on ad spend multiplier (x)
  color: string;
}

export const SEED_LEAD_SOURCE_STATS: LeadSourceStat[] = [
  {
    source: "Meta Ads (FB/IG)",
    sourceKey: "META_ADS",
    leads: 480,
    spend: 420000,
    closedDeals: 14,
    revenue: 425000000, // ₹42.5 Cr
    cpl: 875,
    cac: 30000,
    roas: 101.2,
    color: "#3b82f6",
  },
  {
    source: "MagicBricks",
    sourceKey: "MAGICBRICKS",
    leads: 320,
    spend: 280000,
    closedDeals: 9,
    revenue: 260000000,
    cpl: 875,
    cac: 31111,
    roas: 92.8,
    color: "#ef4444",
  },
  {
    source: "Google Search Ads",
    sourceKey: "GOOGLE_ADS",
    leads: 210,
    spend: 340000,
    closedDeals: 7,
    revenue: 215000000,
    cpl: 1619,
    cac: 48571,
    roas: 63.2,
    color: "#10b981",
  },
  {
    source: "Housing & 99acres",
    sourceKey: "HOUSING_COM",
    leads: 180,
    spend: 190000,
    closedDeals: 5,
    revenue: 140000000,
    cpl: 1055,
    cac: 38000,
    roas: 73.6,
    color: "#f59e0b",
  },
  {
    source: "Direct Referral / Walk-in",
    sourceKey: "REFERRAL",
    leads: 95,
    spend: 0,
    closedDeals: 11,
    revenue: 385000000,
    cpl: 0,
    cac: 0,
    roas: 999.0, // Infinite
    color: "#8b5cf6",
  },
];

export const SEED_FUNNEL_STATS = [
  { stage: "Inbound Leads", count: 1285, pct: 100, dropPct: 0, color: "#3b82f6" },
  { stage: "Contacted & Qualified", count: 874, pct: 68, dropPct: 32, color: "#06b6d4" },
  { stage: "Site Visits Scheduled", count: 488, pct: 38, dropPct: 44.2, color: "#8b5cf6" },
  { stage: "Active Negotiation", count: 231, pct: 18, dropPct: 52.7, color: "#f59e0b" },
  { stage: "Booking Token Received", count: 102, pct: 8, dropPct: 55.8, color: "#10b981" },
  { stage: "Deals Closed", count: 46, pct: 3.6, dropPct: 54.9, color: "#059669" },
];

export const SEED_MONTHLY_REVENUE = [
  { month: "Apr 2026", target: 40, actual: 44.5, deals: 8 },
  { month: "May 2026", target: 45, actual: 48.2, deals: 9 },
  { month: "Jun 2026", target: 50, actual: 52.8, deals: 11 },
  { month: "Jul 2026", target: 55, actual: 51.0, deals: 9 },
  { month: "Aug 2026", target: 60, actual: 64.8, deals: 14 },
  { month: "Sep 2026 (MTD)", target: 65, actual: 42.8, deals: 7 },
];

export const SEED_BOARD_SUMMARY = {
  fiscalQuarter: "Q2 / Q3 FY 2026-27",
  grossPipelineValue: 1425000000, // ₹142.5 Cr
  grossRevenueBooked: 304100000, // ₹30.41 Cr
  totalAdSpend: 1230000, // ₹12.3 Lakhs
  overallBlendedRoas: "87.4x",
  averageTicketSize: 31200000, // ₹3.12 Cr
  ceoCommentary:
    "Q2 luxury sales demonstrated unprecedented momentum with Gurugram Golf Course corridor and Mumbai Western Suburbs driving 74% of closed deal value. PropertyBeast CRM eliminated lead response latency down from 4.2 hours to 6 minutes, driving an extraordinary 101.2x ROAS on Meta Ad campaigns.",
  topPerformingProject: "DLF The Camellias (Golf Course Road)",
  topPerformingAgent: "Priya Mehta (₹18.4 Cr Booked Revenue)",
};
