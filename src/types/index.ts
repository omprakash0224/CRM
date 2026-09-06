export type PersonaRole = "DIRECTOR" | "SALES_MANAGER" | "SALES_EXECUTIVE";

export interface Persona {
  id: string;
  name: string;
  role: PersonaRole;
  title: string;
  avatar: string;
  email: string;
  phone: string;
  permissions: {
    canViewAllLeads: boolean;
    canReassign: boolean;
    canManageInventory: boolean;
    canApprovePayouts: boolean;
    canExportReports: boolean;
  };
}

export type LeadStage =
  | "NEW_LEAD"
  | "CONTACTED"
  | "INTERESTED"
  | "SITE_VISIT_SCHEDULED"
  | "NEGOTIATION"
  | "BOOKING"
  | "CLOSED";

export type LeadSource =
  | "META_ADS"
  | "MAGICBRICKS"
  | "HOUSING_COM"
  | "NINETY_NINE_ACRES"
  | "GOOGLE_ADS"
  | "WALK_IN"
  | "REFERRAL";

export type LeadTag =
  | "Hot"
  | "NRI"
  | "Investor"
  | "High Intent"
  | "Budget Mismatch"
  | "First Time Buyer"
  | "Urgent";

export type ActivityType =
  | "CALL"
  | "WHATSAPP"
  | "SITE_VISIT"
  | "NOTE"
  | "STAGE_CHANGE"
  | "BROCHURE_SENT"
  | "INBOUND_LEAD";

export interface InteractionActivity {
  id: string;
  type: ActivityType;
  description: string;
  timestamp: string;
  agentName: string;
  metadata?: Record<string, any>;
}

export type AiRiskLevel = "LOW" | "MEDIUM" | "HIGH";

export interface AiDealInsight {
  closingProbability: number; // 0 - 100
  riskLevel: AiRiskLevel;
  riskFactor: string;
  mitigationStrategy: string;
  recommendedAction: string;
  competitorInvolved?: string;
}

export type PitchGoal =
  | "RE_ENGAGE"
  | "FESTIVE_DISCOUNT"
  | "OVERCOME_BUDGET"
  | "PUSH_SITE_VISIT"
  | "INVESTOR_ROI"
  | "LOCK_TOKEN";

export type PitchTone =
  | "URGENT_SCARCITY"
  | "INVESTOR_ROI"
  | "CONSULTATIVE"
  | "FESTIVE_OFFER"
  | "PRESTIGE_LUXURY";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: LeadSource;
  stage: LeadStage;
  budgetMin: number;
  budgetMax: number;
  preferredLocation: string;
  preferredBhk: string;
  preferredProject?: string;
  assignedAgentId: string;
  tags: LeadTag[];
  aiScore: number;
  aiIntent: string;
  aiBreakdown?: {
    factor: string;
    points: number;
  }[];
  aiInsight?: AiDealInsight;
  notes?: string;
  interactionHistory: InteractionActivity[];
  nextFollowUpAt?: string;
  isOverdue?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UnitStatus = "AVAILABLE" | "HOLD" | "BOOKED" | "SOLD";
export type UnitType = "2BHK" | "3BHK" | "3BHK+S" | "4BHK" | "Penthouse";

export interface Unit {
  id: string;
  unitNumber: string;
  projectId: string;
  towerId: string;
  towerName: string;
  floor: number;
  bhk: UnitType;
  superBuiltUpArea: number; // in sq.ft
  carpetArea: number; // in sq.ft
  basePrice: number; // in INR
  status: UnitStatus;
  facing: string;
  floorPlanUrl?: string;
  holdExpiresAt?: string;
  bookedByAgentId?: string;
  bookedByLeadId?: string;
}

export interface Tower {
  id: string;
  name: string;
  totalFloors: number;
  unitsPerFloor: number;
}

export interface Project {
  id: string;
  name: string;
  developer: string;
  location: string;
  city: string;
  priceRange: string;
  unitTypes: string[];
  totalUnits: number;
  availableUnits: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  geofenceRadiusMeters: number;
  brochureUrl: string;
  bannerImage: string;
  towers: Tower[];
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
  targetMonthlyRevenue: number;
  closedDealsMonth: number;
  currentRevenueMonth: number;
  conversionRate: number; // percentage, e.g. 14.8
  activeLeadsCount: number;
}

export type SiteVisitStatus = "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "MISSED";

export interface SiteVisit {
  id: string;
  leadId: string;
  leadName: string;
  leadPhone: string;
  projectId: string;
  projectName: string;
  agentId: string;
  agentName: string;
  scheduledAt: string;
  status: SiteVisitStatus;
  gpsVerified: boolean;
  verifiedAt?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  distanceFromSiteMeters?: number;
  clientFeedback?: {
    rating: number;
    unitLiked?: string;
    budgetStatus: "WITHIN_BUDGET" | "STRETCHED" | "OUT_OF_BUDGET";
    objections: string[];
    nextAction: string;
  };
}

export interface WhatsAppMessage {
  id: string;
  leadId: string;
  sender: "AGENT" | "CLIENT" | "SYSTEM";
  message: string;
  timestamp: string;
  status: "SENT" | "DELIVERED" | "READ";
  isTemplate?: boolean;
  templateName?: string;
}

export interface WhatsAppTemplate {
  id: string;
  title: string;
  category: "GREETING" | "BROCHURE" | "SITE_VISIT" | "OFFER";
  previewText: string;
  bodyText: string;
  variables: string[];
}

export interface BroadcastCampaign {
  id: string;
  title: string;
  targetAudience: string;
  recipientCount: number;
  templateTitle: string;
  status: "DRAFT" | "SENDING" | "COMPLETED";
  deliveredCount: number;
  readCount: number;
  repliesCount: number;
  sentAt: string;
}

export type CommissionSlabType =
  | "FLAT_2_5"
  | "TIERED_3_0"
  | "SPLIT_SOURCING_CLOSING";

export type PayoutStatus = "PENDING_BUILDER" | "APPROVED" | "DISBURSED";

export interface Deal {
  id: string;
  leadId: string;
  clientName: string;
  clientPhone: string;
  projectId: string;
  projectName: string;
  unitId: string;
  unitNumber: string;
  unitType: string;
  agreementValue: number; // in INR e.g. 25000000 (2.5 Cr)
  commissionRate: number; // percentage e.g. 2.5, 3.0
  slabType: CommissionSlabType;
  totalCommission: number; // in INR
  agencyShare: number; // in INR
  agentShare: number; // in INR
  agentId: string;
  agentName: string;
  status: PayoutStatus;
  utrReference?: string;
  disbursedAt?: string;
  createdAt: string;
  gstAmount: number; // 18% GST on total brokerage
  tdsAmount: number; // 5% TDS under Section 194H
  netPayoutToAgent: number; // agentShare - tdsAmount
}

