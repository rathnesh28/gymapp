import { api, clearAuthToken, setAuthToken } from "@/services/api";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  name?: string;
  mobile?: string;
};

export type AuthUser = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
};

export type AuthResponse = {
  token: string;
  user?: AuthUser;
};

type MaybeWrappedAuthResponse = AuthResponse | { data?: AuthResponse };

function normalizeAuthResponse(data: MaybeWrappedAuthResponse) {
  const payload: AuthResponse | undefined =
    "data" in data && data.data
      ? data.data
      : "token" in data
        ? data
        : undefined;

  if (!payload?.token) {
    throw new Error("Login succeeded but no JWT token was returned.");
  }

  setAuthToken(payload.token);
  return payload;
}

export const authService = {
  async login(payload: LoginPayload) {
    const response = await api.post<AuthResponse | { data: AuthResponse }>(
      "/auth/login",
      payload,
    );

    return normalizeAuthResponse(response.data);
  },

  async register(payload: RegisterPayload) {
    const response = await api.post<AuthResponse | { data: AuthResponse }>(
      "/auth/register",
      payload,
    );

    return normalizeAuthResponse(response.data);
  },

  logout() {
    clearAuthToken();
  },
};
