"use client";

import { useEffect, useState } from "react";
import { CalendarDays, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getApiErrorMessage } from "@/services/api";
import {
  packageService,
  type AddPackagePayload,
  type GymPackage,
} from "@/services/package.service";

function formatPrice(value: number | string) {
  const numericValue = typeof value === "number" ? value : Number(value);

  if (!Number.isNaN(numericValue)) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(numericValue);
  }

  return String(value);
}

function formatDuration(plan: GymPackage) {
  if (typeof plan.duration_days === "number") {
    return `${plan.duration_days} Days`;
  }

  return plan.duration ?? "—";
}

function resolvePackageId(plan: GymPackage) {
  return plan.id ?? plan._id ?? plan.name;
}



export function PackagesGrid() {

  const [packages, setPackages] = useState<GymPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [price, setPrice] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | string | null>(null);


  function openEdit(plan: GymPackage) {
  
    setEditingId(resolvePackageId(plan));
  
    setName(plan.name);
    setDurationDays(String(plan.duration_days));
    setPrice(String(plan.price));
  
    setOpen(true);
  }

  
  useEffect(() => {
    let isMounted = true;

    async function loadPackages() {
      setIsLoading(true);
      setError("");

      try {
        const data = await packageService.getPackages();

        if (isMounted) {
          setPackages(data);
        }
      } catch (loadError) {
        if (isMounted) {
          setError(getApiErrorMessage(loadError));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadPackages();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setSubmitError("");

    try {
      const payload: AddPackagePayload = {
        name,
        duration_days: Number(durationDays),
        price,
      };

      if (editingId) {
        await packageService.updatePackage(
          editingId,
          payload
        );
      } else {
        await packageService.addPackage(
          payload
        );
      }

      const updatedPackages = await packageService.getPackages();


      setPackages(updatedPackages);
      setOpen(false);
      setName("");
      setDurationDays("");
      setPrice("");
    } catch (saveError) {
      setSubmitError(getApiErrorMessage(saveError));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string | number) {

    try {
 
       await packageService.deletePackage(id);
 
       setPackages((current) =>
          current.filter(
             (pkg) => resolvePackageId(pkg) !== id
          )
       );
 
    } catch (error) {
       console.error(error);
    }
 
 }
 

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Packages</h1>
          <p className="text-sm text-muted-foreground">
            Manage plans, pricing, and renewals for your gym.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
          <Button
  onClick={() => {
    setEditingId(null);
    setName("");
    setDurationDays("");
    setPrice("");
    setOpen(true);
  }}
>
  <Plus className="size-4" />
  Add Package
</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
            <DialogTitle>
  {editingId ? "Edit Package" : "Add Package"}
</DialogTitle>
              <DialogDescription>
                Create a new package using the backend add route.
              </DialogDescription>
            </DialogHeader>

            <form className="grid gap-4" onSubmit={handleSubmit}>
              {submitError ? (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {submitError}
                </div>
              ) : null}

              <div className="grid gap-2">
                <Label htmlFor="package-name">Package name</Label>
                <Input
                  id="package-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Transformation 12 Week"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="package-duration">Duration</Label>
                <Input
                  id="package-duration"
                  type="number"
                  min="1"
                  value={durationDays}
                  onChange={(event) => setDurationDays(event.target.value)}
                  placeholder="84"
                />
                <p className="text-xs text-muted-foreground">Enter number of days.</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="package-price">Price</Label>
                <Input
                  id="package-price"
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                  placeholder="9999"
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                {isSaving
  ? "Saving..."
  : editingId
  ? "Update Package"
  : "Save Package"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="h-52 animate-pulse bg-muted/40" />
          ))}
        </div>
      ) : packages.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          No packages found.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((plan, index) => (
            <Card
              key={`${resolvePackageId(plan)}-${index}`}
              className="relative overflow-hidden"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <Badge variant="outline">{plan.badge ?? "Package"}</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="-mr-2 -mt-2">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">Open package actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openEdit(plan)}>
                        <Pencil className="size-4"  />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">
                        <Trash2 className="size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  {formatDuration(plan)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold tracking-tight">
                  {formatPrice(plan.price)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {plan.members ?? 0} members currently subscribed
                </p>
              </CardContent>
              <CardFooter className="gap-2">
              
              <Button
  variant="outline"
  className="flex-1"
  onClick={() => openEdit(plan)}
>
  Edit
</Button>
                <Button
  variant="ghost"
  className="flex-1 text-destructive"
  onClick={() => handleDelete(resolvePackageId(plan))}
>
  Delete
</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
