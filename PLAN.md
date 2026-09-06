# PropertyBeast CRM — Client Demo / MVP Implementation Plan

> **Document Type:** Engineering & Product Demo Delivery Plan  
> **Product:** PropertyBeast CRM  
> **Version:** 1.0 (Pure Client Demo Edition)  
> **Target Audience:** Development Team, Product Manager, Solution Architects, Sales Presenters  
> **Reference Specs:** [PRD.md](file:///d:/CRM/PRD.md) | [TECH_STACK.md](file:///d:/CRM/TECH_STACK.md) | [PropertyBeast_CRM.md](file:///d:/CRM/PropertyBeast_CRM.md)

---

## 1. Executive Summary & Demo Strategy

### 1.1 Objective
The objective is to build a **high-impact, visually stunning, interactive MVP/Demo** of PropertyBeast CRM designed specifically to pitch, demonstrate, and close prospective real estate clients (brokers, builders, channel partners, and enterprise agencies).

### 1.2 What "Pure Demo" Means
A "Pure Demo" is engineered to maximize perceived value, interactive realism, and visual aesthetic without depending on external hurdles, paid accounts, or multi-week verification bottlenecks:
- **Zero Third-Party Blockers:** No delays waiting for Meta WhatsApp Business API green-ticks, paid SMS DLT registrations, real portal integration credentials, or cloud database provisioning.
- **Interactive Simulation Engine:** Real-time simulations for incoming leads (Meta Ads / MagicBricks), WhatsApp conversations, GPS radius check-ins, AI pitch generation, and commission payouts.
- **Realistic Indian Real Estate Dataset:** Pre-seeded with authentic projects (e.g., *Godrej Woods, DLF Camellias, Oberoi Sky City*), tier-1 locations (Gurugram, Mumbai, Bengaluru), realistic ticket sizes (₹85 Lakhs to ₹15 Crores), and real broker workflows.
- **Seamless Production Trajectory:** Built directly using the frontend tech stack defined in [TECH_STACK.md](file:///d:/CRM/TECH_STACK.md) (Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn/ui, Recharts, Zustand). The demo codebase serves as the actual frontend foundation for full-scale production.

---

## 2. Architecture for the Client Demo

To ensure lightning-fast local execution, 100% offline reliability during client meetings, and instant 1-click cloud deployments (e.g., Vercel), the demo architecture is structured as follows:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       CLIENT PRESENTATION LAYER                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                     Persona / Role Quick Switcher                     │  │
│  │   [Director / Owner]   |   [Team Leader]   |   [Sales Executive]      │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────┐   ┌─────────────────────────────────┐  │
│  │     Desktop CRM Dashboard       │   │    Mobile Field Agent View      │  │
│  │   (Next.js 14 + shadcn/ui)      │   │   (Responsive Phone Simulator)  │  │
│  └─────────────────────────────────┘   └─────────────────────────────────┘  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                    DEMO SIMULATION & STATE ENGINE                           │
│  ┌───────────────────────────────┐   ┌───────────────────────────────────┐  │
│  │    Zustand Reactive Store     │   │      Simulation Event Bus         │  │
│  │ (Leads, Units, Visits, Deals) │   │ (Incoming Lead, GPS, AI stream)   │  │
│  └───────────────────────────────┘   └───────────────────────────────────┘  │
│  ┌───────────────────────────────┐   ┌───────────────────────────────────┐  │
│  │   Local Storage Persistence   │   │     Mock Seed Engine (JSON)       │  │
│  │    (Reset to Default anytime) │   │ (Projects, Units, Agents, Calls)  │  │
│  └───────────────────────────────┘   └───────────────────────────────────┘  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼──────────────────────────────────────┐
│                    FUTURE PRODUCTION BACKEND BRIDGE                         │
│  (Next.js Route Handlers / API Contracts identical to NestJS & Prisma specs) │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Core Capabilities Matrix (PRD vs. Demo Implementation)

| PRD Module | Core Client Need | Demo Simulation Strategy | WOW Factor in Demo |
|:---|:---|:---|:---|
| **5.1 Command Center** | Real-time sales visibility | Live counters, KPI cards, animated trend charts, overdue alert banners | Instant visual impact; dark/light theme switch; role-filtered view |
| **5.2 Lead Pipeline** | Zero lead leakage, fast tracking | Drag-and-drop Kanban (7 stages) + TanStack table + "Simulate Inbound Lead" button | Clicking "Simulate Meta Lead" fires real-time popup & adds lead to "New" column |
| **5.3 Property Inventory** | Unit availability & floor plans | Project → Tower → Floor → Unit matrix with status indicators (Available/Hold/Booked) | 1-Click "Send Brochure via WhatsApp" modal with high-res PDF preview |
| **5.4 Site Visits & GPS** | Eliminate fake agent check-ins | Schedule modal + Interactive GPS Geo-Check-In Simulator with map radius validation | Visual radar map check-in showing "42m from site — GPS Verified" badge |
| **5.5 WhatsApp CRM** | Native buyer engagement | Built-in WhatsApp dialog drawer with approved templates & broadcast campaign launcher | 1-click pre-approved template message preview and campaign progress bar |
| **5.6 AI Sales Assistant** | Prioritize hot leads & pitch | AI Lead Score badge (0–100) with explanation + 1-Click AI Follow-Up Pitch generator | Streaming simulated LLM generation with tone selector (Urgency, Investor, Offer) |
| **5.7 Agent Leaderboard** | Team accountability & gamification | Monthly ranking board with deals closed, revenue generated, and target progress | Animated leaderboard with medals, conversion rates, and agent activity timeline |
| **5.8 Commission Tracker** | Commission transparency | Automated slab calculation upon marking deal "Closed", pending vs paid tracking | Instant commission statement slip generator with print/download preview |
| **5.9 BI & Analytics** | Data-driven decision making | Recharts dashboards: Lead Source ROI, Funnel Drop-off, Monthly Revenue | Interactive filters (date, agent, project) + 1-Click "Export Executive PDF" |
| **5.10 Mobile Experience** | Field agent mobility | Dedicated mobile viewport frame / responsive view with 1-tap call & WhatsApp | Floating "Mobile View" toggle demonstrating on-site agent workflow |

---

## 4. Phase-Wise Development Roadmap

```
Phase 0: Architecture, Design System & Seed Engine
  └── Phase 1: Command Center & Executive Dashboard
        └── Phase 2: Lead Pipeline & Inbound Simulator (Kanban)
              └── Phase 3: Property Inventory Matrix & Brochure Sharing
                    └── Phase 4: Site Visit Management & GPS Check-In Simulator
                          └── Phase 5: WhatsApp CRM & Broadcast Simulator
                                └── Phase 6: AI Sales Assistant & Pitch Copilot
                                      └── Phase 7: Commission & Payouts Engine
                                            └── Phase 8: Business Intelligence & Report Export
                                                  └── Phase 9: Field Mobile Simulator & Polish
```

---

### Phase 0: Architecture, Design System & Seed Engine
**Goal:** Establish the technical foundation, design tokens, mock data models, and persona switching mechanism.

- **0.1 Setup Framework & Tooling:**
  - Next.js 14 App Router, TypeScript, Tailwind CSS, Lucide React icons, shadcn/ui components (`button`, `card`, `dialog`, `badge`, `tabs`, `dropdown-menu`, `avatar`, `select`, `input`, `tooltip`).
  - Configure fonts: Inter / Plus Jakarta Sans for a clean, modern SaaS aesthetic.
  - Setup rich dark/light mode support with default sleek dark slate aesthetic (`#0F172A` / `#1E293B`) with emerald green (`#10B981`) and gold/amber highlights for real estate prestige.
- **0.2 Seed Data Generator:**
  - **Projects & Units:** 3 major projects (*Godrej Woods Sector 43 Gurugram, DLF Camellias Golf Course, Oberoi Sky City Borivali*) with towers, floor numbers, unit types (2BHK, 3BHK, 4BHK, Penthouse), pricing (₹1.2 Cr – ₹14.5 Cr), and status (Available, Hold, Booked, Sold).
  - **Leads:** 30 realistic leads distributed across 7 pipeline stages, complete with source (Meta Ads, MagicBricks, Housing.com, 99acres, Referral, Walk-in), assigned agent, budget, tags (*Hot, NRI, Investor, High Intent*), and interaction history.
  - **Agents:** 5 sales executives (*Rajesh Sharma, Priya Mehta, Amit Verma, Sneha Kapoor, Vikram Malhotra*) with avatars, targets, closed deals, and conversion rates.
  - **Site Visits:** Scheduled, completed, and overdue visits with GPS coordinates.
- **0.3 Reactive Store & Demo Controls:**
  - Zustand store managing all entities with local storage persistence and a 1-click **"Reset Demo Data"** button in settings.
  - **Persona Bar:** Persistent top toggle allowing presenter to switch between:
    - *Vivek Singhania (Managing Director)* — full BI view, all leads, revenue metrics.
    - *Ananya Roy (Sales Manager)* — team leaderboard, unassigned leads, reassignment.
    - *Rajesh Sharma (Senior Sales Exec)* — personal leads, daily follow-ups, my commissions.

---

### Phase 1: Executive Dashboard & Command Center
**Goal:** Deliver the first-screen "WOW" that captivates executive buyers within the first 10 seconds.

- **1.1 Command Center Header:**
  - Company branding (PropertyBeast CRM), live time clock, quick actions button (`+ Add Lead`, `+ Schedule Visit`, `⚡ Simulate Lead`).
  - Global search bar with shortcut (`Ctrl + K`) for instant search across leads and projects.
- **1.2 Hero Metric Cards (with animated counters & MoM badges):**
  - **Total Active Leads:** `1,248` (`↑ +14.2%` vs last month).
  - **New Inquiries Today:** `18 Leads` (6 pending initial call).
  - **Site Visits Today:** `7 Scheduled` (3 Completed, 1 In-Progress, 3 Upcoming).
  - **Pipeline Deal Value:** `₹64.8 Cr` across active negotiations.
  - **Overdue Follow-up Alert Banner:** Prominent high-priority warning card: *"4 high-intent leads have pending follow-ups overdue by >2 hours. Immediate action required."* with a 1-click `Review Now` action.
- **1.3 Real-Time Activity Feed:**
  - Ticker showing live actions: *"Priya Mehta logged a site visit check-in at Godrej Woods"*, *"Lead converted to Booking: Unit T2-1402 (₹2.4 Cr)"*.
- **1.4 Quick Lead Source Chart & Mini Funnel:**
  - Visual summary using Recharts displaying source distribution and stage counts.

---

### Phase 2: Lead Management Engine & Interactive Pipeline
**Goal:** Showcase how PropertyBeast stops lead leakage and streamlines the sales pipeline.

- **2.1 Dual Pipeline Views:**
  - **Interactive Kanban Board:**
    - 7 visual columns: `New Lead` → `Contacted` → `Interested` → `Site Visit Scheduled` → `Negotiation` → `Booking` → `Closed`.
    - Drag-and-drop capability to move lead cards between stages with instant status update.
    - Each lead card displays: Lead Name, Phone, Project Interest, Budget badge, Assigned Agent avatar, Tag (`Hot`, `NRI`), and Last Activity time.
  - **TanStack Data Table View:**
    - Search, multi-criteria filtering (by Source, Project, Agent, Date), column sorting, and pagination.
- **2.2 The "Simulate Inbound Lead" Feature (Sales Pitch Showstopper):**
  - Floating action button: **"⚡ Simulate Meta Ad Lead"** or **"⚡ Simulate MagicBricks Lead"**.
  - On click: triggers a real-time toast notification (`"New lead captured from Facebook Ads: Siddharth Malhotra - Interested in Godrej Woods 3BHK"`), automatically assigns lead via round-robin to Rajesh Sharma, and inserts a pulsing card at the top of the `New Lead` column.
- **2.3 Detailed Lead Inspection Drawer / Modal:**
  - Clicking any lead opens a full 360° slide-over panel:
    - **Header:** Lead status, source badge, contact details, quick WhatsApp / Call action buttons.
    - **Client Preferences:** Desired BHK, budget range, preferred location, funding mode (Home Loan vs Self).
    - **Activity Timeline:** Chronological log of calls, WhatsApp messages, visit status, and stage transitions.
    - **Quick Note Logger:** Input field to log call notes with quick-tag pills (*"Interested in higher floor"*, *"Discussing budget with spouse"*, *"Asked for cost sheet"*).
    - **Next Follow-up Scheduler:** Date & time picker with calendar integration.

---

### Phase 3: Property Inventory Matrix & Brochure Sharing
**Goal:** Show real estate developers and brokers how inventory chaos is eliminated.

- **3.1 Project Hierarchy & Unit Grid:**
  - Project Selector (*Godrej Woods, DLF Camellias, Oberoi Sky City*).
  - Tower & Floor Filter (e.g., Tower A, Floors 1–25).
  - **Interactive Unit Availability Matrix:**
    - Color-coded unit tiles:
      - 🟢 **Available** (clickable to hold or book)
      - 🟡 **On Hold** (shows hold expiry countdown)
      - 🔵 **Booked** (booked by Agent X)
      - 🔴 **Sold Out**
- **3.2 Unit Detail Modal:**
  - Unit specs: `Unit 1404`, `3 BHK + Servant`, `2,150 sq.ft`, `Base Price: ₹2.85 Cr`, `Facing: Park & Clubhouse`.
  - Payment schedule breakdown (Construction Linked Plan vs 10:90 Subvention).
  - Floor plan image viewer with zoom capability.
  - Status change control: 1-click transition from `Available` to `On Hold` or `Booked`.
- **3.3 1-Click WhatsApp Collateral Dispatch:**
  - Button on unit or project: **"Share via WhatsApp"**.
  - Opens modal displaying pre-composed message with project brochure PDF thumbnail.
  - Allows selecting a lead from dropdown, clicking **"Send WhatsApp"**, and instantly recording the share in that lead's activity history.

---

### Phase 4: Site Visit Management & GPS Check-In Simulator
**Goal:** Solve the #1 pain point of real estate agency owners — fake site visits and lack of field tracking.

- **4.1 Site Visit Scheduling Flow:**
  - Triggered from lead card or calendar view.
  - Pick property, date/time, accompanying sales agent, and cab/transport requirements.
  - Generates automated confirmation preview (WhatsApp invite with Google Maps pin).
- **4.2 Site Visit Central Calendar & List View:**
  - Calendar view (Daily / Weekly) and list view with filters: Scheduled, Completed, Missed.
- **4.3 GPS Geo-Check-In Simulator (High-Impact Demo Feature):**
  - Presenter clicks **"Agent Check-In Simulation"** on an active site visit:
    - Interactive dialog appears depicting a mock smartphone screen or satellite map view.
    - Shows property geo-fence perimeter (200m radius circle around *DLF Camellias*).
    - Simulates device locating: *"Acquiring GPS coordinates... (28.4595° N, 77.0266° E)"*.
    - Verification check: *"Distance to site: 38 meters. Within geofence!"*.
    - Visual Green Badge: `✓ GPS Verified Check-In (11:42 AM IST)`.
- **4.4 Post-Visit Feedback Capture Modal:**
  - Agent structured feedback form:
    - Client Interest Level (Rating 1–5 stars).
    - Unit Liked (dropdown from project inventory).
    - Budget Confirmation (Within budget / Stretched / Too expensive).
    - Key Objections (Price, Vaastu, Possession timeline).
    - Next Agreed Step (Book negotiation meeting / Send revised cost sheet).

---

### Phase 5: WhatsApp CRM Integration & Broadcast Campaigns
**Goal:** Prove how native WhatsApp messaging replaces chaotic personal WhatsApp chats.

- **5.1 In-App WhatsApp Conversation Drawer:**
  - Built directly into the lead record (slide-out WhatsApp chat interface).
  - Shows verified WhatsApp Business header with green check badge.
  - Message thread displaying inbound inquiries and agent responses.
  - Pre-approved Meta Message Template picker:
    - *Template 1: Initial Inbound Acknowledgment & Project Intro*
    - *Template 2: Digital Brochure & Floor Plan Share*
    - *Template 3: Site Visit Confirmation with Google Maps Location Pin*
    - *Template 4: Post-Visit Price Drop / Festival Special Discount*
  - Instant simulated send with double blue ticks (`✓✓`).
- **5.2 WhatsApp Broadcast Campaign Launcher:**
  - Dedicated "Marketing Campaigns" screen.
  - Target Audience Filter: e.g., *"All leads interested in 3BHK in Gurugram with budget > ₹2 Cr"* (Total: `142 Leads`).
  - Template selector: *"Diwali Launch Offer: Zero Stamp Duty"*.
  - Click **"Launch Campaign"**:
    - Animated progress bar showing live message delivery count (`142/142 delivered, 89% opened`).
    - Campaign performance card: Delivered, Read, Click-through rate, Incoming Replies.

---

### Phase 6: AI Sales Assistant & Smart Copilot
**Goal:** Wow clients with cutting-edge PropTech AI that directly improves agent conversion rates.

- **6.1 AI Lead Scoring & Intent Gauge:**
  - Visual score badge (0–100) on each lead with color gradient (Red 0-40, Amber 41-70, Green 71-100).
  - Expandable **"AI Score Breakdown"** card showing exact reasoning:
    - `+35` High Budget Match (Client budget matches project unit price).
    - `+25` Fast Engagement (Responded to WhatsApp in < 4 minutes).
    - `+20` Verified Site Visit completed.
    - `-10` 4 days since last interaction.
  - Net Lead Grade: `HOT LEAD (Score: 88/100) — High Probability of Closing in 14 Days`.
- **6.2 1-Click AI Follow-Up Pitch Generator:**
  - Inside the lead drawer, an **"AI Pitch Copilot"** tab.
  - Tone & Goal Selectors:
    - *Goal:* Re-engage cold lead / Pitch discount / Overcome budget objection / Push for booking.
    - *Tone:* Professional / Urgent & Scarcity / Consultative / Festival Festive.
  - Click **"Generate Pitch"**:
    - Animated streaming text generator producing a tailored WhatsApp pitch citing the exact project, preferred tower, and client's past objection.
    - One-click button: **"Insert into WhatsApp & Send"**.
- **6.3 Deal Conversion & Drop-off Risk Predictor:**
  - Machine learning predictor card on negotiation-stage leads: *"Predicted Closing Chance: 78% | Risk: Lead inquired about competitor project yesterday"*.

---

### Phase 7: Broker Commission & Payouts Engine
**Goal:** Address agency owners' and brokers' critical financial requirement — automated commission tracking.

- **7.1 Deal Closure & Commission Modal:**
  - Moving a lead to `Closed` triggers the Deal Closure Wizard:
    - Select Sold Unit (e.g., *Godrej Woods, Unit T1-1203*).
    - Agreed Agreement Value: `₹2,50,00,000` (₹2.5 Cr).
    - Commission Slab: Selectable (Flat 2.5%, Tiered 3.0%, or Sourcing/Closing Split 1.5% + 1.5%).
    - Auto-calculated Total Commission: `₹6,25,000`.
- **7.2 Commission Dashboard & Payout Pipeline:**
  - KPI Cards:
    - Total Commission Earned This Month: `₹42,80,000`.
    - Paid Out to Agents: `₹28,50,000`.
    - Pending Clearance from Builders: `₹14,30,000`.
  - Payout Status Table: Agent Name, Deal ID, Project, Deal Value, Commission %, Payout Status (`Pending`, `Approved`, `Disbursed`).
  - Action button: **"Approve Payout"** with simulated UTR / Bank Transfer reference generation.
- **7.3 1-Click Commission Invoice Statement:**
  - Generates a branded printable/downloadable Agent Commission Statement modal.

---

### Phase 8: Business Intelligence & Executive Reporting
**Goal:** Prove to Directors and CXOs that PropertyBeast replaces 3-day manual Excel reports with instant real-time data.

- **8.1 Interactive Executive BI Dashboards (Recharts):**
  - **Lead Source ROI Matrix:** Multi-bar chart comparing Ad Spend vs. Leads Generated vs. Actual Closed Deals across Meta Ads, Google Ads, MagicBricks, 99acres, and Walk-ins.
  - **Pipeline Funnel Drop-off Chart:** Visual funnel illustrating where prospects drop off (e.g., 100% Inquiries → 68% Contacted → 38% Site Visits → 18% Negotiation → 8% Closed).
  - **Monthly Revenue & Booking Trends:** Area chart showing monthly sales volume (₹ Cr) over the last 6 months.
  - **Agent Performance Matrix:** Table comparing agent calls, completed site visits, conversion rate %, and total revenue generated.
- **8.2 Report Filters & 1-Click Export:**
  - Filter bar: Date Range (This Month, Last Quarter, Custom), Project Filter, Agent Filter.
  - **"Export Executive Report"** button: Triggers a clean printable/PDF summary modal ready for board meetings.

---

### Phase 9: Mobile Field Agent Simulator & Final Polish
**Goal:** Demonstrate the on-the-go experience for agents operating at project sites.

- **9.1 Built-In Mobile View Switcher:**
  - Persistent toggle in demo header: `🖥 Desktop View` vs `📱 Field Agent Mobile View`.
  - In Mobile Mode: renders a high-fidelity smartphone frame (iPhone style) displaying the mobile-optimized CRM view.
- **9.2 Mobile Specific Workflows:**
  - Simulated Push Notification banner: *"New Lead Assigned: Vikram Seth (Budget ₹3 Cr)"*.
  - 1-Tap Call and 1-Tap WhatsApp buttons.
  - Mobile GPS Check-In button with simulated haptic/visual confirmation.
  - Audio/Voice Note recorder simulator (*"Record Call Notes Hands-Free"*).
- **9.3 Demo Polish & Presentation Mode:**
  - "Demo Tour Guide" overlay / walkthrough tooltips highlighting key features.
  - Fast keyboard shortcuts for the presenter (`D` for dashboard, `P` for pipeline, `I` for inventory, `S` for simulate lead).
  - Sound effects toggle (subtle pleasant chime when new lead arrives or deal is closed).

---

## 5. Client Demo Presentation Script & Storyboard

This 6-step narrative script is designed for sales reps pitching PropertyBeast CRM to prospective clients.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       THE 12-MINUTE DEMO NARRATIVE                          │
│                                                                             │
│  [Step 1: The Pain] ──> [Step 2: Instant Capture] ──> [Step 3: WhatsApp & AI]
│    Show Excel chaos        Simulate Meta Lead          Generate AI pitch    │
│                                                                             │
│  [Step 6: Money & BI] <── [Step 5: GPS Check-in]  <── [Step 4: Inventory]   │
│    Commissions & ROI       Geo-verified site visit      Unit grid & brochure│
└─────────────────────────────────────────────────────────────────────────────┘
```

| Step & Timing | Screen | Presenter Narrative & Action | Impact on Client |
|:---|:---|:---|:---|
| **Step 1 (0:00–1:30)**<br>*The Problem & Command Center* | **Dashboard** | *"Most real estate companies lose 70% of their buyers because follow-ups are delayed and leads sit unassigned in spreadsheets. Here is PropertyBeast's real-time Command Center."* Point out the overdue follow-up alert and live pipeline value. | Client immediately sees their daily chaos organized into clear visibility. |
| **Step 2 (1:30–3:30)**<br>*Zero Lead Leakage* | **Pipeline (Kanban)** | *"Watch what happens when a buyer clicks on your Facebook or MagicBricks ad right now."* Click **"⚡ Simulate Meta Ad Lead"**. Watch instant toast and new card appear. Show automatic round-robin assignment to Rajesh. | Client sees how human delay in lead assignment is 100% eliminated. |
| **Step 3 (3:30–5:30)**<br>*WhatsApp & AI Copilot* | **Lead Card Drawer** | Open the lead card. *"No need to save phone numbers on personal devices."* Click **AI Pitch Generator**, select *Urgency*, stream pitch, and 1-click send official WhatsApp message with verified badge. | High "WOW" factor. Connects AI directly to real estate sales conversations. |
| **Step 4 (5:30–7:00)**<br>*Live Property Inventory* | **Property Inventory** | Navigate to *Godrej Woods*. Show unit availability matrix. Select Unit 1402 (3BHK). Show price breakdown. Click **"Share Brochure on WhatsApp"** directly to the lead. Change status to *On Hold*. | Demonstrates ending the problem of agents selling already-booked units. |
| **Step 5 (7:00–9:00)**<br>*GPS-Verified Site Visit* | **Site Visit Module** | Schedule a site visit for tomorrow. Now click **"Agent GPS Check-In Simulator"**. Show map geofence radius. Watch system verify coordinates: *"42 meters away — Verified!"* Fill in quick 30-second post-visit feedback. | Solves agency owners' biggest headache: fake site visit reports by agents. |
| **Step 6 (9:00–12:00)**<br>*Closing Deal, Payout & BI* | **Pipeline & Commissions** | Drag lead to `Closed`. Deal closing wizard auto-calculates ₹6.25 Lakhs commission. Show Agent Payout statement. Switch to **Analytics** to show Lead Source ROI and 1-click Export. | Business owner realizes how this software directly increases their net profit. |

---

## 6. Implementation Deliverables & File Structure

The demo implementation will be structured under a clean, scalable Next.js 14 architecture ready to directly adopt the NestJS backend later:

```
CRM/
├── src/
│   ├── app/                                # Next.js App Router
│   │   ├── layout.tsx                      # Root layout with theme provider & persona bar
│   │   ├── page.tsx                        # Redirect to /dashboard
│   │   ├── dashboard/page.tsx              # Phase 1: Command Center & KPI cards
│   │   ├── pipeline/page.tsx               # Phase 2: Kanban & Table pipeline
│   │   ├── inventory/page.tsx              # Phase 3: Project & Unit availability matrix
│   │   ├── visits/page.tsx                 # Phase 4: Site Visits & GPS Check-In Simulator
│   │   ├── whatsapp/page.tsx               # Phase 5: WhatsApp CRM & Broadcast campaigns
│   │   ├── ai-assistant/page.tsx           # Phase 6: AI Lead Scoring & Pitch Copilot
│   │   ├── commissions/page.tsx            # Phase 7: Commission & Payouts Tracker
│   │   ├── analytics/page.tsx              # Phase 8: Lead Source ROI & BI Dashboard
│   │   └── mobile/page.tsx                 # Phase 9: Mobile Field Agent Simulator
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx                 # Modern collapsible navigation
│   │   │   ├── Topbar.tsx                  # Persona Switcher, Quick Search, Simulator trigger
│   │   │   └── MobileDeviceFrame.tsx       # Interactive phone frame simulator
│   │   ├── dashboard/                      # KPI cards, Overdue alert, Leaderboard mini
│   │   ├── pipeline/                       # KanbanColumn, KanbanCard, LeadDetailDrawer
│   │   ├── inventory/                      # UnitMatrix, UnitDetailModal, BrochureShareModal
│   │   ├── visits/                         # GpsCheckInModal, VisitScheduleModal, FeedbackForm
│   │   ├── whatsapp/                       # WhatsAppChatDrawer, TemplatePicker, BroadcastModal
│   │   ├── ai/                             # AiScoreBadge, PitchGenerator, PredictionCard
│   │   ├── commissions/                    # DealClosureModal, StatementPreview, PayoutTable
│   │   ├── analytics/                      # RoiChart, FunnelChart, AgentPerformanceTable
│   │   └── ui/                             # shadcn/ui components (button, dialog, card, badge, etc.)
│   ├── data/                               # Realistic Indian PropTech Seed Engine
│   │   ├── projects.ts                     # Projects, Towers, Units dataset
│   │   ├── leads.ts                        # 30 pre-configured leads across 7 stages
│   │   ├── agents.ts                       # Agent profiles, performance stats, avatars
│   │   ├── templates.ts                    # WhatsApp official Meta approved templates
│   │   └── analyticsData.ts                # ROI, Funnel conversion, Revenue history
│   ├── store/
│   │   └── useCrmStore.ts                  # Zustand reactive state store (with localStorage)
│   ├── types/
│   │   └── index.ts                        # Shared TypeScript definitions (Lead, Unit, Visit, etc.)
│   └── lib/
│       └── utils.ts                        # Currency formatters (₹ Lakhs/Crores), date helpers
├── public/                                 # Floor plans, project brochures, mock floor plan SVGs
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 7. Migration Bridge: From "Pure Demo" to Production

Building the demo on Next.js 14 and TypeScript guarantees zero throwaway code:

| Layer | Demo / MVP State | Production Full-Scale State (from [TECH_STACK.md](file:///d:/CRM/TECH_STACK.md)) | Migration Path |
|:---|:---|:---|:---|
| **State** | Zustand + LocalStorage | Zustand + TanStack Query fetching from API | Replace store mutation logic with TanStack Query hooks calling NestJS REST endpoints |
| **API** | In-memory Mock Service / Event Bus | NestJS 10 REST API + Prisma ORM + PostgreSQL | Connect existing TypeScript types directly to NestJS DTOs and Prisma schemas |
| **Auth** | Persona Switcher dropdown | JWT + Refresh Token in HttpOnly cookie + RBAC | Plug in NextAuth or custom JWT guard; persona dropdown maps directly to RBAC roles |
| **WhatsApp** | Built-in UI simulator with template preview | Meta Cloud API (direct) webhooks | Switch mock send handler to call `POST /api/whatsapp/send` hitting Meta Cloud API |
| **Real-time** | Zustand simulated event triggers | Socket.IO backed by Redis Pub/Sub | Replace UI event bus with Socket.IO client listening to NestJS WebSocket Gateway |
| **Storage** | Local sample assets / SVGs in `/public` | AWS S3 (Mumbai) + CloudFront pre-signed URLs | Switch asset URLs to pre-signed S3 bucket endpoints |
| **AI** | Pre-computed scoring + client streaming simulation | Python FastAPI microservice + OpenAI GPT-4o | Point AI Pitch generator to internal `/api/v1/ai/generate-pitch` endpoint |

---

## 8. Milestone Execution Schedule

| Milestone | Scope | Estimated Build Window | Client Pitch Readiness |
|:---|:---|:---|:---|
| **Milestone 1** | Phase 0 + Phase 1: Foundation, Seed Engine, Command Center & Hero KPIs | Days 1–3 | Internal review & executive dashboard preview |
| **Milestone 2** | Phase 2 + Phase 3: Interactive Kanban Pipeline, Inbound Lead Simulator, Inventory Grid | Days 4–7 | Core sales pitch ready (Lead flow + Inventory) |
| **Milestone 3** | Phase 4 + Phase 5: GPS Check-In Simulator, WhatsApp Chat & Campaign Launcher | Days 8–10 | High-impact interactive demo ready |
| **Milestone 4** | Phase 6 + Phase 7: AI Pitch Copilot, Lead Scoring, Commission Calculator & Statements | Days 11–13 | Full feature-complete commercial demo |
| **Milestone 5** | Phase 8 + Phase 9: BI Analytics, Mobile Frame View, Sound Effects, Final Polish | Days 14–15 | **Final Client-Ready Showstopper Demo** |

---

*This plan is ready for immediate sprint execution to deliver a demo that will wow real estate clients and secure pilot deals.*
