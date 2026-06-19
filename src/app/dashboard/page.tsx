"use client";

import { useEffect, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { DashboardCards } from "@/components/dashboard-cards";
import { MembersTable } from "@/components/members-table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getApiErrorMessage } from "@/services/api";
import {
  dashboardService,
  type DashboardData,
  type DashboardPayment,
} from "@/services/dashboard.service";

function formatAmount(value: number | string) {
  if (typeof value === "number") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  return value;
}

function paymentKey(payment: DashboardPayment, index: number) {
  return payment.id ?? payment.invoice ?? `${payment.memberName ?? payment.member}-${index}`;
}

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      setIsLoading(true);
      setError("");

      try {
        const data = await dashboardService.getDashboard();

        if (isMounted) {
          setDashboard(data);
        }
      } catch (dashboardError) {
        if (isMounted) {
          setError(getApiErrorMessage(dashboardError));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="outline" className="mb-3">
              Live API Dashboard
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Track members, revenue, packages, and recent activity.
            </p>
          </div>
        </div>

        {error ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="h-36 animate-pulse bg-muted/40" />
            ))}
          </div>
        ) : (
          <DashboardCards stats={dashboard?.stats} />
        )}

        <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Recent Members</CardTitle>
              <CardDescription>
                Latest members returned by the dashboard API.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                  Loading recent members...
                </div>
              ) : (
                <MembersTable members={dashboard?.recentMembers ?? []} />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>
                Payment records returned by the dashboard API.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                  Loading recent payments...
                </div>
              ) : (dashboard?.recentPayments ?? []).length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                  No recent payments found.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Member</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(dashboard?.recentPayments ?? []).map((payment, index) => (
                      <TableRow key={paymentKey(payment, index)}>
                        <TableCell className="font-mono text-xs">
                          {payment.invoice ?? "—"}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">
                            {payment.memberName ?? payment.member ?? "—"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {payment.packageName ?? payment.package ?? "—"}
                          </div>
                        </TableCell>
                        <TableCell>{formatAmount(payment.amount)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              payment.status === "Paid" ? "success" : "warning"
                            }
                          >
                            {payment.status ?? "Pending"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
