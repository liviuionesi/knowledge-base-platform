# Project Management Spec: Epics & Stories

> **Version**: 1.1.0 (Professional Edition)
> **Date**: 2025-12-29
> **Status**: Approved

This document serves as the single source of truth for the project's backlog. It is written to "Requirements Engineer" standards.

---

## Epic 1: Foundation & Infrastructure `[infra]`
**Description**: 
Establish the rock-solid technical foundation required to support a scalable, secure, and maintainable Next.js 16.1.1 application. This epic covers the initialization of the codebase, configuration of the CI/CD pipeline, implementation of the design system foundation, and the enforcement of authentication security policies. This is the bedrock upon which the Phenix Alliance Wiki will be built.

**Business Value**: 
Ensures the project starts with best practices, reducing technical debt, ensuring security compliance for alliance credentials, and enabling rapid feature development through a configured design system.

### Story 1.1: Initialize Next.js 16.1.1 Application
**As a** Senior Developer
**I want** to initialize the repository with the latest Next.js 16.1.1 framework and strict TypeScript configuration
**So that** I can leverage the latest React 19 features, Server Components, and ensure type safety across the application.

**Technical Specifications**:
*   **Framework**: Next.js 16.1.1 (App Router).
*   **Language**: TypeScript 5.x (Strict Mode enabled).
*   **Packet Manager**: `pnpm` (latest version) for efficient dependency management.
*   **Linter**: ESLint with `next/core-web-vitals` and strict ruleset.
*   **Formatter**: Prettier configured with a standard `.prettierrc`.
*   **Directory Structure**: Adherence to the `src/` directory pattern as defined in the Architecture Document v1.0.

**Acceptance Criteria**:
*   [ ] The application initializes successfully using `create-next-app`.
*   [ ] `pnpm dev` starts the development server without warnings.
*   [ ] `pnpm build` creates a production build successfully.
*   [ ] TypeScript `strict: true` is set in `tsconfig.json`.
*   [ ] Alias path `@/*` is configured to point to `src/*`.
*   [ ] Documentation folder (`/docs`) is preserved and committed.

### Story 1.2: Configure Internationalization (i18n) Architecture
**As a** Global Alliance Member
**I want** the application to support seamless switching between English and French
**So that** I can access critical tactical information in my native language without confusion.

**Technical Specifications**:
*   **Library**: `next-intl` (Server Components compatible).
*   **Structure**: 
    *   `/src/messages/en.json` & `/src/messages/fr.json` for dictionary storage.
    *   Middleware-based locale detection and redirection.
    *   Route structure: `/[locale]/protected/page-name`.
*   **Default Locale**: English (`en`).

**Acceptance Criteria**:
*   [ ] Routing middleware automatically detects or assigns a locale (en/fr).
*   [ ] Accessing the root `/` redirects to `/[default_locale]` (e.g., `/en`).
*   [ ] Changing a URL manually from `/en/...` to `/fr/...` instantly translates the page content.
*   [ ] A persistent user preference (cookie) is set upon language switch.
*   [ ] Type-safe translation hooks are implemented for use in components.

### Story 1.3: Implementation of Security & Authentication Middleware
**As a** Alliance R4 Leader
**I want** to restrict access to the Wiki using a shared secure credential
**So that** sensitive tactics and hero builds are not visible to enemy alliances or unverified players.

**Technical Specifications**:
*   **Auth Strategy**: Fixed Credential Authentication (Shared Password).
*   **Mechanism**: Next.js Middleware (`middleware.ts`) intercepting all routes under `(protected)`.
*   **Session Management**: HTTP-Only, Secure Cookie (`phenix-auth-token`).
*   **Environment Variables**: `WIKI_PASSWORD` stored in `.env.local` (and Vercel secrets).
*   **Encryption**: While the password is shared, the cookie value should be a hashed or non-trivial token to prevent simple spoofing.

**Acceptance Criteria**:
*   [ ] Any attempt to access a protected route (e.g., `/en/heroes`) without a cookie redirects to `/en/login`.
*   [ ] The `/login` page accepts a password input.
*   [ ] Correct password sets a `Secure` and `HttpOnly` cookie with a 30-day expiration.
*   [ ] Incorrect password returns a generic error message.
*   [ ] Middleware logic excludes static assets (`/_next`, `/images`, `/favicon.ico`) from auth checks.

### Story 1.4: Design System & Theming Foundation
**As a** User looking for specific "Phenix" Aesthetics
**I want** a "Phenix Bird on Fire" themed interface with Dark Mode support
**So that** the application feels premium, immersive, and aligned with the game's aesthetic.

**Technical Specifications**:
*   **CSS Framework**: Tailwind CSS v3.4+.
*   **Theming Engine**: `next-themes` (Class-based strategy).
*   **Asset Management**: 
    *   Background image: "Discrete Phenix on Fire" (WebP optimized).
    *   Overlay: CSS backdrop-filter blur and opacity layers to ensure text readability.
