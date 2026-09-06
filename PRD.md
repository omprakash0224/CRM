# PropertyBeast CRM — Product Requirements Document (PRD)

> **Document Type:** Internal Product Requirements Document
> **Product:** PropertyBeast CRM
> **Version:** 1.0
> **Date:** September 2026
> **Scope:** Internal tool for a single real estate company (not a SaaS product)
> **Status:** Draft

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Goals & Non-Goals](#3-goals--non-goals)
4. [User Personas](#4-user-personas)
5. [Feature Requirements](#5-feature-requirements)
   - 5.1 [Dashboard & Command Center](#51-dashboard--command-center)
   - 5.2 [Lead Management & Pipeline](#52-lead-management--pipeline)
   - 5.3 [Property Inventory Management](#53-property-inventory-management)
   - 5.4 [Site Visit Management](#54-site-visit-management)
   - 5.5 [WhatsApp CRM Integration](#55-whatsapp-crm-integration)
   - 5.6 [AI Sales Assistant](#56-ai-sales-assistant)
   - 5.7 [Agent Management & Leaderboard](#57-agent-management--leaderboard)
   - 5.8 [Commission & Payout Tracker](#58-commission--payout-tracker)
   - 5.9 [Analytics & Business Intelligence](#59-analytics--business-intelligence)
   - 5.10 [Mobile Application](#510-mobile-application)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Technical Architecture Considerations](#7-technical-architecture-considerations)
8. [Phased Roadmap](#8-phased-roadmap)
9. [Success Metrics & KPIs](#9-success-metrics--kpis)
10. [Open Questions & Decisions](#10-open-questions--decisions)

---

## 1. Executive Summary

PropertyBeast CRM is an **internal sales management tool** built exclusively for our real estate company. It is designed to centralize lead management, property inventory, agent operations, and business intelligence into a single platform — replacing fragmented spreadsheets, personal phone logs, and disconnected tools.

This tool is **not** a SaaS product sold to external customers. It will be deployed, maintained, and used solely by our internal team: sales agents, team leaders, operations staff, and management.

The primary outcomes expected are:
- Zero lead leakage from any inbound channel
- Full pipeline visibility for management
- Reduced manual admin work for agents
- Data-driven decision-making via real-time analytics

---

## 2. Problem Statement

Our company currently faces critical operational inefficiencies that directly impact revenue:

| Pain Point | Impact |
|:---|:---|
| **Missed Follow-Ups** | ~71% of interested buyers disengage due to delayed agent responses |
| **Lead Leakage** | Leads from Facebook Ads, MagicBricks, 99acres, and Housing.com are not centrally captured and frequently go unassigned |
| **No Central Data Store** | Property details and client information are scattered across personal phones, WhatsApp chats, and notebooks |
| **No Team Visibility** | Management has zero real-time insight into agent activity — site visits, calls made, or pipeline stage |
| **Low Conversion Rate** | Agents spend equal time on cold and hot leads due to absence of any lead scoring mechanism |
| **Error-Prone Manual Systems** | Excel-based tracking causes duplicate outreach, lost interaction notes, and high operational chaos |

These issues cumulatively result in lost deals, poor agent accountability, and inability to accurately forecast revenue.

---

## 3. Goals & Non-Goals

### Goals

- Provide a **single source of truth** for all leads, properties, and client interactions
- **Automate lead capture and assignment** from all inbound channels (portals, ads, walk-ins)
- Enable **real-time pipeline tracking** for agents and management
- **Centralize property inventory** — units, pricing, availability, floor plans, and documents
- **Track agent field activity** via GPS-verified site visit check-ins
- **Automate WhatsApp communication** for follow-ups, brochures, and reminders
- Surface **AI-driven insights** to help agents prioritize and convert high-intent leads
- Provide **commission and payout tracking** against closed deals
- Deliver a **mobile-first experience** for agents working in the field

### Non-Goals

- **This is NOT a SaaS product.** It will not be sold, licensed, or made accessible to external brokers, builders, or channel partners outside our company.
- **No multi-tenant architecture.** All data belongs to a single company instance.
- **No subscription tiers or billing modules.** There are no plans, pricing, or payment flows.
- **No white-labeling.** This tool is for our internal brand and operations only.
- **No public-facing customer portal** (at this stage).
- **Not a general-purpose CRM.** All features are scoped specifically to real estate workflows.

---

## 4. User Personas

### Sales Agent / Executive
- **Who:** Front-line sales staff managing client relationships day-to-day
- **Goals:** Get new leads quickly, log call notes easily, schedule and track site visits, send property details via WhatsApp
- **Pain Points:** Manually entering data, not knowing which leads to prioritize, forgetting follow-ups
- **Key Features Needed:** Lead cards, pipeline view, WhatsApp integration, mobile app, reminder alerts

### Team Leader / Sales Manager
- **Who:** Manages a team of 5–20 agents; responsible for conversion targets
- **Goals:** Assign leads optimally, monitor team activity, identify underperforming agents
- **Pain Points:** No visibility into what agents are doing in the field, no way to measure individual output
- **Key Features Needed:** Leaderboard, agent activity logs, pipeline overview, site visit reports

### Operations / Admin Staff
- **Who:** Manages data entry, property inventory updates, and internal coordination
- **Goals:** Keep property listings and pricing up to date, manage documents, ensure data hygiene
- **Pain Points:** Multiple people updating different copies of an Excel sheet
- **Key Features Needed:** Inventory management module, document uploads, bulk data tools

### Management / Director
- **Who:** Company owner or senior leadership; focused on revenue and strategy
- **Goals:** Real-time revenue visibility, ROI by lead source, commission payouts, forecasting
- **Pain Points:** Receiving stale, manually compiled reports; no real-time insight
- **Key Features Needed:** Executive dashboard, analytics, commission tracker, export reports

---

## 5. Feature Requirements

---

### 5.1 Dashboard & Command Center

**Description:** A real-time overview of the entire sales engine, visible to team leaders and management.

#### Requirements

| ID | Requirement | Priority |
|:---|:---|:---|
| D-01 | Display total active leads count (filterable by date range, source, status) | P0 |
| D-02 | Show new leads and site visits received today | P0 |
| D-03 | Show pipeline value (total deal value in negotiation and booking stages) | P0 |
| D-04 | Highlight pending follow-ups that are overdue (past scheduled call time) | P0 |
| D-05 | Display agent leaderboard with conversion rates for the current month | P1 |
| D-06 | Show quick-access shortcuts to common actions (add lead, add property, schedule visit) | P1 |
| D-07 | Role-based dashboard views — agents see their own data; managers see team-wide data | P0 |

---

### 5.2 Lead Management & Pipeline

**Description:** End-to-end tracking of every prospect from first inquiry to closed deal.

#### Pipeline Stages

```
New Lead → Contacted → Interested → Site Visit Scheduled → Negotiation → Booking → Closed
```

#### Lead Capture Requirements

| ID | Requirement | Priority |
|:---|:---|:---|
| LM-01 | Auto-capture leads from Facebook / Meta Lead Ads via webhook or API integration | P0 |
| LM-02 | Auto-capture leads from MagicBricks, Housing.com, and 99acres via email parser or API | P0 |
| LM-03 | Auto-capture leads from Google Ads (via CRM lead form integration) | P1 |
| LM-04 | Support manual lead entry by admin and agents (walk-in, referral, phone call) | P0 |
| LM-05 | Each lead record must capture: Name, Phone, Email, Source, Project Interest, Budget, Location Preference, Notes | P0 |

#### Lead Assignment Requirements

| ID | Requirement | Priority |
|:---|:---|:---|
| LM-06 | Auto-assign new leads via round-robin distribution to online/available agents | P0 |
| LM-07 | Support location-based or project-based assignment rules configurable by admin | P1 |
| LM-08 | Allow manual re-assignment by team leaders with an audit trail | P0 |
| LM-09 | Notify assigned agent immediately via push notification and/or WhatsApp | P0 |

#### Lead Nurturing Requirements

| ID | Requirement | Priority |
|:---|:---|:---|
| LM-10 | Agents can log call notes, emails, and interactions directly on the lead card | P0 |
| LM-11 | Agents can set follow-up reminders with date/time; system sends push notifications | P0 |
| LM-12 | Show full interaction history (chronological timeline) on each lead card | P0 |
| LM-13 | Agents can move leads across pipeline stages manually via drag-and-drop or dropdown | P0 |
| LM-14 | Auto-flag leads with no activity in the last 3/7/14 days (configurable) | P1 |
| LM-15 | Support lead tagging (e.g., "Hot", "Budget Mismatch", "NRI", "Investor") | P1 |

---

### 5.3 Property Inventory Management

**Description:** A centralized, always-updated repository of all properties and units managed by the company.

| ID | Requirement | Priority |
|:---|:---|:---|
| PI-01 | Support property types: Residential (Flat, Villa, Plot), Commercial (Office, Shop), Land | P0 |
| PI-02 | Organize inventory by Project → Tower → Floor → Unit hierarchy | P0 |
| PI-03 | Each unit must have: Unit Number, Type (BHK/sqft), Base Price, Current Status, Floor Plan link | P0 |
| PI-04 | Unit statuses: Available / On Hold / Booked / Sold | P0 |
| PI-05 | Status changes must be logged with timestamp and agent who made the change | P0 |
| PI-06 | Support multiple payment plan variants per project (e.g., construction-linked, down payment) | P1 |
| PI-07 | Upload and store brochures, floor plan PDFs, and images per property/project | P0 |
| PI-08 | 1-click share of property brochure or floor plan directly to a lead via WhatsApp | P0 |
| PI-09 | Display live inventory availability count per project on dashboard | P1 |
| PI-10 | Bulk import of inventory via Excel/CSV for new project launches | P1 |

---

### 5.4 Site Visit Management

**Description:** Complete workflow for scheduling, conducting, and following up on property site visits.

| ID | Requirement | Priority |
|:---|:---|:---|
| SV-01 | Agents can schedule a site visit for a lead with date, time, property, and assigned agent | P0 |
| SV-02 | Automatic WhatsApp/SMS confirmation and reminder sent to the client (1 day before, 2 hours before) | P0 |
| SV-03 | Agents must perform a GPS-verified check-in at the property location to mark the visit as started | P0 |
| SV-04 | GPS check-in must validate that the agent is within a configurable radius (e.g., 200m) of the property | P0 |
| SV-05 | Post-visit: agent fills a structured feedback form — client impression, budget confirmation, objections, next action | P0 |
| SV-06 | Manager can view all scheduled, completed, and missed visits in a calendar view | P1 |
| SV-07 | Track visit completion rate per agent (visited vs. scheduled) | P1 |
| SV-08 | Send property location map pin to client via WhatsApp on visit day | P1 |

---

### 5.5 WhatsApp CRM Integration

**Description:** Native WhatsApp Business API integration for client communication and automation.

| ID | Requirement | Priority |
|:---|:---|:---|
| WA-01 | Integrate with official WhatsApp Business API (Meta-approved business account) | P0 |
| WA-02 | Agents can send WhatsApp messages directly from the lead card without saving the contact number | P0 |
| WA-03 | Support pre-approved message templates for: initial response, brochure share, site visit confirmation, follow-up reminder | P0 |
| WA-04 | Allow managers to create and manage template library; templates must be submitted for Meta approval | P1 |
| WA-05 | Broadcast campaigns: send bulk WhatsApp messages to segmented lead lists (e.g., all leads interested in Project X) | P1 |
| WA-06 | Log all WhatsApp messages (sent & received) on the lead's interaction timeline | P0 |
| WA-07 | Automated WhatsApp follow-up sequences configurable by admin (e.g., send brochure after assignment, reminder after 2 days of no response) | P1 |

---

### 5.6 AI Sales Assistant

**Description:** Machine-learning powered tools to help agents prioritize and close deals faster.

> **Note:** AI features are scheduled for Phase 3 and depend on sufficient historical data being available from Phases 1 & 2 (minimum ~500 closed deals recommended for training).

| ID | Requirement | Priority |
|:---|:---|:---|
| AI-01 | **AI Lead Scoring:** Score each lead (0–100) based on engagement level, response speed, budget match, and interaction recency | P1 |
| AI-02 | Surface "Hot Leads" prominently on agent dashboards based on AI scores | P1 |
| AI-03 | **AI Follow-Up Generator:** Generate personalized WhatsApp/email message drafts based on lead interaction history and stage | P2 |
| AI-04 | **Conversion Prediction:** Forecast likelihood of a lead converting within 30 days; surface "at-risk" deals with no recent activity | P2 |
| AI-05 | AI models must be retrained periodically using internal closed-deal data for accuracy improvement | P2 |

---

### 5.7 Agent Management & Leaderboard

**Description:** Tools for managing internal sales team performance and accountability.

| ID | Requirement | Priority |
|:---|:---|:---|
| AM-01 | Admin can create, deactivate, and manage agent profiles and role assignments | P0 |
| AM-02 | Each agent has an individual performance dashboard: leads assigned, calls logged, visits done, deals closed, revenue generated | P0 |
| AM-03 | Monthly leaderboard visible company-wide showing top agents ranked by deals closed and revenue | P1 |
| AM-04 | Managers can view full activity log for any agent: every call note, pipeline update, and site visit | P0 |
| AM-05 | Smart lead routing: high-value leads (above configurable budget threshold) can be auto-assigned to top-performing agents | P2 |
| AM-06 | Target setting per agent per month by managers, with progress tracking displayed on agent dashboard | P1 |

---

### 5.8 Commission & Payout Tracker

**Description:** Automated tracking of deal commissions earned by agents and pending payouts.

| ID | Requirement | Priority |
|:---|:---|:---|
| CP-01 | When a deal is marked as "Closed", agents can enter deal value and applicable commission % | P0 |
| CP-02 | System auto-calculates commission earned based on configurable commission structure (flat % or tiered) | P0 |
| CP-03 | Track payout status per deal: Pending / Processing / Paid | P0 |
| CP-04 | Admin can mark commission as "Paid" and attach payment reference (bank transfer ID, cheque no.) | P0 |
| CP-05 | Generate commission invoice/statement per agent for any given month | P1 |
| CP-06 | Summary view for management: total commission liability this month, pending payouts, and paid-out total | P1 |
| CP-07 | Support split commissions where multiple agents contributed to a single deal (e.g., sourcing agent + closing agent) | P2 |

---

### 5.9 Analytics & Business Intelligence

**Description:** Data-driven reporting for management decision-making.

| ID | Requirement | Priority |
|:---|:---|:---|
| AN-01 | **Lead Source ROI Report:** Breakdown of leads, conversions, and cost-per-lead by source (Facebook, MagicBricks, 99acres, Google, Walk-in, Referral) | P0 |
| AN-02 | **Funnel Conversion Report:** Drop-off rate at each pipeline stage across all leads | P0 |
| AN-03 | **Monthly Revenue Report:** Total deal value closed per month with MoM comparison | P0 |
| AN-04 | **Agent Performance Report:** Calls, site visits, deals closed, and revenue per agent for a selected date range | P0 |
| AN-05 | **Property Sales Report:** Units sold, available, and on-hold per project | P1 |
| AN-06 | All reports must support date range filtering | P0 |
| AN-07 | 1-click export of any report to PDF and Excel formats | P1 |
| AN-08 | Scheduled email reports: weekly summary auto-sent to management every Monday | P2 |

---

### 5.10 Mobile Application

**Description:** A native mobile app (iOS and Android) for agents working in the field.

| ID | Requirement | Priority |
|:---|:---|:---|
| MB-01 | Agents receive real-time push notifications for new lead assignments | P0 |
| MB-02 | Full lead card access, notes entry, pipeline stage updates from mobile | P0 |
| MB-03 | GPS-verified check-in for site visits via the mobile app | P0 |
| MB-04 | 1-tap WhatsApp message to client from the lead card | P0 |
| MB-05 | Navigation/map integration to get directions to property location | P1 |
| MB-06 | Voice-to-text for logging call notes hands-free | P1 |
| MB-07 | Offline mode: agents can log notes and check-ins without internet; data syncs on reconnect | P1 |

---

## 6. Non-Functional Requirements

### 6.1 Performance
- Page load time under 2 seconds for all primary views on a standard broadband connection
- Dashboard data should refresh in near real-time (≤ 30 second lag for lead counts and status changes)
- Capable of handling up to 500 concurrent internal users without degradation

### 6.2 Reliability & Uptime
- Target 99.5% uptime during business hours (9 AM – 9 PM IST, 7 days a week)
- Automated daily database backups with 30-day retention
- Graceful error handling — failed API calls (e.g., WhatsApp, portal feeds) must not crash the UI; errors should be logged and surfaced to admin

### 6.3 Security & Access Control
- Role-Based Access Control (RBAC) with at minimum three roles: Agent, Team Leader, Admin/Management
- Agents must only see leads assigned to them; managers see their team's leads; admins see all
- All data transmitted over HTTPS / TLS 1.2+
- Passwords stored as salted hashes (bcrypt or equivalent)
- Audit trail for all sensitive actions: lead reassignment, status changes, data exports, commission edits

### 6.4 Data Privacy
- All customer PII (phone numbers, emails) must be stored within India (data residency requirement)
- Phone numbers masked in agent-facing views for leads not yet assigned to that agent
- No external data sharing without admin authorization

### 6.5 Scalability
- Architecture should support growing inventory (up to 50,000 property units) and lead volumes (up to 100,000 leads/year) without requiring a redesign
- Modular design so new integrations (portals, payment gateways, bank APIs) can be added with minimal effort

### 6.6 Usability
- Mobile app must support Android 10+ and iOS 15+
- Web application must work on Chrome, Firefox, Edge (latest 2 versions)
- Key workflows (log a call, assign a lead, update a status) must be completable in 3 taps/clicks or fewer
- All critical actions must include confirmation dialogs to prevent accidental data loss

---

## 7. Technical Architecture Considerations

> These are considerations and recommendations for the engineering team, not hard requirements.

- **Backend:** REST or GraphQL API — all frontend and mobile clients consume the same API layer
- **Database:** Relational database (PostgreSQL preferred) for leads, properties, and transactions; search indices (Elasticsearch or similar) for inventory search
- **Real-time updates:** WebSocket or server-sent events for dashboard live counters
- **WhatsApp API:** Use the official Meta Cloud API for WhatsApp Business (requires verified business account and phone number)
- **GPS Verification:** Use device GPS coordinates with a server-side radius check against stored property coordinates; do not rely solely on client-reported data
- **AI/ML:** Start with rule-based lead scoring in Phase 1 (budget match, response recency); evolve to ML models in Phase 3 once data volume is sufficient (minimum ~500 closed deals for training)
- **Storage:** Cloud object storage (AWS S3 or equivalent) for brochures, floor plan PDFs, and images
- **Deployment:** Self-hosted on cloud infrastructure (AWS/GCP/Azure) in the Mumbai region for data residency compliance

---

## 8. Phased Roadmap

| Phase | Name | Key Deliverables | Target Timeline |
|:---|:---|:---|:---|
| **Phase 1** | CRM Core | Lead capture (manual + portal feeds), pipeline management, property inventory, role-based dashboard, agent management | Month 1–3 |
| **Phase 2** | Communication Layer | WhatsApp Business API integration, automated reminders, broadcast campaigns, site visit scheduling & GPS check-in | Month 3–5 |
| **Phase 3** | Intelligence | AI lead scoring, follow-up generator, conversion prediction, commission tracker, advanced analytics & exports | Month 5–8 |
| **Phase 4** | Mobile App | Native iOS & Android app with offline mode, GPS check-in, push notifications, voice notes | Month 6–9 |
| **Phase 5** | Integrations & Scale | Home loan partner API, legal verification partner, advanced reporting, scheduled email reports | Month 9–12 |

> Phases 3 and 4 may run in parallel depending on team capacity.

---

## 9. Success Metrics & KPIs

These metrics will be measured 3 months and 6 months post-launch to evaluate product success.

| Metric | Baseline (Current) | Target (6 Months Post-Launch) |
|:---|:---|:---|
| Lead response time (avg) | > 4 hours | < 30 minutes |
| Lead leakage rate | ~30% unassigned | < 5% unassigned |
| Follow-up miss rate | ~40% of follow-ups missed | < 10% missed |
| Site visit completion rate | ~55% | > 80% |
| Deal conversion rate (lead → closed) | ~3% | > 6% |
| Time spent on manual admin per agent/week | ~8–10 hours | < 2 hours |
| Management reporting turnaround | 2–3 days (manual) | Real-time, on-demand |

---

## 10. Open Questions & Decisions

The following items require input from stakeholders before or during development:

| # | Question | Owner | Status |
|:---|:---|:---|:---|
| 1 | Which WhatsApp Business API provider will we use — Meta Cloud API directly, or a BSP (e.g., Interakt, Wati, Gupshup)? | Tech + Management | Open |
| 2 | What are the exact portal integrations required at launch? (MagicBricks, 99acres, Housing.com — all or subset?) | Management | Open |
| 3 | Will the CRM be self-hosted on our own infrastructure or managed cloud? Who is the internal IT owner? | IT / Management | Open |
| 4 | What commission structure(s) do we currently use that need to be modeled in the system? | Finance | Open |
| 5 | Do we have a verified WhatsApp Business Account already, or does that need to be set up? | Operations | Open |
| 6 | Will agents use company-issued devices for the mobile app, or personal devices (BYOD)? (Affects MDM and data security policies) | HR / IT | Open |
| 7 | What is the expected initial data migration scope — leads, properties, agent data from existing Excel sheets? | Operations | Open |
| 8 | Should the system support multiple office locations / cities, or is it single-city at launch? | Management | Open |

---

*This document is a living artifact and will be updated as requirements are refined, stakeholder feedback is incorporated, and technical decisions are finalized.*

*Last updated: September 2026*
