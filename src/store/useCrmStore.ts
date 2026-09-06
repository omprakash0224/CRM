import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  Agent,
  BroadcastCampaign,
  Deal,
  InteractionActivity,
  Lead,
  LeadSource,
  LeadStage,
  Persona,
  Project,
  SiteVisit,
  Unit,
  UnitStatus,
  WhatsAppMessage,
} from "@/types";
import { SEED_AGENTS, SEED_PERSONAS } from "@/data/agents";
import { SEED_PROJECTS, SEED_UNITS } from "@/data/projects";
import { SEED_LEADS } from "@/data/leads";
import { SEED_SITE_VISITS } from "@/data/visits";
import {
  SEED_WHATSAPP_THREADS,
  SEED_BROADCAST_CAMPAIGNS,
} from "@/data/messages";
import { SEED_DEALS } from "@/data/deals";

interface CrmState {
  currentPersonaId: string;
  personas: Persona[];
  agents: Agent[];
  projects: Project[];
  units: Unit[];
  leads: Lead[];
  visits: SiteVisit[];
  deals: Deal[];
  quickSearchQuery: string;
  notificationMessage: string | null;
  threads: Record<string, WhatsAppMessage[]>;
  campaigns: BroadcastCampaign[];

  // Actions
  setPersona: (personaId: string) => void;
  setQuickSearchQuery: (query: string) => void;
  setNotification: (msg: string | null) => void;

  // Deal & Commission Actions
  closeDeal: (
    dealData: Omit<
      Deal,
      "id" | "createdAt" | "status" | "gstAmount" | "tdsAmount" | "netPayoutToAgent"
    >
  ) => Deal;
  approvePayout: (dealId: string) => void;
  disbursePayout: (dealId: string, utr?: string) => void;

  // WhatsApp Actions
  sendWhatsAppMessage: (
    leadId: string,
    message: string,
    isTemplate?: boolean,
    templateName?: string
  ) => void;
  simulateClientReply: (leadId: string, replyText?: string) => void;
  launchBroadcastCampaign: (
    campaignData: Omit<
      BroadcastCampaign,
      "id" | "deliveredCount" | "readCount" | "repliesCount" | "sentAt"
    >
  ) => BroadcastCampaign;

  // Lead Actions
  addLead: (lead: Omit<Lead, "id" | "createdAt" | "updatedAt">) => Lead;
  updateLeadStage: (leadId: string, newStage: LeadStage) => void;
  updateLead: (leadId: string, updates: Partial<Lead>) => void;
  assignLead: (leadId: string, agentId: string) => void;
  addLeadActivity: (
    leadId: string,
    activity: Omit<InteractionActivity, "id" | "timestamp">
  ) => void;

  // Unit & Inventory Actions
  updateUnitStatus: (
    unitId: string,
    status: UnitStatus,
    extra?: {
      bookedByAgentId?: string;
      bookedByLeadId?: string;
      holdExpiresAt?: string;
    }
  ) => void;

  // Site Visit Actions
  addSiteVisit: (visit: Omit<SiteVisit, "id">) => void;
  completeGpsCheckIn: (
    visitId: string,
    coords: { lat: number; lng: number },
    distanceMeters: number
  ) => void;
  submitVisitFeedback: (
    visitId: string,
    feedback: NonNullable<SiteVisit["clientFeedback"]>
  ) => void;

  // Simulation & Reset Actions
  simulateInboundLead: (source?: LeadSource) => Lead;
  resetDemoData: () => void;
}

