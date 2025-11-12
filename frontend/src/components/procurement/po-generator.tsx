"use client";

import { Download, ShoppingCart, Truck } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { type ProcurementItem } from "@/lib/types";

interface POGeneratorProps {
  items: ProcurementItem[];
}

const priorityBadge: Record<ProcurementItem["priority"], { label: string; variant: "success" | "warning" | "destructive" | "neutral" }> =
  {
    low: { label: "low", variant: "neutral" },
    medium: { label: "medium", variant: "warning" },
    high: { label: "high", variant: "destructive" },
  };

export function POGenerator({ items }: POGeneratorProps) {
  const [selectedSkus, setSelectedSkus] = useState(() => new Set(items.map((item) => item.sku)));

  const totals = useMemo(() => {
    const filtered = items.filter((item) => selectedSkus.has(item.sku));
    const totalUnits = filtered.reduce((sum, item) => sum + item.orderQuantity, 0);
    const totalValue = filtered.reduce((sum, item) => sum + item.orderQuantity * item.unitCost, 0);
    return { totalUnits, totalValue, totalItems: filtered.length };
  }, [items, selectedSkus]);

  const toggleSku = (sku: string) => {
    setSelectedSkus((prev) => {
      const next = new Set(prev);
      if (next.has(sku)) {
        next.delete(sku);
      } else {
        next.add(sku);
      }
      return next;
    });
  };

  return (
    <Card className="border-0 bg-card shadow-lg shadow-primary/5">
      <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Truck className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold text-foreground">Procurement Planner</CardTitle>
            <CardDescription>Review and generate optimized purchase orders</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Badge variant="primary">Autopilot ready</Badge>
          <span>Lead times accounted for</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="overflow-hidden rounded-3xl border border-border/60">
          <table className="w-full table-auto">
            <thead className="bg-secondary/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-6 py-4 text-left">SKU</th>
                <th className="px-6 py-4 text-left">Supplier</th>
                <th className="px-6 py-4 text-right">Order Qty</th>
                <th className="px-6 py-4 text-right">Unit Cost</th>
                <th className="px-6 py-4 text-right">Total</th>
                <th className="px-6 py-4 text-right">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {items.map((item) => {
                const isSelected = selectedSkus.has(item.sku);
                return (
                  <tr key={item.sku} className={isSelected ? "bg-primary/5" : undefined}>
                    <td className="px-6 py-4 text-sm font-semibold text-foreground">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="h-5 w-5 rounded border-border text-primary focus:ring-primary"
                          checked={isSelected}
                          onChange={() => toggleSku(item.sku)}
                        />
                        {item.sku}
                      </label>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{item.supplier}</td>
                    <td className="px-6 py-4 text-right text-sm font-semibold">{item.orderQuantity}</td>
                    <td className="px-6 py-4 text-right text-sm">{formatCurrency(item.unitCost)}</td>
                    <td className="px-6 py-4 text-right text-sm font-semibold">
                      {formatCurrency(item.unitCost * item.orderQuantity)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Badge variant={priorityBadge[item.priority].variant}>
                        {priorityBadge[item.priority].label}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 rounded-b-3xl bg-secondary/40 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground/80">Total Items</p>
            <p className="text-base font-semibold text-foreground">{totals.totalItems} SKUs</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground/80">Total Units</p>
            <p className="text-base font-semibold text-foreground">{totals.totalUnits}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground/80">Total Value</p>
            <p className="text-base font-semibold text-primary">
              {formatCurrency(totals.totalValue)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="pill">
            <Download className="mr-2 h-4 w-4" />
            Export List
          </Button>
          <Button size="pill" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Generate Purchase Order
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

