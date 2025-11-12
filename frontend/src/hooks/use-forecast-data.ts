import { useQuery } from "@tanstack/react-query";

import { fetchForecast } from "@/lib/api-client";
import {
  demoForecastRows,
  demoInsights,
  demoMetrics,
  demoProcurementItems,
  demoSeries,
  demoSettings,
} from "@/lib/mock-data";

export function useForecastData(tenantId?: string) {
  return useQuery({
    queryKey: ["forecast", tenantId],
    queryFn: async () => {
      try {
        return await fetchForecast(tenantId);
      } catch (error) {
        console.warn("Falling back to demo forecast data", error);
        return {
          metrics: {
            stockoutsPrevented: 24,
            optimalReorderValue: 12450,
            forecastAccuracy: 0.89,
            deadStockReduction: 0.32,
          },
          series: demoSeries,
          table: demoForecastRows,
          insights: demoInsights,
        };
      }
    },
    staleTime: 1000 * 60 * 10,
  });
}

export function useDemoContent() {
  return {
    metrics: demoMetrics,
    chartSeries: demoSeries,
    tableRows: demoForecastRows,
    insights: demoInsights,
    procurement: demoProcurementItems,
    settings: demoSettings,
  };
}

