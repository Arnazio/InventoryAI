"use client";

import { ArrowUpRight, Plug, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const integrations = [
  {
    name: "Shopify",
    description: "Sync orders, products, and inventory adjustments every 15 minutes.",
    status: "Not connected",
  },
  {
    name: "Odoo",
    description: "Pull purchase orders and push replenishment plans automatically.",
    status: "Beta access",
  },
];

const teammates = [
  {
    name: "Alex Morgan",
    email: "alex@forecastai.io",
    role: "Admin",
  },
  {
    name: "Jamie Lee",
    email: "jamie@forecastai.io",
    role: "Planner",
  },
];

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold text-foreground">Workspace Settings</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          Manage integrations, team access, and automation preferences. Connect your live systems when
          you&apos;re ready for pilot mode.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 bg-card/90 shadow-lg shadow-primary/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Plug className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">Integrations</CardTitle>
                <CardDescription>Connect your storefront or ERP to auto-sync data.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {integrations.map((integration) => (
              <div
                key={integration.name}
                className="flex items-center justify-between rounded-3xl border border-border/60 px-5 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{integration.name}</p>
                  <p className="text-xs text-muted-foreground">{integration.description}</p>
                </div>
                <Button variant="outline" size="pill">
                  {integration.status}
                </Button>
              </div>
            ))}
            <Button size="pill" className="self-start">
              Request integration access
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="border-0 bg-card/90 shadow-lg shadow-primary/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">Team Access</CardTitle>
                <CardDescription>Invite teammates and control forecasting permissions.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {teammates.map((member) => (
              <div
                key={member.email}
                className="flex items-center justify-between rounded-3xl border border-border/60 px-5 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
                <Badge variant="primary" className="uppercase tracking-wide">
                  {member.role}
                </Badge>
              </div>
            ))}
            <Button size="pill" variant="secondary" className="self-start">
              Invite teammate
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

