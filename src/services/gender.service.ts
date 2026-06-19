import { api } from "@/services/api";

export type GenderOption = {
  value: string;
  label: string;
};

function normalizeGenderOptions(
  data:
    | GenderOption[]
    | { data?: GenderOption[]; genders?: GenderOption[] }
    | Array<{ value?: string; label?: string; name?: string }>,
) : GenderOption[] {
  const payload = Array.isArray(data) ? data : data.genders ?? data.data ?? [];

  return payload
    .map((item) =>
      "value" in item && "label" in item
        ? { value: item.value ?? "", label: item.label ?? "" }
        : {
            value: item.value ?? item.name ?? item.label ?? "",
            label: item.label ?? item.name ?? item.value ?? "",
          },
    )
    .filter((item): item is GenderOption => Boolean(item.value && item.label));
}

export const genderService = {
  async getGenderOptions() {
    const response = await api.get<
      | GenderOption[]
      | { data?: GenderOption[]; genders?: GenderOption[] }
      | Array<{ value?: string; label?: string; name?: string }>
    >("/members/gender/list");

    return normalizeGenderOptions(response.data);
  },
};
