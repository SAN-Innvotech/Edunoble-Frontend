# Edunoble — System Architecture

A single doc that explains how the three Edunoble repos fit together, where each one is deployed from, and how data flows between them.

## The system at a glance

```
┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│  Edunoble-Admin  │ ─CMS──▶ │ Edunoble-Backend │ ◀─API── │Edunoble-Frontend │
│ (Vercel / main)  │  writes │ (Vercel / main)  │  reads  │ (Vercel / main)  │
│ admin.edunoble.in│         │backbone.edunoble │         │   edunoble.in    │
└──────────────────┘         └────────┬─────────┘         └──────────────────┘
                                      │
                                ┌─────┴──────┐
                                │  MongoDB   │
                                │   Atlas    │
                                └────────────┘
                          + Cloudinary  (images)
                          + Google Drive (paper PDFs)
                          + SMTP         (admin OTP email)
```

- **Edunoble-Frontend** is the public site users see.
- **Edunoble-Backend** is the only thing that talks to the database; it exposes a REST API at `https://backbone.edunoble.in/apis`.
- **Edunoble-Admin** is a private CMS where staff create / edit content. Every write flows through the Backend.

## The three repos

| Repo | Purpose | Deploy branch | Production URL |
|------|---------|---------------|----------------|
| Edunoble-Frontend | public marketing + sample-paper browser | `main` | `https://edunoble.in` |
| Edunoble-Admin | staff CMS dashboard | `main` | admin sub-domain (e.g. `https://admin.edunoble.in`) |
| Edunoble-Backend | Express + Mongoose API | `main` | `https://backbone.edunoble.in` |

> All three repos deploy from their `main` branch — open a PR into `main`, merge, and Vercel ships it.

## Data flow

### Read path (Frontend → MongoDB)

1. A page mounts (e.g. About).
2. It calls `getApiUrl('content-pages/about')` → `GET https://backbone.edunoble.in/apis/content-pages/about`.
3. Backend runs a Mongoose query (filter `isActive: true`, sort by `order`).
4. Response shape:
   ```json
   { "isSuccess": true, "data": [...], "message": "..." }
   ```
5. Component sets state and renders.

No global cache layer — each component fetches its own data.

### Write path (Admin → MongoDB)

1. Staff logs in: `POST /apis/auth/admin/send-otp` → OTP email → `POST /apis/auth/admin/verify-otp` → JWT (30 d) → stored in `localStorage` under key `auth`.
2. They open a form modal (e.g. `PaperFormModal`).
3. If there's an image, it's uploaded first: `POST /apis/upload/image` (multipart) → returns `{ imageUrl }` (Cloudinary URL).
4. The form submits: `POST /apis/papers/admin` (or `PATCH /apis/papers/admin/:id`) with `Authorization: Bearer <token>`.
5. Backend's `auth.middleware.js` verifies the JWT; controller writes to Mongo.
6. Next time the Frontend hits the corresponding read endpoint, it gets the new content.

## Deployment & branching workflow

Each Vercel project is wired to one git branch. A push to that branch triggers an automatic deploy.

| Repo | Tracks | Workflow |
|------|--------|----------|
| Frontend | `main` | branch off `main` → PR → merge → ships |
| Admin | `main` | branch off `main` → PR → merge → ships |
| Backend | `main` | branch off `main` → PR → merge → ships |

**Standard feature flow** (run inside the right repo):

```bash
git checkout main                   # deploy branch for all three repos
git pull
git checkout -b feat/<short-name>
# ... work ...
git push -u origin feat/<short-name>
# open PR against main, review, merge
# Vercel auto-deploys on merge
```

**Dormant / archival branches** (do not use for new work):

- Frontend: `main-backup`, `nik-modification`, `paper`
- Admin: `develop`, `nik-modification`
- Backend: `nik-modification`, `sample` — older branches, no longer used for deploys

## Shared contract

- **Base URL**: `https://backbone.edunoble.in/apis` (hard-coded in both Frontend and Admin `src/config/api.js`).
- **Response shape**: `{ isSuccess: boolean, data: any, message: string }`.
- **Auth header** (admin / protected only): `Authorization: Bearer <jwt>`.
- **Content-Type**: `application/json` for everything except image upload (`multipart/form-data`).

## Environment variable matrix

| Variable | Frontend | Admin | Backend |
|----------|:--------:|:-----:|:-------:|
| `MONGO_URL` |  |  | ✅ |
| `JWT_SECRET` |  |  | ✅ |
| `PORT` |  |  | ✅ (default 8001) |
| `CLOUDINARY_CLOUD_NAME` |  |  | ✅ |
| `CLOUDINARY_API_KEY` |  |  | ✅ |
| `CLOUDINARY_API_SECRET` |  |  | ✅ |
| `SMTP_HOST` |  |  | ✅ |
| `SMTP_PORT` |  |  | ✅ |
| `SMTP_USER` |  |  | ✅ |
| `SMTP_PASS` |  |  | ✅ |
| `FROM_EMAIL` |  |  | optional |
| `OTP_EXPIRY_MINUTES` |  |  | optional (default 5) |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` |  |  | ✅ |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` |  |  | ✅ |
| `GOOGLE_DRIVE_FOLDER_ID` |  |  | ✅ |

Frontend and Admin currently consume **no env vars** — the API base URL lives directly in `src/config/api.js`. To point either of them at a different backend, edit that file.

## Running everything locally (first-time setup)

Assuming the three repos live as sibling folders (e.g. `C:\Work-Data\SAN-Git-Repos\Edunoble-Frontend`, `…-Backend`, `…-Admin`):

```bash
# 1. Backend (start first — Frontend & Admin call it)
cd Edunoble-Backend
npm install
# Create .env with at least: MONGO_URL, JWT_SECRET, CLOUDINARY_*, SMTP_*
npm start                # listens on http://localhost:8001

# 2. Flip Frontend & Admin to local backend
# Edit Edunoble-Frontend/src/config/api.js and Edunoble-Admin/src/config/api.js:
# comment the production URL line, uncomment the `http://localhost:8001/apis` line.

# 3. Frontend (in a new terminal)
cd Edunoble-Frontend
npm install
npm run dev              # http://localhost:5173

# 4. Admin (in another new terminal)
cd Edunoble-Admin
npm install
npm run dev              # http://localhost:5174 (or whatever Vite picks)
```

Swagger for the local API: `http://localhost:8001/apis/api-docs`.

## Quirks worth knowing

- **Frontend `App.jsx` is template-heavy** — many commented-out routes (`home-2`…`home-10`, alt course list/single, dashboard, shop checkout, blog detail). Only the routes listed in the Frontend README are live.
- **"✦ AI Powered" badge** in Frontend Header/Footer/MobileMenu is UI-only. There is no AI feature behind it yet.
- **Hard-coded API URL** in Frontend & Admin — no `.env` is read. Pointing them at a non-production Backend means editing `src/config/api.js`.
- **Default `JWT_SECRET`** falls back to `"secret123"` in code. Always override in production.
- **No global state management** in either React app — just `useState` + `Context` for cart/auth.
- **Image upload is two-step**: upload to `/upload/image` first, then submit the resulting `imageUrl` with the rest of the form.

## File pointers (for quick reference)

- Backend entry: `Edunoble-Backend/server.js`
- All endpoints mounted: `Edunoble-Backend/src/api/api.router.js`
- JWT middleware: `Edunoble-Backend/src/middlewares/auth.middleware.js`
- Mongoose schemas: `Edunoble-Backend/src/models/`
- Frontend routes: `Edunoble-Frontend/src/App.jsx`
- Frontend API base: `Edunoble-Frontend/src/config/api.js`
- Admin routes: `Edunoble-Admin/src/App.jsx`
- Admin API base: `Edunoble-Admin/src/config/api.js`
- Admin auth gate: `Edunoble-Admin/src/components/common/ProtectedRoute.jsx`
- Admin sidebar items: `Edunoble-Admin/src/data/dashBoardSidebar.js`
