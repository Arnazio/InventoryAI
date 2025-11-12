"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type TimeSeriesPoint } from "@/lib/types";

const timeRanges = [
  { label: "3M", value: "3m" },
  { label: "6M", value: "6m" },
  { label: "12M", value: "12m" },
];

interface ForecastChartProps {
  data: TimeSeriesPoint[];
  skuOptions: string[];
  selectedSku: string;
  onSkuChange: (sku: string) => void;
  selectedRange: string;
  onTimeRangeChange: (range: string) => void;
}

export function ForecastChart({
  data,
  skuOptions,
  selectedSku,
  onSkuChange,
  selectedRange,
  onTimeRangeChange,
}: ForecastChartProps) {
  return (
    <Card className="border-0 bg-card shadow-lg shadow-primary/5">
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="text-2xl font-semibold text-foreground">Demand Forecast</CardTitle>
          <CardDescription>Historical vs predicted demand (units)</CardDescription>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex rounded-full border border-border/80 bg-background p-1 shadow-inner">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => onTimeRangeChange(range.value)}
                className={cn(
                  "rounded-full px-4 py-1 text-xs font-semibold transition",
                  selectedRange === range.value
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:bg-secondary/50",
                )}
              >
                {range.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border/70 bg-background px-3 py-2 text-sm shadow-sm">
            <span className="text-muted-foreground">SKU</span>
            <select
              value={selectedSku}
              onChange={(event) => onSkuChange(event.target.value)}
              className="rounded-full bg-transparent text-foreground outline-none"
            >
              {skuOptions.map((sku) => (
                <option key={sku} value={sku}>
                  {sku}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="historical" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#cbd5f5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="forecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} />
            <YAxis tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} />
            <Tooltip
              cursor={{ stroke: "#94a3b8", strokeDasharray: "4 4" }}
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid rgba(148, 163, 184, 0.3)",
                boxShadow: "0 16px 40px -24px rgba(30, 41, 59, 0.25)",
              }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm font-medium text-slate-600">{value}</span>
              )}
            />
            <Area
              type="monotone"
              dataKey="historical"
              name="Historical"
              stroke="#94a3b8"
              fill="url(#historical)"
              strokeWidth={2.4}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="actual"
              name="Actual"
              stroke="#2dd4bf"
              fill="rgba(45,212,191,0.08)"
              strokeWidth={2.4}
              dot={{ r: 3.5, strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="forecast"
              name="Forecast"
              stroke="#3b82f6"
              fill="url(#forecast)"
              strokeDasharray="6 4"
              strokeWidth={2.8}
              dot={{ r: 4, strokeWidth: 1.8 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

