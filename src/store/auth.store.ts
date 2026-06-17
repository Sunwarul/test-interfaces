import { create } from "zustand";
import { persist } from "zustand/middleware";

// ---------------------------------------------------------------------------
// Cookie helpers — keep middleware (proxy.ts) in sync with Zustand state.
// The middleware reads "authToken" and "authUserId" on every request to
// decide whether the user is authenticated before React even hydrates.
// ---------------------------------------------------------------------------
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function setAuthCookies(token: string, userId: string) {
    if (typeof document === "undefined") return;
    document.cookie = `authToken=${token}; path=/; max-age=${AUTH_COOKIE_MAX_AGE}; SameSite=Lax`;
    document.cookie = `authUserId=${userId}; path=/; max-age=${AUTH_COOKIE_MAX_AGE}; SameSite=Lax`;
}

function clearAuthCookies() {
    if (typeof document === "undefined") return;
    document.cookie = "authToken=; path=/; max-age=0";
    document.cookie = "authUserId=; path=/; max-age=0";
}

export type AuthUser = {
    id: string;
    name: string | null;
    email: string;
};

export type AuthRole = {
    id: string;
    name: string;
};

export type AuthBrand = {
    id: string;
    name: string;
    slug: string | null;
};

export type AuthSession = {
    accessToken: string;
    tokenExpiresAt: string;
    user: AuthUser;
    role: AuthRole;
    brands: AuthBrand[];
    componentId: string;
    sessionLogId: string;
    sessionToken: string;
    loginId: string;
    loginDefaults: unknown[];
};

type AuthState = {
    accessToken: string | null;
    tokenExpiresAt: string | null;
    user: AuthUser | null;
    role: AuthRole | null;
    brands: AuthBrand[];
    componentId: string | null;
    sessionLogId: string | null;
    sessionToken: string | null;
    loginId: string | null;
    loginDefaults: unknown[];
    /** True once zustand-persist has finished reading from localStorage */
    _hasHydrated: boolean;
    actions: {
        setSession: (session: AuthSession) => void;
        clearSession: () => void;
        setHasHydrated: (value: boolean) => void;
    };
};

// _hasHydrated and actions are runtime-only — never persisted to localStorage
type PersistedAuthState = Omit<AuthState, "actions" | "_hasHydrated">;

const initialState: PersistedAuthState = {
    accessToken: null,
    tokenExpiresAt: null,
    user: null,
    role: null,
    brands: [],
    componentId: null,
    sessionLogId: null,
    sessionToken: null,
    loginId: null,
    loginDefaults: [],
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            ...initialState,
            _hasHydrated: false,
            actions: {
                setSession: (session) => {
                    setAuthCookies(session.accessToken, session.user.id);
                    set({
                        accessToken: session.accessToken,
                        tokenExpiresAt: session.tokenExpiresAt,
                        user: session.user,
                        role: session.role,
                        brands: session.brands,
                        componentId: session.componentId,
                        sessionLogId: session.sessionLogId,
                        sessionToken: session.sessionToken,
                        loginId: session.loginId,
                        loginDefaults: session.loginDefaults,
                    });
                },
                clearSession: () => {
                    clearAuthCookies();
                    set(initialState);
                },
                setHasHydrated: (value) => set({ _hasHydrated: value }),
            },
        }),
        {
            name: "auth-storage",
            // _hasHydrated is runtime-only — never write it to localStorage
            partialize: (state) => ({
                accessToken: state.accessToken,
                tokenExpiresAt: state.tokenExpiresAt,
                user: state.user,
                role: state.role,
                brands: state.brands,
                componentId: state.componentId,
                sessionLogId: state.sessionLogId,
                sessionToken: state.sessionToken,
                loginId: state.loginId,
                loginDefaults: state.loginDefaults,
            }),
            merge: (persistedState, currentState) => ({
                ...currentState,
                ...(persistedState as Partial<AuthState>),
                // preserve runtime-only fields and actions from currentState
                _hasHydrated: false,
                actions: currentState.actions,
            }),
            onRehydrateStorage: () => (state) => {
                if (!state) {
                    // Rehydration failed — still mark done so UI doesn't hang
                    useAuthStore.getState().actions.setHasHydrated(true);
                    return;
                }
                // Always mark hydration complete so consumers unblock
                state.actions.setHasHydrated(true);
            },
        },
    ),
);