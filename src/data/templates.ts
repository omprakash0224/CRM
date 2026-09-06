import { WhatsAppTemplate } from "@/types";

export const SEED_WHATSAPP_TEMPLATES: WhatsAppTemplate[] = [
  {
    id: "tpl-intro-brochure",
    title: "1. Digital Brochure & Floor Plans",
    category: "BROCHURE",
    previewText: "Namaste {{1}}, thank you for your interest in {{2}}...",
    bodyText:
      "Namaste {{1}},\n\nThank you for connecting with PropertyBeast regarding *{{2}}*. As requested, please find attached our comprehensive project brochure, typical floor plans, and construction walkthrough.\n\nKey Highlights:\n- Prime Location: {{3}}\n- Configurations: 2, 3 & 4 BHK Luxury Residences\n- Possession Timeline: Dec 2026\n\nWould you like to schedule an exclusive sample flat viewing this weekend?\n\nWarm regards,\n*{{4}}* | PropertyBeast Luxury Team",
    variables: ["LeadName", "ProjectName", "Location", "AgentName"],
  },
  {
    id: "tpl-visit-confirm",
    title: "2. Site Visit Confirmation & Google Map Pin",
    category: "SITE_VISIT",
    previewText: "Your site visit to {{1}} is confirmed for {{2}}...",
    bodyText:
      "Namaste {{1}},\n\nYour private site visit to *{{2}}* has been confirmed!\n\n📅 Date & Time: *{{3}}*\n📍 Site Location: {{4}}\n🚘 Dedicated Site Host: *{{5}}* ({{6}})\n\nOur hospitality team will welcome you at the Club Experience Centre with reserved valet parking.\n\nSee you soon!",
    variables: ["LeadName", "ProjectName", "DateTime", "MapsLink", "AgentName", "AgentPhone"],
  },
  {
    id: "tpl-price-alert",
    title: "3. Festive Offer / Floor Rise Waiver",
    category: "OFFER",
    previewText: "Special Festive Advantage on {{1}} for this week...",
    bodyText:
      "Hello {{1}},\n\nExclusive update on *{{2}}*: We have just launched a limited-period festival advantage for pre-approved buyers:\n\n✨ *Zero Stamp Duty* (Builder absorption)\n✨ *Complimentary 1-Year Clubhouse Membership*\n✨ *Flexible 20:80 Payment Plan*\n\nValid only on select 3BHK & 4BHK units until Sunday. Would you like me to hold a high-floor unit for you?",
    variables: ["LeadName", "ProjectName"],
  },
  {
    id: "tpl-followup-inquiry",
    title: "4. Quick Follow-Up & Consultation",
    category: "GREETING",
    previewText: "Following up regarding your recent inquiry on {{1}}...",
    bodyText:
      "Hi {{1}},\n\nThis is {{2}} from PropertyBeast. I'm checking in regarding your inquiry for *{{3}}*.\n\nI understand you are looking for a {{4}} in the budget range of {{5}}. We have 2 prime units matching your exact criteria that just became available today.\n\nLet me know if 11:30 AM tomorrow works for a quick 5-minute phone call to review the cost sheets.",
    variables: ["LeadName", "AgentName", "ProjectName", "BhkType", "BudgetRange"],
  },
];
