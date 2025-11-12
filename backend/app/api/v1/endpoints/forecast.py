"""Forecast endpoints."""

from fastapi import APIRouter, Depends

from app.schemas.forecast import ForecastResponse
from app.services.forecast import generate_demo_forecast

router = APIRouter()


@router.get("", response_model=ForecastResponse, summary="Get forecast data")
async def get_forecast(_: str | None = Depends(lambda: None)) -> ForecastResponse:  # placeholder for tenant
    """Return the latest forecast for the authenticated tenant.

    Tenant resolution will be implemented once authentication is wired up.
    """

    return generate_demo_forecast()


