"use client";

import { ArrowUpRight, Download } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { type ForecastRow } from "@/lib/types";

const statusCopy: Record<ForecastRow["status"], { label: string; variant: "success" | "warning" | "destructive" | "neutral" }> =
  {
    healthy: { label: "healthy", variant: "success" },
    low: { label: "low", variant: "warning" },
    critical: { label: "critical", variant: "destructive" },
  };

type SortKey = keyof Pick<ForecastRow, "sku" | "currentStock" | "forecast" | "recommendedOrder" | "leadTimeDays" | "confidence">;

interface ForecastTableProps {
  rows: ForecastRow[];
}

export function ForecastTable({ rows }: ForecastTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("sku");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedRows = useMemo(() => {
    const sorted = [...rows].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }
      return sortDirection === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });
    return sorted;
  }, [rows, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDirection("asc");
  };

  return (
    <Card className="border-0 bg-card shadow-lg shadow-primary/5">
      <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="text-2xl font-semibold text-foreground">Forecast Report</CardTitle>
          <CardDescription>AI-powered inventory recommendations</CardDescription>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="pill">
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
          <Button variant="outline" size="pill">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-hidden rounded-3xl border border-border/40">
        <div className="max-h-[420px] overflow-auto">
          <table className="w-full min-w-[720px] table-auto">
            <thead className="bg-secondary/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <SortableTh onClick={() => handleSort("sku")} active={sortKey === "sku"} direction={sortDirection}>
                  SKU
                </SortableTh>
                <SortableTh
                  onClick={() => handleSort("currentStock")}
                  active={sortKey === "currentStock"}
                  direction={sortDirection}
                  align="right"
                >
                  Current Stock
                </SortableTh>
                <SortableTh
                  onClick={() => handleSort("forecast")}
                  active={sortKey === "forecast"}
                  direction={sortDirection}
                  align="right"
                >
                  Forecast
                </SortableTh>
                <SortableTh
                  onClick={() => handleSort("recommendedOrder")}
                  active={sortKey === "recommendedOrder"}
                  direction={sortDirection}
                  align="right"
                >
                  Recommended Order
                </SortableTh>
                <SortableTh
                  onClick={() => handleSort("leadTimeDays")}
                  active={sortKey === "leadTimeDays"}
                  direction={sortDirection}
                  align="center"
                >
                  Lead Time (days)
                </SortableTh>
                <SortableTh
                  onClick={() => handleSort("confidence")}
                  active={sortKey === "confidence"}
                  direction={sortDirection}
                  align="center"
                >
                  Confidence
                </SortableTh>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {sortedRows.map((row) => (
                <tr key={row.sku} className="hover:bg-secondary/30">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-foreground">
                    <span>{row.sku}</span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-foreground">
                    {row.currentStock.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium text-primary">
                    {row.forecast.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-semibold text-foreground">
                    {row.recommendedOrder.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-muted-foreground">
                    {row.leadTimeDays}
                  </td>
                  <td className="px-6 py-4 text-center text-sm font-semibold text-success">
                    {Math.round(row.confidence * 100)}%
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Badge variant={statusCopy[row.status].variant}>{statusCopy[row.status].label}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          AI forecast ready — based on your last 12 months of sales.
        </p>
        <Button variant="primary" size="pill">
          Generate Forecast
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

interface SortableThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  active: boolean;
  direction: "asc" | "desc";
  align?: "left" | "center" | "right";
}

function SortableTh({ active, direction, align = "left", children, ...props }: SortableThProps) {
  return (
    <th
      className={cn(
        "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider",
        align === "right" && "text-right",
        align === "center" && "text-center",
        active ? "text-primary" : "text-muted-foreground",
      )}
      {...props}
    >
      <button className="inline-flex items-center gap-2 tracking-wide">
        {children}
        <span className="flex flex-col text-[8px] text-muted-foreground">
          <span className={cn("leading-[0.6rem]", active && direction === "asc" && "text-primary")}>
            ▲
          </span>
          <span className={cn("leading-[0.6rem]", active && direction === "desc" && "text-primary")}>
            ▼
          </span>
        </span>
      </button>
    </th>
  );
}

