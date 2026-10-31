from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class CoupleDetails(BaseModel):
    bride_name: str = ""
    groom_name: str = ""
    wedding_date: str = ""
    wedding_time: str = ""
    venue_name: str = ""
    venue_address: str = ""
    ceremony_time: str = ""
    reception_time: str = ""
    hashtag: str = ""
    message: str = ""
    bride_photo: Optional[str] = None
    groom_photo: Optional[str] = None
    couple_photo: Optional[str] = None
    banner_photo: Optional[str] = None
    primary_color: str = "#c9a96e"
    secondary_color: str = "#f5e6d3"
    font_family: str = "Cormorant Garamond"


class InvitationCreate(BaseModel):
    title: str
    template_id: str
    couple_details: CoupleDetails
    is_published: bool = False


class InvitationUpdate(BaseModel):
    title: Optional[str] = None
    template_id: Optional[str] = None
    couple_details: Optional[CoupleDetails] = None
    is_published: Optional[bool] = None


class InvitationResponse(BaseModel):
    id: str
    title: str
    template_id: str
    couple_details: CoupleDetails
    is_published: bool
    guest_token: str
    owner_id: str
    created_at: datetime
    updated_at: datetime
    rsvp_count: int = 0
