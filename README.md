# 💍 WeddingInvite — Digital Wedding Invitation Platform

A full-stack platform to create beautiful, custom digital wedding invitations with **22 premium templates**, photo uploads, live preview, guest RSVP, and shareable invite links.

---

## 📁 Project Structure

```
Wedding/
├── backend/                  # FastAPI (Python) backend
│   ├── main.py               # App entry point, CORS, routers
│   ├── config.py             # MongoDB connection (Motor async)
│   ├── requirements.txt      # Python dependencies
│   ├── .env                  # Environment variables (not committed)
│   ├── models/
│   │   ├── user.py           # User Pydantic models
│   │   ├── invitation.py     # Invitation/couple-details models
│   │   └── guest.py          # Guest RSVP models
│   ├── routes/
│   │   ├── auth.py           # Register / Login endpoints
│   │   ├── invitations.py    # CRUD for invitations
│   │   ├── guests.py         # RSVP submission & listing
│   │   ├── photos.py         # Photo upload & serve
│   │   └── templates.py      # Template registry endpoint
│   ├── services/
│   │   └── auth_service.py   # JWT + bcrypt auth helpers
│   └── uploads/              # Uploaded photos stored here
│
└── frontend/                 # React (Vite) frontend
    ├── index.html
    ├── package.json
    └── src/
        ├── App.jsx            # Router + AuthProvider + PrivateRoute
        ├── main.jsx
        ├── api/
        │   ├── config.js      # API base URL
        │   └── index.js       # Axios client + all API helpers
        ├── context/
        │   └── AuthContext.jsx # Auth state, login/logout
        ├── components/
        │   ├── Navbar.jsx      # Sticky glassmorphism navbar
        │   ├── PhotoUploader.jsx # Drag-drop photo uploader
        │   └── TemplateRenderer.jsx # Maps template ID → component
        ├── pages/
        │   ├── HomePage.jsx    # Landing page
        │   ├── LoginPage.jsx   # Login form
        │   ├── RegisterPage.jsx
        │   ├── TemplatesPage.jsx  # Browse all 22 templates
        │   ├── DashboardPage.jsx  # Manage your invitations
        │   ├── CreatePage.jsx     # Invitation editor (live preview)
        │   ├── EditPage.jsx       # Edit existing invitation
        │   ├── GuestViewPage.jsx  # Public view of invitation
        │   └── RSVPPage.jsx       # Guest RSVP submission
        ├── templates/
        │   ├── BaseTemplate.jsx   # Core reusable template component
        │   ├── helpers.js         # formatDate / formatTime utilities
        │   ├── templates.css      # All 22 template themes CSS
        │   ├── FloralRomance.jsx
        │   ├── RoyalGold.jsx
        │   ├── ... (22 total)
        │   └── BurgundyBlossom.jsx
        └── styles/
            └── global.css     # Design tokens, glassmorphism, buttons
```

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version |
|------|---------|
| Python | 3.10+ |
| Node.js | 18+ |
| MongoDB | 6+ (local or Atlas) |

---

### 1. Clone & Setup Backend

```bash
cd Wedding/backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file in `backend/`:

```env
MONGODB_URL=mongodb://localhost:27017
DATABASE_NAME=wedding_db
SECRET_KEY=your-super-secret-jwt-key-change-this
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

Start the backend:

```bash
uvicorn main:app --reload --port 8000
```

Backend runs at: **http://localhost:8000**  
API docs (Swagger): **http://localhost:8000/docs**

---

### 2. Setup Frontend

```bash
cd Wedding/frontend

# Install packages
npm install

# Start dev server
npm run dev
```

Frontend runs at: **http://localhost:5173**

> The frontend connects to the backend at `http://localhost:8000` — change this in `src/api/config.js` if needed.

---

## 🔄 How It Works

```
User Flow:
Register / Login
      ↓
Browse 22 Templates → Pick one
      ↓
Fill in Details (names, date, venue, message)
      ↓
Upload Photos (bride, groom, couple, banner)
      ↓
Customize Colors & Font
      ↓
Live Preview updates in real-time
      ↓
Save Draft  OR  Publish
      ↓
Copy shareable link → Share with guests
      ↓
Guests open link → See full invitation
      ↓
Guests click "RSVP Now" → Submit attendance
      ↓
Couple sees RSVPs in Dashboard
```

