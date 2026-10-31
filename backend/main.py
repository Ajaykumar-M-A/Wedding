from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from routes import auth, invitations, photos, guests, templates
from config import UPLOAD_DIR
import os

os.makedirs(UPLOAD_DIR, exist_ok=True)

app = FastAPI(
    title="Wedding Digital Invitation API",
    description="Backend API for creating and sharing beautiful wedding invitations",
    version="1.0.0",
)

# Origins: local dev + any production domain set via env var
_allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost",
    "http://localhost:80",
]
_prod_origin = os.getenv("FRONTEND_ORIGIN", "")
if _prod_origin:
    _allowed_origins.append(_prod_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_origin_regex=r"http://(localhost|127\.0\.0\.1)(:\d+)?",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(invitations.router)
app.include_router(photos.router)
app.include_router(guests.router)
app.include_router(templates.router)


@app.get("/")
async def root():
    return {"message": "Wedding Invitation API is running 🎊", "docs": "/docs"}


@app.get("/health")
async def health():
    return {"status": "ok"}
