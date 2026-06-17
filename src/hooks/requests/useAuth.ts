"use client";

import { useMutation } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import axios from "axios";
import { AUTH_LOGIN_COMPONENT_ID, AUTH_LOGIN_METHOD } from "@/config/primary";
import { apiClient } from "@/lib/apiClient";
import {
  useAuthStore,
  type AuthBrand,
  type AuthRole,
  type AuthSession,
  type AuthUser,
} from "@/store/auth.store";

export type LoginCredentials = {
  identity_key: string;
  auth_secret: string;
};

type LoginEnvelope = {
  success: boolean;
  message: string;
  data?: {
    access_token: string;
    token_expires_at: string;
    user: AuthUser;
    role: AuthRole;
    brands: AuthBrand[];
    component_id: string;
    session_log_id: string;
    session_token: string;
    login_id: string;
    login_defaults: unknown[];
  };
};

const buildSession = (payload: NonNullable<LoginEnvelope["data"]>): AuthSession => ({
  accessToken: payload.access_token,
  tokenExpiresAt: payload.token_expires_at,
  user: payload.user,
  role: payload.role,
  brands: payload.brands,
  componentId: payload.component_id,
  sessionLogId: payload.session_log_id,
  sessionToken: payload.session_token,
  loginId: payload.login_id,
  loginDefaults: payload.login_defaults,
});

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError<LoginEnvelope>(error)) {
    return error.response?.data?.message ?? "Login failed";
  }

  return error instanceof Error ? error.message : "Login failed";
};

export function useLogin() {
  const setSession = useAuthStore((state) => state.actions.setSession);

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await apiClient.post<LoginEnvelope>("/auth/login", {
        ...credentials,
        method: AUTH_LOGIN_METHOD,
        component_id: AUTH_LOGIN_COMPONENT_ID,
      });

      if (!data.success || !data.data) {
        throw new Error(data.message || "Login failed");
      }

      return buildSession(data.data);
    },
    onSuccess: (session) => {
      setSession(session);
    },
    throwOnError: false,
  });
}

export function useLogout() {
  return useAuthStore((state) => state.actions.clearSession);
}

export function useCurrentUser() {
  return useAuthStore((state) => state.user);
}

export function useAuthState() {
  return useAuthStore(useShallow((state) => state));
}

// ---------------------------------------------------------------------------
// useAuth — lightweight auth state reader
// isLoading is true until zustand-persist finishes reading from localStorage,
// preventing premature redirect decisions during SSR/hydration.
// ---------------------------------------------------------------------------
export function useAuth() {
  return useAuthStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
      user: state.user,
      role: state.role,
      brands: state.brands,
      componentId: state.componentId,
      sessionLogId: state.sessionLogId,
      sessionToken: state.sessionToken,
      loginId: state.loginId,
      /** Derived: true once both accessToken and user are present after hydration */
      isAuthenticated: !!state.accessToken && !!state.user,
      /** True while zustand-persist is still reading from localStorage */
      isLoading: !state._hasHydrated,
    }))
  );
}

export { getErrorMessage };
