"""Uploaded dataset metadata and sales records."""

from __future__ import annotations

from datetime import date
from typing import TYPE_CHECKING
from uuid import UUID

from sqlalchemy import Date
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import Numeric
from sqlalchemy import String
from sqlalchemy import UniqueConstraint
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship

from app.db.mixins import TimestampMixin
from app.db.mixins import UUIDPrimaryKeyMixin

if TYPE_CHECKING:
    from app.models.company import Company
    from app.models.user import User


class Dataset(UUIDPrimaryKeyMixin, TimestampMixin):
    """Represents a file upload containing sales history."""

    __tablename__ = "datasets"

    company_id: Mapped[UUID] = mapped_column(
        ForeignKey("companies.id", ondelete="CASCADE"),
        index=True,
    )
    company: Mapped["Company"] = relationship(back_populates="datasets")

    uploaded_by: Mapped[UUID | None] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"),
        nullable=True,
    )
    uploaded_by_user: Mapped["User | None"] = relationship(back_populates="datasets")

    filename: Mapped[str] = mapped_column(String(255))
    content_type: Mapped[str | None]
    row_count: Mapped[int] = mapped_column(Integer, default=0)
    source: Mapped[str] = mapped_column(String(50), default="upload")

    records: Mapped[list["SalesRecord"]] = relationship(
        back_populates="dataset",
        cascade="all, delete-orphan",
    )

    def __repr__(self) -> str:
        return f"<Dataset {self.id} rows={self.row_count}>"


class SalesRecord(UUIDPrimaryKeyMixin, TimestampMixin):
    """Individual SKU sales or inventory observation."""

    __tablename__ = "sales_records"
    __table_args__ = (
        UniqueConstraint(
            "dataset_id",
            "record_date",
            "sku",
            name="uq_sales_record_dataset_sku_date",
        ),
    )

    dataset_id: Mapped[UUID] = mapped_column(
        ForeignKey("datasets.id", ondelete="CASCADE"),
        index=True,
    )
    dataset: Mapped[Dataset] = relationship(back_populates="records")

    company_id: Mapped[UUID] = mapped_column(
        ForeignKey("companies.id", ondelete="CASCADE"),
        index=True,
    )

    record_date: Mapped[date] = mapped_column(Date, index=True)
    sku: Mapped[str] = mapped_column(String(120), index=True)

    quantity_sold: Mapped[int | None] = mapped_column(Integer)
    inventory_level: Mapped[int | None] = mapped_column(Integer)
    lead_time_days: Mapped[int | None] = mapped_column(Integer)
    revenue_amount: Mapped[float | None] = mapped_column(Numeric(scale=2))

    def __repr__(self) -> str:
        return f"<SalesRecord sku={self.sku} date={self.record_date}>"