---

## 📸 Photo System — How It Works

Photos flow through the system in 3 phases:

### Upload Phase (CreatePage / EditPage)
1. User selects an image via `PhotoUploader` (drag-drop or click)
2. The `File` object is sent to `POST /photos/upload`
3. Backend (Pillow) optimizes the image, saves it to `backend/uploads/`
4. Backend returns the **filename** (e.g. `abc123.jpg`)
5. The filename is stored in `couple_details` in MongoDB

### Display Phase (Templates)
- `photosAPI.getUrl(filename)` builds the full URL:  
  `http://localhost:8000/photos/{filename}`
- This URL is used directly in `<img src=...>` and CSS `backgroundImage`

### Photo Types

| Field | Where it appears |
|---|---|
| `banner_photo` | Full-width background of the header banner |
| `couple_photo` | Framed photo below the header |
| `bride_photo` | Circular portrait (right side) |
| `groom_photo` | Circular portrait (left side) |

---

## 🖼️ Background Photo / Banner — How It Works

> **Bug fixed:** Previously, adding a background photo would hide all text content.

When `banner_photo` is set:
- The banner div uses separate `backgroundImage`, `backgroundSize: cover`, `backgroundPosition: center center` inline style properties (not CSS shorthand) to guarantee correct rendering in all browsers
- A **dark scrim overlay** (`linear-gradient` from `rgba(0,0,0,0.38)` to `rgba(0,0,0,0.62)`) is applied automatically so names and text are **always readable** regardless of the photo brightness
- Names and subtitle text switch to **white** with `text-shadow` for maximum contrast
- The `&` ampersand uses a **gold accent color** (`#f5d98e`) for elegance
- The overlay and corners are properly z-indexed: overlay at z-index 1, corners at z-index 2, banner content at z-index 3

When no banner photo is set:
- Falls back to a gradient using the template's `secondary` color
- Overlay is a soft radial gradient (light theme: semi-opaque white; dark theme: soft dark radial)

---

## 💑 Couple Photo — How It Works

> **Bug fixed:** Couple photo now displays with correct alignment and labels.

When `couple_photo` is set:
- Displayed below the header banner in a **full-width framed box**
- Container is `display: flex; flex-direction: column; align-items: center` for proper centering
- Image uses `height: 320px; object-fit: cover; object-position: center top` to preserve faces
- Frame border uses the template's `primary` color with box-shadow for depth
- Shows "OUR STORY" label above and couple names caption below for context
- `onError` handler hides the image gracefully if it fails to load

---

## 🎨 22 Premium Templates

| # | Template | Theme |
|---|----------|-------|
| 1 | Floral Romance | Blush pink, rose motifs |
| 2 | Royal Gold | Dark navy, gold accents |
| 3 | Rustic Boho | Terracotta, earthy tones |
| 4 | Modern Minimal | Clean white, sans-serif |
| 5 | Garden Bloom | Sage green, botanical |
| 6 | Vintage Lace | Cream, sepia, lacework |
| 7 | South Indian | Deep crimson, gold |
| 8 | North Indian | Maroon, festive saffron |
| 9 | Celestial Starry | Midnight blue, cosmic |
| 10 | Beach Sunset | Coral, turquoise |
| 11 | Art Deco Glam | Black, geometric gold |
| 12 | Pastel Dreamy | Soft lavender & mint |
| 13 | Black Tie | Noir, silver elegance |
| 14 | Watercolor Whimsy | Soft watercolor pastels |
| 15 | Cherry Blossom | Sakura pink, Japanese |
| 16 | Emerald Forest | Deep forest green |
| 17 | Moroccan Luxe | Indigo, amber arabesque |
| 18 | Red & Gold Festive | Festival red, gold |
| 19 | Purple Royale | Deep violet, regal |
| 20 | Ivory Pearl | Ivory white, pearl |
| 21 | Teal Breeze | Teal, fresh minimal |
| 22 | Burgundy Blossom | Wine red, romantic |