export const useCrmStore = create<CrmState>()(
  persist(
    (set, get) => ({
      currentPersonaId: "persona-director",
      personas: SEED_PERSONAS,
      agents: SEED_AGENTS,
      projects: SEED_PROJECTS,
      units: SEED_UNITS,
      leads: SEED_LEADS,
      visits: SEED_SITE_VISITS,
      quickSearchQuery: "",
      notificationMessage: null,
      threads: SEED_WHATSAPP_THREADS,
      campaigns: SEED_BROADCAST_CAMPAIGNS,
      deals: SEED_DEALS,

      setPersona: (personaId: string) => {
        set({ currentPersonaId: personaId });
      },

      setQuickSearchQuery: (query: string) => {
        set({ quickSearchQuery: query });
      },

      setNotification: (msg: string | null) => {
        set({ notificationMessage: msg });
      },

      closeDeal: (dealData) => {
        const id = `deal-${Date.now()}`;
        const now = new Date().toISOString();
        const gstAmount = Math.round(dealData.totalCommission * 0.18);
        const tdsAmount = Math.round(dealData.agentShare * 0.05);
        const netPayoutToAgent = dealData.agentShare - tdsAmount;

        const newDeal: Deal = {
          ...dealData,
          id,
          status: "APPROVED",
          gstAmount,
          tdsAmount,
          netPayoutToAgent,
          createdAt: now,
        };

        set((state) => ({
          deals: [newDeal, ...state.deals],
          leads: state.leads.map((l) =>
            l.id === dealData.leadId
              ? { ...l, stage: "CLOSED" as const, updatedAt: now }
              : l
          ),
          units: state.units.map((u) =>
            u.id === dealData.unitId
              ? {
                  ...u,
                  status: "SOLD" as const,
                  bookedByAgentId: dealData.agentId,
                }
              : u
          ),
          agents: state.agents.map((a) =>
            a.id === dealData.agentId
              ? {
                  ...a,
                  closedDealsMonth: a.closedDealsMonth + 1,
                  currentRevenueMonth:
                    a.currentRevenueMonth + dealData.agreementValue,
                }
              : a
          ),
          notificationMessage: `🎉 Deal Closed! ${dealData.clientName} booked ${dealData.unitNumber} at ${dealData.projectName} (₹${(dealData.agreementValue / 10000000).toFixed(2)} Cr)!`,
        }));

        get().addLeadActivity(dealData.leadId, {
          type: "STAGE_CHANGE",
          description: `Deal closed for Unit ${dealData.unitNumber} at ${dealData.projectName}. Total Agreement: ₹${(dealData.agreementValue / 10000000).toFixed(2)} Cr. Brokerage: ₹${(dealData.totalCommission / 100000).toFixed(2)} L.`,
          agentName: dealData.agentName,
        });

        return newDeal;
      },

      approvePayout: (dealId) => {
        set((state) => ({
          deals: state.deals.map((d) =>
            d.id === dealId ? { ...d, status: "APPROVED" as const } : d
          ),
          notificationMessage: `✓ Payout approved for deal #${dealId}!`,
        }));
      },

      disbursePayout: (dealId, utr) => {
        const now = new Date().toISOString();
        const generatedUtr =
          utr ||
          `UTR-HDFC-${Math.floor(100000 + Math.random() * 900000)}`;

        set((state) => {
          const targetDeal = state.deals.find((d) => d.id === dealId);
          return {
            deals: state.deals.map((d) =>
              d.id === dealId
                ? {
                    ...d,
                    status: "DISBURSED" as const,
                    utrReference: generatedUtr,
                    disbursedAt: now,
                  }
                : d
            ),
            notificationMessage: `💸 Payout disbursed! ₹${(
              (targetDeal?.netPayoutToAgent || 0) / 100000
            ).toFixed(2)} L transferred via ${generatedUtr}.`,
          };
        });
      },

      sendWhatsAppMessage: (leadId, messageText, isTemplate = false, templateName) => {
        const now = new Date().toISOString();
        const newMessage: WhatsAppMessage = {
          id: `msg-${Date.now()}`,
          leadId,
          sender: "AGENT",
          message: messageText,
          timestamp: now,
          status: "READ",
          isTemplate,
          templateName,
        };

        set((state) => {
          const currentThread = state.threads[leadId] || [];
          return {
            threads: {
              ...state.threads,
              [leadId]: [...currentThread, newMessage],
            },
          };
        });

        // Also log activity to lead
        get().addLeadActivity(leadId, {
          type: "WHATSAPP",
          description: isTemplate
            ? `Dispatched WhatsApp Template: ${templateName || "Approved Template"}`
            : `Sent WhatsApp Message: "${messageText.slice(0, 50)}..."`,
          agentName: "Rajesh Sharma",
        });
      },

      simulateClientReply: (leadId, replyText) => {
        const sampleReplies = [
          "Thank you for sharing! Saturday 11:30 AM works well for sample flat viewing.",
          "Could you please share the cost sheet with 10:90 payment plan?",
          "We visited the site yesterday. Loved the clubhouse! When can we discuss final pricing?",
          "Can you send the high-res floor plan for the 3BHK+S unit?",
        ];
        const text =
          replyText ||
          sampleReplies[Math.floor(Math.random() * sampleReplies.length)];
        const now = new Date().toISOString();

        const newMsg: WhatsAppMessage = {
          id: `msg-in-${Date.now()}`,
          leadId,
          sender: "CLIENT",
          message: text,
          timestamp: now,
          status: "READ",
        };

        const lead = get().leads.find((l) => l.id === leadId);

        set((state) => {
          const currentThread = state.threads[leadId] || [];
          return {
            threads: {
              ...state.threads,
              [leadId]: [...currentThread, newMsg],
            },
            notificationMessage: `💬 Inbound WhatsApp from ${
              lead?.name || "Client"
            }: "${text.slice(0, 40)}..."`,
          };
        });

        get().addLeadActivity(leadId, {
          type: "WHATSAPP",
          description: `Inbound WhatsApp Message: "${text}"`,
          agentName: "Client Inbound",
        });
      },

      launchBroadcastCampaign: (campaignData) => {
        const now = new Date().toISOString();
        const id = `camp-${Date.now()}`;
        const newCampaign: BroadcastCampaign = {
          ...campaignData,
          id,
          status: "COMPLETED",
          deliveredCount: campaignData.recipientCount,
          readCount: Math.round(campaignData.recipientCount * 0.89),
          repliesCount: Math.round(campaignData.recipientCount * 0.28),
          sentAt: now,
        };

        set((state) => ({
          campaigns: [newCampaign, ...state.campaigns],
          notificationMessage: `📢 Broadcast Campaign "${newCampaign.title}" delivered to ${newCampaign.recipientCount} prospects!`,
        }));

        return newCampaign;
      },

      addLead: (leadData) => {
        const id = `lead-${Date.now()}`;
        const now = new Date().toISOString();
        const newLead: Lead = {
          ...leadData,
          id,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          leads: [newLead, ...state.leads],
        }));
        return newLead;
      },

      updateLeadStage: (leadId, newStage) => {
        const now = new Date().toISOString();
        set((state) => ({
          leads: state.leads.map((lead) => {
            if (lead.id !== leadId) return lead;
            const newActivity: InteractionActivity = {
              id: `act-${Date.now()}`,
              type: "STAGE_CHANGE",
              description: `Stage moved from ${lead.stage} to ${newStage}`,
              timestamp: now,
              agentName:
                state.personas.find((p) => p.id === state.currentPersonaId)
                  ?.name || "System",
            };
            return {
              ...lead,
              stage: newStage,
              updatedAt: now,
              interactionHistory: [newActivity, ...lead.interactionHistory],
            };
          }),
        }));
      },

      updateLead: (leadId, updates) => {
        const now = new Date().toISOString();
        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === leadId ? { ...lead, ...updates, updatedAt: now } : lead
          ),
        }));
      },

      assignLead: (leadId, agentId) => {
        const now = new Date().toISOString();
        set((state) => {
          const agent = state.agents.find((a) => a.id === agentId);
          return {
            leads: state.leads.map((lead) => {
              if (lead.id !== leadId) return lead;
              const newActivity: InteractionActivity = {
                id: `act-${Date.now()}`,
                type: "STAGE_CHANGE",
                description: `Lead assigned to ${agent?.name || "Agent"}`,
                timestamp: now,
                agentName:
                  state.personas.find((p) => p.id === state.currentPersonaId)
                    ?.name || "System",
              };
              return {
                ...lead,
                assignedAgentId: agentId,
                updatedAt: now,
                interactionHistory: [newActivity, ...lead.interactionHistory],
              };
            }),
          };
        });
      },

      addLeadActivity: (leadId, activityData) => {
        const now = new Date().toISOString();
        const activity: InteractionActivity = {
          ...activityData,
          id: `act-${Date.now()}`,
          timestamp: now,
        };
        set((state) => ({
          leads: state.leads.map((lead) =>
            lead.id === leadId
              ? {
                  ...lead,
                  updatedAt: now,
                  interactionHistory: [activity, ...lead.interactionHistory],
                }
              : lead
          ),
        }));
      },

      updateUnitStatus: (unitId, status, extra) => {
        set((state) => {
          const updatedUnits = state.units.map((unit) => {
            if (unit.id !== unitId) return unit;
            return {
              ...unit,
              status,
              ...(extra?.bookedByAgentId && {
                bookedByAgentId: extra.bookedByAgentId,
              }),
              ...(extra?.bookedByLeadId && {
                bookedByLeadId: extra.bookedByLeadId,
              }),
              ...(extra?.holdExpiresAt && {
                holdExpiresAt: extra.holdExpiresAt,
              }),
            };
          });

          // Also re-calculate available units per project
          const updatedProjects = state.projects.map((proj) => {
            const avail = updatedUnits.filter(
              (u) => u.projectId === proj.id && u.status === "AVAILABLE"
            ).length;
            return { ...proj, availableUnits: avail };
          });

          return { units: updatedUnits, projects: updatedProjects };
        });
      },

      addSiteVisit: (visitData) => {
        const newVisit: SiteVisit = {
          ...visitData,
          id: `visit-${Date.now()}`,
        };
        set((state) => ({
          visits: [newVisit, ...state.visits],
        }));
      },

      completeGpsCheckIn: (visitId, coords, distanceMeters) => {
        const now = new Date().toISOString();
        set((state) => ({
          visits: state.visits.map((v) =>
            v.id === visitId
              ? {
                  ...v,
                  status: "COMPLETED" as const,
                  gpsVerified: true,
                  verifiedAt: now,
                  coordinates: coords,
                  distanceFromSiteMeters: distanceMeters,
                }
              : v
          ),
        }));
      },

      submitVisitFeedback: (visitId, feedback) => {
        set((state) => ({
          visits: state.visits.map((v) =>
            v.id === visitId ? { ...v, clientFeedback: feedback } : v
          ),
        }));
      },

      simulateInboundLead: (source = "META_ADS") => {
        const sampleNames = [
          "Aditya Singhania",
          "Kavita Deshmukh",
          "Rahul & Neha Kapoor",
          "Dr. Sunita Rao",
          "Gautam Mehra",
          "Aarav Mittal",
        ];
        const randomName =
          sampleNames[Math.floor(Math.random() * sampleNames.length)];
        const randomPhone = `+91 98${Math.floor(
          10000000 + Math.random() * 90000000
        )}`;
        const now = new Date().toISOString();

        // Round-robin assignment to Rajesh Sharma or Priya Mehta
        const assignedAgentId = Math.random() > 0.5 ? "agent-1" : "agent-2";

        const newLead: Lead = {
          id: `lead-sim-${Date.now()}`,
          name: randomName,
          phone: randomPhone,
          email: `${randomName.toLowerCase().replace(/[^a-z]/g, "")}@gmail.com`,
          source,
          stage: "NEW_LEAD",
          budgetMin: 22000000,
          budgetMax: 35000000,
          preferredLocation: "Sector 43, Gurugram",
          preferredBhk: "3BHK",
          preferredProject: "Godrej Woods",
          assignedAgentId,
          tags: ["Hot", "High Intent"],
          aiScore: Math.floor(82 + Math.random() * 15),
          aiIntent:
            "Instant Ad Form Inquiry: Clicked 'Book Exclusive 3BHK Preview' on Facebook.",
          aiBreakdown: [
            { factor: "Fresh inquiry captured via Meta Lead Ads", points: 35 },
            { factor: "Budget matches active inventory", points: 30 },
            { factor: "Instant lead engagement priority", points: 25 },
          ],
          notes: `Simulated inbound lead captured from ${source} at ${new Date().toLocaleTimeString()}`,
          interactionHistory: [
            {
              id: `act-${Date.now()}`,
              type: "INBOUND_LEAD",
              description: `Real-time capture from ${source} Campaign`,
              timestamp: now,
              agentName: "Meta Lead Ads Webhook",
            },
            {
              id: `act-${Date.now() + 1}`,
              type: "STAGE_CHANGE",
              description: `Auto-routed via Round-Robin to ${
                assignedAgentId === "agent-1" ? "Rajesh Sharma" : "Priya Mehta"
              }`,
              timestamp: now,
              agentName: "Smart Dispatcher",
            },
          ],
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          leads: [newLead, ...state.leads],
          notificationMessage: `⚡ New Inbound Lead Captured: ${newLead.name} (${newLead.preferredProject}) assigned to ${
            assignedAgentId === "agent-1" ? "Rajesh Sharma" : "Priya Mehta"
          }`,
        }));

        return newLead;
      },

      resetDemoData: () => {
        set({
          currentPersonaId: "persona-director",
          personas: SEED_PERSONAS,
          agents: SEED_AGENTS,
          projects: SEED_PROJECTS,
          units: SEED_UNITS,
          leads: SEED_LEADS,
          visits: SEED_SITE_VISITS,
          threads: SEED_WHATSAPP_THREADS,
          campaigns: SEED_BROADCAST_CAMPAIGNS,
          deals: SEED_DEALS,
          quickSearchQuery: "",
          notificationMessage: "Demo data reset successfully to default state!",
        });
      },
    }),
    {
      name: "propertybeast_crm_state_v1",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
