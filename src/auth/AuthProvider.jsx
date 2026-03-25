// AuthProvider.jsx
// Keeps auth token state in sync with API headers and local storage.

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
 *
 * @param {object} props - Component props.
 * @param {import("react").ReactNode} props.children - Descendant UI that needs auth state.
 * @returns {JSX.Element} The auth context provider.
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => readStoredToken());

  useEffect(() => {
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
      login: (newToken) => setToken(newToken),
      logout: () => setToken(null),
    }),
    [token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
