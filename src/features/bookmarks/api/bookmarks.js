import { apiClient } from '@/lib/api/apiClient';
import { unwrapData, normalizeJob } from '@/features/jobs/api/jobs';

/**
 * Unwraps the common API response envelope and extracts the bookmark data.
 * Reuses the jobs utility since bookmark responses follow the same pattern.
 *
 * @param {unknown} payload - Raw backend response payload.
 * @returns {Array<object>} Array of bookmark records or an empty array if parsing fails.
 */
function unwrapBookmarkList(payload) {
  const data = unwrapData(payload);

  if (Array.isArray(data)) {
    return data;
  }

  return []; //returns an empty array instead of crashing the app if the data is not an array
}

/**
 * Normalizes a bookmark record into the frontend job card shape.
 * Reuses the normalizeJob function since bookmarks are saved job objects.
 *
 * @param {object} bookmark - Raw bookmark record from the API.
 * @returns {object} Normalized job object for display.
 */
function normalizeBookmark(bookmark) {
  return normalizeJob(bookmark?.job ?? {});
}

/**
 * Fetches all bookmarked jobs for the authenticated user.
 *
 * @param {object} [options={}] - Optional axios request config.
 * @returns {Promise<Array<object>>} Normalized bookmarked jobs list.
 */
export async function listBookmarks(options = {}) {
  const res = await apiClient.get('/me/bookmarks', options);
  return unwrapBookmarkList(res.data).map(normalizeBookmark);
}

/**
 * Saves a job as a bookmark for the authenticated user.
 *
 * @param {string} jobId - The ID of the job to bookmark.
 * @param {object} [options={}] - Optional axios request config.
 * @returns {Promise<unknown>} Raw backend response payload.
 */
export async function createBookmark(jobId, options = {}) {
  const res = await apiClient.post(`/jobs/${jobId}/bookmark`, {}, options);
  return unwrapData(res.data);
}

/**
 * Removes a bookmarked job for the authenticated user.
 *
 * @param {string} jobId - The ID of the job to unbookmark.
 * @param {object} [options={}] - Optional axios request config.
 * @returns {Promise<unknown>} Raw backend response payload.
 */
export async function deleteBookmark(jobId, options = {}) {
  const res = await apiClient.delete(`/jobs/${jobId}/bookmark`, options);
  return unwrapData(res.data);
}
