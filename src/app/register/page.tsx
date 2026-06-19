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

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await authService.register({
        name,
        email,
        password,
      });

      router.push("/dashboard");
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="grid min-h-dvh bg-background lg:grid-cols-[1.1fr_0.9fr]">
      {/* LEFT SIDE */}
      <section className="relative hidden overflow-hidden border-r bg-muted/40 p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--color-primary)_0,transparent_28%),radial-gradient(circle_at_80%_0%,var(--color-chart-2)_0,transparent_24%)] opacity-20" />

        <Link href="/" className="relative flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Dumbbell className="size-5" />
          </div>
          <div>
            <p className="font-semibold">FitCore</p>
            <p className="text-sm text-muted-foreground">
              Gym Management SaaS
            </p>
          </div>
        </Link>

        <div className="relative max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Start your gym SaaS journey
          </p>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight">
            Manage members, payments & growth in one place.
          </h1>

          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Create your gym account and start tracking memberships, packages,
            and revenue in minutes.
          </p>
        </div>

        <div className="relative grid grid-cols-3 gap-3 text-sm">
          {["Fast setup", "Smart dashboard", "Live tracking"].map((item) => (
            <div
              key={item}
              className="rounded-xl border bg-card/70 p-4 shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="flex items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground lg:hidden">
              <Dumbbell className="size-6" />
            </div>

            <CardTitle className="text-2xl">Create account</CardTitle>
            <CardDescription>
              Start managing your gym in minutes.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              {error ? (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              ) : null}

              {/* NAME */}
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Gym Owner Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="owner@fitcore.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* TERMS */}
              <div className="flex items-center gap-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to terms and conditions
                </Label>
              </div>

              {/* BUTTON */}
              <Button className="mt-2 w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Register"}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="ml-1 text-primary hover:underline">
              Login
            </Link>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}