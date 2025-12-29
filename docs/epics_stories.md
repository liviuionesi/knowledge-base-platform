# Project Management Spec: Epics & Stories

> **Version**: 1.0.0
> **Date**: 2025-12-29
> **Status**: Approved

This document outlines the GitHub Project structure inspired by the Architecture Document.

## Epic 1: Foundation & Infrastructure `[infra]`
**Goal**: Set up the project shell, developer tooling, and deployment pipeline.

*   **Story 1.1**: Initialize Next.js 16.1.1 Project
    *   *Acceptance Criteria*: Project builds with pnpm, Tailwind is configured, TypeScript is strict.
*   **Story 1.2**: Configure Localization (i18n)
    *   *Acceptance Criteria*: `next-intl` installed, `/en` and `/fr` routes work, switching locales persists.
*   **Story 1.3**: Implement Secure Access (Authentication)
    *   *Acceptance Criteria*: Middleware redirects non-authed users to Login. Correct password sets cookie.
*   **Story 1.4**: Design System Implementation
    *   *Acceptance Criteria*: Fonts, Colors, and Dark/Light theme toggle are functional. "Phenix" background asset implemented.

## Epic 2: Core User Interface `[ui]`
**Goal**: Create the navigation and layout frame for the application.

*   **Story 2.1**: Main Layout Shell
    *   *Acceptance Criteria*: Responsive Sidebar (Collapsible on mobile), Content Area, Top Navigation.
*   **Story 2.2**: Navigation Component
    *   *Acceptance Criteria*: Highlighting active route, supports nested categories (Tactics -> Defense).

## Epic 3: Hero Database `[feature-heroes]`
**Goal**: Enable members to view and filter game heroes.

*   **Story 3.1**: Define Hero Data Model & Mock Data
    *   *Acceptance Criteria*: JSON file created with ~5 example heroes (Orange, Purple).
*   **Story 3.2**: Hero List View
    *   *Acceptance Criteria*: Grid layout of Hero Cards. Filters for Color (Rarity) and Faction working.
*   **Story 3.3**: Hero Detail View
    *   *Acceptance Criteria*: Dedicated page showing full stats and translated bio.

## Epic 4: Tactics & Knowledge Base `[feature-tactics]`
**Goal**: Create the specific content pages for alliance operations.

*   **Story 4.1**: Capital Defense Guide (Saturday)
    *   *Acceptance Criteria*: Timeline view of the event, specific roles content (R4 vs Members).
*   **Story 4.2**: Fury Lord Strategy
    *   *Acceptance Criteria*: Guide on recommended heroes and positioning.
*   **Story 4.3**: "Full Preparedness" Checklist
    *   *Acceptance Criteria*: Interactive or static checklist for daily/weekly tasks.

## Epic 5: Governance & Rules `[feature-governance]`
**Goal**: Document the alliance structure.

*   **Story 5.1**: Alliance Rules Page
    *   *Acceptance Criteria*: Formatted text page with multilanguage support.
*   **Story 5.2**: R4/Leadership Structure
    *   *Acceptance Criteria*: Org chart or list of current leaders and responsibilities.
