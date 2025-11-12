"use client";

import { AlertTriangle, Bot, CheckCircle2, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Insight } from "@/lib/types";

const toneIcon: Record<Insight["tone"], JSX.Element> = {
  critical: <AlertTriangle className="h-4 w-4 text-destructive" />,
  warning: <Lightbulb className="h-4 w-4 text-warning" />,
  positive: <CheckCircle2 className="h-4 w-4 text-success" />,
};

interface AIInsightsPanelProps {
  insights: Insight[];
  onExplain?: () => void;
  isLoading?: boolean;
}

export function AIInsightsPanel({ insights, onExplain, isLoading }: AIInsightsPanelProps) {
  return (
    <Card className="h-full border-0 bg-card shadow-lg shadow-primary/5">
      <CardHeader className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">AI Insights</CardTitle>
            <CardDescription>Real-time intelligence powered by GPT</CardDescription>
          </div>
        </div>
        {onExplain ? (
          <button
            className="self-start rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/40 hover:text-primary"
            onClick={onExplain}
            disabled={isLoading}
          >
            {isLoading ? "Summarizing…" : "Explain forecast"}
          </button>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="flex flex-col gap-3"
        >
          {insights.map((insight) => (
            <motion.li
              key={insight.id}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-gradient-to-br from-white via-slate-50 to-slate-100/60 px-4 py-3 shadow-sm dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
                <span className="mt-1">{toneIcon[insight.tone]}</span>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  {insight.message}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
        <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 px-4 py-3 text-xs text-primary">
          💡 Pro tip: Check back daily for refreshed insights as new sales data flows in.
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-secondary/60 px-4 py-3 text-xs text-muted-foreground">
          <span>Forecast settings • ARIMA + Prophet hybrid</span>
          <Badge variant="primary" className="uppercase tracking-wide">
            Updated 2h ago
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

