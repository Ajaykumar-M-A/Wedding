from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class RSVPCreate(BaseModel):
    guest_name: str
    guest_email: Optional[EmailStr] = None
    attending: bool
    number_of_guests: int = 1
    meal_preference: Optional[str] = None
    message: Optional[str] = None


class RSVPResponse(BaseModel):
    id: str
    invitation_id: str
    guest_name: str
    guest_email: Optional[str] = None
    attending: bool
    number_of_guests: int
    meal_preference: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime
