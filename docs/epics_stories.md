# Project Management Spec: Epics & Stories (Gold Standard)

> **Version**: 2.0.0 (The "Pehlivanu" Standard)
> **Date**: 2025-12-29
> **Status**: Approved

This document defines the "Gold Standard" requirements for the Phenix Alliance Wiki. All items below correspond to GitHub Issues to be created in the `PhenixWiki` repository and tracked in Project #7.

---

## Epic 1: Foundation & Infrastructure
**Title**: `[EPIC] Foundation & Infrastructure`
**Labels**: `priority:P0-critical`, `type:epic`, `scope:infrastructure`

### Description
Establish the rock-solid technical foundation required to support a scalable, secure, and maintainable Next.js 16.1.1 application. This epic covers the initialization of the codebase, configuration of the CI/CD pipeline, implementation of the design system foundation, and the enforcement of authentication security policies.

### Business Value
Ensures the project starts with best practices, minimizing future technical debt. It guarantees that Alliance credentials handled by the platform are secure from day one and provides a robust, localized platform for our French and English-speaking members.

### Technical Stack
- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.4
- **Auth**: Middleware + HttpOnly Cookies
- **i18n**: `next-intl`

### Definition of Done
- [ ] CI pipeline builds the project successfully on every PR.
- [ ] Authentication middleware intercepts all protected routes.
- [ ] Dark/Light mode toggle works and persists preference.
- [ ] English and French routing is functional.

### Child Tasks
- `[TASK] Initialize Next.js 16.1.1 Repository`
- `[TASK] Implement Internationalization (i18n) Architecture`
- `[TASK] Implement Fixed-Credential Security Middleware`
- `[TASK] Setup Design System & Phenix Theming`

---

### Task 1.1: Initialize Repository
**Title**: `[TASK] Initialize Next.js 16.1.1 Repository`
**Labels**: `priority:P0-critical`, `type:task`, `scope:infrastructure`
**Status**: `Done`

#### Description
Initialize the Next.js application using the latest version (16.1.1) to ensure we are on the bleeding edge of React Server Components and Server Actions.

#### Implementation Checklist
- [x] Run `pnpm create next-app` with strict flags.
- [x] Configure `tsconfig.json` for strict type checking (`noImplicitAny`, `strictNullChecks`).
- [x] Set up ESLint with `next/core-web-vitals` and `prettier`.
- [ ] Configure `@/*` import alias mapping to `./src/*` (Skipped per user request).
- [x] Commit initial boilerplate to GitHub.

#### Acceptance Criteria
- [x] `pnpm dev` starts the server on port 3000.
- [x] `pnpm build` produces a valid production build.
- [x] No linting errors present in the initial commit.

---

### Task 1.2: Internationalization Architecture
**Title**: `[TASK] Implement Internationalization (i18n) Architecture`
**Labels**: `priority:P1-high`, `type:task`, `scope:backend`
**Status**: `Done`

#### Description
Configure `next-intl` to support English (`en`) and French (`fr`) as first-class citizens. This involves setting up the middleware matcher to handle locale routing and creating the dictionary structure.

#### Technical Specifications
```typescript
// proxy.ts
export default createMiddleware({
  locales: ['en', 'fr'],
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/', '/(fr|en)/:path*']
};
```

#### Acceptance Criteria
- [x] Accessing `/` redirects to `/en`.
- [x] Accessing `/fr` renders the French version of the landing page.
- [x] Dictionary files exist at `/messages/{locale}.json`.
- [x] Locale switching persists user preference via cookie (handled by middleware).

---

### Task 1.3: Security Middleware
**Title**: `[TASK] Implement Fixed-Credential Security Middleware`
**Labels**: `priority:P0-critical`, `type:task`, `scope:security`
**Status**: `Done`

#### Description
Protect the wiki content from public access using a shared-password mechanism enforced by Next.js Middleware.

#### Technical Specifications
- **Env Var**: `WIKI_PASSWORD`
- **Cookie Name**: `phenix_session` (Secure, HttpOnly, SameSite=Lax)
- **Logic**: 
  1. Middleware (proxy.ts) checks for cookie.
  2. If missing and route is protected -> Redirect to `/login`.
  3. Login API route validates password -> Sets cookie.

#### Acceptance Criteria
- [x] Protected routes return 307 Redirect to `/login` for unauthenticated requests.
- [x] Static assets (images, fonts) are EXCLUDED from auth checks.
- [x] Brute-force protection (basic rate limiting) is nice-to-have but not required for v1.

