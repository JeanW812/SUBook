# 🏛️ SUBook - Event and Venue Booking System

<p align="center">
  A centralized platform for university venue booking and campus event management.
</p>


## 1. 📌 Project Overview

A web-based platform that simplifies university facility booking and event management by connecting students, club representatives, and MPP administrators.

**Objectives:**
- Simplify venue booking procedures.
- Centralize booking and event management.
- Improve administrative efficiency.
- Enhance user experience.

## 2. 👥 User Roles

```mermaid
flowchart TD
    A["🏛️ SUB Booking System"]
    A --> B["👤 Personal User"]
    A --> C["🏢 Club Representative"]
    A --> D["🛡️ MPP Administrator"]

    B --> B1["Browse & Book Venues"]
    B --> B2["Make Payments"]

    C --> C1["Manage Club Bookings"]
    C --> C2["Organize Events"]

    D --> D1["Manage Venues"]
    D --> D2["Approve Applications"]
    D --> D3["View Reports"]
```

## 3. 🚀 Main Features

| Module | Key Features |
|---|---|
| 🔐 Authentication | Google SSO, role-based access |
| 🏟️ Venue Management | Venue listing and availability |
| 📅 Booking Management | Applications, calendar, approvals |
| 💳 Payment Management | HitPay, transactions, refunds |
| 🎉 Event Management | Club event creation and scheduling |
| 🤖 AI Features | OCR scanning, recommendation chatbot |
| 📊 Admin Dashboard | Analytics and report generation |

## 4. 🛠️ Technology Stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,vite,nodejs,supabase,vercel,github" />
</p>

| Technology | Purpose |
|---|---|
| React.js + Vite | Frontend development |
| Node.js | Backend development |
| Supabase | Database, authentication, storage |
| Vercel | Application deployment |
| GitHub | Version control and collaboration |
| HitPay | Online payment processing |

## 5. 🏗️ System Architecture

```mermaid
flowchart TD
    U["👥 Users"] --> F["React.js + Vite"]
    F <--> B["Node.js Backend"]
    B <--> S[("Supabase")]
    B <--> H["HitPay"]

    S --> DB[("PostgreSQL")]
    S --> A["Authentication"]
    S --> ST["File Storage"]

    G["GitHub"] -.-> V["Vercel Deployment"]
    F -.-> V
```

## 👨‍💻 Project Team

| Member | Role | Main Responsibility |
|---|---|---|
| Chia Thung Thung | Frontend Developer & UI/UX Designer | UI design, responsive pages, dashboards |
| Ung Yii Jia | Project Manager | Agile management, documentation, AI modules |
| Wong Ya Jing | Backend Developer | Backend, Supabase, HitPay integration |
| Yeoh Huey Ting | System Analyst, QA & MPP Admin Lead | MPP requirements, testing, admin operations |

---

<p align="center">
  **Making University Facility Booking Simpler.**
</p>
