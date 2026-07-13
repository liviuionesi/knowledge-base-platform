# Knowledge Base Platform

An enterprise-grade, production-ready localized documentation and knowledge management system built with Next.js 16.

This platform leverages modern React architecture to deliver blazing-fast performance, static generation where applicable, and seamless internationalization.

## 🚀 Key Features

- **React Server Components (RSC):** Built on Next.js 16.1.1 App Router for minimal JavaScript payload and maximum performance.
- **Seamless Localization (i18n):** Deep integration with `next-intl` providing robust English and French language support, automatically handled at the middleware edge.
- **Premium UI/UX:** Styled with Tailwind CSS v4, featuring a dynamic dark/light mode engine (`next-themes`) and responsive, mobile-first design.
- **Secure Access Control:** Edge middleware-based authentication ensuring internal documents remain protected.
- **Strict Type Safety:** End-to-end TypeScript enforcement across all modules and data layers.

## 🏗️ Architecture Overview

The application is structured using a modular architecture with clear boundaries between routing, components, and data layers:

```
├── app/
│   ├── [locale]/           # i18n routing
│   │   ├── (protected)/    # Authenticated routes (Middleware protected)
│   │   └── login/          # Entry point
│   └── api/                # Route handlers
├── components/
│   ├── ui/                 # Reusable atomic UI components
│   ├── layout/             # Global layout elements (Nav, Sidebar)
│   └── modules/            # Domain-specific feature modules
├── data/                   # Static JSON data stores (SSG optimization)
├── i18n/                   # Localization configuration
├── messages/               # Translation dictionaries (en.json, fr.json)
└── types/                  # Strict TypeScript interfaces
```

## 🛠️ Technology Stack

- **Framework:** Next.js 16.1.1 (App Router)
- **UI Library:** React 19.0.0
- **Styling:** Tailwind CSS 4.x
- **Language:** TypeScript 5.5.x
- **Internationalization:** next-intl 3.15.x
- **Icons:** Lucide React

## 🔒 Security & Middleware

- **Edge Authentication:** Custom `proxy.ts` middleware intercepts requests at the edge, verifying secure HttpOnly cookies before granting access to the `(protected)` route group.
- **Data Protection:** React's built-in escaping prevents XSS, while Next.js Server Actions handle CSRF protection implicitly.

## 💻 Development Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure environment:**
   Copy `.env.example` to `.env.local` and configure your credentials.

3. **Run development server:**
   ```bash
   pnpm dev
   ```

4. **Linting & Formatting:**
   ```bash
   pnpm lint
   pnpm format
   ```

## 📝 License

This project is created for portfolio demonstration purposes.
