import { WhatsAppMessage, BroadcastCampaign } from "@/types";

export const SEED_WHATSAPP_THREADS: Record<string, WhatsAppMessage[]> = {
  // Siddharth Malhotra (Meta Ad Lead - Godrej Woods)
  "lead-new-1": [
    {
      id: "msg-101",
      leadId: "lead-new-1",
      sender: "CLIENT",
      message:
        "Hi, I saw your Facebook ad for Godrej Woods 3BHK in Sector 43. Can you share the latest pricing and sample flat pictures?",
      timestamp: "2026-09-06T15:40:00Z",
      status: "READ",
    },
    {
      id: "msg-102",
      leadId: "lead-new-1",
      sender: "SYSTEM",
      message:
        "⚡ Automated System Response: Lead routed to Senior Sales Executive Rajesh Sharma (Gurugram Luxury Team).",
      timestamp: "2026-09-06T15:40:05Z",
      status: "READ",
    },
    {
      id: "msg-103",
      leadId: "lead-new-1",
      sender: "AGENT",
      message:
        "Namaste Mr. Siddharth! Thank you for inquiring about *Godrej Woods Sector 43*. I am Rajesh Sharma from the sales team. We have premium 3BHK & 3BHK+S residences overlooking the central greens starting from ₹2.45 Cr.",
      timestamp: "2026-09-06T15:44:20Z",
      status: "READ",
      isTemplate: true,
      templateName: "Initial Inbound Acknowledgment",
    },
    {
      id: "msg-104",
      leadId: "lead-new-1",
      sender: "AGENT",
      message:
        "Here is our complete digital brochure and typical floor plan for Tower Aster 3BHK+Servant (2,150 sq.ft). Let me know if you would like to schedule a private walkthrough this Saturday at 11:30 AM.",
      timestamp: "2026-09-06T15:45:10Z",
      status: "READ",
    },
  ],

  // Meera Krishnan (MagicBricks - Oberoi Sky City)
  "lead-new-2": [
    {
      id: "msg-201",
      leadId: "lead-new-2",
      sender: "CLIENT",
      message:
        "Inquiry from MagicBricks: Interested in 3BHK high floor at Oberoi Sky City Borivali East. Budget ~₹3.5 Cr. Please send payment schedule.",
      timestamp: "2026-09-06T14:15:00Z",
      status: "READ",
    },
    {
      id: "msg-202",
      leadId: "lead-new-2",
      sender: "AGENT",
      message:
        "Namaste Ms. Meera, this is Amit Verma from PropertyBeast. We have Unit A-904 (Tower Celeste, 1,450 sq.ft) on the 9th floor matching your criteria at ₹3.40 Cr. We also have a special 10:90 builder subvention scheme available.",
      timestamp: "2026-09-06T14:22:00Z",
      status: "READ",
    },
  ],

  // Dr. Manish Kulkarni (Oberoi Sky City - Site Visit Scheduled)
  "lead-sv-1": [
    {
      id: "msg-301",
      leadId: "lead-sv-1",
      sender: "AGENT",
      message:
        "Namaste Dr. Kulkarni! Your exclusive site visit to *Oberoi Sky City* is confirmed for today at *4:30 PM IST*. Our site host Amit Verma will receive you at the Club Experience Centre. Valet parking is reserved for your vehicle.",
      timestamp: "2026-09-05T18:05:00Z",
      status: "READ",
      isTemplate: true,
      templateName: "Site Visit Confirmation & Maps Pin",
    },
    {
      id: "msg-302",
      leadId: "lead-sv-1",
      sender: "CLIENT",
      message:
        "Thank you Amit. I will be coming directly from Lilavati Hospital with my spouse. Please ensure sample flat for 3BHK+S is accessible.",
      timestamp: "2026-09-05T19:10:00Z",
      status: "READ",
    },
    {
      id: "msg-303",
      leadId: "lead-sv-1",
      sender: "AGENT",
      message:
        "Absolutely Dr. Kulkarni. Unit B-1701 and the 14th floor show apartment are prepped for your private preview. See you at 4:30 PM!",
      timestamp: "2026-09-05T19:15:00Z",
      status: "READ",
    },
  ],

  // Rajiv Sethi (Negotiation - Godrej Woods)
  "lead-neg-1": [
    {
      id: "msg-401",
      leadId: "lead-neg-1",
      sender: "CLIENT",
      message:
        "Rajesh, we really liked Unit B-1402 on our site visit yesterday. If the developer can offer a 2% festive waiver on floor rise charges, we are ready to sign the booking token this weekend.",
      timestamp: "2026-09-04T14:30:00Z",
      status: "READ",
    },
    {
      id: "msg-402",
      leadId: "lead-neg-1",
      sender: "AGENT",
      message:
        "Good afternoon Mr. Sethi. I have placed Unit B-1402 on exclusive hold for you until Monday. I have submitted your request for the 2% waiver directly to our Managing Director Vivek Singhania for priority approval.",
      timestamp: "2026-09-04T15:10:00Z",
      status: "READ",
    },
    {
      id: "msg-403",
      leadId: "lead-neg-1",
      sender: "CLIENT",
      message:
        "Appreciate the fast turnaround Rajesh. Keep me posted once you have the green light.",
      timestamp: "2026-09-04T15:25:00Z",
      status: "READ",
    },
  ],
};

export const SEED_BROADCAST_CAMPAIGNS: BroadcastCampaign[] = [
  {
    id: "camp-1",
    title: "Diwali Pre-Launch: Zero Stamp Duty & Free Parking",
    targetAudience: "All Active Inquiries (Gurugram & Mumbai)",
    recipientCount: 142,
    templateTitle: "Festive Offer / Zero Stamp Duty",
    status: "COMPLETED",
    deliveredCount: 142,
    readCount: 126,
    repliesCount: 38,
    sentAt: "2026-09-04T10:00:00Z",
  },
  {
    id: "camp-2",
    title: "DLF Camellias: Exclusive Golf Penthouse Preview",
    targetAudience: "Ultra HNI & Investors (Budget > ₹8 Cr)",
    recipientCount: 28,
    templateTitle: "VIP Penthouse Private Viewing",
    status: "COMPLETED",
    deliveredCount: 28,
    readCount: 26,
    repliesCount: 9,
    sentAt: "2026-09-02T14:30:00Z",
  },
  {
    id: "camp-3",
    title: "Godrej Woods: Tower Birch 14th Floor Release",
    targetAudience: "Leads interested in 3BHK & 4BHK",
    recipientCount: 64,
    templateTitle: "Fresh Inventory Release Announcement",
    status: "COMPLETED",
    deliveredCount: 64,
    readCount: 57,
    repliesCount: 16,
    sentAt: "2026-08-28T11:00:00Z",
  },
];
