"""Health check endpoint."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/health", summary="Health check")
async def health() -> dict[str, str]:
    """Return a basic health status."""

    return {"status": "healthy"}


