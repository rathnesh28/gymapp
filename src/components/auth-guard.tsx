"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";

import { getAuthToken } from "@/services/api";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isClient = useIsClient();
  const token = isClient ? getAuthToken() : null;

  useEffect(() => {
    if (isClient && !token && pathname !== "/login") {
      router.replace("/login");
    }
  }, [isClient, pathname, router, token]);

  if (pathname !== "/login" && !isClient) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <div className="rounded-xl border bg-card px-5 py-4 text-sm text-muted-foreground shadow-sm">
          Checking authentication...
        </div>
      </div>
    );
  }

  if (pathname !== "/login" && !token) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <div className="rounded-xl border bg-card px-5 py-4 text-sm text-muted-foreground shadow-sm">
          Checking authentication...
        </div>
      </div>
    );
  }

  return children;
}
