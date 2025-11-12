"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";

import { DashboardCards } from "@/components/dashboard/dashboard-cards";
import { ForecastChart } from "@/components/dashboard/forecast-chart";
import { ForecastTable } from "@/components/dashboard/forecast-table";
import { AIInsightsPanel } from "@/components/dashboard/ai-insights-panel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDemoContent } from "@/hooks/use-forecast-data";
import { type TimeSeriesPoint } from "@/lib/types";

const rangeMap: Record<string, number> = {
  "3m": 3,
  "6m": 6,
  "12m": 12,
};

export default function DashboardPage() {
  const { metrics, chartSeries, tableRows, insights, settings } = useDemoContent();
  const skuOptions = Object.keys(chartSeries);
  const [selectedSku, setSelectedSku] = useState(skuOptions[0] ?? "");
  const [selectedRange, setSelectedRange] = useState<string>("6m");

  const chartData = useMemo<TimeSeriesPoint[]>(() => {
    const baseSeries = chartSeries[selectedSku] ?? [];
    const limit = rangeMap[selectedRange];
    if (!limit) return baseSeries;
    return baseSeries.slice(-limit);
  }, [chartSeries, selectedSku, selectedRange]);

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary/70">
              Inventory Intelligence
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Welcome back, <span className="text-primary">Alex</span>
            </h1>
            <p className="max-w-xl text-base text-muted-foreground">
              Here&apos;s your inventory intelligence overview for today. Forecast smarter — order with
              confidence.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground md:text-right">
            <span>Last synchronized 12 minutes ago</span>
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle2 className="h-4 w-4" />
              AI forecast ready — based on your last 12 months of sales.
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="pill" className="gap-2 shadow-soft">
            Generate Forecast
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Badge variant="primary" className="uppercase tracking-wide">
            Pilot workspace
          </Badge>
          <span className="text-xs text-muted-foreground">
            Need integrations? Connect Shopify or Odoo from Settings.
          </span>
        </div>
        <DashboardCards metrics={metrics} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
        <ForecastChart
          data={chartData}
          skuOptions={skuOptions}
          selectedSku={selectedSku}
          onSkuChange={setSelectedSku}
          selectedRange={selectedRange}
          onTimeRangeChange={setSelectedRange}
        />
        <div className="flex flex-col gap-6">
          <AIInsightsPanel insights={insights} />
          <Card className="border-0 bg-card/80 shadow-lg shadow-primary/10">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Forecast Settings</CardTitle>
              <CardDescription>Confidence thresholds and model configuration</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Model Type</p>
                <p className="mt-1 text-base font-semibold text-foreground">{settings.model}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Confidence Threshold
                </p>
                <p className="mt-1 text-base font-semibold text-primary">
                  {Math.round(settings.confidenceThreshold * 100)}%
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Horizon</p>
                <p className="mt-1 text-base font-semibold text-foreground">{settings.horizonDays} days</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Last Updated</p>
                <p className="mt-1 text-base font-semibold text-foreground">{settings.lastUpdated}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <ForecastTable rows={tableRows} />
    </div>
  );
}

