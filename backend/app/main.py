"""FastAPI application entrypoint."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from loguru import logger

from app.api.router import api_router
from app.core.config import settings


def create_application() -> FastAPI:
    """Instantiate and configure the FastAPI application."""

    application = FastAPI(
        title=settings.project_name,
        version=settings.version,
        contact={"name": "InventoryAI", "email": "support@inventoryai.io"},
    )

    # Allow local development clients by default; tighten in production via env vars.
    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.include_router(api_router, prefix=settings.api_prefix)

    @application.get("/health", tags=["System"])
    async def health_check() -> dict[str, str]:
        """Basic health check endpoint."""

        return {"status": "ok"}

    return application


app = create_application()


@app.on_event("startup")
async def on_startup() -> None:
    """Application startup hook."""

    logger.info("Starting InventoryAI backend in %s mode", settings.environment)


@app.on_event("shutdown")
async def on_shutdown() -> None:
    """Application shutdown hook."""

    logger.info("Shutting down InventoryAI backend")


