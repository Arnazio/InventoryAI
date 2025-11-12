"""Shared Pydantic schema utilities."""

from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class ORMModel(BaseModel):
    """Base Pydantic model configured for ORM usage."""

    class Config:
        from_attributes = True


class TenantScopedModel(ORMModel):
    """Base class exposing tenant metadata."""

    id: UUID
    created_at: datetime
    updated_at: datetime

