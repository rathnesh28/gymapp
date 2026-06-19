"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  CreditCard,
  Dumbbell,
  LayoutDashboard,
  Package,
  PlusCircle,
  UsersRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Members", href: "/members", icon: UsersRound },
  { name: "Add Member", href: "/members/add", icon: PlusCircle },
  { name: "Packages", href: "/packages", icon: Package },
  { name: "Payments", href: "/dashboard", icon: CreditCard },
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "hidden border-r bg-sidebar text-sidebar-foreground lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-72 lg:flex-col",
        className,
      )}
    >
      <SidebarContent />
    </aside>
  );
}

export function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex min-h-full flex-col gap-6 px-4 py-5">
      <Link href="/dashboard" className="flex items-center gap-3 px-2">
        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <Dumbbell className="size-5" />
        </div>
        <div>
          <p className="text-base font-semibold tracking-tight">FitCore</p>
          <p className="text-xs text-muted-foreground">Gym Management SaaS</p>
        </div>
      </Link>

      <div className="rounded-xl border bg-card/70 p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Current Plan</p>
            <p className="text-sm font-semibold">Pro Studio</p>
          </div>
          <Badge variant="success">Live</Badge>
        </div>
        <Separator className="my-3" />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Activity className="size-3.5 text-primary" />
          92% member retention this month
        </div>
      </div>

      <nav className="grid gap-1">
        {navigation.map((item) => (
          <Button
            asChild
            key={item.name}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "h-10 justify-start px-3",
              pathname === item.href &&
                "bg-sidebar-accent text-sidebar-accent-foreground",
            )}
          >
            <Link href={item.href}>
              <item.icon className="size-4" />
              {item.name}
            </Link>
          </Button>
        ))}
      </nav>

      <div className="mt-auto rounded-xl border bg-gradient-to-br from-primary/15 via-card to-card p-4">
        <p className="text-sm font-semibold">Need more branches?</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Upgrade your workspace to manage multi-location fitness chains.
        </p>
        <Button size="sm" className="mt-4 w-full">
          Upgrade
        </Button>
      </div>
    </div>
  );
}
