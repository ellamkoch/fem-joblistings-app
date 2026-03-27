// AuthContext.jsx
// Shared React context for auth state and auth actions.

import {  createContext } from "react";

/**
 * Stores the current auth token, auth status, and login/logout actions.
 */
export const AuthContext = createContext(null);

