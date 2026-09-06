# PropertyBeast CRM — Setup, Manual Testing & Presentation Guide

> **Enterprise Real Estate Sales & Operations Platform**  
> *Prepared for: Co-Founders, Presenters, and Product Demonstrators*  
> *Target Audience for Demo: Real Estate Developers, Luxury Brokerage Owners, Channel Partners & Investors*

---

## 📋 Table of Contents
1. [Quick Start & Repository Setup](#1-quick-start--repository-setup)
2. [Architecture & Zero-Config Guarantee](#2-architecture--zero-config-guarantee)
3. [Presenter Setup & Keyboard Hotkeys](#3-presenter-setup--keyboard-hotkeys)
4. [Demo Personas & Role-Based Scopes](#4-demo-personas--role-based-scopes)
5. [Screen-by-Screen Manual Testing Checklist](#5-screen-by-screen-manual-testing-checklist)
   - [5.1 Executive Command Center (`/dashboard`)](#51-executive-command-center-dashboard)
   - [5.2 Sales Pipeline & Lead Management (`/pipeline`)](#52-sales-pipeline--lead-management-pipeline)
   - [5.3 Property Inventory Matrix (`/inventory`)](#53-property-inventory-matrix-inventory)
   - [5.4 Site Visit Tracking & GPS Radar (`/visits`)](#54-site-visit-tracking--gps-radar-visits)
   - [5.5 Official WhatsApp CRM & Broadcast (`/whatsapp`)](#55-official-whatsapp-crm--broadcast-whatsapp)
   - [5.6 AI Sales Copilot & Scoring Studio (`/ai-assistant`)](#56-ai-sales-copilot--scoring-studio-ai-assistant)
   - [5.7 Broker Commission & Payout Engine (`/commissions`)](#57-broker-commission--payout-engine-commissions)
   - [5.8 Business Intelligence & Board Analytics (`/analytics`)](#58-business-intelligence--board-analytics-analytics)
   - [5.9 Mobile Field Agent Simulator (`/mobile`)](#59-mobile-field-agent-simulator-mobile)
6. [The 12-Minute Winning Presentation Script](#6-the-12-minute-winning-presentation-script)
7. [Emergency Reset & Presenter Tips](#7-emergency-reset--presenter-tips)
8. [Handling Tough Client Questions (Cheat Sheet)](#8-handling-tough-client-questions-cheat-sheet)

---

## 1. Quick Start & Repository Setup

### Prerequisites
- **Node.js**: v18.17.0 or v20.x+ recommended. (Check with `node -v`)
- **npm**: v9.x or v10.x+. (Check with `npm -v`)
- **Git**: Installed and configured.

### Step 1: Clone the Repository
```bash
git clone <YOUR_REPOSITORY_URL>
cd CRM
```

### Step 2: Install Dependencies
```bash
npm install
```
*(Takes ~30–60 seconds. All UI components, charts, and icons are pure npm packages without binary compilation).*

### Step 3: Run the Development Server
```bash
npm run dev
```

### Step 4: Open the Application
Open your browser and navigate to:
```
http://localhost:3000
```
> **Note on Port Conflict:** If port 3000 is occupied by another process, run:
> ```bash
> npm run dev -- -p 3001
> ```
> And access `http://localhost:3001`.

### Production Build (Optional, for offline / ultra-fast demo)
```bash
npm run build
npm run start
```

---

## 2. Architecture & Zero-Config Guarantee

- **Zero Database Setup:** You **DO NOT** need Docker, PostgreSQL, MongoDB, or Redis running.
- **Zero API Keys Needed for Demo:** The platform is equipped with an integrated **Seed Engine** and client-side AI simulation engines (synthesizing streaming text and audio chimes).
- **Client-Side Persistence:** State is stored in browser `localStorage` under `propertybeast_crm_state_v1`.
- **1-Click Pristine Reset:** Test as aggressively as you want. Clicking **"Reset Demo"** in the top bar instantly resets all leads, units, site visits, and deals to their pristine state.
- **Native Audio Synthesizer:** Built with the Web Audio API. Requires zero audio files or network requests—clean chimes sound automatically on lead generation and notifications.

---

## 3. Presenter Setup & Keyboard Hotkeys

### Optimal Presentation Screen Setup
1. Use **Google Chrome** or **Microsoft Edge**.
2. Press **`F11`** (Windows) or **`Cmd + Ctrl + F`** (Mac) to enter full-screen mode.
3. Keep browser zoom at **100%** (or **90%** if presenting on a 1080p projector) to show all pipeline stages comfortably.
4. **Ensure audio is turned ON** on your laptop. The inbound lead audio chime provides an immediate psychological "hook" during live pitches.

### Presenter Keyboard Shortcuts (Available on ANY screen)

| Key | Action / Jump Target |
|:---:|:---|
| **`D`** | Jump to **Command Center Dashboard** (`/dashboard`) |
| **`P`** | Jump to **Lead Pipeline** Kanban & Table (`/pipeline`) |
| **`I`** | Jump to **Property Inventory Matrix** (`/inventory`) |
| **`V`** | Jump to **Site Visits & GPS Schedule** (`/visits`) |
| **`W`** | Jump to **WhatsApp CRM & Broadcast** (`/whatsapp`) |
| **`A`** | Jump to **AI Sales Assistant & Copilot** (`/ai-assistant`) |
| **`C`** | Jump to **Commission & Payouts Engine** (`/commissions`) |
| **`B`** | Jump to **Business Intelligence & Analytics** (`/analytics`) |
| **`M`** | Jump to **Mobile Field Agent Simulator** (`/mobile`) |
| **`S`** | ⚡ **Instant Inbound Meta Lead Simulation** (Triggers lead creation + audio chime) |
| **`G`** | 🎯 **Open 12-Minute Client Demo Presentation Script Modal** |
| **`?`** | Open Keyboard Hotkeys Cheat Sheet Modal |

---

## 4. Demo Personas & Role-Based Scopes

Located in the sticky top **Persona Bar**, you can switch roles with 1 click to show enterprise role-based access control (RBAC):

1. 👑 **Vivek Singhania (Managing Director / Founder)**
   - *Role Scope:* Full Company BI & All Portfolios.
   - *Exclusive Privileges:* Can approve broker payouts, disburse RTGS, view gross profit margins, and export board reports.
2. 👥 **Ananya Roy (Sales Manager)**
   - *Role Scope:* Team Lead Reassignment & Pipeline Oversight.
   - *Exclusive Privileges:* Can reassign leads between sales executives, monitor team SLA response times, and identify stalled leads.
3. 🏃 **Rajesh Sharma (Senior Sales Executive)**
   - *Role Scope:* Personal Follow-ups, Site Visits & Deals.
   - *Exclusive Privileges:* Focuses on assigned high-intent leads, logs GPS visits, generates WhatsApp AI pitches, and tracks personal commission earnings.

---

## 5. Screen-by-Screen Manual Testing Checklist

Follow this checklist prior to your presentation to ensure you know every click and animation.

---

### 5.1 Executive Command Center (`/dashboard`)
*URL: `http://localhost:3000/dashboard` • Hotkey: `D`*

#### What It Demonstrates:
Eliminating "Spreadsheet Chaos" and the 70% lead leakage problem. Real-time portfolio KPIs across luxury projects.

#### Step-by-Step Manual Test:
1. **Check the Top KPI Cards:**
   - Verify **Active Pipeline Value** displays `₹64.8 Cr` (or current dynamic value).
   - Check **Active Leads**, **Today's Site Visits**, and **Closed Deals**.
2. **Test the Overdue Alert Banner:**
   - Look at the red/amber alert banner: *"Overdue Follow-ups Detected"*.
   - Click the **"Review Now"** button.
   - **Expected Result:** The *Overdue Leads Review Modal* opens, listing buyers whose follow-up SLA has expired.
   - Test clicking **"WhatsApp"** or **"Call"** on any overdue lead.
   - Close the modal.
3. **Inspect the Analytics Visualizations:**
   - Observe the **Pipeline Funnel Chart** (New → Contacted → Site Visit → Booking).
   - Observe the **Lead Sources Breakdown** (Meta Ads, Google Ads, MagicBricks, Housing.com, HNIs).
4. **Test Quick Action Buttons:**
   - Click **"+ Add Lead"** → Verify the *New Lead Creation Modal* opens. Enter sample data and hit Save.
   - Click **"Schedule Site Visit"** → Verify the *Visit Scheduler Modal* opens.
   - Click **"⚡ Simulate Meta Lead"** → Listen for the audio chime and observe the toast notification at the top.

---

### 5.2 Sales Pipeline & Lead Management (`/pipeline`)
*URL: `http://localhost:3000/pipeline` • Hotkey: `P`*

#### What It Demonstrates:
Visual 7-stage Indian PropTech sales pipeline, instant round-robin lead distribution, and zero lead leakage.

#### Step-by-Step Manual Test:
1. **Switch Pipeline Views:**
   - Click the **"Table View"** icon button next to Kanban.
   - Verify all leads render with sorting, agent badges, and stage tags.
   - Switch back to **"Kanban Board"**.
2. **Filter by Project & Search:**
   - Click the Project filter dropdown (`All Projects`) and select **"Godrej Woods"**.
   - Verify only Godrej Woods leads appear. Set back to `All Projects`.
   - In the search box, type `Rajiv` → Verify only Rajiv Sethi's card is displayed. Clear the search.
3. **Simulate a Live Inbound Lead (The "WOW" Feature):**
   - Click **"⚡ Simulate Meta Lead"** (or tap **`S`** on your keyboard).
   - **Expected Result:** An audible chime plays, a toast alerts you that an ad lead was captured, and a brand new lead card instantly appears at the top of the **New Lead** column, pre-assigned to an executive via round-robin.
4. **Drag & Drop Progression:**
   - Click and hold any lead card in **New Lead** and drag it to **Contacted** or **Interested**.
   - **Expected Result:** The card snaps into place, stage counter updates, and an automated stage-change activity is logged.
5. **Open the Lead Detail Drawer:**
   - Click on the lead card **Rajiv Sethi** (₹3.2 Cr budget, Godrej Woods).
   - **Expected Result:** The side drawer slides in showing:
     - AI Intent Score: `94/100 (Hot Lead)`.
     - Tags: `NRI`, `High Intent`, `Hot`.
     - Activity Timeline with chronological call logs and WhatsApp messages.
   - **Test Actions in Drawer:**
     - Click **"Reassign"** → Select *Priya Mehta* → Verify lead assignment changes.
     - In the *Add Activity Log* box, type: `"Client requested tower 1 penthouse layout"` and click **"Save Note"**. Verify it appears in the timeline immediately.
     - Click **"Open WhatsApp Chat"** → Automatically redirects you to his live WhatsApp thread.

---

### 5.3 Property Inventory Matrix (`/inventory`)
*URL: `http://localhost:3000/inventory` • Hotkey: `I`*

#### What It Demonstrates:
Prevents double-booking disasters. Real-time tower and unit availability matrix with instant WhatsApp brochure sharing.

#### Step-by-Step Manual Test:
1. **Switch Luxury Projects:**
   - Use the project selector tabs to switch between:
     - **Godrej Woods** (Sector 43, Gurugram)
     - **DLF The Camellias** (Golf Course Road, Gurugram)
     - **Oberoi Sky City** (Borivali East, Mumbai)
   - Observe the live project metrics: Total Inventory, Available (Green), On Hold (Amber), Sold Out (Muted).
2. **Inspect the Interactive Floor Grid:**
   - In Tower 1, find unit **T1-1402** (3BHK+S, ₹3.15 Cr).
   - Click on the unit card.
   - **Expected Result:** The *Unit Detail Modal* pops up with:
     - Carpet area, super built-up area, facing direction (East), and floor plan preview.
     - Construction-Linked Payment (CLP) milestone schedule.
3. **Test Unit Hold / Booking:**
   - In the modal, click **"Put On Hold (48h Token)"**.
   - Verify the unit turns Amber with an active hold expiration countdown.
4. **Test WhatsApp Brochure Dispatch:**
   - In the modal, click **"Share Brochure via WhatsApp"**.
   - Select lead **Rajiv Sethi**.
   - **Expected Result:** The *Brochure Share Modal* generates a verified WhatsApp message containing the Godrej Woods digital brochure PDF link and pricing sheet ready for dispatch.

---

### 5.4 Site Visit Tracking & GPS Radar (`/visits`)
*URL: `http://localhost:3000/visits` • Hotkey: `V`*

#### What It Demonstrates:
Eliminates fake site visit reports by field agents through hardware-level 200m GPS geofence radar verification.

#### Step-by-Step Manual Test:
1. **Toggle Views:**
   - Switch between **List View** and **Calendar View**.
   - In Calendar view, note visits distributed across morning and afternoon slots. Switch back to **List View**.
2. **Launch the GPS Check-In Radar Simulator (The "Showstopper" Feature):**
   - Find a visit with status `SCHEDULED` (e.g., *Rajiv Sethi at Godrej Woods*).
   - Click the button **"Agent GPS Check-In Simulator"**.
   - **Expected Result:** The *GPS Geofence Radar Modal* opens:
     - An animated radar sweep scans the area.
     - Displays live simulated coordinates: `Lat 28.4595, Lng 77.0266`.
     - Calculates distance to site: `"38m from site boundary — WITHIN 200M GEOFENCE"`.
     - Displays a prominent green **"GPS Verified Check-In"** status.
3. **Complete the Post-Visit Feedback:**
   - Click **"Confirm & Log Arrival"**.
   - **Expected Result:** The *Post-Visit Feedback Modal* automatically appears:
     - Select Buyer Interest: **"Hot — Ready to Book"**.
     - Check: **"Decision Maker Present: Yes (Spouse)"**.
     - Select Preferred Unit: **"T1-1402"**.
     - Notes: `"Loved the clubhouse view. Wants payment schedule."`
     - Click **"Submit Visit Report"**.
   - **Verify:** Visit status immediately turns to **`COMPLETED`** with a green **`GPS Verified ✓`** shield badge.

---

### 5.5 Official WhatsApp CRM & Broadcast (`/whatsapp`)
*URL: `http://localhost:3000/whatsapp` • Hotkey: `W`*

#### What It Demonstrates:
Replaces personal, unmonitored WhatsApp with verified Meta Cloud API business messaging with read receipts and broadcast campaigns.

#### Step-by-Step Manual Test:
1. **Inspect Active Conversations:**
   - Click on different client threads in the left column (*Rajiv Sethi*, *Ananya Sen*, *Dr. Vikram Kapoor*).
   - Notice the green **Meta Verified Business** badge at the top.
   - Look at message status indicators: Sent, Delivered, and Read (Blue double tick `✓✓`).
2. **Test Meta Pre-Approved Templates:**
   - Click on the quick template chips below the input bar:
     - **"Send Digital Brochure"**
     - **"Site Visit Confirmation"**
     - **"Pricing Sheet"**
   - Click **"Send Message"** (or hit Enter) → Verify the message posts to the chat thread with timestamp.
3. **Simulate Inbound Client Reply (Live Interactivity):**
   - In the active chat with Rajiv Sethi, click the **"⚡ Simulate Client Reply"** button in the header.
   - **Expected Result:** An incoming chime plays, and a realistic client reply appears:  
     *`"Thanks Rajesh! Can you share the Tower 1 14th floor layout? Also what is the booking token amount?"`*
4. **Test Broadcast Campaigns:**
   - Click the **"BROADCAST"** tab at the top right.
   - View past campaigns (*"DLF Camellias Penthouse VIP Preview"*, *"Festive Spot Booking Discount"*).
   - Check performance metrics: `Delivered: 98.4%`, `Read Rate: 84.2%`, `Replies: 31.8%`.
   - Click **"+ Create Broadcast Campaign"**:
     - Select Target Audience: `HNIs & Luxury Investors (₹3 Cr+)`.
     - Select Project: `Godrej Woods`.
     - Select Template: `New Tower Launch Announcement`.
     - Click **"Launch Campaign"** → Verify the campaign appears in the active list.

---

### 5.6 AI Sales Copilot & Scoring Studio (`/ai-assistant`)
*URL: `http://localhost:3000/ai-assistant` • Hotkey: `A`*

#### What It Demonstrates:
Generative AI engineered specifically for high-ticket Indian real estate sales objection handling, urgency pitches, and predictive churn detection.

#### Step-by-Step Manual Test:
1. **Select a Target Lead:**
   - From the left lead selector, choose **Rajiv Sethi** (Intent Score: 94, Negotiation stage).
2. **Generate AI Conversion Pitch:**
   - Ensure the **"PITCH"** tab is active in the studio.
   - Set **Pitch Goal**: Choose **"Lock Booking Token"** (or "Overcome Price Objection").
   - Set **Tone**: Choose **"Urgent & Scarcity"** (or "Consultative Advisor").
   - Click **"Generate AI Pitch"**.
   - **Expected Result:** Watch the streaming text animation as the AI crafts a tailored pitch referencing Rajiv's preferred unit (T1-1402), the 48-hour price hold, and the current developer payment scheme.
3. **Test 1-Click WhatsApp Dispatch:**
   - Click **"Send via WhatsApp (✓✓)"**.
   - **Expected Result:** A success confirmation appears, and the AI pitch is automatically injected into Rajiv's WhatsApp conversation thread.
4. **Inspect AI Lead Scoring Gauge:**
   - Click the **"GAUGE"** tab.
   - Observe the multi-factor scoring breakdown:
     - Budget-to-Unit Fit: `96%`
     - Response Velocity: `92%`
     - Site Visit Completed: `100%`
     - Decision Maker Status: `Verified`
   - Review the AI Strategic Recommendation: *"Immediate high closing probability within 72 hours."*
5. **Inspect Deal Risk Predictor:**
   - Click the **"RISK"** tab.
   - Observe the real-time churn risk indicators, days in current stage, and AI-recommended mitigation actions.

---

### 5.7 Broker Commission & Payout Engine (`/commissions`)
*URL: `http://localhost:3000/commissions` • Hotkey: `C`*

#### What It Demonstrates:
Automated multi-tier commission accounting, Section 194H 5% TDS deductions, 18% GST calculation, and 1-click RTGS approval workflow.

#### Step-by-Step Manual Test:
1. **Review Executive Ledger Stats:**
   - Check **Total Deal Value**, **Gross Brokerage Billed**, **Agent Payouts Disbursed**, and **TDS Retained (Section 194H)**.
2. **Log a New Closed Deal:**
   - Click **"+ Log Closed Deal"**.
   - In the modal:
     - Select Lead: **Rajiv Sethi**
     - Select Project: **Godrej Woods**
     - Select Unit: **T1-1402**
     - Enter Deal Agreement Value: `₹3,15,00,000` (₹3.15 Cr)
     - Select Commission Slab: **Tiered 3.0%**
     - Set Agent Share: **60%**
   - **Observe Real-Time Calculations:**
     - Gross Brokerage (3%): `₹9,45,000`
     - GST (18%): `₹1,70,100`
     - Total Invoice to Developer: `₹11,15,100`
     - Agent Share (60%): `₹5,67,000`
     - Less TDS u/s 194H (5%): `-₹28,350`
     - **Net Payout to Agent:** `₹5,38,650`
   - Click **"Confirm & Log Deal"**.
3. **Test Role-Based Director Approval & RTGS Payout:**
   - Look at the top **Persona Bar**:
     - Ensure the active persona is **Vivek Singhania (Managing Director)**. (If not, click Vivek's avatar).
   - In the Payouts Table, locate the newly created deal.
   - Status will show `PENDING_APPROVAL`.
   - Click the button **"Approve Payout"** → Status turns to `APPROVED`.
   - Click **"Disburse RTGS"** → Enter a simulated UTR number (`HDFC0001928374`) → Status turns to `DISBURSED`.
4. **Generate Corporate Tax Statement Voucher:**
   - Click the **"Statement"** button on any disbursed deal.
   - **Expected Result:** A corporate-branded **Commission & Tax Deduction Voucher** modal opens, formatted as an official tax invoice showing company PAN, GSTIN, agent PAN, Section 194H TDS deduction certificate, and RTGS UTR reference number.

---

### 5.8 Business Intelligence & Board Analytics (`/analytics`)
*URL: `http://localhost:3000/analytics` • Hotkey: `B`*

#### What It Demonstrates:
Comprehensive marketing ROAS attribution, funnel velocity, and 1-click executive board reports.

#### Step-by-Step Manual Test:
1. **Filter by Timeframe & Project:**
   - Toggle timeframe tabs: **MTD**, **Q2 (Current)**, **FY26**.
   - Filter by Project: Select **DLF The Camellias** to view luxury segment metrics.
2. **Review Channel ROAS Analytics:**
   - Compare spend vs revenue generated across channels:
     - Meta Ads (Instagram/Facebook)
     - Google Search (High Intent)
     - Property Portals (MagicBricks / 99acres)
     - Channel Partner (CP) Network
3. **Generate Executive Board Memo:**
   - Click the **"Executive Board Memo"** (or "Generate PDF") button in the header.
   - **Expected Result:** A modal renders a structured, printable executive board memo summarizing revenue pacing, top performing agents, and pipeline health.

---

### 5.9 Mobile Field Agent Simulator (`/mobile`)
*URL: `http://localhost:3000/mobile` • Hotkey: `M`*

#### What It Demonstrates:
The on-ground field experience for sales agents standing at construction sites, showing mobile-optimized GPS check-ins and AI voice note transcription.

#### Step-by-Step Manual Test:
1. **Inspect Mobile Phone View:**
   - View the simulated iPhone frame showcasing **Rajesh Sharma's** daily view.
2. **Test Push Notification Simulation:**
   - Click **"⚡ Simulate Push Notification"** (or click "Simulate Meta Lead").
   - **Expected Result:** An iOS-style push notification banner slides down from the top of the phone frame:  
     *`🔔 New Lead Assigned: Vikram Seth • Budget ₹3.2 Cr • Godrej Woods`*
3. **Test Field Agent Tabs:**
   - Tap **"My Leads"** → View assigned leads with 1-tap WhatsApp and Call buttons.
   - Tap **"Today's Visits"** → View scheduled visits and launch instant GPS check-in directly from the phone.
   - Tap **"Earnings"** → View agent's personal net commission wallet after TDS deductions.
4. **Test AI Voice Note Meeting Transcription (The Closer):**
   - In the mobile screen, tap the **Microphone (Mic) icon** next to a client.
   - **Expected Result:** The *Voice Note Transcription Modal* opens.
   - Watch the animated waveform simulate an agent dictating meeting notes:  
     *`"Met client Mr. Rajiv Sethi at the Godrej Woods site office. He liked unit T1-1402 but requested 5% discount on clubhouse charges. Follow up on Tuesday."`*
   - Observe the AI automatically parse the audio into:
     - Extracted Intent: **High (95%)**
     - Unit Mentioned: **T1-1402**
     - Action Item: **Clubhouse fee waiver follow-up on Tuesday**
   - Tap **"Apply to CRM"** → Updates lead history automatically.

---

## 6. The 12-Minute Winning Presentation Script

*(Use this chronological storyboard during live client pitches or investor demos)*

```
[0:00 – 1:30]  SCREEN: /dashboard (Hotkey: D)
THE HOOK: "The 70% Lead Leakage Problem"
------------------------------------------------------------------------------------------------
• "Good morning. In Indian luxury real estate, 70% of high-intent buyers are lost not because 
  the property is bad, but because lead follow-up is delayed by 4 to 8 hours and leads sit 
  unassigned in Google Sheets."
• "PropertyBeast eliminates this completely. As a Managing Director, the moment you log in, 
  you see your live ₹64.8 Cr active pipeline and this red banner flagging overdue follow-ups."
• [ACTION]: Click 'Review Now' on the overdue banner, show instant triage, and close.

[1:30 – 3:30]  SCREEN: /pipeline (Hotkey: P)
ZERO LEAD LEAKAGE & ROUND-ROBIN
------------------------------------------------------------------------------------------------
• "Let's see what happens the exact second a high-net-worth buyer fills out your Instagram 
  or MagicBricks ad right now."
• [ACTION]: Tap 'S' (or click '⚡ Simulate Meta Lead').
• [AUDIO]: Chime rings!
• "Within 2 seconds, zero human delay. Rajiv Sethi has been ingested, scored 94/100 by AI, 
  and round-robin assigned to senior consultant Rajesh Sharma."
• [ACTION]: Drag Rajiv's card to 'Contacted', then click the card to reveal the complete 
  AI timeline and interaction history in the side drawer.

[3:30 – 5:30]  SCREEN: /ai-assistant (Hotkey: A) & /whatsapp (Hotkey: W)
AI SALES COPILOT & OFFICIAL WHATSAPP CRM
------------------------------------------------------------------------------------------------
• "Sales reps hate drafting messages, and agencies lose client data when reps use personal WhatsApp."
• [ACTION]: On Rajiv Sethi, select Goal: 'Lock Booking Token', Tone: 'Urgent & Scarcity'.
• [ACTION]: Click 'Generate AI Pitch' → text streams dynamically.
• "Our AI crafts the exact pitch quoting Rajiv's preferred unit and payment milestone."
• [ACTION]: Click 'Send via WhatsApp (✓✓)'. Jump to /whatsapp (Hotkey: W).
• "Notice the official Meta verified checkmark, blue read receipts, and company ownership."
• [ACTION]: Click '⚡ Simulate Client Reply' → Hear chime and show client's inbound reply.

[5:30 – 7:00]  SCREEN: /inventory (Hotkey: I)
ELIMINATING DOUBLE BOOKINGS: TOWER MATRIX
------------------------------------------------------------------------------------------------
• "The biggest embarrassment for a developer is when two agents sell the same luxury unit."
• [ACTION]: Switch between Godrej Woods and DLF The Camellias.
• [ACTION]: Click unit T1-1402. Show carpet area, facing, and the Construction-Linked Plan (CLP).
• [ACTION]: Click 'Put On Hold (48h Token)' → Unit turns amber with active countdown.
• [ACTION]: Click 'Share Brochure via WhatsApp' to dispatch instant digital collateral.

[7:00 – 9:00]  SCREEN: /visits (Hotkey: V)
THE SHOWSTOPPER: FRAUD-PROOF GPS RADAR CHECK-IN
------------------------------------------------------------------------------------------------
• "The #1 headache for real estate directors is fake site visit reports by field executives."
• "PropertyBeast enforces hardware-level GPS verification within a strict 200m site boundary."
• [ACTION]: Click 'Agent GPS Check-In Simulator' on an active visit.
• [ACTION]: Watch the animated radar sweep find coordinates: '38m from site — GPS Verified!'.
• [ACTION]: Click 'Confirm Arrival' → fill out the 30-second post-visit feedback → submit.
• "The director now has 100% auditable proof that the buyer walked the site."

[9:00 – 11:00] SCREEN: /commissions (Hotkey: C)
AUTOMATED COMMISSION SPLITS & SECTION 194H TDS
------------------------------------------------------------------------------------------------
• "When a ₹3.5 Cr unit closes, accounting takes days calculating GST, agency shares, and TDS."
• [ACTION]: Click '+ Log Closed Deal' → Select Rajiv Sethi, Godrej Woods, Tiered 3% slab.
• "Watch the engine automatically compute ₹9.45 Lakh brokerage, 18% GST, and 5% Section 194H TDS."
• [ACTION]: Switch persona to Vivek Singhania (Director) in the top bar.
• [ACTION]: Click 'Approve Payout' → Click 'Disburse RTGS'.
• [ACTION]: Click 'Statement' to show the branded corporate tax voucher slip.
• "CFOs and founders love this. 3 days of accounting reduced to 30 seconds."

[11:00 – 12:00] SCREEN: /mobile (Hotkey: M)
CLOSING: THE FIELD AGENT PWA & SUMMARY
------------------------------------------------------------------------------------------------
• "Finally, your field agents on site have a lightning-fast mobile experience."
• [ACTION]: Show the simulated phone frame, test the push notification, and demonstrate 
  the AI Voice Note transcription microphone.
• "PropertyBeast delivers full pipeline visibility, zero lead leakage, verified visits, and 
  instant commission accounting—in one unified system."
• [ACTION]: Open the floor for Questions & Answers.
```

---

## 7. Emergency Reset & Presenter Tips

### 1-Click Demo Reset (Before Every Presentation)
If you made test edits, created sample deals, or dragged cards around:
1. Locate the **Persona Bar** at the very top of the screen.
2. Click the **"Reset Demo"** button on the far right.
3. Click **"OK"** on the confirmation prompt.
4. **Result:** The entire CRM restores to its immaculate seed state (30 balanced leads across all 7 stages, 3 luxury projects, verified visits, and clean ledger).

### If Port 3000 Fails to Start
If your terminal reports `Error: listen EADDRINUSE: address already in use :::3000`:
- **Option A (Quickest):** Run on another port:
  ```bash
  npm run dev -- -p 3001
  ```
- **Option B (Windows kill port):**
  ```powershell
  Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
  ```

### In-App Pitch Guide Helper
If you forget the talking points while presenting:
- Simply tap the **`G`** key on your keyboard (or click **"Pitch Guide"** in the top bar).
- An interactive modal appears on top of your screen displaying the exact time-stamped script, talking points, and direct jump buttons for that step.

---

## 8. Handling Tough Client Questions (Cheat Sheet)

| Client Question | Best Answer to Give |
|:---|:---|
| *"Can this integrate with our existing Meta Ads / Facebook Page?"* | **"Yes.** PropertyBeast connects directly to the Meta Graph Webhook API. Leads generated from Facebook/Instagram Lead Ads are pushed into the CRM via webhook in under 3 seconds." |
| *"Can we change the commission slab percentages?"* | **"Absolutely.** The commission engine supports configurable rules: Flat percentages (e.g. 2%), tiered performance slabs (2% up to ₹5 Cr, 3% thereafter), and custom agency/agent splits." |
| *"What happens if an agent has their GPS turned off on site?"* | **"The visit cannot be marked as 'GPS Verified'.** It gets flagged as 'Manual / Unverified', alerting the sales manager to verify proof before approving credit." |
| *"Does the WhatsApp chat integrate with official WhatsApp?"* | **"Yes.** It runs on the official Meta Cloud API. Messages are sent from your verified green-tick business phone number, and all conversations remain company property even if an agent leaves." |
| *"Can we host this on our own private cloud or AWS?"* | **"Yes.** The Next.js architecture can be deployed in minutes on AWS, Vercel, Azure, or any private containerized Docker infrastructure with enterprise data isolation." |

---

*PropertyBeast CRM — Built for Maximum Sales Velocity.*  
*Good luck with the presentation!*
