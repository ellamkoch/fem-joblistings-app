// authStorage.js
// Tiny helpers for persisting the auth token in local storage.

export const AUTH_TOKEN_STORAGE_KEY = "jobslistings:authToken";

/**
 * Reads the stored auth token.
 *
 * @returns {string | null} The saved token, or null when unavailable.
 */
export function readStoredToken() {
    try {
        return localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    } catch {
        return null;
    }
}

/**
 * Persists the auth token between page reloads.
 *
 * @param {string} token - JWT or API token to store.
 * @returns {void}
 */
export function writeStoredToken(token) {
    try {
        localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    } catch {
        //ignore
    }
}

/**
 * Removes the stored auth token.
 *
 * @returns {void}
 */
export function clearStoredToken() {
    try {
        localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    } catch {
        //ignore
    }
}
