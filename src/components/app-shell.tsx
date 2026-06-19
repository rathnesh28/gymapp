import { AuthGuard } from "@/components/auth-guard";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-dvh bg-background">
        <Sidebar />
        <Navbar />
        <main className="px-4 py-6 sm:px-6 lg:ml-72 lg:px-8">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </AuthGuard>
  );
}
