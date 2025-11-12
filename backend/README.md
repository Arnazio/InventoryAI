# InventoryAI Backend

FastAPI application powering the InventoryAI MVP. Handles authentication, multi-tenant data ingestion, forecasting, and procurement recommendations.

## Getting Started

```bash
uv sync  # or pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Project Structure

- `app/` – FastAPI application modules
  - `api/` – Route definitions
  - `core/` – Configuration, logging, and utilities
  - `db/` – Database models and session management
  - `services/` – Forecasting and business logic
  - `schemas/` – Pydantic models
- `tests/` – Unit and integration tests

## Environment Variables

Copy `.env.example` to `.env` and update values for your environment. See `app/core/config.py` for available settings.

## Running Tests

```bash
pytest
```


