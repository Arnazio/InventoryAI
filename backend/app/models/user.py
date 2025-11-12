"""Tenant-aware user model."""

from __future__ import annotations

from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.db.mixins import TimestampMixin
from app.db.mixins import UUIDPrimaryKeyMixin

if TYPE_CHECKING:
    from app.models.company import Company
    from app.models.dataset import Dataset
    from app.models.forecast import Forecast


class User(UUIDPrimaryKeyMixin, TimestampMixin):
    """Represents a platform user (Auth provider handled externally)."""

    __tablename__ = "users"

    external_id: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    full_name: Mapped[str | None]
    role: Mapped[str] = mapped_column(String(50), default="member")

    company_id: Mapped[UUID] = mapped_column(
        ForeignKey("companies.id", ondelete="CASCADE"),
        index=True,
    )
    company: Mapped["Company"] = relationship(back_populates="users")

    preferences: Mapped[dict | None] = mapped_column(JSONB, default=dict)

    datasets: Mapped[list["Dataset"]] = relationship(back_populates="uploaded_by_user")
    forecasts: Mapped[list["Forecast"]] = relationship(back_populates="generated_by_user")

    def __repr__(self) -> str:
        return f"<User {self.email}>"

