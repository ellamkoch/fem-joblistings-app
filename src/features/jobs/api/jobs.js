// jobs.js
// API helpers for fetching and normalizing job listing data.

import { apiClient } from "@/lib/api/apiClient";

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
 * Uppercases each word in a phrase while keeping non-empty tokens only.
 *
 * @param {string} value - Raw string value.
 * @returns {string} Capitalized phrase.
 */
export function capitalizeWords(value) {
  return value
    .split(" ")
    .map((word) => {
      if (!word) return "";
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
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
 * Normalize job list fields (languages, tools) to an array of non-empty capitalized words.
 *
 * @param {unknown} value - The raw value from the API (string or array).
 * @returns {string[]} Array of normalized, non-empty values.
 */
function normalizeList(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => capitalizeWords(String(item).trim()))
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/[\n,]/)
      .map((item) => capitalizeWords(String(item).trim()))
      .filter(Boolean);
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
    languages: normalizeList(job?.languages ?? ""),
    tools: normalizeList(job?.tools ?? ""),
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
    posted_at: String(job?.postedAt ?? ""), 
  };
}

/**
 * Fetches all jobs from the backend and normalizes them for the UI.
 *
 * @param {object} [options={}] - Optional axios request config.
 * @returns {Promise<Array<object>>} Normalized jobs list.
 */
export async function listJobs(options = {}) {
  const res = await apiClient.get("/jobs", options);
  return unwrapJobList(res.data).map(normalizeJob);
}
