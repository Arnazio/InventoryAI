"""Application configuration and settings."""

from functools import lru_cache
from typing import Literal

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application environment configuration."""

    project_name: str = "InventoryAI Backend"
    environment: Literal["local", "staging", "production"] = "local"
    api_prefix: str = "/api"
    api_v1_prefix: str = "/v1"
    version: str = "0.1.0"

    database_url: str = Field(
        default="postgresql+asyncpg://postgres:postgres@localhost:5432/inventoryai",
        description="SQLAlchemy URL for Postgres connection.",
    )
    database_echo: bool = Field(default=False, description="Enable SQLAlchemy SQL echo logging.")

    supabase_url: str | None = Field(default=None, description="Supabase project URL.")
    supabase_anon_key: str | None = Field(default=None, description="Supabase anon/public API key.")
    supabase_service_role_key: str | None = Field(
        default=None,
        description="Supabase service role key for backend ingestion tasks.",
    )

    openai_api_key: str | None = Field(default=None, description="Optional OpenAI API key.")

    forecast_default_horizons: list[int] = Field(
        default_factory=lambda: [30, 60, 90],
        description="Default forecast horizons in days.",
    )
    forecast_service_level: float = Field(
        default=0.95,
        description="Target service level used for safety stock calculations.",
    )

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", case_sensitive=False)


@lru_cache
def get_settings() -> Settings:
    """Cache and return application settings."""

    return Settings()


settings = get_settings()


