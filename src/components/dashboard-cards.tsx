import { Activity, Banknote, PackageCheck, UsersRound } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardStats } from "@/services/dashboard.service";

const fallbackStats: DashboardStats = {
  totalMembers: "—",
  activeMembers: "—",
  monthlyRevenue: "—",
  activePackages: "—",
};

function formatCurrency(value: number | string) {
  if (typeof value === "number") {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  return value;
}

export function DashboardCards({
  stats = fallbackStats,
}: {
  stats?: DashboardStats;
}) {
  const cards = [
    {
      title: "Total Members",
      value: stats.totalMembers,
      change: "+12.4%",
      description: "Across all active branches",
      icon: UsersRound,
    },
    {
      title: "Active Members",
      value: stats.activeMembers,
      change: "+8.2%",
      description: "Checked in within 30 days",
      icon: Activity,
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(stats.monthlyRevenue),
      change: "+18.7%",
      description: "Memberships and renewals",
      icon: Banknote,
    },
    {
      title: "Active Packages",
      value: stats.activePackages,
      change: "+3 new",
      description: "Plans currently selling",
      icon: PackageCheck,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((stat, index) => (
        <Card
          key={stat.title}
          className={cn(
            "overflow-hidden",
            index === 2 && "border-primary/30 bg-primary/5",
          )}
        >
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardDescription>{stat.title}</CardDescription>
              <CardTitle className="mt-2 text-2xl">{stat.value}</CardTitle>
            </div>
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <stat.icon className="size-5" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                {stat.change}
              </span>{" "}
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