---

### Task 1.4: Design System & Theming
**Title**: `[TASK] Setup Design System & Phenix Theming`
**Labels**: `priority:P1-high`, `type:task`, `scope:frontend`

#### Description
Implement the visual identity of the Phenix Alliance. This includes the centralized "Phenix Bird" background asset, the color palette (Orange/Dark Slate), and the Dark Mode toggler.

#### Implementation Checklist
- [ ] Install `next-themes`.
- [ ] Configure `tailwind.config.ts` with custom colors:
  - `phenix-orange`: `#FF4500`
  - `phenix-dark`: `#0F172A`
- [ ] Create `components/ui/ThemeToggle.tsx`.
- [ ] Create `components/layout/Background.tsx` with the "Fire Bird" graphical asset.

#### Acceptance Criteria
- [ ] Dark mode is the default state.
- [ ] Toggling the theme instantly switches CSS variables/classes.
- [ ] Text is legible WCAG AA against the graphic background.

---

## Epic 2: Core User Interface
**Title**: `[EPIC] Core User Interface & Layout`
**Labels**: `priority:P1-high`, `type:epic`, `scope:frontend`

### Description
Develop the responsive shell of the application. The navigation must be accessible on mobile devices during gameplay (overlay usage or second screen).

### Business Value
Critical for usability. If members cannot navigate to the "Defense" page during an invasion, the wiki is useless.

### Definition of Done
- [ ] Layout is fully responsive (Mobile, Tablet, Desktop).
- [ ] Sidebar navigation supports 2-level hierarchy.
- [ ] Animations are smooth (60fps) and do not lag the browser.

### Child Tasks
- `[TASK] Implement Responsive Sidebar Navigation`
- `[TASK] Create Reusable UI Components (Card, Button, Badge)`

---

### Task 2.1: Sidebar Navigation
**Title**: `[TASK] Implement Responsive Sidebar Navigation`
**Labels**: `priority:P1-high`, `type:task`, `scope:frontend`

#### Description
Create a collapsible Sidebar component. It should be permanently visible on Desktop and a slide-over drawer on Mobile.

#### Technical Specifications
- **Libraries**: `lucide-react` for icons, `clsx` / `tailwind-merge` for class handling.
- **State**: `useSidebarStore` (Zustand or Context) to manage open/close state.

#### Acceptance Criteria
- [ ] Hamburger menu visible only on mobile breakpoints.
- [ ] Clicking a link on mobile closes the drawer.
- [ ] Active route is visually highlighted.

---

## Epic 3: Hero Database
**Title**: `[EPIC] Hero Database Module`
**Labels**: `priority:P2-medium`, `type:epic`, `scope:feature`

### Description
A searchable, filterable database of game heroes. Members need to know which heroes to prioritize for the "Fury Lord" events.

### Business Value
Increases alliance combat power by ensuring members invest in the right meta heroes.

### Child Tasks
- `[TASK] Define Hero Data Schema (JSON)`
- `[TASK] Implement Hero Grid & Filters`

---

### Task 3.1: Hero Data Schema
**Title**: `[TASK] Define Hero Data Schema (JSON)`
**Labels**: `priority:P2-medium`, `type:task`, `scope:backend`

#### Description
Define the strictly typed JSON schema for hero data storage and populate it with initial data.

#### Technical Specifications
```typescript
type HeroRarity = 'orange' | 'purple' | 'blue';
type HeroFaction = 'dawn' | 'empire' | 'chaos';

interface Hero {
  id: string;
  name: string;
  rarity: HeroRarity;
  stats: {
    attack: number;
    defense: number;
  };
}
```

#### Acceptance Criteria
- [ ] `heroes.json` file created in `src/data`.
- [ ] TypeScript interfaces exported from `src/types`.
- [ ] At least 10 heroes added for initial testing.

---

### Task 3.2: Hero Grid & Filters
**Title**: `[TASK] Implement Hero Grid & Filters`
**Labels**: `priority:P2-medium`, `type:task`, `scope:frontend`

#### Description
A UI page that parses `heroes.json` and displays them in a responsive grid. Includes client-side filtering logic.

#### Acceptance Criteria
- [ ] Filters for **Rarity** and **Faction** are functional.
- [ ] URL State synchronization (e.g., `?faction=dawn`) so links can be shared at specific filter states.
