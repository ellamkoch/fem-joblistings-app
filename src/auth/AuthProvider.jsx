/**  AuthProvider.jsx
* Keeps auth token state in sync with API headers and local storage.
* Login/logout also update the API client immediately so protected requests do not race the next render.
*/

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
 Key responsibilities:
 * - Restore token from storage on app load
 * - Apply token to API client immediately (prevents request race conditions)
 * - Keep token synchronized between memory, storage, and API headers
 * - Handle login/logout flows cleanly
 *
 * @param {object} props - Component props.
 * @param {import("react").ReactNode} props.children - Descendant UI that needs auth state.
 * @returns {JSX.Element} The auth context provider.
 */

export function AuthProvider({ children }) {
  /**  Initialize token from storage on first render. IMPORTANT: We also immediately apply it to the API client
  * so that any request fired during initial render has auth headers. */
  const [token, setToken] = useState(() => {
    const storedToken = readStoredToken();
    setAuthToken(storedToken); // prevents "refresh logout" race condition
    return storedToken;
  });

  useEffect(() => {
    /**  Whenever token changes, keep everything in sync:
    * 1. API client (axios headers)
    * 2. localStorage (persistence) */
    setAuthToken(token);

    if (token) {
      writeStoredToken(token);
    } else {
      clearStoredToken();
    }
  }, [token]);

  useEffect(() => {
    /**  Register a global handler for 401 responses.
    * If the backend says "unauthorized", we clear auth state*/
    return setUnauthorizedHandler(() => setToken(null));
  }, []);

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token), // Derived boolean for convenience in UI/components
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
