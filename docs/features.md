## InventoryAI Feature Implementation Tracker

### 1. Authentication & Multi-Tenancy
- **Scope**
  - Supabase or Clerk auth integration for sign-in/up.
  - Multi-tenant context propagation to FastAPI (JWT validation, tenant_id resolution).
  - Row-level security/RLS on Postgres tables (`sales_history`, `forecasts`, `uploads`).
- **Status**: Not started.
- **Next Actions**
  - Select auth provider and configure project keys.
  - Scaffold auth middleware in FastAPI and add tenant-aware dependencies.
  - Wire Next.js layout to show user session, guard dashboard routes.

### 2. Data Upload Pipeline
- **Scope**
  - CSV/XLSX ingestion with schema validation, normalization, and error reporting.
  - Persist cleaned rows to Postgres and enqueue preprocessing job.
  - Frontend feedback (preview, validation errors, processing status).
- **Status**: In progress.
- **Current Progress**
  - Backend `/upload` endpoint parses CSV/XLSX and validates required columns.
  - Frontend upload flow shows success summary and preview.
- **Next Actions**
  - Implement database models for uploads and sales history.
  - Store accepted rows and record upload metadata/errors.
  - Introduce background task to trigger forecast recalculation.

### 3. Forecasting Engine & API
- **Scope**
  - Prophet/ARIMA baseline forecasts with configurable horizons.
  - Forecast storage, retrieval, and evaluation metrics.
  - Expose `/forecast/run`, `/forecast` endpoints with tenant scoping.
- **Status**: In progress.
- **Current Progress**
  - `/api/v1/forecast` returns deterministic demo payload.
  - Frontend dashboard consumes live endpoint with React Query fallbacks.
- **Next Actions**
  - Build ForecastEngine service (Prophet baseline) and integrate with SQLAlchemy models.
  - Persist forecast runs and items; calculate metrics (MAPE, stockouts prevented).
  - Add background job orchestration and polling state to UI.

### 4. Dashboard & Insights
- **Scope**
  - KPI cards, charts, tables, and AI insights panel backed by live data.
  - Loading, error, and empty states with friendly messaging.
  - Optional GPT-4 explanations with user-triggered refresh.
- **Status**: In progress.
- **Current Progress**
  - Dashboard, Forecast Explorer, Procurement Planner connected to API client.
  - Insights panel shows demo data; UI handles loading state.
- **Next Actions**
  - Replace mock insights with service output (rule-based + GPT summary).
  - Add skeleton loaders and retry/toast patterns for API failures.
  - Wire “Explain forecast” button to new insights endpoint.

### 5. Procurement Planner
- **Scope**
  - Recommended orders with supplier mapping, unit costs, and priority.
  - Export (CSV/PDF) and purchase order generation workflow.
  - Optional integration hooks (Shopify, Odoo) for future automation.
- **Status**: In progress.
- **Current Progress**
  - Planner UI uses API data model; totals calculated client-side.
- **Next Actions**
  - Persist procurement recommendations tied to forecast runs.
  - Implement export endpoints and frontend downloads.
  - Add supplier metadata management UI.

### 6. Reporting & Exports
- **Scope**
  - CSV/PDF export for forecasts and procurement lists.
  - Scheduled email or webhook deliveries (stretch).
- **Status**: Not started.
- **Next Actions**
  - Define export serializers; use Pandas + WeasyPrint/ReportLab for PDF.
  - Add `/forecast/export` and `/procurement/export` endpoints.
  - Hook UI download buttons with toast confirmations.

### 7. Integrations & Settings
- **Scope**
  - Connectors for Shopify/Odoo (MVP mocks).
  - Workspace settings (forecast parameters, supplier preferences).
  - Team management (roles, invitations).
- **Status**: Not started.
- **Next Actions**
  - Create settings API endpoints and database tables.
  - Implement integration cards with status badges and connect flows.
  - Expose role-based controls in frontend.

### 8. Platform & DevOps
- **Scope**
  - Database migrations, seed data, and local dev tooling.
  - CI pipeline (lint, tests) and deployment configs (Vercel + Render/Fly.io).
  - Observability (structured logs, Sentry, metrics) and health checks.
- **Status**: In progress.
- **Current Progress**
  - Backend tests cover `/health`, `/forecast`, `/upload`.
  - Tailwind/Turbo dev environments stable; CORS configured.
- **Next Actions**
  - Add Alembic migrations and docker-compose for Postgres/local Supabase.
  - Configure GitHub Actions for lint/test on push.
  - Prepare deployment manifests and environment variable documentation.

### 9. Testing & QA
- **Scope**
  - Unit tests for services, integration tests for API flows.
  - Frontend smoke and visual tests for critical user paths.
- **Status**: In progress.
- **Current Progress**
  - Backend tests ensure health/upload/forecast endpoints function with demo data.
  - ESLint passes for frontend codebase.
- **Next Actions**
  - Expand tests to cover validation failures and insights service.
  - Add Playwright or Cypress suite for upload/forecast UI flow.
  - Create manual QA checklist with sample tenant data.


