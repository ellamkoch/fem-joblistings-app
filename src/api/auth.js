// auth.js
// API helpers for authentication-related requests.

import { apiClient } from '@/lib/api/apiClient';

/**
 * Sends a registration request to the backend.
 *
 * @param {object} payload - Registration form data.
 * @returns {Promise<unknown>} Raw backend response payload.
 */
export async function register(payload) {
  const res = await apiClient.post('/auth/register', payload);
  return res.data;
}

/**
 * Sends a login request to the backend.
 *
 * @param {object} payload - Login credentials.
 * @returns {Promise<unknown>} Raw backend response payload.
 */
export async function login(payload) {
  const res = await apiClient.post('/auth/login', payload);
  return res.data;
}

/**
 * Sends a logout request to the backend.
 *
 * @param {object} [options={}] - Optional axios request config.
 * @returns {Promise<unknown>} Raw backend response payload.
 */
export async function logout(options = {}) {
  const res = await apiClient.post('/auth/logout', undefined, options);
  return res.data;
}
