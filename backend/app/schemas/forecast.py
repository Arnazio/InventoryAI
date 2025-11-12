"""Schemas for forecast responses."""

from typing import Literal

from pydantic import BaseModel, Field


class Metrics(BaseModel):
    """Aggregate metric summary for the dashboard."""

    stockouts_prevented: int = Field(..., ge=0)
    optimal_reorder_value: float = Field(..., ge=0)
    forecast_accuracy: float = Field(..., ge=0.0, le=1.0)
    dead_stock_reduction: float = Field(..., ge=0.0, le=1.0)


class TimeSeriesPoint(BaseModel):
    """Time series data point for historical/forecast curves."""

    label: str
    historical: float
    actual: float
    forecast: float


class ForecastRow(BaseModel):
    """Tabular forecast output per SKU."""

    sku: str
    current_stock: int = Field(..., ge=0)
    forecast: int = Field(..., ge=0)
    recommended_order: int = Field(..., ge=0)
    lead_time_days: int = Field(..., ge=0)
    confidence: float = Field(..., ge=0.0, le=1.0)
    status: Literal["healthy", "low", "critical"]


class Insight(BaseModel):
    """LLM generated or rule-based insight entry."""

    id: str
    tone: Literal["positive", "warning", "critical"]
    message: str


class ProcurementItem(BaseModel):
    """Recommended procurement plan item."""

    sku: str
    supplier: str
    order_quantity: int = Field(..., ge=0)
    unit_cost: float = Field(..., ge=0)
    priority: Literal["low", "medium", "high"]


class ForecastSettings(BaseModel):
    """Metadata about the forecast engine configuration."""

    model: str
    confidence_threshold: float = Field(..., ge=0.0, le=1.0)
    horizon_days: int = Field(..., ge=0)
    last_updated: str


class ForecastResponse(BaseModel):
    """Full payload returned to the frontend."""

    metrics: Metrics
    series: dict[str, list[TimeSeriesPoint]]
    table: list[ForecastRow]
    insights: list[Insight]
    procurement: list[ProcurementItem]
    settings: ForecastSettings


