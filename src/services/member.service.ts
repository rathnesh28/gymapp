import { api } from "@/services/api";

export type MemberStatus = "Active" | "Pending" | "Inactive" | string;

export type Member = {
  id?: string;
  _id?: string;
  name: string;
  mobile: string;
  email?: string;
  gender?: string;
  address?: string;
  package?: string;
  packageName?: string;
  joined?: string;
  joinDate?: string;
  status?: MemberStatus;
};

export type AddMemberPayload = {
  name: string;
  mobile: string;
  email?: string;
  gender?: string;
  address?: string;
  package: string;
  joinDate: string;
};

export type UpdateMemberPayload = AddMemberPayload & {
  status?: MemberStatus;
};

function unwrapMembers(data: Member[] | { data?: Member[]; members?: Member[] }) {
  if (Array.isArray(data)) {
    return data;
  }

  return data.members ?? data.data ?? [];
}

export const memberService = {
  async getMembers() {
    const response = await api.get<Member[] | { data?: Member[]; members?: Member[] }>(
      "/members",
    );

    return unwrapMembers(response.data);
  },

  async addMember(payload: AddMemberPayload) {
    const response = await api.post<Member | { data: Member }>(
      "/members/add",
      payload,
    );

    return "data" in response.data ? response.data.data : response.data;
  },

  async updateMember(id: string, payload: UpdateMemberPayload) {
    const response = await api.put<Member | { data: Member }>(
      `/members/${id}`,
      payload,
    );

    return "data" in response.data ? response.data.data : response.data;
  },

  async deleteMember(id: string) {
    const response = await api.delete<{ success?: boolean }>(`/members/${id}`);

    return response.data;
  },
};
