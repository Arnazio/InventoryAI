import io

import pandas as pd
import pytest
from httpx import AsyncClient

from app.main import app


@pytest.mark.asyncio
async def test_forecast_endpoint_returns_demo_payload() -> None:
    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.get("/api/v1/forecast")

    assert response.status_code == 200
    data = response.json()
    assert set(data.keys()) == {"metrics", "series", "table", "insights", "procurement", "settings"}
    assert data["metrics"]["stockouts_prevented"] == 24
    assert "SKU-B12" in data["series"]


@pytest.mark.asyncio
async def test_upload_endpoint_accepts_csv() -> None:
    dataframe = pd.DataFrame(
        {
            "date": ["2024-01-01", "2024-01-02"],
            "sku": ["SKU-A01", "SKU-A01"],
            "units_sold": [10, 12],
            "stock": [100, 90],
        }
    )
    buffer = io.StringIO()
    dataframe.to_csv(buffer, index=False)
    buffer.seek(0)

    files = {"file": ("sales.csv", buffer.read(), "text/csv")}

    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post("/api/v1/upload", files=files)

    assert response.status_code == 200
    payload = response.json()
    assert payload["rows"] == 2
    assert "units_sold" in payload["columns"]


@pytest.mark.asyncio
async def test_upload_endpoint_rejects_invalid_columns() -> None:
    dataframe = pd.DataFrame({"foo": [1], "bar": [2]})
    buffer = io.StringIO()
    dataframe.to_csv(buffer, index=False)
    buffer.seek(0)

    files = {"file": ("invalid.csv", buffer.read(), "text/csv")}

    async with AsyncClient(app=app, base_url="http://test") as client:
        response = await client.post("/api/v1/upload", files=files)

    assert response.status_code == 422

