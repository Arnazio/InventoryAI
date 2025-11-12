import { TrendingDown, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type MetricCard } from "@/lib/types";

const accentGradients: Record<NonNullable<MetricCard["accent"]>, string> = {
  primary: "from-primary/15 via-primary/5 to-transparent text-primary",
  success: "from-success/20 via-success/5 to-transparent text-success",
  warning: "from-warning/20 via-warning/5 to-transparent text-warning",
  info: "from-info/25 via-info/10 to-transparent text-info",
};

export function DashboardCards({ metrics }: { metrics: MetricCard[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const isUp = metric.delta.trend === "up";
        return (
          <Card
            key={metric.id}
            className={cn(
              "overflow-hidden border-0 bg-card shadow-md shadow-primary/5 transition hover:-translate-y-0.5 hover:shadow-lg",
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <Badge variant="neutral" className="capitalize">
                  {metric.label}
                </Badge>
                <CardTitle className="mt-3 text-3xl font-semibold text-foreground">
                  {metric.value}
                </CardTitle>
              </div>
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br shadow-sm shadow-slate-300/40",
                  metric.accent ? accentGradients[metric.accent] : "from-secondary to-transparent",
                )}
              >
                <span className="text-xl">{metric.icon}</span>
              </div>
            </CardHeader>
            <CardContent className="mt-4 flex items-end justify-between gap-2">
              <div>
                <CardDescription>{metric.subtitle}</CardDescription>
              </div>
              <div
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
                  isUp ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive",
                )}
              >
                {isUp ? (
                  <TrendingUp className="h-4 w-4" strokeWidth={2} />
                ) : (
                  <TrendingDown className="h-4 w-4" strokeWidth={2} />
                )}
                <span className="tracking-tight">{metric.delta.value}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

