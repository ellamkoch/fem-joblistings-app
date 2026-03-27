// apiClient.js
// Central axios client plus auth-aware request/response helpers.

import axios from "axios";
import { clearStoredToken, readStoredToken } from "@/utils/authStorage";

const baseURL = import.meta.env.VITE_API_BASE_URL;
const apiClientTimeout = import.meta.env.VITE_API_CLIENT_TIMEOUT;
let logoutInFlight = null;
let unauthorizedHandler = null;

if(!baseURL) {
    console.error("VITE_API_BASE_URL is not set. API calls will likely fail.");
}

export const apiClient = axios.create({
    baseURL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    timeout: apiClientTimeout ? Number(apiClientTimeout) : 30_000,
});

/**
 * Updates the default Authorization header used by authenticated API requests.
 *
 * @param {string | null} token - Current auth token.
 * @returns {void}
 */
export function setAuthToken(token) {
    if (token) {
        apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common.Authorization;
    }
}

/**
 * Registers a callback for unauthorized responses.
 *
 * @param {(handler: null) => void | (() => void)} handler - Function called after auth state is cleared.
 * @returns {() => void} Cleanup function to unregister the handler.
 */
export function setUnauthorizedHandler(handler) {
    unauthorizedHandler = handler;

    return () => {
        if (unauthorizedHandler === handler) {
            unauthorizedHandler = null;
        }
    };
}

/**
 * Calls the backend logout endpoint with the current auth header.
 *
 * @returns {Promise<void>}
 */
async function requestServerLogout() {
    const authHeader = apiClient.defaults.headers.common.Authorization;

    if(!baseURL || !authHeader) {
        return;
    }

    await axios.post("/auth/logout", null, {
        baseURL,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authHeader,
        },
        timeout: apiClient.defaults.timeout,
    });
}

/**
 * Clears local auth state after a 401 and attempts a server-side logout once.
 *
 * @returns {Promise<void>}
 */
async function handleUnauthorized() {
    if (!logoutInFlight) {
        logoutInFlight = (async () => {
            try {
                if (readStoredToken()) {
                    await requestServerLogout();
                }
            } catch {
                //ignore logout request failures and still clear local auth state.
            } finally {
                setAuthToken(null);
                clearStoredToken();
                unauthorizedHandler?.();
                logoutInFlight = null;
            }
        })();
    }
    await logoutInFlight;
}

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error?.response?.status === 401) {
            await handleUnauthorized();
        }

        const apiError = error?.response?.data?.error;

        if(apiError) {
            return Promise.reject(new Error(apiError.message ?? "Request failed."));
        }
        return Promise.reject(error);
    }
)
