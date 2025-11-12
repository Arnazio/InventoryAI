"""Forecast service implementations."""

from app.schemas.forecast import ForecastResponse


def generate_demo_forecast() -> ForecastResponse:
    """Return a deterministic demo forecast payload for the MVP."""

    return ForecastResponse(
        metrics={
            "stockouts_prevented": 24,
            "optimal_reorder_value": 12_450,
            "forecast_accuracy": 0.89,
            "dead_stock_reduction": 0.32,
        },
        series={
            "SKU-B12": [
                {"label": "Jan", "historical": 112, "actual": 118, "forecast": 130},
                {"label": "Feb", "historical": 128, "actual": 133, "forecast": 148},
                {"label": "Mar", "historical": 142, "actual": 149, "forecast": 162},
                {"label": "Apr", "historical": 158, "actual": 164, "forecast": 176},
                {"label": "May", "historical": 172, "actual": 181, "forecast": 190},
                {"label": "Jun", "historical": 183, "actual": 193, "forecast": 205},
                {"label": "Jul", "historical": 192, "actual": 207, "forecast": 214},
                {"label": "Aug", "historical": 201, "actual": 216, "forecast": 222},
            ],
            "SKU-A04": [
                {"label": "Jan", "historical": 320, "actual": 330, "forecast": 342},
                {"label": "Feb", "historical": 338, "actual": 341, "forecast": 356},
                {"label": "Mar", "historical": 350, "actual": 355, "forecast": 370},
                {"label": "Apr", "historical": 362, "actual": 366, "forecast": 385},
                {"label": "May", "historical": 376, "actual": 382, "forecast": 402},
                {"label": "Jun", "historical": 388, "actual": 395, "forecast": 417},
                {"label": "Jul", "historical": 404, "actual": 410, "forecast": 432},
                {"label": "Aug", "historical": 416, "actual": 424, "forecast": 446},
            ],
        },
        table=[
            {
                "sku": "SKU-B12",
                "current_stock": 85,
                "forecast": 245,
                "recommended_order": 180,
                "lead_time_days": 7,
                "confidence": 0.92,
                "status": "critical",
            },
            {
                "sku": "SKU-A04",
                "current_stock": 340,
                "forecast": 410,
                "recommended_order": 120,
                "lead_time_days": 5,
                "confidence": 0.88,
                "status": "healthy",
            },
            {
                "sku": "SKU-C31",
                "current_stock": 120,
                "forecast": 185,
                "recommended_order": 85,
                "lead_time_days": 10,
                "confidence": 0.85,
                "status": "low",
            },
            {
                "sku": "SKU-D22",
                "current_stock": 450,
                "forecast": 520,
                "recommended_order": 100,
                "lead_time_days": 7,
                "confidence": 0.90,
                "status": "healthy",
            },
            {
                "sku": "SKU-E15",
                "current_stock": 65,
                "forecast": 220,
                "recommended_order": 175,
                "lead_time_days": 14,
                "confidence": 0.87,
                "status": "critical",
            },
        ],
        insights=[
            {
                "id": "insight-1",
                "tone": "critical",
                "message": (
                    "SKU-B12 is trending 25% above baseline due to seasonal uplift. "
                    "Recommended reorder: +180 units to avoid stockout."
                ),
            },
            {
                "id": "insight-2",
                "tone": "warning",
                "message": (
                    "SKU-A04 shows consistent weekly demand. Reorder in smaller batches to maintain "
                    "cash flow while staying in stock."
                ),
            },
            {
                "id": "insight-3",
                "tone": "positive",
                "message": (
                    "Forecast accuracy improved to 89% this month. Your inventory strategy is performing well."
                ),
            },
        ],
        procurement=[
            {"sku": "SKU-B12", "supplier": "Supplier A", "order_quantity": 180, "unit_cost": 24.50, "priority": "high"},
            {"sku": "SKU-E15", "supplier": "Supplier B", "order_quantity": 175, "unit_cost": 18.75, "priority": "high"},
            {"sku": "SKU-A04", "supplier": "Supplier A", "order_quantity": 120, "unit_cost": 32.00, "priority": "medium"},
            {"sku": "SKU-D22", "supplier": "Supplier C", "order_quantity": 100, "unit_cost": 15.50, "priority": "medium"},
        ],
        settings={
            "model": "Prophet + ARIMA ensemble",
            "confidence_threshold": 0.85,
            "horizon_days": 60,
            "last_updated": "2 hours ago",
        },
    )


