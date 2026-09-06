# PropertyBeast CRM — Technology Stack

> **Document Type:** Internal Engineering Reference
> **Product:** PropertyBeast CRM (Internal Tool)
> **Version:** 1.0
> **Date:** September 2026
> **Audience:** Engineering Team, CTO, Management

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Frontend — Web Application](#2-frontend--web-application)
3. [Mobile Application](#3-mobile-application)
4. [Backend — API Layer](#4-backend--api-layer)
5. [Databases & Storage](#5-databases--storage)
6. [Real-Time Infrastructure](#6-real-time-infrastructure)
7. [AI / ML Layer](#7-ai--ml-layer)
8. [Integrations](#8-integrations)
9. [Cloud Infrastructure & DevOps](#9-cloud-infrastructure--devops)
10. [Security & Auth](#10-security--auth)
11. [Cost Estimation](#11-cost-estimation)
12. [Alternatives Considered](#12-alternatives-considered)
13. [Decision Summary Table](#13-decision-summary-table)

---

## 1. Architecture Overview

PropertyBeast CRM follows a **layered, API-first monorepo architecture** optimized for:
- A single-company, single-tenant deployment
- Fast iteration by a small internal engineering team
- Mobile + web parity through shared API contracts
- Data residency within India (AWS Mumbai region)

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                        │
│  ┌─────────────────┐        ┌──────────────────────┐   │
│  │  React Web App  │        │  React Native App    │   │
│  │  (Next.js)      │        │  (iOS + Android)     │   │
│  └────────┬────────┘        └──────────┬───────────┘   │
└───────────┼─────────────────────────────┼───────────────┘
            │        HTTPS / WSS          │
┌───────────▼─────────────────────────────▼───────────────┐
│                     API GATEWAY                         │
│               (AWS API Gateway + ALB)                   │
└───────────────────────────┬─────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────┐
│                   BACKEND SERVICES                      │
│                                                         │
│  ┌──────────────┐  ┌────────────┐  ┌─────────────────┐  │
│  │  NestJS API  │  │  WebSocket │  │  AI/ML Service  │  │
│  │  (Core CRM)  │  │  Server    │  │  (Python/FastAPI)│  │
│  └──────┬───────┘  └─────┬──────┘  └────────┬────────┘  │
└─────────┼────────────────┼──────────────────┼────────────┘
          │                │                  │
┌─────────▼────────────────▼──────────────────▼────────────┐
│                      DATA LAYER                          │
│  ┌──────────────┐  ┌──────────┐  ┌───────────────────┐   │
│  │  PostgreSQL  │  │  Redis   │  │  AWS S3 (Files)   │   │
│  │  (Primary DB)│  │  (Cache) │  │  (Docs/Brochures) │   │
│  └──────────────┘  └──────────┘  └───────────────────┘   │
└──────────────────────────────────────────────────────────┘
          │
┌─────────▼──────────────────────────────────────────────┐
│                EXTERNAL INTEGRATIONS                   │
│  Meta Ads │ MagicBricks │ 99acres │ WhatsApp API │ SMS │
└────────────────────────────────────────────────────────┘
```

---

## 2. Frontend — Web Application

### Chosen: Next.js 14 (React) + TypeScript

| Attribute | Detail |
|:---|:---|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **UI Library** | shadcn/ui + Radix UI (accessible, unstyled primitives) |
| **Styling** | Tailwind CSS |
| **State Management** | Zustand (lightweight global state) + TanStack Query (server state & caching) |
| **Charts & Analytics** | Recharts |
| **Forms** | React Hook Form + Zod (schema validation) |
| **Data Tables** | TanStack Table |
| **Date Handling** | Day.js |

### Why Next.js?

- **Server-Side Rendering (SSR):** Dashboard pages with heavy data load faster due to server-side data fetching — critical for management views with large lead counts
- **API Routes:** Lightweight BFF (Backend for Frontend) layer for data transformation without adding a separate proxy service
- **TypeScript-first ecosystem:** Reduces runtime bugs and accelerates developer onboarding
- **File-based routing:** Drastically reduces boilerplate for a CRM with many distinct sections (leads, inventory, visits, reports)
- **Internal tool advantage:** No SEO requirements, so SSR provides pure performance gains rather than SEO benefits

### Why shadcn/ui?

- Copy-paste component approach means **no vendor lock-in** — components live in our codebase and can be fully customized
- Built on Radix UI primitives, which are **accessible by default** (keyboard navigation, screen readers)
- Works seamlessly with Tailwind CSS

### Impact

- Shared TypeScript types between frontend and backend reduce API integration errors by an estimated **60%**
- TanStack Query's caching strategy means repeated visits to the same lead page don't re-fetch from the server — reduces backend load
- shadcn/ui accelerates UI development by **2–3x** compared to building from scratch

### Cost

- **License:** Free & open-source (MIT)
- **Hosting:** Covered under AWS EC2 / ECS infrastructure (see §9)

---

## 3. Mobile Application

### Chosen: React Native + Expo (managed workflow)

| Attribute | Detail |
|:---|:---|
| **Framework** | React Native 0.74+ |
| **Toolchain** | Expo SDK 51 (managed workflow) |
| **Navigation** | Expo Router (file-based, mirrors Next.js conventions) |
| **State** | Zustand + TanStack Query (same pattern as web) |
| **Maps & GPS** | expo-location + react-native-maps (Google Maps) |
| **Push Notifications** | Expo Push Notifications / FCM (Android) + APNs (iOS) |
| **Offline Support** | WatermelonDB (local SQLite) |
| **WhatsApp Deep Link** | Native WhatsApp URI scheme (`whatsapp://send`) |
| **Voice Notes** | expo-av |

### Why React Native + Expo?

- **Code sharing:** ~60–70% of business logic (API calls, validation, state management) shared between web and mobile via a shared `packages/core` library in the monorepo
- **Single team:** No need to hire separate iOS/Android developers — one React team owns everything
- **Expo managed workflow:** Eliminates native build complexity; OTA (Over-The-Air) updates push new JS bundles to devices without requiring App Store re-submission for minor updates
- **GPS & camera access:** Expo provides stable, well-maintained APIs for GPS check-in and file uploads out of the box

### Why WatermelonDB for Offline?

- High-performance local SQLite database designed specifically for React Native
- Supports sync with remote PostgreSQL — perfect for the offline-then-sync requirement (site visit check-ins in low-signal areas)
- **Alternative considered:** MMKV (too simple for relational offline data), Realm (licensing concerns)

### Trade-offs

| Trade-off | Mitigation |
|:---|:---|
| Expo managed workflow limits some native modules | Eject to bare workflow only if a critical native module is unavailable (unlikely for our use case) |
| App Store / Play Store review needed for major releases | OTA updates (Expo Updates) handle most incremental changes instantly |
| React Native performance vs native Swift/Kotlin | For a CRM tool (list views, forms, maps), React Native performance is more than sufficient |

### Impact

- **Single codebase** for iOS + Android saves ~4–6 months of development time vs. building two separate native apps
- OTA updates mean agents get bug fixes and new features **within minutes** of deployment, not days

### Cost

- **Expo:** Free tier sufficient for internal tools (no public app store publishing quotas apply)
- **Google Maps SDK:** Free up to 28,000 map loads/month; ~$7/1,000 loads beyond that — negligible for internal use
- **FCM (Firebase Cloud Messaging):** Free
- **APNs (Apple Push Notifications):** Free; requires Apple Developer Program membership ($99/year ≈ ₹8,300/year)

---

## 4. Backend — API Layer

### Chosen: NestJS (Node.js) + TypeScript

| Attribute | Detail |
|:---|:---|
| **Framework** | NestJS 10 |
| **Runtime** | Node.js 20 LTS |
| **Language** | TypeScript |
| **API Style** | REST (primary) + WebSocket (real-time) |
| **ORM** | Prisma ORM |
| **Validation** | class-validator + class-transformer |
| **Job Queue** | BullMQ (backed by Redis) |
| **Email** | Nodemailer + AWS SES |
| **Logging** | Winston + AWS CloudWatch |
| **API Docs** | Swagger / OpenAPI (auto-generated from decorators) |

### Why NestJS?

- **Architecture discipline:** NestJS enforces a structured, modular architecture (modules → controllers → services → repositories) from day one — avoids the "big ball of mud" problem common in Express.js projects that scale
- **TypeScript-native:** Full type safety from database query (Prisma) to HTTP response — types flow through the entire stack
- **Decorator-based:** Controllers, guards, interceptors, and pipes are clean and testable
- **Built-in DI (Dependency Injection):** Makes unit testing significantly easier
- **Monorepo friendly:** First-class support for NestJS monorepo workspaces

### Why Prisma ORM?

- **Type-safe database queries** generated from schema — eliminates entire classes of SQL injection and type mismatch bugs
- **Auto-migration:** `prisma migrate dev` generates and applies SQL migrations from schema changes — critical for a small team iterating fast
- **Prisma Studio:** Built-in GUI to inspect database during development
- **Schema as single source of truth:** The `schema.prisma` file is the contract between backend and database

### Why BullMQ for Job Queues?

- **Critical use cases:** Lead assignment processing, WhatsApp broadcast sends (rate-limited), commission calculations, scheduled report emails — all require reliable async processing
- **Redis-backed:** Durable, retryable jobs with configurable retry strategies
- **Built-in rate limiting:** Prevents WhatsApp API rate limit violations during large broadcasts

### Impact

- Prisma's type safety reduces database-related bug reports by an estimated **40%**
- BullMQ handles lead assignment asynchronously — users never wait for the assignment logic to complete; they get instant UI feedback
- NestJS modules allow the team to onboard a new backend developer in **2–3 days** vs. weeks with a custom Express setup

### Cost

- **License:** All open-source (MIT)
- **Runtime:** Covered under EC2/ECS infrastructure

---

## 5. Databases & Storage

### 5.1 Primary Database: PostgreSQL 16

| Attribute | Detail |
|:---|:---|
| **Service** | AWS RDS for PostgreSQL (Mumbai region) |
| **Instance** | db.t3.medium (development) → db.r6g.large (production) |
| **Storage** | 100 GB GP3 SSD (auto-scaling enabled) |
| **Backup** | Automated daily snapshots, 30-day retention |
| **Replication** | Multi-AZ standby for high availability |

**Why PostgreSQL?**
- The CRM data model is highly relational: leads → assigned agents → property interests → site visits → commission records — all linked by foreign keys. PostgreSQL handles this natively with ACID compliance.
- **JSONB columns** for flexible metadata (lead source-specific fields vary by portal)
- **Full-text search** with `pg_trgm` for searching leads and properties without a separate search engine in Phase 1
- **Row-level security (RLS)** for enforcing agent-to-lead access control at the database level

**Cost (INR/month estimates):**

| Environment | Instance | Estimated Cost |
|:---|:---|:---|
| Development | db.t3.micro (single AZ) | ~₹1,500/mo |
| Production | db.r6g.large (Multi-AZ) | ~₹12,000/mo |

---

### 5.2 Cache & Queue Store: Redis 7 (AWS ElastiCache)

| Attribute | Detail |
|:---|:---|
| **Service** | AWS ElastiCache for Redis |
| **Instance** | cache.t3.medium |
| **Use Cases** | Session storage, BullMQ job queues, API response caching, real-time dashboard counters |

**Why Redis?**
- **Sessions:** JWT token blacklisting on logout (stateless JWT cannot be invalidated otherwise)
- **BullMQ:** Requires Redis as its storage backbone
- **Caching:** Dashboard KPI counts (total leads, today's visits) cached for 30 seconds — prevents database overload during peak hours
- **Pub/Sub:** Used by the WebSocket server to broadcast real-time lead assignment events across multiple server instances

**Cost:** ~₹4,000/mo (cache.t3.medium, single AZ)

---

### 5.3 File Storage: AWS S3

| Attribute | Detail |
|:---|:---|
| **Service** | AWS S3 (ap-south-1 / Mumbai region) |
| **Use Cases** | Property brochures (PDF), floor plans, project images, commission invoices (PDF), exported reports |
| **Access** | Private buckets; pre-signed URLs for time-limited access |
| **CDN** | AWS CloudFront in front of S3 for fast brochure downloads |

**Why S3?**
- **Unlimited storage** that scales automatically — no capacity planning needed
- **Pre-signed URLs** allow agents to share brochures via WhatsApp without exposing the actual bucket URL
- **Lifecycle policies** automatically archive old reports to S3 Glacier to reduce cost

**Cost:** ~₹500–₹1,500/mo (estimated 50–200 GB of files in year 1; S3 Standard ≈ $0.023/GB/month in Mumbai)

---

## 6. Real-Time Infrastructure

### Chosen: Socket.IO (WebSocket)

| Attribute | Detail |
|:---|:---|
| **Library** | Socket.IO 4 (NestJS WebSocket Gateway) |
| **Backed by** | Redis Pub/Sub (for multi-instance scaling) |
| **Use Cases** | Live dashboard counters, new lead alert popups, pipeline stage change notifications |

### Why Socket.IO over SSE (Server-Sent Events)?

- **Bi-directional:** Agents can acknowledge alerts, which updates the server — SSE is one-directional
- **Fallback support:** Automatically falls back to HTTP long-polling on networks that block WebSocket (common in builder site network environments)
- **Room-based broadcasting:** Easily broadcast to specific agents (rooms) on new lead assignment

### Impact

- Management dashboard updates in **< 1 second** when a new lead arrives — no page refresh needed
- Agents receive instant in-app popup notifications alongside push notifications on mobile

---

## 7. AI / ML Layer

### Chosen: Python (FastAPI) Microservice + OpenAI API

| Attribute | Detail |
|:---|:---|
| **Service Language** | Python 3.12 |
| **API Framework** | FastAPI |
| **Phase 1–2 Scoring** | Rule-based scoring engine (no ML yet) |
| **Phase 3 ML** | scikit-learn / XGBoost (trained on internal deal history) |
| **Phase 3 Follow-Up Generator** | OpenAI GPT-4o API (or Azure OpenAI for data residency compliance) |
| **Model Training** | Offline retraining pipeline (scheduled weekly via AWS Lambda) |
| **Communication** | Internal REST calls from NestJS → FastAPI (not exposed externally) |

### Why a Separate Python Microservice?

- The ML ecosystem (scikit-learn, pandas, XGBoost, transformers) is Python-native — fighting this in Node.js is not worth it
- **Separation of concerns:** The AI service can be updated, retrained, or replaced independently without touching core CRM logic
- **FastAPI** is production-grade, async-first, and auto-generates OpenAPI docs — minimal overhead

### Why OpenAI GPT-4o for Follow-Up Generation?

- **Quality:** Produces context-aware, professional WhatsApp message drafts tailored to the lead's stage and history
- **Speed to market:** No model training required for the language model component; just prompt engineering
- **Azure OpenAI option:** Keeps data within Azure's Indian data centres for compliance if needed

### Phase 3 AI Feature Cost Estimates

| Feature | Estimated Usage | Monthly Cost |
|:---|:---|:---|
| Lead Scoring (rule-based, Phase 1–2) | Internal compute only | ₹0 |
| Lead Scoring (ML model, Phase 3) | Inference on AWS EC2 t3.small | ~₹1,200/mo |
| Follow-Up Generator (GPT-4o) | ~5,000 messages/month @ $0.005/message | ~₹2,000/mo |
| Conversion Prediction (XGBoost) | Batch job, runs nightly | ~₹500/mo |

---

## 8. Integrations

### 8.1 WhatsApp Business API

| Option | Provider | Notes |
|:---|:---|:---|
| **Recommended** | **Meta Cloud API (direct)** | Free API access; only pay for WhatsApp message costs |
| **Alternative** | BSP: Interakt / Wati / Gupshup | Simpler setup but adds ₹3,000–₹15,000/mo overhead; suitable if IT team lacks bandwidth |

**Why Meta Cloud API directly?**
- **Cost savings:** BSPs add a significant markup on message costs; at scale the savings are substantial
- **Control:** Full control over template management, webhook handling, and rate limiting logic
- **WhatsApp Message Pricing (Meta, India):**

| Message Type | Cost per Message |
|:---|:---|
| Utility (transactional — visit reminders, booking confirmations) | ~₹0.10–0.14 |
| Marketing (broadcast campaigns, new launch updates) | ~₹0.55–0.70 |
| Service (reply within 24h window) | Free |

**Estimated monthly cost at 10,000 messages/month:** ~₹2,500–₹5,000

---

### 8.2 Lead Portal Integrations

| Portal | Integration Method | Difficulty |
|:---|:---|:---|
| **Facebook / Meta Lead Ads** | Meta Webhooks (real-time lead feed) | Low |
| **MagicBricks** | Email parser (MagicBricks sends lead emails) | Medium |
| **Housing.com** | API (Housing.com has a partner API) | Medium |
| **99acres** | Email parser (99acres sends lead emails) | Medium |
| **Google Ads** | Google Ads Lead Form Extensions via webhook | Low |

**Email Parser Approach (for MagicBricks, 99acres):**
- Set up a dedicated inbound email address (e.g., `leads@propertybeast.internal`)
- NestJS service parses structured lead emails using regex/template matching
- Fallback: Manual lead entry if format changes

---

### 8.3 SMS Gateway

| Attribute | Detail |
|:---|:---|
| **Provider** | Twilio (India) or MSG91 |
| **Use Cases** | Site visit reminders, OTP for login, WhatsApp fallback |
| **Cost** | ~₹0.15–0.20 per SMS (transactional) |

**Recommendation: MSG91** — India-focused, better DLT (Distributed Ledger Technology) compliance for transactional SMS, lower cost than Twilio for Indian numbers.

---

### 8.4 Maps & GPS

| Feature | Service | Cost |
|:---|:---|:---|
| Site location display | Google Maps JavaScript API | Free up to 28K loads/month |
| Agent GPS check-in validation | Device GPS + server-side radius check | No cost |
| Turn-by-turn navigation (mobile) | Google Maps SDK for Mobile | Free |

---

## 9. Cloud Infrastructure & DevOps

### Chosen: AWS (ap-south-1 — Mumbai Region)

**Reason for AWS Mumbai:** Data residency compliance — all customer PII remains within India.

### Infrastructure Components

| Component | Service | Purpose |
|:---|:---|:---|
| Web App Hosting | AWS ECS Fargate | Containerized Next.js app (no server management) |
| API Hosting | AWS ECS Fargate | Containerized NestJS API |
| AI Service | AWS ECS Fargate | Containerized FastAPI |
| Load Balancer | AWS ALB (Application Load Balancer) | SSL termination, routing, health checks |
| Container Registry | AWS ECR | Private Docker image storage |
| Database | AWS RDS (PostgreSQL) | Managed, Multi-AZ |
| Cache | AWS ElastiCache (Redis) | Managed Redis |
| File Storage | AWS S3 + CloudFront | Documents, brochures, images |
| Secrets Management | AWS Secrets Manager | API keys, DB credentials |
| CI/CD | GitHub Actions + AWS CodeDeploy | Automated build, test, deploy pipeline |
| Monitoring | AWS CloudWatch + Grafana | Metrics, logs, alerts |
| Error Tracking | Sentry (self-hosted or cloud) | Real-time error reporting |
| Domain & SSL | AWS Route 53 + ACM (free SSL) | Internal domain routing |

### DevOps Workflow

```
Developer Push → GitHub → GitHub Actions (lint, test, build Docker image)
→ Push to ECR → AWS CodeDeploy → ECS rolling update → Slack notification
```

- **Zero-downtime deployments:** ECS rolling updates replace containers one at a time
- **Environment isolation:** Separate `dev`, `staging`, and `production` ECS clusters
- **Infrastructure as Code:** All AWS resources defined in Terraform — reproducible, version-controlled

---

## 10. Security & Auth

### Chosen: JWT + Refresh Token Rotation

| Attribute | Detail |
|:---|:---|
| **Authentication** | Email + Password (bcrypt, cost factor 12) |
| **Token Strategy** | Short-lived JWT access token (15 min) + long-lived refresh token (7 days) stored in httpOnly cookie |
| **Token Revocation** | Refresh token blacklist in Redis |
| **RBAC** | NestJS Guards + Prisma row-level filtering |
| **MFA (Phase 2)** | TOTP (Google Authenticator compatible) for admin and management roles |
| **API Security** | Rate limiting per IP (100 req/min), Helmet.js headers, CORS restricted to internal domains |
| **Data Encryption** | AES-256 encryption for PII fields (phone numbers) at rest |
| **Audit Logging** | All mutating API calls logged to a separate `audit_logs` table with user, timestamp, before/after values |

---

## 11. Cost Estimation

### Monthly Infrastructure Cost (Production) — Estimated

| Service | Description | Est. Monthly Cost (INR) |
|:---|:---|:---|
| AWS ECS Fargate | 3 services (web, API, AI) — ~4 vCPU, 8 GB RAM total | ₹8,000 |
| AWS RDS PostgreSQL | db.r6g.large Multi-AZ | ₹12,000 |
| AWS ElastiCache Redis | cache.t3.medium | ₹4,000 |
| AWS S3 + CloudFront | 200 GB storage + CDN transfer | ₹1,500 |
| AWS ALB | Application Load Balancer | ₹1,200 |
| AWS Secrets Manager | <50 secrets | ₹400 |
| AWS Route 53 + ACM | Domain + free SSL | ₹150 |
| AWS CloudWatch | Logs + metrics | ₹1,000 |
| WhatsApp API Messages | ~10,000 messages/month | ₹3,500 |
| MSG91 SMS | ~2,000 SMS/month | ₹400 |
| Google Maps API | Internal usage, within free tier | ₹0 |
| OpenAI API (Phase 3) | ~5,000 AI message drafts | ₹2,000 |
| Sentry Error Tracking | Team plan | ₹1,500 |
| Apple Developer Program | Annual ÷ 12 | ₹700 |
| **Total Estimated Monthly** | | **~₹36,350/month** |

### One-Time / Setup Costs

| Item | Estimated Cost (INR) |
|:---|:---|
| WhatsApp Business API verification & setup | ₹5,000–₹15,000 (if using a BSP for setup assistance) |
| SSL certificates | ₹0 (AWS ACM is free) |
| Domain registration (internal domain) | ₹1,000/year |
| Terraform / infra setup time (DevOps engineer) | Internal team effort |
| **Total One-Time** | **~₹6,000–₹16,000** |

### Development Tooling (Free / Already Available)

| Tool | Cost |
|:---|:---|
| VS Code / Cursor | Free |
| GitHub (private repos) | Free (up to 3 collaborators) or ₹800/mo (Team plan) |
| Postman / API testing | Free |
| Figma (UI design) | Free tier sufficient |

---

## 12. Alternatives Considered

### Backend Alternatives

| Option | Reason Not Chosen |
|:---|:---|
| **Express.js** | No enforced structure — leads to inconsistent code quality at scale; lacks built-in DI |
| **Django (Python)** | Team is TypeScript-focused; switching languages for backend creates context-switching overhead |
| **Go (Golang)** | Superior performance, but significantly steeper learning curve for a small team; overkill for CRM workloads |
| **Laravel (PHP)** | Not aligned with team's TypeScript monorepo strategy |

### Frontend Alternatives

| Option | Reason Not Chosen |
|:---|:---|
| **Vite + React (SPA)** | No SSR — dashboard initial load would be slower; no built-in routing |
| **Vue.js / Nuxt.js** | Smaller ecosystem for CRM-specific UI components; team is React-experienced |
| **Angular** | Too verbose for a fast-moving internal tool; slower initial development speed |

### Mobile Alternatives

| Option | Reason Not Chosen |
|:---|:---|
| **Native Swift + Kotlin** | Requires two separate teams/codebases; doubles development time and cost |
| **Flutter (Dart)** | Cannot share code with React web frontend; adds a third language to the stack |
| **PWA (Progressive Web App)** | GPS background tracking and push notifications are unreliable on mobile browsers, especially iOS Safari |

### Database Alternatives

| Option | Reason Not Chosen |
|:---|:---|
| **MySQL** | PostgreSQL has superior JSON support, full-text search, and JSONB — better fit for flexible lead metadata |
| **MongoDB** | Relational data model (leads → agents → properties → commissions) is a poor fit for document store |
| **PlanetScale** | Not available in Mumbai region; data residency concern |

### Cloud Alternatives

| Option | Reason Not Chosen |
|:---|:---|
| **GCP (Mumbai)** | Fewer managed services in ap-south-1 equivalent; team has more AWS familiarity |
| **Azure (India South)** | Higher cost for equivalent compute; complex IAM model |
| **Self-hosted (on-premise)** | Hardware procurement, maintenance, and uptime responsibility falls on internal IT — higher total cost |

---

## 13. Decision Summary Table

| Layer | Chosen Technology | Key Reason | License | Monthly Cost |
|:---|:---|:---|:---|:---|
| Web Frontend | Next.js 14 + TypeScript | SSR performance, React ecosystem | MIT | ₹0 |
| UI Components | shadcn/ui + Tailwind CSS | No vendor lock-in, fully customizable | MIT | ₹0 |
| Mobile App | React Native + Expo | Single codebase for iOS + Android | MIT | ₹700 (Apple) |
| Backend API | NestJS + TypeScript | Structured, modular, type-safe | MIT | ₹0 |
| ORM | Prisma | Type-safe DB queries, auto-migrations | Apache 2.0 | ₹0 |
| Job Queue | BullMQ + Redis | Reliable async processing | MIT | ₹0 |
| Primary DB | PostgreSQL (AWS RDS) | Relational, ACID, JSONB, RLS | Open-source | ₹12,000 |
| Cache / Queue | Redis (AWS ElastiCache) | Sessions, BullMQ, pub/sub | Open-source | ₹4,000 |
| File Storage | AWS S3 + CloudFront | Unlimited scale, pre-signed URLs | Proprietary | ₹1,500 |
| Real-time | Socket.IO | Bi-directional, Redis pub/sub support | MIT | ₹0 |
| AI / ML | FastAPI + scikit-learn + OpenAI | Python ML ecosystem + GPT quality | MIT / Proprietary | ₹2,000 |
| WhatsApp | Meta Cloud API (direct) | Zero BSP markup, full control | Proprietary | ₹3,500 |
| SMS | MSG91 | India-focused, DLT compliant, low cost | Proprietary | ₹400 |
| Cloud | AWS Mumbai (ap-south-1) | Data residency, managed services | Proprietary | ₹8,000 (compute) |
| CI/CD | GitHub Actions + ECS | Free for private repos, simple workflow | MIT / Proprietary | ₹800 |
| Monitoring | CloudWatch + Sentry | End-to-end observability | Proprietary | ₹2,500 |
| Auth | JWT + bcrypt + Redis | Stateless + revocable, standard | MIT | ₹0 |
| **TOTAL** | | | | **~₹36,350/mo** |

---

*This document is maintained by the Engineering team and should be reviewed quarterly or when major technology decisions are made.*

*Last updated: September 2026*
