# Phenix Alliance Wiki - Enterprise Software Architecture Document

**Version:** 2.0.0 (Filmpire Standard)
**Date:** December 29, 2025
**Author:** Antigravity (Lead Architect)
**Purpose:** Professional Knowledge Base for the Phenix Alliance

---

## Executive Summary

This document outlines the complete architecture for the **Phenix Alliance Wiki**, a production-ready, localized knowledge management platform for "Last Z Survival Shooter". The system leverages **Next.js 16.1.1** for bleeding-edge React Server Components performance, **Tailwind CSS** for a premium "Fire Bird" aesthetic, and **next-intl** for seamless English/French localization. The project emphasizes security via fixed-credential middleware, mobile-first responsiveness for in-game usage, and strict type safety.

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [System Architecture](#system-architecture)
3. [Module Design](#module-design)
4. [Data Strategy](#data-strategy)
5. [Security Architecture](#security-architecture)
6. [Development Environment Setup](#development-environment-setup)
7. [Testing Strategy](#testing-strategy)
8. [Deployment Architecture](#deployment-architecture)

---

## 1. Technology Stack

### 1.1 Frontend & Application Core (Exact Versions)

| Technology | Version | Installation Method | Purpose |
|------------|---------|---------------------|---------|
| Node.js | 22.x LTS | nvm | Runtime Environment |
| pnpm | 9.x | npm | Packet Manager (Performance) |
| Next.js | 16.1.1 | pnpm | React Framework (App Router) |
| React | 19.0.0 | pnpm | UI Library (Server Components) |
| TypeScript | 5.5.x | pnpm | Strict Type Safety |
| Tailwind CSS | 3.4.x | pnpm | Utility-First Styling |
| next-themes | 0.3.x | pnpm | Dark/Light Mode Engine |
| next-intl | 3.15.x | pnpm | Internationalization |
| Lucide React | 0.390.x | pnpm | Iconography |

### 1.2 DevOps & Infrastructure

| Technology | Version | Purpose |
|------------|---------|---------|
| Vercel | Latest | Recommended Deployment Platform |
| GitHub Actions | Latest | CI/CD Automation |
| ESLint | 9.x | Static Code Analysis |
| Prettier | 3.x | Code Formatting |

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       Client Devices                        │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────┐     │
│  │  Desktop Web │   │  Mobile Web  │   │  Tablet      │     │
│  │  (Chrome/FF) │   │  (iOS/And)   │   │  (In-Game)   │     │
│  └──────┬───────┘   └──────┬───────┘   └──────┬───────┘     │
└─────────┼──────────────────┼──────────────────┼─────────────┘
          │                  │                  │
          ▼                  ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js 16.1.1 Application                │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                 Edge Middleware (Vercel)              │  │
│  │  - Authentication Check (Cookie)                      │  │
│  │  - Locale Detection (en/fr)                           │  │
│  └──────────────────────────┬────────────────────────────┘  │
│                             │                               │
│                             ▼                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                 React Server Components               │  │
│  │                                                       │  │
│  │  ┌────────────┐   ┌────────────┐   ┌────────────┐     │  │
│  │  │ Hero Module│   │ Tactics Mod│   │  Settings  │     │  │
│  │  └──────┬─────┘   └──────┬─────┘   └──────┬─────┘     │  │
│  └─────────┼────────────────┼────────────────┼───────────┘  │
│            │                │                │              │
│            ▼                ▼                ▼              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                   Data Layer (JSON)                   │  │
│  │  `/data/heroes.json`   `/messages/*.json`             │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Module Design

### 3.1 Foundation Module (Infrastructure)
**Responsibilities:**
- Project initialization and tooling configuration.
- Base layout structure (`layout.tsx`).
- Global providers (`ThemeProvider`, `NextIntlClientProvider`).

### 3.2 Authentication Module
**Architecture:** Middleware-based Protection
**Key Components:**
- `middleware.ts`: Intercepts request -> Checks `phenix_session` cookie.
- `/app/[locale]/login/page.tsx`: Entry point for unauthenticated users.
- `/api/auth/login`: Validates `WIKI_PASSWORD` env var -> Set-Cookie.

### 3.3 Heroes Module
**Architecture:** Static JSON + Server Component Rendering
**Data Source:** `src/data/heroes.json`
**Features:**
- **Grid View**: Filterable by Faction (Dawn, Empire, Chaos) and Rarity (Orange, Purple).
- **Detail View**: Rich presentation of stats and skills using `generateStaticParams` for SSG.

### 3.4 Tactics Module
**Architecture:** Content-Rich Pages
**Features:**
- **Capital Clash**: Time-based event guide (Saturday).
- **Fury Lord**: Strategy breakdown.
- **Preparedness**: Interactive client-side checklist (Zustand state).

---

## 4. Data Strategy

### 4.1 Schema Definition (TypeScript Interfaces)

**Hero Interface:**
```typescript
interface Hero {
  id: string; // unique slug (e.g., 'blackbound')
  name: string;
  rarity: 'orange' | 'purple' | 'blue';
  faction: 'dawn' | 'empire' | 'chaos';
  role: 'tank' | 'missile' | 'gunner';
  stats: {
    attack: number;
    defense: number;
    hp: number;
  };
  skills: Skill[];
}
```

### 4.2 Localization Strategy
**Format:** Trusted JSON dictionary.
**Structure:**
- `src/messages/en.json` (Source of Truth)
- `src/messages/fr.json` (Translation)

---

## 5. Security Architecture

### 5.1 Access Control
- **Mechanism**: Shared-Secret Authentication (Alliance Password).
- **Transport**: HTTPS (Enforced by Vercel).
- **Cookie Attributes**: `HttpOnly`, `Secure`, `SameSite=Lax`.

### 5.2 Protection
- **Rate Limiting**: Basic protection via Middleware if needed.
- **XSS Prevention**: React's auto-escaping.
- **CSRF**: Next.js Server Actions default protection (if used).

---

## 6. Implementation Guidelines

### 6.1 Directory Structure
```
src/
├── app/
│   ├── [locale]/
│   │   ├── (protected)/
│   │   │   ├── heroes/
│   │   │   └── tactics/
│   │   ├── login/
│   │   └── layout.tsx
│   └── api/
├── components/
│   ├── ui/          # Atoms (Button, Card)
│   ├── layout/      # Organisms (Sidebar, Header)
│   └── modules/     # Feature-specific (HeroGrid)
├── lib/             # Utils
├── data/            # JSON Stores
├── types/           # TS Interfaces
└── middleware.ts
```

---

## 7. Testing Strategy

### 7.1 Manual Verification (Primary)
Due to the static nature of the content, manual verification is prioritized:
- **Responsive Check**: Chrome DevTools (Mobile/Tablet/Desktop).
- **Auth Check**: Incognito mode tests.
- **Locale Check**: URL switching `/en` <-> `/fr`.

### 7.2 Linting & Static Analysis
- `pnpm lint` (ESLint) mandatory before commit.
- `tsc --noEmit` (TypeScript) mandatory in CI.
