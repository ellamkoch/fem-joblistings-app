// jobs.js
// API helpers for fetching and normalizing job listing data.

import { apiClient } from "./apiClient";

/**
 * Unwraps common API response envelopes.
 *
 * @param {unknown} payload - Raw backend response payload.
 * @returns {unknown} Unwrapped response data.
 */
export function unwrapData(payload) {
    if (payload && typeof payload === "object" && "data" in payload) {
        return payload.data;
    }
    return payload;
}

/**
 * Extracts the jobs array from supported response shapes.
 *
 * @param {unknown} payload - Raw backend response payload.
 * @returns {Array<object>} Jobs array or an empty list.
 */
function unwrapJobList(payload) {
    const data = unwrapData(payload);

    if (Array.isArray(data)) {
        return data;
    }
    if (data && typeof data === "object" && Array.isArray(data.jobs)) {
        return data.jobs;
    }
    return [];
}

/**
 * Normalizes backend job fields into the frontend shape used across the app.
 *
 * @param {object} job - Raw job record from the API.
 * @returns {object} Normalized job object.
 */
export function normalizeJob(job) {
    return {
      id: String(job?.id ?? ""),
      company: String(job?.company ?? ""),
      position: String(job?.position ?? ""),
      role: String(job?.role ?? ""),
      level: String(job?.level ?? ""),
      contract: String(job?.contract ?? ""),
      languages: String(job?.languages ?? ""),
      logo_url: String(job?.logoUrl ?? ""),
      location: String(job?.location ?? ""),
      jobDesc: String(job?.jobDesc ?? ""),
      responsibilities: String(job?.responsibilities ?? ""),
      nice2have: String(job?.nice2have ?? ""),
      about: String(job?.about ?? ""),
      eoeStatement: String(job?.eoeStatement ?? ""),
      requirements: String(job?.requirements ?? ""),
      is_new: Boolean(job?.isNew),
      is_featured: Boolean(job?.isFeatured),
      posted_at: String(job?.postedAt ?? ""),//change to date later
    };
}

/**
 * Fetches all jobs from the backend and normalizes them for the UI.
 *
 * @param {object} [options={}] - Optional axios request config.
 * @returns {Promise<Array<object>>} Normalized jobs list.
 */
export async function listJobs(options = {}) {
    const res = await apiClient.get('/jobs', options);
    return unwrapJobList(res.data).map(normalizeJob);
}

