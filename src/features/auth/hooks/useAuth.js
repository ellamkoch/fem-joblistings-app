// useAuth.js
// Convenience hook for reading the shared auth context.

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * Reads the current auth context value.
 *
 * @returns {{token: string | null, isAuthenticated: boolean, login: (token: string) => void, logout: () => void}} Auth context value.
 * @throws {Error} When called outside of AuthProvider.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider />");
  }

  return ctx;
}
