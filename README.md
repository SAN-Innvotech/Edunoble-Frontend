# Edunoble Frontend

Public-facing React + Vite SPA for the Edunoble edtech platform. Renders home, resources (sample papers), about, vision, testimonials, contact, and policy pages — pulling all dynamic content from the Backend CMS at `https://backbone.edunoble.in/apis`.

> One of three repos that make up the Edunoble system. For the system-wide picture, see [ARCHITECTURE.md](ARCHITECTURE.md).

## Tech stack

- **Framework**: React 18.2 + Vite 4.4 (SWC Fast Refresh)
- **Language**: JavaScript / JSX (no TypeScript)
- **Routing**: React Router DOM 6.17
- **UI**: MUI 5.14 + Bootstrap 5.1 + custom SCSS (Emotion for CSS-in-JS)
- **Carousels / animation**: Swiper 8, GSAP 3.12, AOS 2.3, react-particles 2.12
- **Misc**: Recharts (charts), FullCalendar (calendar), react-pdf (paper viewing), FontAwesome 6
- **HTTP**: native `fetch` (no axios)
- **Package manager**: npm (a `yarn.lock` is also present)

## Project structure

```
src/
├── App.jsx              router configuration (active + commented variants)
├── main.jsx             React DOM entry
├── components/
│   ├── about/           About page sections
│   ├── aboutCourses/    lessons, instructor cards
│   ├── blogs/           blog listings + details
│   ├── cartsAndCheckout/ e-commerce flows
│   ├── common/          shared (Header, Footer, Socials)
│   ├── contacts/        contact forms
│   ├── courseList/      course grid views
│   ├── courseSingle/    individual course page
│   ├── dashboard/       student dashboard (mostly disabled)
│   ├── events/          event listings
│   ├── homes/           homepage layout variants
│   ├── layout/          Header, Footer, MobileMenu
│   ├── shop/            e-commerce product pages
│   └── uiElements/      reusable bits
├── pages/               page wrappers per route
├── config/api.js        base URL constant + getApiUrl() helper
├── context/Context.jsx  cart state + app branding
├── hooks/useHomepageData.js   homepage fetch hook
├── data/                static JSON (courses, events, products)
├── styles/index.scss    imports public/assets/sass/styles.scss
└── svg/                 inline SVG components

public/assets/
├── img/                 page images, course thumbnails, logos
└── sass/
    ├── styles.scss      main stylesheet
    └── custom.scss      theme overrides (mobile menu, tabs, pagination)
```

## Active routes

| Path | Component |
|------|-----------|
| `/` | `HomePage1` |
| `/resources` | `CourseListPage3` (sample papers grid) |
| `/about` | `AboutPage` (CMS-driven) |
| `/vision` | `VisionPage` (CMS-driven) |
| `/testimonials` | `TestimonialsPage` |
| `/contact` | `ContactPage1` |
| `/privacy-policy`, `/terms-of-use`, `/cookie-policy` | policy pages |
| `*` | `NotFoundPage` |

Many other template variants (home-2…home-10, alt course list/single, dashboard, shop checkout, blog details) live as commented-out routes in `src/App.jsx`. They are part of the original template and are not currently shipped.

## CMS-driven content

The Backend serves dynamic content that the Admin panel writes. The Frontend reads it via:

| Endpoint | Used by |
|----------|---------|
| `GET /apis/homepage` | `useHomepageData` hook → hero, statistics, features, process, featured papers, student reviews |
| `GET /apis/content-pages/about` | About page sections |
| `GET /apis/content-pages/vision` | Vision page sections |
| `GET /apis/papers/subjects-by-class` | Category browser on resources page |
| `GET /apis/testimonials` | Testimonials carousel |
| `GET /apis/papers` | Resources listing (with filters) |

**Response shape** (consistent across all endpoints):

```json
{ "isSuccess": true, "data": [...], "message": "..." }
```

Components fetch on mount with `useEffect`. There is no global cache — each component fetches its own data.

## Local setup

```bash
npm install
npm run dev          # Vite dev server with HMR (default: http://localhost:5173)
npm run build        # production build → dist/
npm run preview      # preview built assets
npm run lint         # ESLint (max-warnings 0)
```

**Pointing at a local backend**: the base URL is **hard-coded** in `src/config/api.js`. To talk to a local Backend on port 8001, swap the active line for the commented `http://localhost:8001/apis` line.

There is no `.env.example` to fill in — Frontend currently consumes no env vars.

## Build & deploy

- **Hosting**: Vercel (production: `https://edunoble.in`)
- **Deploy branch**: **`main`** — Vercel auto-deploys on every push.
- **SPA routing**: `vercel.json` rewrites all paths to `/` so React Router can handle client-side navigation.

## Branching workflow

1. Branch off `main`: `git checkout -b feat/<name>`
2. Push and open a PR against `main`.
3. Merge → Vercel picks it up and ships.

Dormant branches present in this repo: `main-backup`, `nik-modification`, `paper` (historical / experimental — do not use for new work).

## Notes

- The "✦ AI Powered" badge in the Header, Footer, and MobileMenu is **UI-only** — there is no functional AI feature behind it yet.
- No global state library (Redux/Zustand) — just React Context for cart and app branding.

## Related repos

- **Edunoble-Backend** — Express + Mongoose API (this repo's data source).
- **Edunoble-Admin** — staff CMS that writes the content this Frontend reads.
- **System overview**: [ARCHITECTURE.md](ARCHITECTURE.md)
