"""Forecast results and associated items."""

from __future__ import annotations

from datetime import date
from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import Date
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import Numeric
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
    from app.models.user import User


class Forecast(UUIDPrimaryKeyMixin, TimestampMixin):
    """Represents a generated forecast run for a company."""

    __tablename__ = "forecasts"

    company_id: Mapped[UUID] = mapped_column(
        ForeignKey("companies.id", ondelete="CASCADE"),
        index=True,
    )
    company: Mapped["Company"] = relationship(back_populates="forecasts")

    dataset_id: Mapped[UUID | None] = mapped_column(
        ForeignKey("datasets.id", ondelete="SET NULL"),
        nullable=True,
    )
    dataset: Mapped["Dataset | None"] = relationship()

    generated_by: Mapped[UUID | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
    )
    generated_by_user: Mapped["User | None"] = relationship(back_populates="forecasts")

    horizon_days: Mapped[int] = mapped_column(Integer, default=90)
    model_version: Mapped[str] = mapped_column(String(120), default="baseline-prophet")
    status: Mapped[str] = mapped_column(String(30), default="completed")

    metadata: Mapped[dict | None] = mapped_column(JSONB, default=dict)
    summary: Mapped[dict | None] = mapped_column(JSONB, default=dict)

    items: Mapped[list["ForecastItem"]] = relationship(
        back_populates="forecast",
        cascade="all, delete-orphan",
    )


class ForecastItem(UUIDPrimaryKeyMixin, TimestampMixin):
    """Individual forecast row for a SKU and horizon."""

    __tablename__ = "forecast_items"

    forecast_id: Mapped[UUID] = mapped_column(
        ForeignKey("forecasts.id", ondelete="CASCADE"),
        index=True,
    )
    forecast: Mapped[Forecast] = relationship(back_populates="items")

    company_id: Mapped[UUID] = mapped_column(
        ForeignKey("companies.id", ondelete="CASCADE"),
        index=True,
    )

    sku: Mapped[str] = mapped_column(String(120), index=True)
    horizon_days: Mapped[int] = mapped_column(Integer)
    forecast_date: Mapped[date] = mapped_column(Date)
    forecast_qty: Mapped[int] = mapped_column(Integer)
    current_stock: Mapped[int | None] = mapped_column(Integer)
    recommended_order_qty: Mapped[int] = mapped_column(Integer)
    service_level: Mapped[float] = mapped_column(Numeric(precision=5, scale=2), default=0.95)
    confidence: Mapped[float | None] = mapped_column(Numeric(precision=5, scale=2))

    insights: Mapped[dict | None] = mapped_column(JSONB, default=dict)

