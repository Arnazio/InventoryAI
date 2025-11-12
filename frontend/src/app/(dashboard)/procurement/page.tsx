"use client";

import { CheckCircle2 } from "lucide-react";

import { POGenerator } from "@/components/procurement/po-generator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useForecastData } from "@/hooks/use-forecast-data";

export default function ProcurementPage() {
  const { data } = useForecastData();

  return (
    <div className="flex flex-col gap-8">
      <Card className="border-0 bg-card/90 shadow-lg shadow-primary/10">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-3xl font-semibold text-foreground">
              Procurement Planner
            </CardTitle>
            <CardDescription>
              Convert forecasts into purchase orders. Prioritize suppliers and keep cash flow balanced.
            </CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <Badge variant="primary">Workflow beta</Badge>
            <span className="inline-flex items-center gap-2 text-success">
              <CheckCircle2 className="h-4 w-4" />
              Supplier availability synced
            </span>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            Recommendations factor in lead times, carrying costs, and your safety stock targets. Export
            directly or send to your ERP with a single click.
          </p>
        </CardContent>
      </Card>

      <POGenerator items={data.procurement} />
    </div>
  );
}

