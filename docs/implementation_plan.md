## InventoryAI MVP Implementation Plan

### Vision & Scope
InventoryAI delivers demand forecasting and procurement recommendations for small and mid-sized businesses. The MVP focuses on a self-serve SaaS experience with file-based data ingestion, AI-driven forecasting, and actionable insights in a dashboard.

### Guiding Principles
- Modular backend with clear boundaries between ingestion, storage, forecasting, and insights.
- Multi-tenant architecture from day one using Supabase (Postgres + Auth).
- Strong developer experience via typed code, automated tests, and reproducible environments.
- Deployment-ready infrastructure based on Vercel (frontend) and Render/Fly.io (backend).

### High-Level Architecture
1. **Frontend (Next.js + Tailwind CSS)**
   - Authentication UI (Supabase Auth helpers or Clerk).
   - Dashboard pages:
     - Overview metrics (stockouts prevented, excess stock, forecast accuracy).
     - SKU forecast table with explanations and reorder recommendations.
     - Historical vs. forecast chart per SKU (Recharts/Chart.js).
   - File upload screen with drag-and-drop component calling backend `/upload`.
   - Forecast generation flow that triggers backend `/forecast/run`.
   - Download/export buttons (CSV, PDF).

2. **Backend (FastAPI)**
   - Auth middleware validating Supabase JWT.
   - Multi-tenant data access layer using SQLAlchemy with company-scoped tables.
   - Data ingestion endpoints (`/upload`, `/datasets`) handling CSV/Excel parsing with Pandas.
   - Forecast pipeline service orchestrating:
     - Data retrieval per tenant and SKU.
     - Baseline Prophet/ARIMA forecasts for 30/60/90 day horizons.
     - Procurement recommendation logic (lead time, safety stock, reorder quantity).
     - Optional GPT-4 call for explanation generation.
   - Forecast storage and retrieval endpoints (`/forecast`, `/forecast/{id}`, `/forecast/export`).

3. **Data Layer (PostgreSQL via Supabase)**
   - Schemas:
     - `companies`, `users`, `company_users`.
     - `uploads`, `sales_history`, `forecasts`, `forecast_items`.
   - Supabase storage bucket for raw files.
   - Row-level security leveraging tenant IDs.

4. **Machine Learning Module**
   - Modular `ForecastEngine` with pluggable models (Prophet baseline).
   - Feature engineering utilities (aggregation, holiday adjustments).
   - Evaluation metrics (MAPE) for dashboard accuracy metric.
   - Abstraction to support future ML models (MLflow integration later).

5. **Optional LLM Layer**
   - Background job or inline call to OpenAI GPT-4 to summarize forecast outcomes.
   - Configurable via environment flags to simplify demos without API keys.

### Workstreams & Milestones (4 Weeks)
#### Week 1 – Foundations
- Project scaffolding for FastAPI and Next.js.
- Supabase project setup (Auth, Postgres, storage buckets).
- Define database schema & Alembic migrations.
- Implement auth guard in FastAPI and configure Supabase Auth helpers in Next.js.

#### Week 2 – Data Ingestion & Storage
- Build upload API handling CSV/Excel (Pandas validation).
- Persist cleaned records to `sales_history`.
- Implement frontend upload page with drag-and-drop and status feedback.
- Multi-tenant enforcement tests and integration tests for ingestion.

#### Week 3 – Forecasting Engine & API
- Implement Prophet-based forecasting service with configurable horizons.
- Add procurement recommendation rules and safety stock logic.
- Create `/forecast/run`, `/forecast/{id}`, `/forecast/export` endpoints.
- Optional GPT-4 explanation generator.
- Unit tests for forecasting pipeline and recommendation formulas.

#### Week 4 – Dashboard & Pilot Readiness
- Build dashboard pages, charts, tables, and overview metrics.
- Implement forecast trigger UI and export buttons.
- Seed demo company with sample data for live demos.
- Add PDF/CSV export functionality.
- QA, automated tests, deployment scripts (Vercel + Render/Fly.io), documentation.

### Key Technical Decisions
- **Auth**: Supabase Auth to minimize overhead and align with Postgres.
- **File Processing**: Pandas with Pydantic validation for schema enforcement.
- **Forecasting Library**: Prophet for seasonality support; fallback to ARIMA if Prophet unavailable.
- **Task Queue (Optional)**: Use FastAPI background tasks for long-running forecasts; consider Celery or RQ later.
- **Configuration**: Pydantic `BaseSettings`, `.env` files, environment-specific overrides.

### Risks & Mitigations
- **Forecast Accuracy**: Start with baseline models; communicate MVP expectations; log metrics for continuous improvement.
- **Long-running Forecasts**: Use async background tasks and polling UI; limit dataset size in MVP.
- **Multi-Tenancy Security**: Enforce row-level security in Supabase; include integration tests.
- **PDF Generation Complexity**: Start with CSV export; evaluate `react-pdf` or backend-generated PDF if time allows.

### Next Steps
1. Initialize repository structure (`backend/`, `frontend/`, `docs/`).
2. Configure shared `docker-compose` for local dev (Postgres, Supabase emulator optional).
3. Implement Week 1 tasks and iterate.



