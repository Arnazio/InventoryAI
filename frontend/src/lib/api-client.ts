import { ForecastRow, Insight, TimeSeriesPoint } from "@/lib/types";

export interface ForecastResponse {
  metrics: {
    stockoutsPrevented: number;
    optimalReorderValue: number;
    forecastAccuracy: number;
    deadStockReduction: number;
  };
  series: Record<string, TimeSeriesPoint[]>;
  table: ForecastRow[];
  insights: Insight[];
}

export async function fetchForecast(tenantId?: string): Promise<ForecastResponse> {
  const url = tenantId ? `/api/forecast?tenant=${tenantId}` : "/api/forecast";
  const response = await fetch(url, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch forecast data");
  }
  return response.json();
}

export async function uploadSalesFile(file: File, tenantId?: string): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);
  if (tenantId) {
    formData.append("tenant", tenantId);
  }

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to upload dataset");
  }
}

