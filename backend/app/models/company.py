"""Company tenant model."""

from __future__ import annotations

from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.db.base import Base
from app.db.mixins import TimestampMixin
from app.db.mixins import UUIDPrimaryKeyMixin

if TYPE_CHECKING:
    from app.models.dataset import Dataset
    from app.models.forecast import Forecast
    from app.models.user import User


class Company(UUIDPrimaryKeyMixin, TimestampMixin, Base):
    """Represents a tenant/company within the platform."""

    __tablename__ = "companies"

    name: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    slug: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    industry: Mapped[str | None]
    timezone: Mapped[str | None]

    users: Mapped[list["User"]] = relationship(
        back_populates="company",
        cascade="all, delete-orphan",
    )
    datasets: Mapped[list["Dataset"]] = relationship(
        back_populates="company",
        cascade="all, delete-orphan",
    )
    forecasts: Mapped[list["Forecast"]] = relationship(
        back_populates="company",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return f"<Company {self.id} name={self.name!r}>"