*   **Color Palette**:
    *   Primary: "Phenix Orange" (e.g., `#FF4500` variants).
    *   Background: Deep Slate / Carbon (Dark Mode default).

**Acceptance Criteria**:
*   [ ] `next-themes` provider wraps the application root.
*   [ ] A Theme Toggle component exists (visible in navbar) switching between Light/Dark.
*   [ ] The application defaults to **Dark Mode** on first visit.
*   [ ] The "Phenix Bird" background is visible but does not interfere with text contrast (verified WCAG AA compliance for text).
*   [ ] Global font stack configured (Inter or similar sans-serif).

---

## Epic 2: Core User Interface & Layout `[ui]`
**Description**:
Develop the visual shell of the application. This includes the responsive navigation "Sidebar", the top "Status Bar", and the overall layout structure that will house the content modules. The UI must be mobile-first, ensuring R4 leaders can access tactics on their phones during alliance battles.

### Story 2.1: Implement Responsive Sidebar Navigation
**As a** Mobile User
**I want** a collapsible sidebar navigation that stays out of the way when not needed
**So that** I have maximum screen real estate for reading tactics charts.

**Technical Specifications**:
*   **Components**: `Sidebar`, `SidebarItem`, `MobileMenuButton`.
*   **Behavior**:
    *   **Desktop**: Fixed left vertical sidebar (width ~64px collapsed / ~240px expanded).
    *   **Mobile**: Hidden by default, slides in from left (Drawer pattern) upon hamburger click.
*   **Icons**: standard `lucide-react` set.

**Acceptance Criteria**:
*   [ ] Sidebar renders on the left side of the Main Layout.
*   [ ] Active route is visually distinct (highlighted background/text).
*   [ ] Navigation structure supports nested items (e.g., Tactics -> Defense).
*   [ ] On mobile (<768px), the sidebar is hidden and triggered by a menu button.
*   [ ] Clicking outside the mobile drawer closes it.

---

## Epic 3: Hero Database Module (Heroes Compendium) `[feature-heroes]`
**Description**:
The central database for all game heroes. This requirement involves creating a structured data schema to store hero stats, descriptions, and metadata, and building the frontend views to display them. This is critical for members to understand "META" formations.

### Story 3.1: Hero Data Schema & JSON Store
**As a** Content Maintainer
**I want** a structured JSON file to manage hero data
**So that** I can easily add new game heroes without writing complex database queries.

**Technical Specifications**:
*   **File Path**: `/src/data/heroes.json`.
*   **Interface**:
    ```typescript
    interface Hero {
      id: string; // unique slug
      name: string;
      rarity: 'Legendary' (Orange) | 'Epic' (Purple) | 'Rare' (Blue);
      faction: 'Dawn' | 'Empire' | 'Chaos';
      stats: { attack: number; defense: number; hp: number; };
      skills: { name: string; description: { en: string; fr: string; } }[];
    }
    ```

**Acceptance Criteria**:
*   [ ] TypeScript interface `Hero` is defined in `/src/types`.
*   [ ] JSON file is populated with at least 1 hero of each Rarity (Orange, Purple, Blue).
*   [ ] Code includes a utility function `getHeroes()` to read and parse this data type-safely.

### Story 3.2: Hero List View with Filtering
**As a** Player
**I want** to filter heroes by Faction and Rarity
**So that** I can quickly find the "Orange Dawn" heroes I need for my formation.

**Acceptance Criteria**:
*   [ ] Page `/heroes` displays a grid of Hero Cards.
*   [ ] Sidebar/Top-bar contains multi-select filters: "Rarity" (Orange/Purple/Blue) and "Faction".
*   [ ] Changing a filter instantly updates the grid (Client-Side filtering permissible or URL-param based).
*   [ ] Empty state handled gracefully ("No heroes found").

---

## Epic 4: Strategic Tactics Knowledge Base `[feature-tactics]`
**Description**:
The "Playbook" for the alliance. This epic covers the creation of rich-text/MDX pages that describe complex game events.

### Story 4.1: Capital Defense & Invasion Guide
**As a** R4 Member
**I want** a timeline-based guide for Saturday Capital events
**So that** all members know exactly when to shield, when to attack, and where to teleport.

**Acceptance Criteria**:
*   [ ] A dedicated page `/tactics/capital-clash`.
*   [ ] Displays a visual Timeline component (00:00 -> 24:00).
*   [ ] Sections for "Preparation", "Defense Phase", and "Invasion Phase".
*   [ ] Bilingual content (English/French) verified.

### Story 4.2: Full Preparedness Checklist
**As a** New Member
**I want** an interactive checklist of daily tasks
**So that** I don't miss any "Daily Rewards" or "Event Buffs".

**Acceptance Criteria**:
*   [ ] A page `/tactics/preparedness`.
*   [ ] A list of checkable items (state does not need to persist across reloads, but nice to have).
*   [ ] "Select All" functionality.