---

## 🔐 Authentication

- JWT-based authentication (stored in `localStorage`)
- Protected routes: Dashboard, Create, Edit
- Tokens expire in 7 days (configurable via `.env`)

---

## 📡 API Endpoints

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/auth/register` | Create account |
| POST | `/auth/login` | Get JWT token |

### Invitations
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/invitations` | List your invitations |
| POST | `/invitations` | Create new invitation |
| PUT | `/invitations/{id}` | Update invitation |
| DELETE | `/invitations/{id}` | Delete invitation |
| GET | `/invitations/by-token/{token}` | Public view (no auth needed) |

### Photos
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/photos/upload` | Upload & optimize image |
| GET | `/photos/{filename}` | Serve uploaded image |

### Guests / RSVP
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/guests/rsvp/{token}` | Submit RSVP |
| GET | `/guests/{invitation_id}` | Get RSVPs (owner only) |

### Templates
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/templates` | List all 22 templates |

---

## 🧩 Key Components

### `BaseTemplate.jsx`
The core shared template renderer. All 22 templates extend this with a `theme` config object. Key props:
- `data` — couple details from MongoDB (names, date, venue, photos, colors)
- `theme` — template-specific visual configuration (colors, emoji, dividers, dark/light mode)

### `TemplateRenderer.jsx`
A dispatcher: takes `templateId` string → renders the matching template component.

### `PhotoUploader.jsx`
Reusable drag-and-drop file uploader:
- Shows current photo preview if `value` (filename string) is provided
- Calls `onChange(File)` on file selection for parent to handle upload
- Remove button sets value to `null`

### `CreatePage.jsx`
The invitation editor:
- **Left panel**: Tabbed form — Details / Venue / Photos / Style
- **Right panel**: Live preview via `TemplateRenderer` (updates on every change)
- **Photos tab**: 4 uploaders (couple, bride, groom, banner)
- **Top bar**: Save Draft, Publish, Preview toggle

---

## 🛠️ Troubleshooting

### Photo not showing in template
- Ensure backend is running on port 8000
- Check `backend/uploads/` folder exists (auto-created on first upload)
- Verify `src/api/config.js` points to the correct backend URL

### Background photo — content was missing (FIXED)
- **Root cause**: The CSS `background` shorthand `url(...) center/cover` was not rendering consistently, and the overlay wasn't darkening properly over photos
- **Fix**: Separate `backgroundImage`, `backgroundSize`, `backgroundPosition`, `backgroundRepeat` inline styles; added `tmpl-overlay-photo` class with a proper dark scrim; text colors switched to white when banner photo is present

### Couple photo alignment was wrong (FIXED)
- **Root cause**: Container lacked flex centering and image had `max-height` instead of fixed `height`
- **Fix**: Added `display: flex; flex-direction: column; align-items: center` to container; changed image to `height: 320px; object-fit: cover; object-position: center top`

### MongoDB connection error
- Ensure MongoDB is running: `mongod --dbpath ./data`
- Or use MongoDB Atlas and update `MONGODB_URL` in `.env`

### CORS error in browser
- Backend CORS is configured for `http://localhost:5173`
- For production, update `allow_origins` in `backend/main.py`

---

## 🐳 Docker Setup

All three services (MongoDB, FastAPI backend, React frontend) are containerized and orchestrated with Docker Compose.

### Files Created

| File | Purpose |
|------|---------|
| `backend/Dockerfile` | Python 3.11-slim image with Pillow deps |
| `frontend/Dockerfile` | Multi-stage: Node build → nginx serve |
| `frontend/nginx.conf` | nginx SPA config with caching & gzip |
| `docker-compose.yml` | Local/dev stack with all 3 services |
| `docker-compose.prod.yml` | Production overrides (auth, no exposed ports) |

### Run with Docker (Local Dev)

```bash
# From the project root
docker compose up --build

# Services:
# Frontend  → http://localhost:80
# Backend   → http://localhost:8000
# MongoDB   → mongodb://localhost:27017 (internal only)
```

### Run in Production

