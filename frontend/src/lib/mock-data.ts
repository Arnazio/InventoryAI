import {
  type ForecastRow,
  type ForecastSettings,
  type Insight,
  type MetricCard,
  type ProcurementItem,
  type TimeSeriesPoint,
} from "@/lib/types";

export const demoMetrics: MetricCard[] = [
  {
    id: "stockouts-prevented",
    label: "Stockouts Prevented",
    value: "24",
    subtitle: "this month",
    delta: { value: "↑ 15% vs last month", trend: "up" },
    icon: "📦",
    accent: "success",
  },
  {
    id: "optimal-reorder-value",
    label: "Optimal Reorder Value",
    value: "€12,450",
    subtitle: "recommended",
    delta: { value: "↓ 8% vs last month", trend: "down" },
    icon: "€",
    accent: "info",
  },
  {
    id: "forecast-accuracy",
    label: "Forecast Accuracy",
    value: "89%",
    subtitle: "avg. confidence",
    delta: { value: "↑ 4% vs last month", trend: "up" },
    icon: "🎯",
    accent: "primary",
  },
  {
    id: "dead-stock-reduction",
    label: "Dead Stock Reduction",
    value: "32%",
    subtitle: "vs last quarter",
    delta: { value: "↑ 12% vs last month", trend: "up" },
    icon: "📉",
    accent: "success",
  },
];

export const demoSeries: Record<string, TimeSeriesPoint[]> = {
  "SKU-B12": [
    { label: "Jan", historical: 112, actual: 118, forecast: 130 },
    { label: "Feb", historical: 128, actual: 133, forecast: 148 },
    { label: "Mar", historical: 142, actual: 149, forecast: 162 },
    { label: "Apr", historical: 158, actual: 164, forecast: 176 },
    { label: "May", historical: 172, actual: 181, forecast: 190 },
    { label: "Jun", historical: 183, actual: 193, forecast: 205 },
    { label: "Jul", historical: 192, actual: 207, forecast: 214 },
    { label: "Aug", historical: 201, actual: 216, forecast: 222 },
  ],
  "SKU-A04": [
    { label: "Jan", historical: 320, actual: 330, forecast: 342 },
    { label: "Feb", historical: 338, actual: 341, forecast: 356 },
    { label: "Mar", historical: 350, actual: 355, forecast: 370 },
    { label: "Apr", historical: 362, actual: 366, forecast: 385 },
    { label: "May", historical: 376, actual: 382, forecast: 402 },
    { label: "Jun", historical: 388, actual: 395, forecast: 417 },
    { label: "Jul", historical: 404, actual: 410, forecast: 432 },
    { label: "Aug", historical: 416, actual: 424, forecast: 446 },
  ],
};

export const demoForecastRows: ForecastRow[] = [
  {
    sku: "SKU-B12",
    currentStock: 85,
    forecast: 245,
    recommendedOrder: 180,
    leadTimeDays: 7,
    confidence: 0.92,
    status: "critical",
  },
  {
    sku: "SKU-A04",
    currentStock: 340,
    forecast: 410,
    recommendedOrder: 120,
    leadTimeDays: 5,
    confidence: 0.88,
    status: "healthy",
  },
  {
    sku: "SKU-C31",
    currentStock: 120,
    forecast: 185,
    recommendedOrder: 85,
    leadTimeDays: 10,
    confidence: 0.85,
    status: "low",
  },
  {
    sku: "SKU-D22",
    currentStock: 450,
    forecast: 520,
    recommendedOrder: 100,
    leadTimeDays: 7,
    confidence: 0.9,
    status: "healthy",
  },
  {
    sku: "SKU-E15",
    currentStock: 65,
    forecast: 220,
    recommendedOrder: 175,
    leadTimeDays: 14,
    confidence: 0.87,
    status: "critical",
  },
];

export const demoInsights: Insight[] = [
  {
    id: "insight-1",
    tone: "critical",
    message:
      "SKU-B12 is trending 25% above baseline due to seasonal uplift. Recommended reorder: +180 units to avoid stockout.",
  },
  {
    id: "insight-2",
    tone: "warning",
    message:
      "SKU-A04 shows consistent weekly demand. Reorder in smaller batches to maintain cash flow while staying in stock.",
  },
  {
    id: "insight-3",
    tone: "positive",
    message:
      "Forecast accuracy improved to 89% this month. Your inventory strategy is performing well — keep monitoring fast movers weekly.",
  },
];

export const demoSettings: ForecastSettings = {
  model: "Prophet + ARIMA ensemble",
  confidenceThreshold: 0.85,
  horizonDays: 60,
  lastUpdated: "2 hours ago",
};

export const demoProcurementItems: ProcurementItem[] = [
  {
    sku: "SKU-B12",
    supplier: "Supplier A",
    orderQuantity: 180,
    unitCost: 24.5,
    priority: "high",
  },
  {
    sku: "SKU-E15",
    supplier: "Supplier B",
    orderQuantity: 175,
    unitCost: 18.75,
    priority: "high",
  },
  {
    sku: "SKU-A04",
    supplier: "Supplier A",
    orderQuantity: 120,
    unitCost: 32,
    priority: "medium",
  },
  {
    sku: "SKU-D22",
    supplier: "Supplier C",
    orderQuantity: 100,
    unitCost: 15.5,
    priority: "medium",
  },
];

