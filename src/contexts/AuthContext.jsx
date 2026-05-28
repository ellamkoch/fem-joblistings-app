// AuthContext.jsx
// Shared React context for auth state and auth actions.

import { createContext } from 'react';

/**
 * Auth context that stores the current auth state and actions.
 *
 * Context value shape:
 * - token: string | null - The current auth token (JWT or API token)
 * - isAuthenticated: boolean - Whether the user has a valid token
 * - login: (token: string) => void - Saves an auth token
 * - logout: () => void - Clears the auth token
 *
 * @type {React.Context<{token: string | null, isAuthenticated: boolean, login: (token: string) => void, logout: () => void} | null>}
 */
export const AuthContext = createContext(null);
