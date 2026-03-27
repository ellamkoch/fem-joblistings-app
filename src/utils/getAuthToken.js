/** Extracts auth tokens from supported backend response shapes.
 *  Supports common response shapes and returns a null when no token is found.
 * */


/**
 * Finds a token in common auth response payload structures.
 *
 * @param {unknown} payload - Raw auth response payload.
 * @returns {string | null} The auth token when present.
 */
export function getAuthToken(payload) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  if (typeof payload.token === "string" && payload.token) {
    return payload.token;
  }

  if (typeof payload.accessToken === "string" && payload.accessToken) {
    return payload.accessToken;
  }

  if (
    payload.data &&
    typeof payload.data === "object" &&
    typeof payload.data.token === "string" &&
    payload.data.token
  ) {
    return payload.data.token;
  }

  if (
    payload.data &&
    typeof payload.data === "object" &&
    typeof payload.data.accessToken === "string" &&
    payload.data.accessToken
  ) {
    return payload.data.accessToken;
  }

  return null;
}
