export type Trend = "up" | "down" | "neutral";

export interface MetricCard {
  id: string;
  label: string;
  value: string;
  subtitle: string;
  delta: {
    value: string;
    trend: Trend;
  };
  icon: string;
  accent?: "primary" | "success" | "warning" | "info";
}

export interface TimeSeriesPoint {
  label: string;
  historical: number;
  actual: number;
  forecast: number;
}

export interface ForecastRow {
  sku: string;
  currentStock: number;
  forecast: number;
  recommendedOrder: number;
  leadTimeDays: number;
  confidence: number;
  status: "healthy" | "low" | "critical";
}

export interface Insight {
  id: string;
  tone: "positive" | "warning" | "critical";
  message: string;
}

export interface ProcurementItem {
  sku: string;
  supplier: string;
  orderQuantity: number;
  unitCost: number;
  priority: "low" | "medium" | "high";
}

export interface ForecastSettings {
  model: string;
  confidenceThreshold: number;
  horizonDays: number;
  lastUpdated: string;
}

