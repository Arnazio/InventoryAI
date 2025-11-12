"use client";

import { useMemo, useState } from "react";

import { ForecastChart } from "@/components/dashboard/forecast-chart";
import { ForecastTable } from "@/components/dashboard/forecast-table";
import { AIInsightsPanel } from "@/components/dashboard/ai-insights-panel";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDemoContent } from "@/hooks/use-forecast-data";
import { type TimeSeriesPoint } from "@/lib/types";

const skuSegments = ["Fast Movers", "Core Catalog", "Seasonal"];

const rangeMap: Record<string, number> = {
  "3m": 3,
  "6m": 6,
  "12m": 12,
};

export default function ForecastsPage() {
  const { chartSeries, tableRows, insights } = useDemoContent();
  const skuOptions = Object.keys(chartSeries);
  const [selectedSku, setSelectedSku] = useState(skuOptions[0] ?? "");
  const [selectedRange, setSelectedRange] = useState<string>("6m");
  const [selectedSegment, setSelectedSegment] = useState<string>("Fast Movers");

  const chartData = useMemo<TimeSeriesPoint[]>(() => {
    const baseSeries = chartSeries[selectedSku] ?? [];
    const limit = rangeMap[selectedRange];
    if (!limit) return baseSeries;
    return baseSeries.slice(-limit);
  }, [chartSeries, selectedSku, selectedRange]);

  return (
    <div className="flex flex-col gap-8">
      <Card className="border-0 bg-card/90 shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-3xl font-semibold text-foreground">Forecast Explorer</CardTitle>
            <CardDescription>
              Dive deeper into SKU demand curves and adjust planning assumptions on the fly.
            </CardDescription>
          </div>
          <div className="flex flex-wrap gap-3">
            {skuSegments.map((segment) => (
              <button
                key={segment}
                onClick={() => setSelectedSegment(segment)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                  selectedSegment === segment
                    ? "border-primary bg-primary text-primary-foreground shadow"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                {segment}
              </button>
            ))}
          </div>
        </CardHeader>
      </Card>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <ForecastChart
          data={chartData}
          skuOptions={skuOptions}
          selectedSku={selectedSku}
          onSkuChange={setSelectedSku}
          selectedRange={selectedRange}
          onTimeRangeChange={setSelectedRange}
        />
        <AIInsightsPanel insights={insights} />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-card/80 px-6 py-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Forecast Scenarios</h2>
            <p className="text-sm text-muted-foreground">
              Simulate best case, expected, and conservative demand — export and share with suppliers.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button size="pill" variant="secondary">
              Save Scenario
            </Button>
            <Button size="pill">Share Report</Button>
          </div>
        </div>
        <ForecastTable rows={tableRows} />
      </section>
    </div>
  );
}

