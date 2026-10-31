from fastapi import APIRouter, HTTPException, status
from datetime import datetime
from models.user import UserCreate, UserLogin, Token, UserResponse
from services.auth_service import get_password_hash, verify_password, create_access_token
from config import db
import uuid

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=Token)
async def register(user_data: UserCreate):
    existing = await db.users.find_one({"email": user_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user_id = str(uuid.uuid4())
    hashed = get_password_hash(user_data.password)
    user_doc = {
        "_id": user_id,
        "name": user_data.name,
        "email": user_data.email,
        "hashed_password": hashed,
        "created_at": datetime.utcnow(),
    }
    await db.users.insert_one(user_doc)

    token = create_access_token(data={"sub": user_id})
    return Token(
        access_token=token,
        token_type="bearer",
        user=UserResponse(id=user_id, name=user_data.name, email=user_data.email),
    )


@router.post("/login", response_model=Token)
async def login(user_data: UserLogin):
    user = await db.users.find_one({"email": user_data.email})
    if not user or not verify_password(user_data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(data={"sub": user["_id"]})
    return Token(
        access_token=token,
        token_type="bearer",
        user=UserResponse(id=user["_id"], name=user["name"], email=user["email"]),
    )
