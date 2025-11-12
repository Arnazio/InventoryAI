import { useQuery } from "@tanstack/react-query";

import { fetchForecast, type ForecastResponse } from "@/lib/api-client";
import {
  demoForecastRows,
  demoInsights,
  demoMetrics,
  demoProcurementItems,
  demoSeries,
  demoSettings,
} from "@/lib/mock-data";
import {
  type ForecastRow,
  type ForecastSettings,
  type Insight,
  type MetricCard,
  type ProcurementItem,
  type TimeSeriesPoint,
} from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/utils";

export interface ForecastDashboardData {
  metrics: MetricCard[];
  chartSeries: Record<string, TimeSeriesPoint[]>;
  tableRows: ForecastRow[];
  insights: Insight[];
  procurement: ProcurementItem[];
  settings: ForecastSettings;
}

const fallbackData: ForecastDashboardData = {
  metrics: demoMetrics,
  chartSeries: demoSeries,
  tableRows: demoForecastRows,
  insights: demoInsights,
  procurement: demoProcurementItems,
  settings: demoSettings,
};

function toDashboardData(apiResponse: ForecastResponse | null): ForecastDashboardData {
  if (!apiResponse) {
    return fallbackData;
  }

  const metrics: MetricCard[] = [
    { ...demoMetrics[0], value: apiResponse.metrics.stockouts_prevented.toString() },
    { ...demoMetrics[1], value: formatCurrency(apiResponse.metrics.optimal_reorder_value) },
    { ...demoMetrics[2], value: formatPercent(apiResponse.metrics.forecast_accuracy) },
    { ...demoMetrics[3], value: formatPercent(apiResponse.metrics.dead_stock_reduction) },
  ];

  const tableRows: ForecastRow[] = apiResponse.table.map((row) => ({
    sku: row.sku,
    currentStock: row.current_stock,
    forecast: row.forecast,
    recommendedOrder: row.recommended_order,
    leadTimeDays: row.lead_time_days,
    confidence: row.confidence,
    status: row.status,
  }));

  const procurement: ProcurementItem[] = apiResponse.procurement.map((item) => ({
    sku: item.sku,
    supplier: item.supplier,
    orderQuantity: item.order_quantity,
    unitCost: item.unit_cost,
    priority: item.priority,
  }));

  const settings: ForecastSettings = {
    model: apiResponse.settings.model,
    confidenceThreshold: apiResponse.settings.confidence_threshold,
    horizonDays: apiResponse.settings.horizon_days,
    lastUpdated: apiResponse.settings.last_updated,
  };

  return {
    metrics,
    chartSeries: apiResponse.series,
    tableRows,
    insights: apiResponse.insights,
    procurement,
    settings,
  };
}

export function useForecastData(tenantId?: string) {
  const query = useQuery({
    queryKey: ["forecast", tenantId],
    queryFn: () => fetchForecast(tenantId),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });

  const data = query.isError ? fallbackData : toDashboardData(query.data ?? null);

  return {
    ...query,
    data,
    hasLiveData: Boolean(query.data),
  };
}

