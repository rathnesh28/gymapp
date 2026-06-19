"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dumbbell } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getApiErrorMessage } from "@/services/api";
import { authService } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await authService.login({ email, password });
      router.push("/dashboard");
    } catch (loginError) {
      setError(getApiErrorMessage(loginError));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="grid min-h-dvh bg-background lg:grid-cols-[1.1fr_0.9fr]">
      <section className="relative hidden overflow-hidden border-r bg-muted/40 p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--color-primary)_0,transparent_28%),radial-gradient(circle_at_80%_0%,var(--color-chart-2)_0,transparent_24%)] opacity-20" />
        <Link href="/dashboard" className="relative flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Dumbbell className="size-5" />
          </div>
          <div>
            <p className="font-semibold">FitCore</p>
            <p className="text-sm text-muted-foreground">Gym Management SaaS</p>
          </div>
        </Link>
        <div className="relative max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Modern fitness operations
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight">
            Run memberships, packages, and payments from one calm command center.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            A premium dashboard experience for gyms, trainers, and fitness
            studios that want cleaner data and faster decisions.
          </p>
        </div>
        <div className="relative grid grid-cols-3 gap-3 text-sm">
          {["1.2k members", "₹8.4L revenue", "14 packages"].map((item) => (
            <div key={item} className="rounded-xl border bg-card/70 p-4 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground lg:hidden">
              <Dumbbell className="size-6" />
            </div>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Sign in to manage your gym operations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              {error ? (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              ) : null}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="owner@fitcore.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me for 30 days
                </Label>
              </div>
              <Button className="mt-2 w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center text-sm text-muted-foreground">
            Uses JWT authentication from http://localhost:5000/api.
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
