"""Version 1 API routes."""

from fastapi import APIRouter

from app.api.v1.endpoints import forecast
from app.api.v1.endpoints import health
from app.api.v1.endpoints import upload

router = APIRouter()
router.include_router(health.router, tags=["System"])
router.include_router(forecast.router, prefix="/forecast", tags=["Forecast"])
router.include_router(upload.router, prefix="/upload", tags=["Upload"])


