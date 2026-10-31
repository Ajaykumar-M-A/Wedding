from fastapi import APIRouter

router = APIRouter(prefix="/templates", tags=["templates"])

TEMPLATES = [
    {"id": "floral-romance", "name": "Floral Romance", "category": "Romantic", "colors": ["#f9d4d4", "#c9a96e"], "preview": "floral-romance"},
    {"id": "royal-gold", "name": "Royal Gold", "category": "Luxury", "colors": ["#0a0a2e", "#c9a96e"], "preview": "royal-gold"},
    {"id": "rustic-boho", "name": "Rustic Boho", "category": "Rustic", "colors": ["#c4714a", "#e8d5b7"], "preview": "rustic-boho"},
    {"id": "modern-minimal", "name": "Modern Minimal", "category": "Modern", "colors": ["#ffffff", "#222222"], "preview": "modern-minimal"},
    {"id": "garden-bloom", "name": "Garden Bloom", "category": "Nature", "colors": ["#7a9e7e", "#d4b8e0"], "preview": "garden-bloom"},
    {"id": "vintage-lace", "name": "Vintage Lace", "category": "Vintage", "colors": ["#f5f0e8", "#8b7355"], "preview": "vintage-lace"},
    {"id": "south-indian", "name": "South Indian Traditional", "category": "Traditional", "colors": ["#8b0000", "#c9a96e"], "preview": "south-indian"},
    {"id": "north-indian", "name": "North Indian Vibrant", "category": "Traditional", "colors": ["#ff6b1a", "#cc1477"], "preview": "north-indian"},
    {"id": "celestial-starry", "name": "Celestial Starry Night", "category": "Fantasy", "colors": ["#0d1b4b", "#c0c0c0"], "preview": "celestial-starry"},
    {"id": "beach-sunset", "name": "Beach Sunset", "category": "Tropical", "colors": ["#ff7f50", "#20b2aa"], "preview": "beach-sunset"},
    {"id": "art-deco", "name": "Art Deco Glam", "category": "Luxury", "colors": ["#f5e6a3", "#1a1a1a"], "preview": "art-deco"},
    {"id": "pastel-dreamy", "name": "Pastel Dreamy", "category": "Romantic", "colors": ["#d8b4fe", "#a7f3d0"], "preview": "pastel-dreamy"},
    {"id": "black-tie", "name": "Black Tie Elegant", "category": "Modern", "colors": ["#1c1c1c", "#c9a96e"], "preview": "black-tie"},
    {"id": "watercolor-whimsy", "name": "Watercolor Whimsy", "category": "Artistic", "colors": ["#f9a8d4", "#93c5fd"], "preview": "watercolor-whimsy"},
    {"id": "cherry-blossom", "name": "Cherry Blossom", "category": "Asian", "colors": ["#ffb7c5", "#ffffff"], "preview": "cherry-blossom"},
    {"id": "emerald-forest", "name": "Emerald Forest", "category": "Nature", "colors": ["#064e3b", "#b45309"], "preview": "emerald-forest"},
    {"id": "moroccan-luxe", "name": "Moroccan Luxe", "category": "Exotic", "colors": ["#1e40af", "#c9a96e"], "preview": "moroccan-luxe"},
    {"id": "red-gold-festive", "name": "Red & Gold Festive", "category": "Traditional", "colors": ["#9b1c1c", "#c9a96e"], "preview": "red-gold-festive"},
    {"id": "purple-royale", "name": "Purple Royale", "category": "Luxury", "colors": ["#4c1d95", "#c0c0c0"], "preview": "purple-royale"},
    {"id": "ivory-pearl", "name": "Ivory & Pearl Classic", "category": "Classic", "colors": ["#fffff0", "#d4d4d4"], "preview": "ivory-pearl"},
    {"id": "teal-breeze", "name": "Teal Breeze Modern", "category": "Modern", "colors": ["#0d9488", "#f0fdfa"], "preview": "teal-breeze"},
    {"id": "burgundy-blossom", "name": "Burgundy Blossom", "category": "Romantic", "colors": ["#7f1d1d", "#fbcfe8"], "preview": "burgundy-blossom"},
]


@router.get("")
async def list_templates():
    return TEMPLATES


@router.get("/{template_id}")
async def get_template(template_id: str):
    tmpl = next((t for t in TEMPLATES if t["id"] == template_id), None)
    if not tmpl:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Template not found")
    return tmpl