```bash
# Copy and fill in your secrets
cp backend/.env.example backend/.env

# Set production env vars
export MONGO_USER=admin
export MONGO_PASSWORD=strongpassword
export BACKEND_URL=https://api.yourdomain.com

docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Docker Architecture

```
                     ┌──────────────┐
User Browser ───────▶│   Frontend   │  nginx:alpine  :80
                     │  (React SPA) │
                     └──────┬───────┘
                            │ API calls
                     ┌──────▼───────┐
                     │   Backend    │  python:3.11   :8000
                     │  (FastAPI)   │
                     └──────┬───────┘
                            │ Motor async driver
                     ┌──────▼───────┐
                     │   MongoDB    │  mongo:7       :27017
                     │             │  (internal only)
                     └─────────────┘
```

---

## 🔄 CI/CD Pipeline (GitHub Actions)

Two workflows are set up under `.github/workflows/`:

### `ci.yml` — Runs on every push & PR to `main`

```
Push to main / PR
      ↓
  ┌───┴───────────────────────────────┐
  │  backend-ci          frontend-ci  │  (parallel)
  │  • Python lint       • npm ci     │
  │  • pytest tests      • ESLint     │
  │  • flake8            • npm build  │
  └───┬───────────────────────────────┘
      ↓ (both pass)
  docker-build
  • Build backend image (no push)
  • Build frontend image (no push)
  • Uses GitHub Actions cache
```

### `cd.yml` — Runs on push to `main` or version tags (`v*.*.*`)

```
Push tag v1.0.0
      ↓
  build-and-push
  • Login to ghcr.io
  • Build & push backend → ghcr.io/you/wedding-backend:v1.0.0
  • Build & push frontend → ghcr.io/you/wedding-frontend:v1.0.0
      ↓
  deploy (environment: production)
  • SSH into server
  • Pull new images
  • docker compose up -d
  • Health check /health
      ↓
  notify
  • Log success / failure
```

### GitHub Secrets Required

Go to your repo → **Settings → Secrets and variables → Actions** and add:

| Secret | Description |
|--------|-------------|
| `SERVER_HOST` | Production server IP / domain |
| `SERVER_USER` | SSH username (e.g. `ubuntu`) |
| `SERVER_SSH_KEY` | Private SSH key (PEM format) |
| `MONGO_USER` | MongoDB admin username |
| `MONGO_PASSWORD` | MongoDB password |
| `BACKEND_URL` | Public backend URL (e.g. `https://api.yourdomain.com`) |

> `GITHUB_TOKEN` is auto-provided by GitHub for pushing to GHCR.

---

## 📤 Pushing to GitHub

```bash
# Initialize git (from project root)
cd c:\Users\<you>\Downloads\Wedding
git init
git add .
git commit -m "feat: initial commit — Wedding Invitation Platform"

# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/wedding-invite.git
git branch -M main
git push -u origin main
```

> ⚠️ The `.gitignore` already excludes `backend/.env`, `backend/uploads/`, `node_modules/`, and `venv/`

---

### Backend (Railway, Render, etc.)
1. Set environment variables from `.env`
2. Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. Use persistent disk or cloud storage (AWS S3) for `uploads/` in production

### Frontend (Vercel, Netlify)
1. Update `src/api/config.js` with the production backend URL
2. Build command: `npm run build`
3. Publish directory: `dist/`

---

## 📦 Dependencies

### Backend (`requirements.txt`)
| Package | Purpose |
|---------|---------|
| `fastapi` | Web framework |
| `motor` | Async MongoDB driver |
| `python-jose[cryptography]` | JWT tokens |
| `passlib[bcrypt]` | Password hashing |
| `python-multipart` | File uploads |
| `Pillow` | Image optimization |
| `uvicorn` | ASGI server |

### Frontend (`package.json`)
| Package | Purpose |
|---------|---------|
| `react` + `react-dom` | UI framework |
| `react-router-dom` | Client-side routing |
| `axios` | HTTP client |
| `react-hot-toast` | Notifications |
| `lucide-react` | Icon library |

**Google Fonts used:** Cormorant Garamond, Playfair Display, Dancing Script, Great Vibes, Cinzel

---

*Built with ❤️ — Celebrating love, one invitation at a time.*
