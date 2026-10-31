from fastapi import APIRouter, HTTPException, Depends
from datetime import datetime
from typing import List
from models.guest import RSVPCreate, RSVPResponse
from config import db
import uuid

router = APIRouter(prefix="/guests", tags=["guests"])


@router.post("/rsvp/{token}")
async def submit_rsvp(token: str, data: RSVPCreate):
    invitation = await db.invitations.find_one({"guest_token": token, "is_published": True})
    if not invitation:
        raise HTTPException(status_code=404, detail="Invitation not found")

    rsvp_id = str(uuid.uuid4())
    now = datetime.utcnow()
    doc = {
        "_id": rsvp_id,
        "invitation_id": invitation["_id"],
        "guest_name": data.guest_name,
        "guest_email": data.guest_email,
        "attending": data.attending,
        "number_of_guests": data.number_of_guests,
        "meal_preference": data.meal_preference,
        "message": data.message,
        "created_at": now,
    }
    await db.rsvps.insert_one(doc)
    # Increment RSVP count
    await db.invitations.update_one({"_id": invitation["_id"]}, {"$inc": {"rsvp_count": 1}})
    return {"message": "RSVP submitted successfully", "id": rsvp_id}


@router.get("/{invitation_id}")
async def get_rsvps(invitation_id: str):
    cursor = db.rsvps.find({"invitation_id": invitation_id}).sort("created_at", -1)
    docs = []
    async for doc in cursor:
        doc["id"] = doc.pop("_id")
        docs.append(doc)
    return docs
