# User Pathways — Project Summary

> Comprehensive documentation for the **User Pathways** project.
> Generated from a full codebase analysis — no assumptions or invented functionality.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Features](#2-features)
3. [Architecture](#3-architecture)
4. [Technology Stack](#4-technology-stack)
5. [Folder & File Structure](#5-folder--file-structure)
6. [Application Flow](#6-application-flow)
7. [Core Components](#7-core-components)
8. [Database](#8-database)
9. [API](#9-api)
10. [Configuration](#10-configuration)
11. [Dependencies](#11-dependencies)
12. [Business Logic](#12-business-logic)
13. [Known Limitations](#13-known-limitations)
14. [Setup & Development](#14-setup--development)
15. [Future Improvements](#15-future-improvements)

---

## 1. Project Overview

**User Pathways** is a Next.js web application that serves as a **mental-health and wellbeing companion** for the [MantraCare / TherapyMantra](https://therapymantra.co/) platform. It provides guided user flows—including self-assessment questionnaires, informational pages, and video walkthroughs—designed to help users understand their emotional wellbeing and connect with professional therapy services.

### Goals

- Offer quick, evidence-informed self-assessments (anxiety, depression, stress) with severity scoring.
- Educate users on how the TherapyMantra / MantraCare platform works.
- Guide users toward booking therapy sessions and building personalized recovery plans.
- Send assessment results to an external webhook so the backend can track user progress.

### Problem It Solves

Many users arriving at a therapy platform need an accessible entry-point that helps them:
1. Understand their current emotional state through standardized questionnaires.
2. Learn about available features (wellbeing plans, reward points, therapy options).
3. Navigate confidently through the product before committing to a paid service.

---

## 2. Features

| Feature | Description |
|---|---|
| **Landing Page** | Hero page with navigation links to all major sections of the app. |
| **DASS Assessment** | 9-question assessment covering Anxiety (3 Qs), Depression (3 Qs), and Stress (3 Qs) with per-category severity scoring. |
| **Anxiety Assessment** | Standalone 7-question anxiety assessment modelled on the GAD-7 scale with a single cumulative severity score. |
| **How It Works** | Embedded YouTube video walkthrough of the app. |
| **Book a Session** | Video guide explaining how to book a session with a therapist. |
| **Personalized Wellbeing Plan** | Informational page describing the 60-day pathway feature. |
| **How Can Therapy Help** | Educational content about evidence-based therapy approaches (CBT, DBT). |
| **Earn While You Improve** | Explains the points/rewards system for completing wellness activities. |
| **Webhook Integration** | Non-blocking POST to `https://api.mantracare.org/webhook/assessment` on assessment completion. |
| **Responsive Design** | Fully responsive from mobile to desktop using Tailwind CSS utility classes. |
| **Animated Transitions** | Smooth fade-slide-in animations between assessment questions with reduced-motion support. |
| **Accessibility** | ARIA labels on interactive elements, `role="radiogroup"` / `role="radio"` on answer options, `prefers-reduced-motion` media query. |

---

## 3. Architecture

The project follows the **Next.js App Router** architecture with a clear separation between **server components** (pages/layout) and **client components** (interactive UI).

```
┌─────────────────────────────────────────────────────┐
│                    Next.js App Router                │
│  ┌──────────────┐  ┌───────────────────────────────┐ │
│  │  layout.tsx   │  │       Route Pages (Server)     │ │
│  │  (Root Layout)│  │  page.tsx, how-it-works/,     │ │
│  │  Geist Fonts  │  │  dass-assessment/, etc.       │ │
│  └──────────────┘  └──────────┬────────────────────┘ │
│                               │ imports               │
│         ┌─────────────────────┴──────────────────┐   │
│         │        Components (Client)              │   │
│         │  ┌────────────────┐ ┌────────────────┐  │   │
│         │  │  how-it-works/ │ │  assessment/   │  │   │
│         │  │  BackButton    │ │  AssessmentFlow │  │   │
│         │  │  VideoEmbed    │ │  AssessmentIntro│  │   │
│         │  │  Heading       │ │  *Question      │  │   │
│         │  │  Description   │ │  *Progress      │  │   │
│         │  └────────────────┘ │  *Navigation    │  │   │
│         │                     │  *Result        │  │   │
│         │                     │  ─────────────  │  │   │
│         │                     │  anxiety/       │  │   │
│         │                     │  AnxietyFlow    │  │   │
│         │                     │  Anxiety*       │  │   │
│         │                     └────────────────┘  │   │
│         └────────────────────────────────────────┘   │
│                               │                       │
│               ┌───────────────┴────────────────┐      │
│               │    Configuration Files          │      │
│               │  assessmentConfig.ts            │      │
│               │  anxietyConfig.ts               │      │
│               └───────────────┬────────────────┘      │
│                               │ webhook POST          │
│               ┌───────────────▼────────────────┐      │
│               │   External: MantraCare API      │      │
│               │   POST /webhook/assessment      │      │
│               └────────────────────────────────┘      │
└─────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

- **No backend / database** — The app is entirely client-side with server-rendered pages; assessment data is calculated in-browser and forwarded to an external API.
- **Config-driven assessments** — All questions, answer options, severity thresholds, and result content are defined in dedicated config files (`assessmentConfig.ts`, `anxietyConfig.ts`), keeping logic and presentation separate.
- **Component reuse** — Shared UI components (`BackButton`, `HowItWorksHeading`, `VideoEmbed`, `DescriptionContent`) are used across multiple pages.

---

## 4. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.2.10 |
| UI Library | React | 19.2.4 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 |
| PostCSS | @tailwindcss/postcss | ^4 |
| Fonts | Geist Sans & Geist Mono (via `next/font/google`) | — |
| Linting | ESLint + eslint-config-next | ^9 / 16.2.10 |
| External Service | MantraCare Webhook API | — |
| Media | YouTube embeds (iframe) | — |
| Image Hosting | External URLs (therapymantra.co, mymindtest.com) | — |

---

## 5. Folder & File Structure

```
User Pathways/
├── public/                          # Static assets (SVGs from Next.js scaffold)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/                         # Next.js App Router pages
│   │   ├── layout.tsx               # Root layout (fonts, global styles, HTML shell)
│   │   ├── page.tsx                 # Landing page with hero + navigation links
│   │   ├── globals.css              # Global CSS (Tailwind import, custom animations, color vars)
│   │   ├── favicon.ico              # App favicon
│   │   ├── how-it-works/
│   │   │   └── page.tsx             # Video walkthrough page
│   │   ├── how-to-book-a-session-with-your-expert/
│   │   │   └── page.tsx             # Session booking video guide
│   │   ├── create-your-personalized-wellbeing-plan/
│   │   │   └── page.tsx             # Wellbeing plan info page
│   │   ├── how-can-therapy-help/
│   │   │   └── page.tsx             # Therapy benefits info page
│   │   ├── earn-while-you-improve-your-wellbeing/
│   │   │   └── page.tsx             # Rewards/points info page
│   │   ├── dass-assessment/
│   │   │   └── page.tsx             # DASS 9-question assessment page
│   │   └── anxiety-assessment/
│   │       └── page.tsx             # Standalone anxiety assessment page
│   └── components/
│       ├── how-it-works/            # Shared UI components for content pages
│       │   ├── BackButton.tsx       # Circular back-navigation button (client-side router.back())
│       │   ├── HowItWorksHeading.tsx # Reusable page heading (accepts custom title prop)
│       │   ├── VideoEmbed.tsx       # YouTube iframe embed with configurable videoId
│       │   └── DescriptionContent.tsx # Card component for title + long-form description
│       └── assessment/              # Assessment module components
│           ├── assessmentConfig.ts  # DASS config: questions, options, thresholds, result content
│           ├── AssessmentFlow.tsx   # DASS state machine (intro → questions → result)
│           ├── AssessmentIntro.tsx  # DASS intro/instructions screen
│           ├── AssessmentProgress.tsx # Progress bar (shared pattern)
│           ├── AssessmentQuestion.tsx # Single question with radio-style options
│           ├── AssessmentNavigation.tsx # Previous/Next/Submit button bar
│           ├── AssessmentResult.tsx # DASS result cards (3 categories)
│           └── anxiety/            # Standalone anxiety assessment module
│               ├── anxietyConfig.ts # Anxiety config: 7 questions, severity bands, result content
│               ├── AnxietyFlow.tsx  # Anxiety state machine (intro → questions → result)
│               ├── AnxietyIntro.tsx # Anxiety intro screen
│               ├── AnxietyProgress.tsx # Progress bar (gradient variant)
│               ├── AnxietyQuestion.tsx # Question with ARIA radiogroup
│               ├── AnxietyNavigation.tsx # Nav with validation message support
│               └── AnxietyResult.tsx # Single-category result with CTA links
├── package.json                     # Project dependencies and npm scripts
├── tsconfig.json                    # TypeScript configuration
├── next.config.ts                   # Next.js configuration (currently empty/default)
├── postcss.config.mjs               # PostCSS config (Tailwind plugin)
├── eslint.config.mjs                # ESLint configuration
├── AGENTS.md                        # AI agent instructions file
├── CLAUDE.md                        # AI agent instructions file
├── README.md                        # Default Next.js readme
└── .gitignore                       # Git ignore rules
```

---

## 6. Application Flow

### 6.1 Landing Page → Feature Pages

1. User arrives at `/` (landing page).
2. The page displays a hero section with 8 navigation buttons.
3. Clicking a button navigates to the corresponding route via Next.js `<Link>`.
4. Content pages (`how-it-works`, `book-a-session`, etc.) display either a **YouTube video embed** or a **description card**.
5. Every sub-page includes a **BackButton** that calls `router.back()` for navigation.

### 6.2 DASS Assessment Flow (`/dass-assessment`)

```
[Intro Screen] → [Q1] → [Q2] → ... → [Q9] → [Submit] → [Webhook POST] → [Results]
```

1. **Intro Screen**: Displays instructions from `INTRO_TEXT`. User clicks "Next" to begin.
2. **Question Loop** (9 questions, one per screen):
   - A progress bar shows current position (`AssessmentProgress`).
   - User selects one of four options (0–3 scale).
   - On selection, auto-advances to next question after a 300ms delay.
   - Previous/Next buttons allow manual navigation.
3. **Submit**: On the last question, the "Next" button becomes "Submit".
   - Category scores are calculated (anxiety, depression, stress — each 0–9).
   - A **non-blocking** `POST` is sent to the MantraCare webhook with `upa_id`, `activity_id`, `scores`, and `severities` (read from URL search params).
4. **Results**: Three result cards are displayed, one per category, showing:
   - Severity level (Mild / Moderate / Severe) with color-coded label.
   - Illustration image (hosted externally).
   - Interpretive text and recommendations.

### 6.3 Anxiety Assessment Flow (`/anxiety-assessment`)

```
[Intro Screen] → [Q1] → [Q2] → ... → [Q7] → [Submit] → [Webhook POST] → [Result]
```

1. **Intro Screen**: Two-paragraph explanation. User clicks "Start Assessment".
2. **Question Loop** (7 questions, one per screen):
   - Progress bar with gradient styling.
   - Four options per question (0–3 scale: "Not At All" → "Nearly Everyday").
   - Auto-advance after 400ms delay (does not auto-submit on final question).
   - Smooth fade transition between questions.
   - Validation message if user tries to proceed without selecting an answer.
3. **Submit**: Calculates total score (0–21) and determines severity (Low / Mild / Moderate / Severe).
   - Fires webhook with `activity_id`, `upa_id`, `user_id`, and `score`.
4. **Result**: Single result card with:
   - Total score display.
   - Severity-specific illustration and recommendation text.
   - CTA button linking to `therapymantra.co` ("Learn More" or "Book a Therapist").
   - Link to download the TherapyMantra mobile app.

---

## 7. Core Components

### 7.1 How-It-Works Components (`src/components/how-it-works/`)

| Component | Responsibility |
|---|---|
| `BackButton` | Client component. Renders a circular button with a left-arrow SVG. Calls `router.back()` on click. Used on all sub-pages. |
| `HowItWorksHeading` | Server component. Renders an `<h1>` heading. Accepts an optional `title` prop (defaults to "How It Works"). |
| `VideoEmbed` | Server component. Renders a responsive YouTube `<iframe>`. Accepts `videoId` (default: `oEI40KlZtIw`) and `caption` props. |
| `DescriptionContent` | Client component. Renders a styled card with a title and multi-line description. Used by 3 informational pages. |

### 7.2 DASS Assessment Components (`src/components/assessment/`)

| Component | Responsibility |
|---|---|
| `assessmentConfig.ts` | Defines all data: 9 questions (3 per category), 4 answer options (0–3), severity thresholds, severity-to-result-content mapping, intro text. Exports types: `Category`, `Severity`, `Question`, `AnswerOption`, `ResultContent`. |
| `AssessmentFlow` | Client component. Central state machine managing the assessment lifecycle (`intro` → `question` → `result`). Maintains answers array, handles auto-advance timer, calculates scores, triggers webhook, and renders the appropriate sub-component for each step. |
| `AssessmentIntro` | Renders the "Before You Begin" instruction card with the intro text and a "Next" button. |
| `AssessmentProgress` | Renders a progress bar showing question number (e.g., "Question 3 of 9") and percentage. |
| `AssessmentQuestion` | Renders a single question with its text and four radio-style answer buttons. Highlights the selected option. |
| `AssessmentNavigation` | Renders Previous/Next/Submit buttons with appropriate visibility and disabled states. |
| `AssessmentResult` | Calculates per-category scores from the answers array, determines severity for each, and renders three result cards with images, interpretive text, and color-coded severity labels. |

### 7.3 Anxiety Assessment Components (`src/components/assessment/anxiety/`)

| Component | Responsibility |
|---|---|
| `anxietyConfig.ts` | Single-dimension config: 7 questions, 4 answer options, 4-band severity function (`low`/`mild`/`moderate`/`severe`), result content per band, landing page URL, and intro text. |
| `AnxietyFlow` | Client component. Similar to `AssessmentFlow` but with enhanced features: fade-out/fade-in transitions between questions, validation messages, a `webhookFiredRef` guard to prevent duplicate webhook calls, and a `goToQuestion` helper for animated navigation. |
| `AnxietyIntro` | Renders the intro screen with heading + paragraphs from config and a gradient "Start Assessment" button. |
| `AnxietyProgress` | Progress bar with gradient fill (blue → indigo). |
| `AnxietyQuestion` | Question card with ARIA `radiogroup`/`radio` roles for accessibility. |
| `AnxietyNavigation` | Navigation bar with inline validation error message ("Please select an answer before continuing."). |
| `AnxietyResult` | Displays total score, severity-specific result card, a CTA button linking to TherapyMantra, and a link to download the mobile app. Scrolls to top on mount. |

---

## 8. Database

**This project does not use a database.** All data is ephemeral:

- Assessment answers are held in React component state (`useState`) and discarded when the user navigates away.
- Assessment results are sent to an external webhook but are not persisted locally.
- There are no schemas, migrations, or data models beyond the TypeScript interfaces in the config files.

---

## 9. API

### 9.1 External Webhook

The application makes a single outbound API call:

| Property | Value |
|---|---|
| **URL** | `https://api.mantracare.org/webhook/assessment` |
| **Method** | `POST` |
| **Content-Type** | `application/json` |
| **Blocking?** | No — failures are caught and logged to console. The user always sees results regardless of webhook success. |

#### DASS Assessment Payload

```json
{
  "upa_id": "<from URL search param>",
  "activity_id": "<from URL search param>",
  "scores": {
    "anxiety": 5,
    "depression": 3,
    "stress": 7
  },
  "severities": {
    "anxiety": "moderate",
    "depression": "mild",
    "stress": "severe"
  }
}
```

#### Anxiety Assessment Payload

```json
{
  "activity_id": "<from URL search param>",
  "upa_id": "<from URL search param>",
  "user_id": "<from URL search param>",
  "score": "15"
}
```

### 9.2 URL Search Parameters

Both assessments read context from URL query parameters:

| Parameter | Used By | Purpose |
|---|---|---|
| `upa_id` | Both | User-plan-activity identifier for backend tracking |
| `activity_id` | Both | Activity identifier for backend tracking |
| `user_id` | Anxiety only | User identifier |

Example URL: `/anxiety-assessment?upa_id=123&activity_id=456&user_id=789`

### 9.3 No Internal API Routes

The project does not define any Next.js API routes (`app/api/`). All server-side logic is limited to metadata exports for SEO.

---

## 10. Configuration

### 10.1 Environment Variables

**None.** The project does not use any environment variables or `.env` files. All URLs (webhook endpoint, image hosts, YouTube video IDs) are hardcoded in source files.

### 10.2 Configuration Files

| File | Purpose |
|---|---|
| `next.config.ts` | Next.js config — currently empty (default settings). |
| `tsconfig.json` | TypeScript config — targets ES2017, uses bundler module resolution, path alias `@/*` → `./src/*`. |
| `postcss.config.mjs` | PostCSS config — loads the `@tailwindcss/postcss` plugin. |
| `eslint.config.mjs` | ESLint config — extends `eslint-config-next`. |
| `globals.css` | Global styles — imports Tailwind, defines CSS custom properties (`--background`, `--foreground`), custom `fadeSlideIn` animation, color utility classes (`.orange`, `.red`), and reduced-motion preferences. |

### 10.3 Assessment Configuration

Assessment behavior is driven entirely by two config files:

- **`assessmentConfig.ts`** (DASS): Questions, answer options, severity thresholds (mild: 0–3, moderate: 4–6, severe: 7–9 per category), result content with images and text.
- **`anxietyConfig.ts`** (Anxiety): Questions, answer options, severity bands (low: 0–4, mild: 5–9, moderate: 10–14, severe: 15–21), result content, landing page URL, intro text.

To modify assessment questions, scoring thresholds, or result messaging, only the config files need to change.

---

## 11. Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.2.10 | React framework with App Router, SSR/SSG, and file-based routing. |
| `react` | 19.2.4 | UI component library. |
| `react-dom` | 19.2.4 | DOM rendering for React. |

### Dev Dependencies

| Package | Version | Purpose |
|---|---|---|
| `typescript` | ^5 | Static type checking. |
| `tailwindcss` | ^4 | Utility-first CSS framework for all styling. |
| `@tailwindcss/postcss` | ^4 | PostCSS plugin to process Tailwind directives. |
| `@types/node` | ^20 | TypeScript type definitions for Node.js. |
| `@types/react` | ^19 | TypeScript type definitions for React. |
| `@types/react-dom` | ^19 | TypeScript type definitions for React DOM. |
| `eslint` | ^9 | JavaScript/TypeScript linter. |
| `eslint-config-next` | 16.2.10 | ESLint preset for Next.js best practices. |

> **Note:** The project has zero additional runtime dependencies beyond React and Next.js. There are no state management libraries, UI component libraries, or HTTP client libraries.

---

## 12. Business Logic

### 12.1 DASS Assessment Scoring

1. **9 questions** are grouped into 3 categories: Anxiety (Q1–Q3), Depression (Q4–Q6), Stress (Q7–Q9).
2. Each answer is scored 0–3 ("Not at all" → "Almost always").
3. Per-category score = sum of the 3 answers for that category (range: 0–9).
4. Severity is determined per category:
   - **Mild**: score 0–3
   - **Moderate**: score 4–6
   - **Severe**: score 7–9
5. Results show all 3 categories simultaneously with severity-specific imagery and recommendations.

### 12.2 Anxiety Assessment Scoring

1. **7 questions** (GAD-7 style), all contributing to a single anxiety score.
2. Each answer is scored 0–3 ("Not At All" → "Nearly Everyday").
3. Total score = sum of all 7 answers (range: 0–21).
4. Severity bands:
   - **Low**: score 0–4
   - **Mild**: score 5–9
   - **Moderate**: score 10–14
   - **Severe**: score 15–21
5. Result shows a single card with a CTA that contextually changes based on severity ("Learn More" for low, "Book a Therapist" for others).

### 12.3 Auto-Advance Behavior

Both assessments implement a timed auto-advance when the user selects an answer:
- **DASS**: 300ms delay, auto-advances including on the last question (submit is manual via button).
- **Anxiety**: 400ms delay, never auto-advances on the final question. Auto-advance can be cancelled by manually clicking Previous/Next.

### 12.4 Webhook Fire-Once Guard

The Anxiety assessment uses a `useRef` (`webhookFiredRef`) to ensure the webhook is called exactly once, even if the submit handler is invoked multiple times. The DASS assessment does not have this guard.

---

## 13. Known Limitations

### Technical Debt

- **No test suite**: The project has no unit, integration, or end-to-end tests.
- **No error boundaries**: React error boundaries are not implemented; a runtime error in any assessment component would crash the entire page.
- **Duplicated component architecture**: The Anxiety module (`AnxietyFlow`, `AnxietyIntro`, etc.) largely duplicates the DASS module's components rather than sharing a generic assessment framework. This increases maintenance burden.
- **Hardcoded URLs**: The webhook endpoint, image URLs, video IDs, and the TherapyMantra landing page URL are all hardcoded. No environment variable or configuration mechanism exists.
- **No webhook retry logic**: If the webhook POST fails, it is silently logged. There is no retry, queuing, or user notification.
- **Missing webhook guard in DASS**: Unlike the Anxiety flow, the DASS `AssessmentFlow` does not guard against duplicate webhook calls.
- **Default metadata**: The root `layout.tsx` still uses the default Next.js metadata (`title: "Create Next App"`, `description: "Generated by create next app"`).

### Assumptions

- The app assumes it will always be accessed with valid `upa_id`, `activity_id`, and (for anxiety) `user_id` search parameters. Missing params are silently sent as empty strings.
- Assessment result images are hosted externally on `therapymantra.co` and `mymindtest.com`; if these hosts go down, images will break.
- YouTube videos are assumed to be available and not geo-restricted.

### Edge Cases

- If a user refreshes the page mid-assessment, all progress is lost (state is not persisted).
- Browser back/forward navigation does not interact with the internal assessment state machine — it navigates away from the page entirely.
- The `scorestring` sent in the Anxiety webhook payload is a stringified number (`"15"`), while the DASS webhook sends numeric values. This inconsistency may cause issues on the backend.

---

## 14. Setup & Development

### Prerequisites

- **Node.js** (version compatible with Next.js 16 — Node 18.18+ recommended)
- **npm** (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd "User Pathways"

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

This starts the Next.js dev server at `http://localhost:3000` with hot module reloading.

### Production Build

```bash
# Build the production bundle
npm run build

# Start the production server
npm start
```

### Linting

```bash
npm run lint
```

### Available npm Scripts

| Script | Command | Purpose |
|---|---|---|
| `dev` | `next dev` | Start development server with HMR |
| `build` | `next build` | Create optimized production build |
| `start` | `next start` | Start production server |
| `lint` | `eslint` | Run ESLint on the codebase |

### No Additional Configuration Required

The project has no environment variables, no database to set up, and no external services to configure locally (the webhook POST will simply fail silently in development if the API is unreachable).

---

## 15. Future Improvements

### High Priority

- **Extract a generic assessment framework**: Refactor the DASS and Anxiety modules into a single reusable assessment engine driven by configuration, eliminating code duplication.
- **Add environment variables**: Move the webhook URL, image hosts, video IDs, and landing page URLs into `.env` files.
- **Fix root layout metadata**: Replace the default "Create Next App" title/description with project-specific values.
- **Add webhook guard to DASS flow**: Implement the same fire-once pattern used in the Anxiety flow.

### Medium Priority

- **Add testing**: Introduce unit tests (with Jest/Vitest) for scoring logic and component rendering, plus E2E tests (with Playwright/Cypress) for the full assessment flows.
- **Persist assessment state**: Use `sessionStorage` or URL state to allow users to resume an interrupted assessment.
- **Error boundaries**: Add React error boundaries around assessment flows to gracefully handle runtime errors.
- **Loading states**: Improve the webhook submission UX with a visible loading indicator.
- **Consistent webhook payloads**: Standardize the data format between DASS and Anxiety webhooks (e.g., both should send numeric scores or both should send strings).

### Low Priority

- **Internationalization (i18n)**: Support multiple languages for assessment questions and UI text.
- **Analytics integration**: Add page-view and event tracking (e.g., assessment started, completed, abandoned).
- **Accessibility audit**: Conduct a full WCAG 2.1 AA audit; add skip-navigation links, focus management between questions, and screen-reader announcements for progress changes.
- **Progressive Web App (PWA)**: Add a service worker and manifest for offline access and installability.
- **Content Management**: Move page content (descriptions, video IDs) to a headless CMS for non-developer editing.
