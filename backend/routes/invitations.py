from fastapi import APIRouter, HTTPException, Depends, status
from datetime import datetime
from typing import List
from models.invitation import InvitationCreate, InvitationUpdate, InvitationResponse
from services.auth_service import get_current_user
from config import db
import uuid

router = APIRouter(prefix="/invitations", tags=["invitations"])


def invitation_to_response(doc: dict) -> dict:
    return {
        "id": doc["_id"],
        "title": doc["title"],
        "template_id": doc["template_id"],
        "couple_details": doc["couple_details"],
        "is_published": doc["is_published"],
        "guest_token": doc["guest_token"],
        "owner_id": doc["owner_id"],
        "created_at": doc["created_at"],
        "updated_at": doc["updated_at"],
        "rsvp_count": doc.get("rsvp_count", 0),
    }


@router.post("", status_code=201)
async def create_invitation(data: InvitationCreate, current_user: dict = Depends(get_current_user)):
    inv_id = str(uuid.uuid4())
    guest_token = str(uuid.uuid4())
    now = datetime.utcnow()
    doc = {
        "_id": inv_id,
        "title": data.title,
        "template_id": data.template_id,
        "couple_details": data.couple_details.model_dump(),
        "is_published": data.is_published,
        "guest_token": guest_token,
        "owner_id": current_user["_id"],
        "created_at": now,
        "updated_at": now,
        "rsvp_count": 0,
    }
    await db.invitations.insert_one(doc)
    return invitation_to_response(doc)


@router.get("")
async def list_invitations(current_user: dict = Depends(get_current_user)):
    cursor = db.invitations.find({"owner_id": current_user["_id"]}).sort("created_at", -1)
    docs = []
    async for doc in cursor:
        docs.append(invitation_to_response(doc))
    return docs


@router.get("/by-token/{token}")
async def get_invitation_by_token(token: str):
    doc = await db.invitations.find_one({"guest_token": token, "is_published": True})
    if not doc:
        raise HTTPException(status_code=404, detail="Invitation not found or not published")
    return invitation_to_response(doc)


@router.get("/{inv_id}")
async def get_invitation(inv_id: str, current_user: dict = Depends(get_current_user)):
    doc = await db.invitations.find_one({"_id": inv_id, "owner_id": current_user["_id"]})
    if not doc:
        raise HTTPException(status_code=404, detail="Invitation not found")
    return invitation_to_response(doc)


@router.put("/{inv_id}")
async def update_invitation(inv_id: str, data: InvitationUpdate, current_user: dict = Depends(get_current_user)):
    doc = await db.invitations.find_one({"_id": inv_id, "owner_id": current_user["_id"]})
    if not doc:
        raise HTTPException(status_code=404, detail="Invitation not found")

    update_data = {"updated_at": datetime.utcnow()}
    if data.title is not None:
        update_data["title"] = data.title
    if data.template_id is not None:
        update_data["template_id"] = data.template_id
    if data.couple_details is not None:
        update_data["couple_details"] = data.couple_details.model_dump()
    if data.is_published is not None:
        update_data["is_published"] = data.is_published

    await db.invitations.update_one({"_id": inv_id}, {"$set": update_data})
    updated = await db.invitations.find_one({"_id": inv_id})
    return invitation_to_response(updated)


@router.delete("/{inv_id}", status_code=204)
async def delete_invitation(inv_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.invitations.delete_one({"_id": inv_id, "owner_id": current_user["_id"]})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Invitation not found")
