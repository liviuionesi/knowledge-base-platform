# Architecture Document: Phenix Alliance Wiki

> **Version**: 1.0.0
> **Date**: 2025-12-29
> **Status**: Approved

## 1. Executive Summary
The **Phenix Alliance Wiki** is a secure, multilingual (English/French), web-based knowledge base designed for the "Phenix" alliance in *Last Z Survival Shooter* (Server 347). It serves as the central hub for tactics, rules, hero data, and event schedules, ensuring all members are aligned and battle-ready.

## 2. System Architecture

### 2.1 High-Level Overview
The system is a **Server-Side Rendered (SSR)** web application built on **Next.js**. It emphasizes speed, SEO (internal for the alliance), and ease of updates.

- **Frontend**: Next.js 16.1.1 (React 19), Tailwind CSS.
- **Backend/API**: Next.js Server Components & API Routes (Minimal).
- **Data Layer**: Static JSON files (Git-based CMS approach) for ease of maintenance by developers.
- **Authentication**: Stateless Middleware-based protection.

### 2.2 Technology Stack
| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.1.1 (App Router) | Modern, fast, excellent routing & layout support. |
| **Language** | TypeScript | Type safety for data models (Heroes, Tactics). |
| **Styling** | Tailwind CSS | Rapid UI development, easy Dark Mode implementation. |
| **Localization** | `next-intl` | Robust internationalization for EN/FR. |
| **State** | React Server Components | Reduced client bundle, faster initial load. |
| **Icons** | Lucide React | Clean, consistent iconography. |
| **Package Mgr** | pnpm | Fast, disk-space efficient. |

## 3. Core Modules & Features

### 3.1 Authentication & Security
*   **Mechanism**: Fixed Shared Credentials (Alliance-wide password).
*   **Implementation**: Next.js Middleware (`middleware.ts`).
    *   Intercepts all requests to `/wiki/*`.
    *   Checks for a signed HTTP-only cookie.
    *   Redirects unauthenticated users to `/login`.
*   **Security Level**: Low/Medium (Sufficient for game tactics, not strictly sensitive personal data).

### 3.2 Navigation & Layout
*   **Shell Architecture**:
    *   **Sidebar (Left)**: Collapsible, persistent navigation tree.
    *   **Top Bar**: Breadcrumbs, Theme Toggle, Language Switcher.
    *   **Content Area**: Scrollable main view.
*   **Responsive Strategy**:
    *   Desktop: Sidebar visible.
    *   Mobile: Hamburger menu + Slide-over drawer.

### 3.3 Theming
*   **Engine**: `next-themes` (class-based strategy).
*   **Visual Identity**:
    *   **Background**: "Phenix Bird on Fire" (Discrete, opacity-controlled to ensure text readability).
    *   **Palette**: Dark mode default. Orange/Red accents for "Phenix" branding.
    *   **Glassmorphism**: High usage of `backdrop-blur` for content cards to float above the background.

## 4. Data Models

### 4.1 Hero Data Structure
A strongly-typed JSON structure will drive the Hero pages.
```typescript
interface Hero {
  id: string;
  name: string;
  rarity: 'orange' | 'purple' | 'blue';
  faction: string; 
  role: 'tank' | 'shooter' | 'warrior';
  description: {
    en: string;
    fr: string;
  };
  stats: {
    attack: number;
    defense: number;
    // ...
  };
  imageUrl: string;
}
```

### 4.2 Tactics & Guides
Content will be structured as MDX or Rich Text components to allow mixed media (Images + Text).

## 5. Deployment Strategy
*   **Platform**: Vercel (Recommended) or Docker container.
*   **CI/CD**: GitHub Actions can be configured to run linting and type-checking on PRs.

## 6. Project structure
```
/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── app/
│   │   ├── [locale]/       # Localized routes
│   │   │   ├── login/
│   │   │   ├── (protected)/  
│   │   │   │   ├── heroes/
│   │   │   │   ├── tactics/
│   │   │   │   └── ...
│   │   └── api/
│   ├── components/         # Atomic UI components
│   ├── lib/                # Utility functions, type definitions
│   ├── navigation.ts       # Navigation config
│   ├── middleware.ts       # Auth & Locale middleware
│   └── messages/           # Locales (en.json, fr.json)
```
