# PropertyBeast CRM — Pure Client Demo & MVP

> **Next-Generation Real Estate Sales & Operations CRM**  
> Engineered for real estate developers, luxury brokerages, and channel partners.

---

## 🚀 Phase 0: Architecture, Design System & Seed Engine (Complete)

### 1. Technology Foundation
- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + custom dark-slate prestige tokens (`#090D16` / `#0F172A` / `#1E293B`)
- **Accents:** Emerald Green (`#10B981`) & Amber Gold (`#F59E0B`)
- **Components:** Radix UI primitives (`@radix-ui/react-dialog`, `@radix-ui/react-tabs`, etc.)
- **State Management:** Zustand reactive store with `localStorage` persistence and 1-click demo reset
- **Icons & Typography:** Lucide React + Inter & Plus Jakarta Sans

### 2. Switchable Demo Personas (Persistent Top Bar)
- **Vivek Singhania (Managing Director):** Full executive overview, total portfolio metrics, all leads, and commission clearances.
- **Ananya Roy (Sales Manager):** Team lead distribution, unassigned leads, and agent conversion performance.
- **Rajesh Sharma (Senior Sales Executive):** Dedicated sales rep view for daily calls, personal leads, and scheduled site visits.

### 3. Realistic Indian PropTech Seed Engine
- **3 Luxury Projects:**
  - *Godrej Woods (Sector 43, Gurugram)* — ₹1.85 Cr to ₹4.60 Cr
  - *DLF The Camellias (Golf Course Rd, Gurugram)* — ₹8.50 Cr to ₹14.50 Cr
  - *Oberoi Sky City (Borivali East, Mumbai)* — ₹2.20 Cr to ₹6.80 Cr
- **30 Realistic Leads:**
  - Distributed across all 7 pipeline stages:
    1. *New Lead* (6)
    2. *Contacted* (5)
    3. *Interested* (5)
    4. *Site Visit Scheduled* (5)
    5. *Negotiation* (4)
    6. *Booking* (3)
    7. *Closed / Won* (2)
  - Complete with AI Intent scores (0–100), tags (`Hot`, `NRI`, `Investor`), source tags, and chronological interaction histories.
- **5 Sales Consultants:** Rajesh Sharma, Priya Mehta, Amit Verma, Sneha Kapoor, Vikram Malhotra.
- **Site Visits & GPS:** Pre-configured visits with simulated GPS verification status and radius checks.
- **Meta-Approved WhatsApp Templates:** Ready for brochure sharing and follow-ups.

---

## 🛠️ How to Run

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Local Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🎯 Next Milestone
- **Phase 1:** Executive Dashboard & Command Center (Live counters, animated charts, overdue alert banners, and activity feeds).
