import { api } from "@/services/api";

export type GymPackage = {
  id?: string;
  _id?: string;
  name: string;
  duration?: string;
  duration_days?: number;
  price: number | string;
  members?: number;
  badge?: string;
};

export type AddPackagePayload = {
  name: string;
  duration_days: number;
  price: number | string;
};

export type PackageOption = {
  value: string;
  label: string;
};

function unwrapPackages(
  data: GymPackage[] | { data?: GymPackage[]; packages?: GymPackage[] },
) {
  if (Array.isArray(data)) {
    return data;
  }

  return data.packages ?? data.data ?? [];
}

function normalizePackageOptions(
  data:
    | PackageOption[]
    | GymPackage[]
    | { data?: PackageOption[] | GymPackage[]; packages?: PackageOption[] | GymPackage[] },
) {
  const payload = Array.isArray(data)
    ? data
    : data.packages ?? data.data ?? [];

  return payload.map((item) =>
    "value" in item && "label" in item
      ? item
      : {
          value: item.id ?? item._id ?? item.name,
          label: item.name,
        },
  );
}

export const packageService = {
  async getPackages() {
    const response = await api.get<
      GymPackage[] | { data?: GymPackage[]; packages?: GymPackage[] }
    >("/packages");

    return unwrapPackages(response.data);
  },

  async getPackageOptions() {
    const response = await api.get<
      | PackageOption[]
      | GymPackage[]
      | { data?: PackageOption[] | GymPackage[]; packages?: PackageOption[] | GymPackage[] }
    >("/packages/list");

    return normalizePackageOptions(response.data);
  },

  async addPackage(payload: AddPackagePayload) {
    const response = await api.post<GymPackage | { data: GymPackage }>(
      "/packages/add",
      payload,
    );

    return "data" in response.data ? response.data.data : response.data;
  },
};
