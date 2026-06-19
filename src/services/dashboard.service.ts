import { api } from "@/services/api";
import type { Member } from "@/services/member.service";

export type DashboardPayment = {
  id?: string;
  invoice?: string;
  member?: string;
  memberName?: string;
  package?: string;
  packageName?: string;
  amount: number | string;
  status?: string;
};

export type DashboardStats = {
  totalMembers: number | string;
  activeMembers: number | string;
  monthlyRevenue: number | string;
  activePackages: number | string;
};

export type DashboardData = {
  stats: DashboardStats;
  recentMembers: Member[];
  recentPayments: DashboardPayment[];
};

const defaultDashboard: DashboardData = {
  stats: {
    totalMembers: 0,
    activeMembers: 0,
    monthlyRevenue: 0,
    activePackages: 0,
  },
  recentMembers: [],
  recentPayments: [],
};

type MaybeWrappedDashboard = Partial<DashboardData> | { data?: Partial<DashboardData> };

function normalizeDashboard(data: MaybeWrappedDashboard) {
  const payload: Partial<DashboardData> | undefined =
    "data" in data && data.data ? data.data : "stats" in data ? data : undefined;

  return {
    stats: {
      ...defaultDashboard.stats,
      ...(payload?.stats ?? {}),
    },
    recentMembers: payload?.recentMembers ?? [],
    recentPayments: payload?.recentPayments ?? [],
  };
}

export const dashboardService = {
  async getDashboard() {
    const response = await api.get<Partial<DashboardData> | { data: Partial<DashboardData> }>(
      "/dashboard",
    );

    return normalizeDashboard(response.data);
  },
};
