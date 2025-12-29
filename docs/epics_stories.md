# Project Specification: Epics & Stories (Filmpire Standard)

> **Version:** 2.1.0
> **Standard:** Filmpire / Enterprise
> **Date:** December 29, 2025

This document serves as the master backlog. All items below must be synchronized with GitHub Issues.

---

## [EPIC-1] Foundation & Infrastructure
**Labels:** `epic`, `P0-critical`, `sprint-0`, `infrastructure`

### Epic Description
Establish the rock-solid technical foundation required to support a scalable, secure, and maintainable Next.js 16.1.1 application. This epic covers the initialization of the codebase, configuration of the CI/CD pipeline, implementation of the design system foundation, and the enforcement of authentication security policies.

### Business Value
Ensures the project starts with best practices, reducing technical debt. guarantees that Alliance credentials handled by the platform are secure from day one and provides a robust, localized platform for our French and English-speaking members.

### User Stories / Child Tasks
- [ ] Task: Initialize Next.js 16.1.1 Repository
- [ ] Task: Implement Internationalization (i18n) Architecture
- [ ] Task: Implement Fixed-Credential Security Middleware
- [ ] Task: Setup Design System & Phenix Theming

### Technical Stack
- **Framework**: Next.js 16.1.1
- **Language**: TypeScript 5.x
- **Build**: pnpm
- **Localization**: next-intl

### Definition of Done
- [ ] CI pipeline builds the project successfully.
- [ ] Authentication middleware intercepts all protected routes.
- [ ] Dark/Light mode toggle works and persists preference.
- [ ] Documentation updated.

---

### [TASK-1.1] Initialize Next.js 16.1.1 Repository
**Labels:** `task`, `P0-critical`, `sprint-0`, `infrastructure`

#### Task Description
Initialize the Next.js application using the latest version (16.1.1) to ensure we are on the bleeding edge of React Server Components.

#### Context
First step in project setup. Establishes the codebase that all subsequent features will depend on.

#### Implementation Details
1. Run `pnpm create next-app` with specific flags.
2. Configure `tsconfig.json` for strict type checking.
3. Set up ESLint with `next/core-web-vitals`.
4. Configure `@/*` import aliases.

#### Files to Create/Modify
- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `tailwind.config.ts`

#### Acceptance Criteria
- [ ] `pnpm dev` starts the server on port 3000.
- [ ] `pnpm build` produces a valid production build.
- [ ] No linting errors present.

#### Estimated Time
**Story Points:** 2

---

### [TASK-1.2] Implement Internationalization (i18n) Architecture
**Labels:** `task`, `P1-high`, `sprint-0`, `backend`

#### Task Description
Configure `next-intl` to support English (`en`) and French (`fr`) as first-class citizens.

#### Implementation Details
1. Install `next-intl`.
2. Create `src/messages/en.json` and `src/messages/fr.json`.
3. Implement `src/i18n/request.ts`.
4. Configure Middleware for `/[locale]` routing.

#### Acceptance Criteria
- [ ] Accessing `/` redirects to `/en`.
- [ ] Accessing `/fr` renders French content.
- [ ] Locale switching persists via cookie.

#### Estimated Time
**Story Points:** 3

---

### [TASK-1.3] Implement Fixed-Credential Security Middleware
**Labels:** `task`, `P0-critical`, `sprint-0`, `security`

#### Task Description
Protect the wiki content from public access using a shared-password mechanism enforced by Next.js Middleware.

#### Technical Specifications
- **Cookie Name**: `phenix_session` (Secure, HttpOnly).
- **Env Var**: `WIKI_PASSWORD`.

#### Implementation Checklist
- [ ] Create Login Page (`/login`).
- [ ] Create API Route (`/api/auth/login`).
- [ ] Update Middleware logic.

#### Acceptance Criteria
- [ ] Protected routes return 307 Redirect to `/login` for unauthenticated requests.
- [ ] Static assets are EXCLUDED from auth checks.

#### Estimated Time
**Story Points:** 5

---

### [TASK-1.4] Setup Design System & Phenix Theming
**Labels:** `task`, `P1-high`, `sprint-0`, `frontend`

#### Task Description
Implement the visual identity of the Phenix Alliance using Tailwind CSS and `next-themes`.

#### Implementation Details
1. Install `next-themes`.
2. Configure `tailwind.config.ts` with custom colors (`phenix-orange`).
3. Create `ThemeToggle` component.
4. Implement "Fire Bird" background.

#### Acceptance Criteria
- [ ] Dark mode is the default state.
- [ ] Toggling works instantly.
- [ ] Text is legible against background.

#### Estimated Time
**Story Points:** 3

---

## [EPIC-2] Core User Interface & Layout
**Labels:** `epic`, `P1-high`, `sprint-1`, `frontend`

### Epic Description
Develop the visual shell of the application (Sidebar, Header, Layout). Mobile-first focus.

### Business Value
Critical for usability during gameplay.

### User Stories / Child Tasks
- [ ] Task: Implement Responsive Sidebar Navigation

### Definition of Done
- [ ] Layout is fully responsive (Mobile/Desktop).
- [ ] Sidebar works smoothly.

---

### [TASK-2.1] Implement Responsive Sidebar Navigation
**Labels:** `task`, `P1-high`, `sprint-1`, `frontend`

#### Task Description
Create a collapsible Sidebar component. Permanently visible on Desktop, Drawer on Mobile.

#### Implementation Details
1. Create `Sidebar.tsx`.
2. Implement Mobile Drawer logic.
3. Add `SidebarItem` component with active state.

#### Acceptance Criteria
- [ ] Hamburger menu visible only on mobile.
- [ ] Clicking a link on mobile closes the drawer.
- [ ] Active route is visually highlighted.

#### Estimated Time
**Story Points:** 5
