# InventoryAI

MVP web application that enables small and mid-sized businesses to upload historical sales data, generate AI-driven inventory forecasts, and receive procurement recommendations.

## Project Structure

- `backend/` – FastAPI service (data ingestion, forecasting engine, REST API)
- `frontend/` – Next.js dashboard (auth, uploads, charts)
- `landing-page/` – Standalone Next.js marketing site
- `docs/` – Architecture and planning documents

## Getting Started

### Backend

```bash
cd backend
uv sync  # or pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Landing page

```bash
cd landing-page
npm install
npm run dev
```

## Documentation

Implementation roadmap and architecture details live in `docs/implementation_plan.md`.