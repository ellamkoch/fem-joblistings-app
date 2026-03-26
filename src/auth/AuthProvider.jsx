// AuthProvider.jsx
// Keeps auth token state in sync with API headers and local storage.
// Login/logout also update the API client immediately so protected requests do not race the next render.

import { useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { setAuthToken, setUnauthorizedHandler } from "@/lib/api/apiClient";
import {
  clearStoredToken,
  readStoredToken,
  writeStoredToken,
} from "./authStorage";

/**
 * Provides auth state and auth actions for the app.
 * Applies token changes immediately to API defaults and storage during login/logout.
 *
 * @param {object} props - Component props.
 * @param {import("react").ReactNode} props.children - Descendant UI that needs auth state.
 * @returns {JSX.Element} The auth context provider.
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => readStoredToken());

  useEffect(() => {
    // Keep derived API/storage state aligned with the current token on initial load and later updates.
    setAuthToken(token);

    if (token) {
      writeStoredToken(token);
    } else {
      clearStoredToken();
    }
  }, [token]);

  useEffect(() => {
    // Clear local auth state if the API client reports an unauthorized response.
    return setUnauthorizedHandler(() => setToken(null));
  }, []);

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      login: (newToken) => {
        // Apply the token immediately so any protected request fired right after login has auth headers.
        setAuthToken(newToken);
        writeStoredToken(newToken);
        setToken(newToken);
      },
      logout: () => {
        // Clear auth state immediately so protected requests stop using stale credentials.
        setAuthToken(null);
        clearStoredToken();
        setToken(null);
      },
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
