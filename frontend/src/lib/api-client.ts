import { ForecastRow, Insight, ProcurementItem, TimeSeriesPoint } from "@/lib/types";

const DEFAULT_API_BASE = "http://localhost:8000/api/v1";

const API_BASE_URL =
  (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")) ||
  DEFAULT_API_BASE;

function buildUrl(path: string, tenantId?: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${API_BASE_URL}${normalizedPath}`);
  if (tenantId) {
    url.searchParams.set("tenant", tenantId);
  }
  return url.toString();
}

export interface ForecastResponse {
  metrics: {
    stockouts_prevented: number;
    optimal_reorder_value: number;
    forecast_accuracy: number;
    dead_stock_reduction: number;
  };
  series: Record<string, TimeSeriesPoint[]>;
  table: Array<
    Omit<ForecastRow, "currentStock" | "recommendedOrder" | "leadTimeDays"> & {
      current_stock: number;
      recommended_order: number;
      lead_time_days: number;
    }
  >;
  insights: Insight[];
  procurement: Array<
    Omit<ProcurementItem, "orderQuantity" | "unitCost"> & {
      order_quantity: number;
      unit_cost: number;
    }
  >;
  settings: {
    model: string;
    confidence_threshold: number;
    horizon_days: number;
    last_updated: string;
  };
}

export interface UploadSummary {
  message: string;
  rows: number;
  columns: string[];
  column_summary: Array<{ name: string; dtype: string }>;
  sample: Array<Record<string, unknown>>;
}

export async function fetchForecast(tenantId?: string): Promise<ForecastResponse> {
  const response = await fetch(buildUrl("/forecast", tenantId), {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }
  return response.json();
}

export async function uploadSalesFile(file: File, tenantId?: string): Promise<UploadSummary> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(buildUrl("/upload", tenantId), {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Failed to upload dataset");
  }

  return response.json();
}

