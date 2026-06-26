"use client";

import { Crown } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function UpgradePage() {
  return (
    <AppShell>
    <div className="mx-auto max-w-5xl space-y-8">
  
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Upgrade Plan
        </h1>
  
        <p className="mt-2 text-muted-foreground">
          Unlock premium features and scale your gym business with Gym SaaS Pro.
        </p>
      </div>
  
      <Card className="overflow-hidden border-2">
        <div className="bg-primary/5 p-8">
          <div className="flex flex-col items-center text-center">
  
            <div className="mb-4 flex h-16 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Crown className="h-8 w-12" />
            </div>
  
            <h2 className="text-3xl font-bold">
              Gym SaaS Pro
            </h2>
  
            <p className="mt-2 text-muted-foreground">
              Everything you need to run and grow your gym.
            </p>
  
            <div className="mt-6 mb-2">
              <span className="text-5xl font-bold">₹999</span>
              <span className="text-lg text-muted-foreground">
                /month
              </span>
            </div>
  
            <Button size="lg" className="mt-8">
              Upgrade Now
            </Button>
  
          </div>
        </div>
  
        <CardContent className="p-8">
  
          <div className="grid gap-4 md:grid-cols-2">
  
            <div className="rounded-lg border p-4">
              ✓ Unlimited Members
            </div>
  
            <div className="rounded-lg border p-4">
              ✓ Unlimited Packages
            </div>
  
            <div className="rounded-lg border p-4">
              ✓ Payment Tracking
            </div>
  
            <div className="rounded-lg border p-4">
              ✓ Reports & Analytics
            </div>
  
            <div className="rounded-lg border p-4">
              ✓ Staff Management
            </div>
  
            <div className="rounded-lg border p-4">
              ✓ Priority Support
            </div>
  
          </div>
  
        </CardContent>
      </Card>
  
    </div>
  </AppShell>
  );
}